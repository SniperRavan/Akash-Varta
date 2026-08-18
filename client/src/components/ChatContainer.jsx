import React, { useEffect, useRef, useState, useContext } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const { messages, sendMessage } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const scrollEnd = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, imagePreview]);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  // Submit message handler
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSending) return;

    setIsSending(true);
    await sendMessage({
      text: text.trim(),
      image: imagePreview || "",
    });

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsSending(false);
  };

  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  return selectedUser ? (
    <div className="h-full overflow-hidden relative flex flex-col backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser?.profilePicture || assets.avatar_icon}
          alt={selectedUser.fullName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2 font-medium">
          {selectedUser.fullName}
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isOnline ? "bg-green-500" : "bg-neutral-500"
            }`}
          />
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="Back"
          className="md:hidden max-w-7 cursor-pointer"
        />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 text-sm">
            <p>No messages yet. Say hello to {selectedUser.fullName}!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isMe = message.senderId === authUser?._id;
            return (
              <div
                key={message._id || index}
                className={`flex items-end gap-2 ${
                  isMe ? "justify-end" : "justify-start flex-row-reverse"
                }`}
              >
                <div
                  className={`flex flex-col max-w-[75%] ${
                    isMe ? "items-end" : "items-start"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared attachment"
                      className="max-w-[260px] max-h-[300px] object-cover rounded-2xl mb-1.5 border border-purple-500/30"
                    />
                  )}
                  {message.text && (
                    <p
                      className={`p-3 text-sm rounded-2xl break-words ${
                        isMe
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-md"
                          : "bg-white/10 text-white rounded-bl-none border border-white/10"
                      }`}
                    >
                      {message.text}
                    </p>
                  )}
                  <span className="text-[10px] text-gray-400 px-1 mt-0.5">
                    {formatMessageTime(message.createdAt)}
                    {isMe && (
                      <span
                        className={`ml-1 font-bold ${
                          message.seen ? "text-sky-400" : "text-gray-400"
                        }`}
                      >
                        ✓✓
                      </span>
                    )}
                  </span>
                </div>

                <img
                  src={
                    isMe
                      ? authUser?.profilePicture || assets.avatar_icon
                      : selectedUser?.profilePicture || assets.avatar_icon
                  }
                  alt=""
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                />
              </div>
            );
          })
        )}
        <div ref={scrollEnd} />
      </div>

      {/* Image Preview Banner */}
      {imagePreview && (
        <div className="absolute bottom-16 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-purple-500/40 flex items-center justify-between z-10">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-14 h-14 object-cover rounded-lg border border-purple-400/50"
          />
          <button
            onClick={() => {
              setImagePreview(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full hover:bg-red-500/40 cursor-pointer"
          >
            Remove
          </button>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleSendMessage}
        className="absolute bottom-0 left-0 flex items-center gap-2 p-3 w-full backdrop-blur-md bg-slate-950/40 border-t border-stone-700/50"
      >
        <div className="flex flex-1 items-center bg-gray-100/10 px-3 py-1 rounded-full border border-white/10">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 text-sm p-2 bg-transparent border-none outline-none text-white placeholder-gray-400"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            hidden
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <img
              src={assets.gallery_icon}
              alt="Attach"
              className="w-5 mr-1 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={isSending || (!text.trim() && !imagePreview)}
          className="cursor-pointer disabled:opacity-50 transition-opacity"
        >
          <img src={assets.send_button} alt="Send" className="w-8" />
        </button>
      </form>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full">
      <img src={assets.logo_icon} alt="" className="max-w-16 opacity-80" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere.</p>
      <p className="text-xs text-stone-400">Select a contact from the sidebar to start chatting</p>
    </div>
  );
};

export default ChatContainer;