import React, { useContext } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const RightSidebar = ({ selectedUser }) => {
  const { logout, onlineUsers } = useContext(AuthContext);
  const { messages } = useContext(ChatContext);

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);
  const sharedMedia = messages.filter((m) => m.image).map((m) => m.image);

  return (
    <div
      className={`bg-[#8185B2]/10 text-white relative w-full h-full flex flex-col justify-between overflow-y-auto p-5 ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div>
        {/* Profile Card */}
        <div className="pt-6 flex flex-col items-center gap-2 text-xs font-light text-center">
          <img
            src={selectedUser?.profilePicture || assets.avatar_icon}
            alt={selectedUser.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/40"
          />
          <h1 className="text-xl font-medium flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOnline ? "bg-green-500" : "bg-neutral-500"
              }`}
            />
            {selectedUser.fullName}
          </h1>
          <p className="text-stone-300 px-4 text-xs">
            {selectedUser.bio || "Hi Everyone, I am Using QuickChat"}
          </p>
        </div>

        <hr className="border-[#ffffff30] my-4" />

        {/* Media Grid */}
        <div className="text-sm">
          <p className="font-medium text-stone-200 mb-2">Media</p>
          {sharedMedia.length === 0 ? (
            <p className="text-xs text-stone-400 italic">No media shared yet</p>
          ) : (
            <div className="max-h-[300px] overflow-y-auto grid grid-cols-2 gap-2">
              {sharedMedia.map((url, index) => (
                <div
                  key={index}
                  onClick={() => window.open(url, "_blank")}
                  className="cursor-pointer rounded-lg overflow-hidden border border-white/10 hover:opacity-80 transition-opacity aspect-square"
                >
                  <img src={url} alt="Media" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-6 pb-2">
        <button
          className="w-full bg-gradient-to-r from-purple-500 to-violet-600 py-2.5 rounded-full font-medium text-white text-sm shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_35px_rgba(139,92,246,0.9)] active:scale-95 transition-all duration-150 ease-out cursor-pointer"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;

