import React, { useContext } from "react";
import { imagesDummyData, getUserAvatar } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const RightSidebar = () => {
  const { logout, onlineUsers } = useContext(AuthContext);
  const { selectedUser, messages, showProfile, setShowProfile } = useContext(ChatContext);

  if (!selectedUser || !showProfile) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);
  const avatarUrl = getUserAvatar(selectedUser);
  const sharedMedia = messages.filter((m) => m.image).map((m) => m.image);
  const mediaGrid = sharedMedia.length > 0 ? sharedMedia : imagesDummyData;

  return (
    <div className="h-full bg-[#141128]/70 backdrop-blur-xl border-l border-white/10 flex flex-col justify-between overflow-y-auto p-5 min-w-0">
      <div>
        {/* Header with Close */}
        <div className="flex justify-between items-center pb-2">
          <span className="text-xs font-semibold text-stone-300">About Contact</span>
          <button
            onClick={() => setShowProfile(false)}
            className="w-6 h-6 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 text-xs transition-colors cursor-pointer"
            title="Close Profile"
          >
            ✕
          </button>
        </div>

        {/* Profile Card */}
        <div className="pt-2 flex flex-col items-center text-center">

          <img
            src={avatarUrl}
            alt={selectedUser.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/40 shadow-xl"
          />

          <h2 className="text-base font-semibold text-white mt-3 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? "bg-green-400 shadow-[0_0_6px_#4ade80]" : "bg-stone-500"
              }`}
            />
            {selectedUser.fullName}
          </h2>

          <p className="text-stone-300 text-xs mt-1 px-2 line-clamp-3">
            {selectedUser.bio || "Senior Product Designer & UI Enthusiast. Living in San Francisco."}
          </p>
        </div>

        <div className="my-4 border-t border-white/10" />

        {/* Media Grid */}
        <div>
          <h3 className="text-xs font-semibold text-stone-200 mb-2">Media</h3>
          <div className="grid grid-cols-2 gap-2">
            {mediaGrid.slice(0, 4).map((url, idx) => (
              <div
                key={idx}
                onClick={() => window.open(url, "_blank")}
                className="aspect-square rounded-xl overflow-hidden border border-white/10 hover:opacity-80 transition-opacity cursor-pointer bg-black/40"
              >
                <img src={url} alt="Media" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-4">
        <button
          onClick={logout}
          className="w-full bg-gradient-to-r from-purple-500 to-violet-600 py-2.5 rounded-full font-medium text-white text-xs shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] active:scale-95 transition-all duration-150 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;


