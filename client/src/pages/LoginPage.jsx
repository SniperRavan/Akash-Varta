import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginImg from "../assets/login2.png";
import { AuthContext } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login("login", { email, password });
    setLoading(false);
    if (success) {
      navigate("/");
    }
  };

  const handleDemoLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword("password123");
    setLoading(true);
    const success = await login("login", { email: demoEmail, password: "password123" });
    setLoading(false);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl p-4">
      {/* LEFT SECTION */}
      <div className="flex flex-col items-center gap-6">
        <img
          src={loginImg}
          alt="Login banner"
          className="w-[min(38vw,360px)] h-auto object-contain"
        />

        <div className="flex flex-col items-center gap-3 text-sm">
          <p className="text-cyan-300 font-medium tracking-wide">
            Start Your Journey Today
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin("alex@example.com")}
              className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-colors cursor-pointer text-xs"
            >
              Demo: Alex
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("caroline@example.com")}
              className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-colors cursor-pointer text-xs"
            >
              Demo: Caroline
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("martin@example.com")}
              className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-colors cursor-pointer text-xs"
            >
              Demo: Martin
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: Form */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-5 rounded-xl shadow-lg max-w-sm w-full backdrop-blur-md"
      >
        <h2 className="font-medium text-2xl">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="p-2.5 border border-gray-500 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2.5 border border-gray-500 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-400 to-violet-600 py-3 rounded-md cursor-pointer text-white font-semibold shadow-[0_4px_24px_0_rgba(111,78,124,0.17)] hover:shadow-[0_8px_32px_0_rgba(111,78,124,0.28)] active:scale-95 transition-all duration-150 ease-out disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login Here"}
        </button>

        <div className="flex items-center gap-2 text-xs text-gray-300">
          <input type="checkbox" defaultChecked className="cursor-pointer" />
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        <p className="text-sm text-gray-300 text-center">
          Don’t have an account?
          <Link to="/signup" className="text-violet-400 hover:text-violet-300 ml-2 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

