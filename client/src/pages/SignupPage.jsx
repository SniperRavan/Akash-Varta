import React, { useContext, useState } from "react";
import signupImg from "../assets/login.png";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext.jsx";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [stepTwo, setStepTwo] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!stepTwo) {
      setStepTwo(true);
      return;
    }

    login("signup", { fullName, email, password, bio });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">

      {/* LEFT SECTION */}
      <div className="flex flex-col items-center gap-6">
        <img
          src={signupImg}
          alt="Signup"
          className="w-[min(38vw,360px)] h-auto object-contain"
        />
      </div>

      {/* RIGHT SECTION */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="font-medium text-2xl flex justify-between">
          Sign Up
          {stepTwo && (
            <img
              src={assets.arrow_icon}
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
              className="p-2 border border-gray-500 rounded-md bg-white/30"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="p-2 border border-gray-500 rounded-md bg-white/30"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border border-gray-500 rounded-md bg-white/30"
              required
            />
          </>
        )}

        {stepTwo && (
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short Bio"
            className="p-2 border border-gray-500 rounded-md bg-white/30"
            required
          />
        )}

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-violet-600 py-3 rounded-md cursor-pointer text-white font-semibold shadow-[0_4px_24px_0_rgba(111,78,124,0.17),0_1.5px_7px_0_rgba(185,124,255,0.19)] hover:shadow-[0_8px_32px_0_rgba(111,78,124,0.28),0_2.5px_15px_0_rgba(185,124,255,0.33)] active:scale-95 active:shadow-[0_2px_8px_0_rgba(111,78,124,0.13),0_1px_4px_0_rgba(185,124,255,0.11)] transition-all duration-150 ease-out"
        >
          Create Account
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" className="cursor-pointer" required/>
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?
          <a href="/login" className="text-violet-500 ml-2">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;