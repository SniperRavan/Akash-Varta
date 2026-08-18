import React, { useEffect, useRef, useState, useContext } from "react";
import assets, { getUserAvatar } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const ChatContainer = () => {
  const {
    messages,
    sendMessage,
    selectedUser,
    setSelectedUser,
    showProfile,
    setShowProfile,
  } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const scrollEnd = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

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
  const targetAvatar = selectedUser ? getUserAvatar(selectedUser) : null;
  const myAvatar = authUser ? getUserAvatar(authUser) : assets.avatar_icon;

  if (!selectedUser) {
    return (
      <div className="h-full flex-1 flex flex-col items-center justify-center text-center p-6 bg-transparent max-md:hidden">
        <img
          src={assets.right_sidebar_homepage}
          alt="Akash Varta"
          className="w-24 h-24 rounded-2xl object-cover shadow-2xl mb-4 border border-purple-500/30"
        />
        <h2 className="text-xl font-bold text-white tracking-tight">Chat anytime, anywhere</h2>
        <p className="text-xs text-stone-400 mt-1.5 max-w-xs">
          Select a conversation from the left to start messaging in real-time.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex flex-col min-w-0 bg-[#110f22]/30 backdrop-blur-md relative overflow-hidden">
      {/* ---------------- TOP HEADER ---------------- */}
      <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between flex-shrink-0 bg-[#131126]/40 backdrop-blur-md">
        <div className="flex items-center gap-3 min-w-0">
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt="Back"
            className="md:hidden w-5 h-5 cursor-pointer opacity-80 hover:opacity-100 mr-1"
          />
          <img
            src={targetAvatar}
            alt={selectedUser.fullName}
            className="w-9 h-9 rounded-full object-cover border border-white/20"
          />
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-sm text-white truncate">{selectedUser.fullName}</h2>
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? "bg-green-400 shadow-[0_0_8px_#4ade80]" : "bg-stone-500"
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-stone-400">
          <img
            onClick={() => setShowProfile((prev) => !prev)}
            src={assets.help_icon}
            alt="About Profile"
            title="Toggle Profile Info"
            className={`max-h-5 cursor-pointer transition-all hover:scale-110 active:scale-95 ${
              showProfile ? "opacity-100 drop-shadow-[0_0_8px_#a855f7]" : "opacity-75 hover:opacity-100"
            }`}
          />
        </div>
      </div>



      {/* ---------------- MESSAGES CONTAINER ---------------- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 text-xs">
            <p>No messages yet. Say hello to {selectedUser.fullName}!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isMe = message.senderId === authUser?._id;

            return (
              <div
                key={message._id || index}
                className={`flex items-end gap-2 ${
                  isMe ? "justify-end" : "justify-start"
                }`}
              >
                {!isMe && (
                  <img
                    src={targetAvatar}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover flex-shrink-0 mb-1"
                  />
                )}

                <div
                  className={`flex flex-col max-w-[70%] ${
                    isMe ? "items-end" : "items-start"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[240px] max-h-[260px] object-cover rounded-2xl mb-1 border border-purple-500/40 shadow-lg cursor-pointer"
                      onClick={() => window.open(message.image, "_blank")}
                    />
                  )}
                  {message.text && (
                    <div
                      className={`p-3 text-xs leading-relaxed break-words rounded-2xl ${
                        isMe
                          ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-br-sm shadow-md"
                          : "bg-[#252140]/90 text-stone-200 rounded-bl-sm border border-white/10 shadow-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-[10px] text-stone-400 px-1 mt-0.5">
                    <span>{formatMessageTime(message.createdAt)}</span>
                    {isMe && (
                      <span className={message.seen ? "text-sky-400 font-bold" : "text-stone-400"}>
                        ✓✓
                      </span>
                    )}
                  </div>
                </div>

                {isMe && (
                  <img
                    src={myAvatar}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover flex-shrink-0 mb-1"
                  />
                )}
              </div>
            );
          })
        )}
        <div ref={scrollEnd} />
      </div>

      {/* Image Preview Overlay */}
      {imagePreview && (
        <div className="px-4 py-2 bg-[#1b1733]/95 border-t border-purple-500/30 flex items-center justify-between">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-12 h-12 object-cover rounded-lg border border-purple-400"
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

      {/* ---------------- BOTTOM INPUT BAR ---------------- */}
      <div className="p-3 bg-white/[0.02] backdrop-blur-xl flex-shrink-0 border-t border-white/5">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2.5">
          <div className="flex flex-1 items-center bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-full px-4 py-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Send a message..."
              className="flex-1 text-xs bg-transparent border-none outline-none text-white placeholder-stone-400"
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
                className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSending || (!text.trim() && !imagePreview)}
            className="cursor-pointer disabled:opacity-40 hover:scale-110 active:scale-95 transition-transform flex-shrink-0 p-1"
            title="Send Message"
          >
            <img src={assets.send_button} alt="Send" className="w-8 h-8 object-contain" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;