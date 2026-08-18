import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupImg from "../assets/login.png";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext.jsx";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [stepTwo, setStepTwo] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!stepTwo) {
      setStepTwo(true);
      return;
    }

    setLoading(true);
    const success = await login("signup", { fullName, email, password, bio });
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
          src={signupImg}
          alt="Signup banner"
          className="w-[min(38vw,360px)] h-auto object-contain"
        />
      </div>

      {/* RIGHT SECTION: Form */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-5 rounded-xl shadow-lg max-w-sm w-full backdrop-blur-md"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          Sign Up
          {stepTwo && (
            <img
              src={assets.arrow_icon}
              alt="Back"
              className="w-5 cursor-pointer"
              onClick={() => setStepTwo(false)}
            />
          )}
        </h2>

        {!stepTwo && (
          <>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="p-2.5 border border-gray-500 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />

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
              placeholder="Password (min 6 characters)"
              className="p-2.5 border border-gray-500 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />
          </>
        )}

        {stepTwo && (
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short Bio..."
            className="p-2.5 border border-gray-500 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            required
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-400 to-violet-600 py-3 rounded-md cursor-pointer text-white font-semibold shadow-[0_4px_24px_0_rgba(111,78,124,0.17)] hover:shadow-[0_8px_32px_0_rgba(111,78,124,0.28)] active:scale-95 transition-all duration-150 ease-out disabled:opacity-50"
        >
          {loading ? "Creating account..." : stepTwo ? "Complete Sign Up" : "Continue"}
        </button>

        <div className="flex items-center gap-2 text-xs text-gray-300">
          <input type="checkbox" defaultChecked className="cursor-pointer" />
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        <p className="text-sm text-gray-300 text-center">
          Already have an account?
          <Link to="/login" className="text-violet-400 hover:text-violet-300 ml-2 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;