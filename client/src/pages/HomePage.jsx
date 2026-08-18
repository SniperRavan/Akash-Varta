import React, { useContext } from "react";
import assets from "../assets/assets";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../context/ChatContext";

const HomePage = () => {
  const { selectedUser, showProfile } = useContext(ChatContext);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-[#090814] bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${assets.bgImage})` }}
    >
      {/* Main Glass Shell */}
      <div
        className={`
          w-full max-w-[1260px] h-[90vh] max-h-[860px]
          bg-[#131126]/60 backdrop-blur-2xl border border-white/15 rounded-3xl
          overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)]
          grid relative z-10
          ${
            selectedUser && showProfile
              ? "grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr_290px]"
              : selectedUser
              ? "grid-cols-1 md:grid-cols-[300px_1fr]"
              : "grid-cols-1 md:grid-cols-[320px_1fr]"
          }
        `}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;




