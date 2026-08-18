import React, { useState, useRef, useEffect, useContext } from "react";
import assets, { getUserAvatar } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages } = useContext(ChatContext);
  const navigate = useNavigate();
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const filteredUsers = input
    ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase()))
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers, getUsers]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`h-full bg-[#141128]/50 backdrop-blur-xl border-r border-white/10 flex flex-col overflow-hidden min-w-0 ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* ---------------- HEADER ---------------- */}
      <div className="p-4 pb-2 flex-shrink-0">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2.5">
            <img src={assets.logo_icon} alt="Akash Varta" className="w-8 h-8 object-contain" />
            <h1 className="text-lg font-bold tracking-tight text-white">Akash Varta</h1>
          </div>

          {/* 3-DOT MENU */}
          <div className="relative" ref={menuRef}>
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setMenuOpen((prev) => !prev)}
            />



            {/* DROPDOWN MENU */}
            {menuOpen && (
              <div className="absolute top-full right-0 mt-2 z-50 w-36 py-2 rounded-xl bg-[#201c38] border border-white/15 shadow-2xl text-stone-200">
                <button
                  className="w-full text-left px-4 py-2 text-xs hover:bg-purple-600/30 hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                    setMenuOpen(false);
                  }}
                >
                  Edit Profile
                </button>
                <div className="my-1 border-t border-white/10" />
                <button
                  className="w-full text-left px-4 py-2 text-xs hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-colors cursor-pointer"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ---------------- SEARCH BAR ---------------- */}
        <div className="bg-white/[0.08] backdrop-blur-md rounded-full flex items-center gap-2.5 px-3.5 py-2 mt-4 border border-white/15">
          <img src={assets.search_icon} alt="Search" className="w-3.5 h-3.5 opacity-60" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-stone-400 flex-1"
            placeholder="Search here..."
          />
        </div>
      </div>

      {/* ---------------- CONTACTS LIST ---------------- */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin">
        {filteredUsers.length === 0 ? (
          <p className="text-xs text-stone-400 text-center py-8">No contacts found</p>
        ) : (
          filteredUsers.map((user, index) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers.includes(user._id);
            const avatarUrl = getUserAvatar(user);

            return (
              <div
                key={user._id || index}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? "bg-white/15 backdrop-blur-md shadow-lg shadow-purple-900/30 border border-white/20"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={avatarUrl}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#151228] rounded-full" />
                  )}
                </div>


                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs text-white truncate">{user.fullName}</p>
                  <p className={`text-[11px] ${isOnline ? "text-green-400 font-medium" : "text-stone-400"}`}>
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>

                {unseenMessages[user._id] > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold text-[10px] shadow-sm">
                    {unseenMessages[user._id]}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;