import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [loadingMessages, setLoadingMessages] = useState(false);

  const { socket, axios, authUser } = useContext(AuthContext);


  // Fetch all users and unread counts for sidebar
  const getUsers = useCallback(async () => {
    if (!axios) return;
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users || []);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (error) {
      console.warn("Failed to fetch sidebar users:", error.message);
    }
  }, [axios]);

  // Fetch conversation messages for selected contact
  const getMessages = useCallback(
    async (userId) => {
      if (!axios || !userId) return;
      setLoadingMessages(true);
      try {
        const { data } = await axios.get(`/api/messages/${userId}`);
        if (data.success) {
          setMessages(data.messages || []);
          // Clear unread counter for this user locally
          setUnseenMessages((prev) => {
            const next = { ...prev };
            delete next[userId];
            return next;
          });
        }
      } catch (error) {
        toast.error("Failed to load messages");
      } finally {
        setLoadingMessages(false);
      }
    },
    [axios]
  );

  // Send message with text or base64 image
  const sendMessage = async (messageData) => {
    if (!axios || !selectedUser?._id) return;
    try {
      const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
      if (data.success && data.newMessage) {
        setMessages((prev) => [...prev, data.newMessage]);
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to send message";
      toast.error(msg);
    }
  };

  // Real-time socket message listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const isFromActiveChat = selectedUser && newMessage.senderId === selectedUser._id;

      if (isFromActiveChat) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        if (axios) {
          axios.put(`/api/messages/mark/${newMessage._id}`).catch(() => {});
        }
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
        }));
      }
    };

    const handleMessagesSeen = ({ readerId }) => {
      if (selectedUser && selectedUser._id === readerId) {
        setMessages((prev) =>
          prev.map((msg) => (msg.senderId === authUser?._id ? { ...msg, seen: true } : msg))
        );
      }
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("messagesSeen", handleMessagesSeen);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messagesSeen", handleMessagesSeen);
    };
  }, [socket, selectedUser, axios, authUser]);

  // Refresh user messages when selectedUser changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    } else {
      setMessages([]);
    }
  }, [selectedUser, getMessages]);

  const value = {
    messages,
    users,
    selectedUser,
    setSelectedUser,
    showProfile,
    setShowProfile,
    unseenMessages,
    loadingMessages,
    getUsers,
    getMessages,
    sendMessage,
    setMessages,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};


