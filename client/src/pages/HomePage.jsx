import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 relative bg-[#090814] overflow-hidden">
      {/* Ambient background glow matching Screenshot 1 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-700/20 via-indigo-600/15 to-transparent blur-[120px]" />
      </div>

      {/* Main Glass Shell */}
      <div
        className={`
          w-full max-w-[1240px] h-[90vh] max-h-[850px]
          bg-[#131126]/85 backdrop-blur-3xl border border-white/15 rounded-3xl
          overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)]
          grid relative z-10
          ${
            selectedUser
              ? "grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr_290px]"
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



