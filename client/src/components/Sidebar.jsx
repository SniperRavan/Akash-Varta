import React, { useState, useRef, useEffect, useContext } from "react";
import assets from "../assets/assets";
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
      className={`bg-[#8185B2]/10 p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* ---------------- HEADER ---------------- */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="Logo" className="max-w-40" />

          {/* MENU ICON + DROPDOWN */}
          <div className="relative" ref={menuRef}>
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
            />

            {/* ---------------- DROPDOWN MENU ---------------- */}
            <div
              className={`absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 transition-all duration-200 ease-out ${
                menuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <p
                className="cursor-pointer text-sm"
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
              >
                Edit Profile
              </p>

              <hr className="my-2 border-t border-gray-500" />

              <p
                className="cursor-pointer text-sm"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Log Out
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- SEARCH ---------------- */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      {/* ---------------- USER LIST ---------------- */}
      <div className="flex flex-col">
        {filteredUsers.length === 0 ? (
          <p className="text-xs text-stone-400 text-center py-6">No users found</p>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              key={user._id || index}
              onClick={() => setSelectedUser(user)}
              className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm transition-colors ${
                selectedUser?._id === user._id ? "bg-[#282142]/50" : "hover:bg-[#282142]/25"
              }`}
            >
              <img
                src={user?.profilePicture || assets.avatar_icon}
                alt="User Profile"
                className="w-[35px] aspect-square rounded-full object-cover"
              />

              <div className="flex flex-col leading-5">
                <p className="font-medium text-sm">{user.fullName}</p>
                {onlineUsers.includes(user._id) ? (
                  <span className="text-green-400 text-xs">Online</span>
                ) : (
                  <span className="text-neutral-400 text-xs">Offline</span>
                )}
              </div>

              {unseenMessages[user._id] > 0 && (
                <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500 text-white font-bold">
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;