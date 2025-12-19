// import React, { useContext, useState } from "react";
// import signupImg from "../assets/login.png";   // tall signup image (like 1st screenshot)
// import loginImg from "../assets/login2.png";   // wide login image (2nd screenshot)
// import assets from "../assets/assets";
// import { AuthContext } from "../context/AuthContext.jsx";

// const LoginPage = () => {
//   const [currState, setCurrState] = useState("Sign up");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [bio, setBio] = useState("");
//   const [isDataSubmitted, setIsDataSubmitted] = useState(false);

//   const {login} = useContext(AuthContext);

//   const onSubmitHandler = (event) => {
//     event.preventDefault();

//     if (currState === "Sign up" && !isDataSubmitted) {
//       setIsDataSubmitted(true);
//       return;
//     }

//     login(currState === "Sign up" ? "signup" : "login", { email, password, fullName, bio });
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">

//       {/* LEFT SECTION: image + small text buttons */}
//       <div className="flex flex-col items-center gap-6">
//         <img
//           src={currState === "Sign up" ? signupImg : loginImg}
//           alt="Auth"
//           className="w-[min(38vw,360px)] h-auto object-contain"
//         />

//         {/* bottom text like “Start your journey today / Free / Easy Setup / Private” */}
//         <div className="flex flex-col items-center gap-3 text-sm">
//           <p className="text-cyan-300 font-medium tracking-wide">
//             Start Your Journey Today
//           </p>

//           <div className="flex gap-3">
//             <button className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-colors cursor-pointer">
//               Free
//             </button>
//             <button className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-colors cursor-pointer">
//               Easy Setup
//             </button>
//             <button className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-colors cursor-pointer">
//               Private
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SECTION: your form (unchanged except minor spacing) */}
//       <form
//         onSubmit={onSubmitHandler}
//         className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg max-w-sm w-full"
//       >
//         <h2 className="font-medium text-2xl flex justify-between items-center">
//           {currState}
//           {isDataSubmitted && (
//             <img
//               onClick={() => setIsDataSubmitted(false)}
//               src={assets.arrow_icon}
//               alt=""
//               className="w-5 cursor-pointer"
//             />
//           )}
//         </h2>

//         {currState === "Sign up" && !isDataSubmitted && (
//           <input
//             onChange={(e) => setFullName(e.target.value)}
//             value={fullName}
//             type="text"
//             className="p-2 border border-gray-500 rounded-md bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Full Name"
//             required
//           />
//         )}

//         {!isDataSubmitted && (
//           <>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               type="email"
//               className="p-2 border border-gray-500 rounded-md bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Email Adress"
//               required
//             />
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               type="password"
//               className="p-2 border border-gray-500 rounded-md bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Password"
//               required
//             />
//           </>
//         )}

//         {currState === "Sign up" && isDataSubmitted && (
//           <textarea
//             onChange={(e) => setBio(e.target.value)}
//             value={bio}
//             className="p-2 border border-gray-500 rounded-md bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             rows={4.9}
//             placeholder="Provide a Short Bio..."
//             required
//           />
//         )}

//         <button
//           type="submit"
//           className="bg-gradient-to-r from-purple-400 to-violet-600 text-white font-semibold py-3 px-4 rounded-md shadow-[0_4px_24px_0_rgba(111,78,124,0.17),0_1.5px_7px_0_rgba(185,124,255,0.19)] hover:shadow-[0_8px_32px_0_rgba(111,78,124,0.28),0_2.5px_15px_0_rgba(185,124,255,0.33)] active:scale-95 active:shadow-[0_2px_8px_0_rgba(111,78,124,0.13),0_1px_4px_0_rgba(185,124,255,0.11)] transition-all duration-150 ease-out cursor-pointer"
//         >
//           {currState === "Sign up" ? "Create Account" : "Login Here"}
//         </button>

//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <input type="checkbox" className="cursor-pointer" />
//           <p>Agree to the terms of use and privacy policy</p>
//         </div>

//         <div className="flex flex-col gap-2">
//           {currState === "Sign up" ? (
//             <p className="text-sm text-gray-600 ml-5">
//               Already have an Account?
//               <span
//                 onClick={() => {
//                   setCurrState("Login");
//                   setIsDataSubmitted(false);
//                 }}
//                 className="font-medium text-violet-500 cursor-pointer ml-2"
//               >
//                 Login Here
//               </span>
//             </p>
//           ) : (
//             <p className="text-sm text-gray-600">
//               Create an Account
//               <span
//                 onClick={() => {
//                   setCurrState("Sign up");
//                   setIsDataSubmitted(false);
//                 }}
//                 className="font-medium text-violet-500 cursor-pointer ml-2"
//               >
//                 Click Here
//               </span>
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;




// import React, { useContext, useState } from "react";
// import loginImg from "../assets/login2.png";
// import assets from "../assets/assets";
// import { AuthContext } from "../context/AuthContext.jsx";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { login } = useContext(AuthContext);

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     login("login", { email, password });
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">

//       {/* LEFT SECTION */}
//       <div className="flex flex-col items-center gap-6">
//         <img
//           src={loginImg}
//           alt="Login"
//           className="w-[min(38vw,360px)] h-auto object-contain"
//         />

//         <div className="flex flex-col items-center gap-3 text-sm">
//           <p className="text-cyan-300 font-medium tracking-wide">
//             Start Your Journey Today
//           </p>
//           <div className="flex gap-3">
//             <button className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
//               Free
//             </button>
//             <button className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
//               Easy Setup
//             </button>
//             <button className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
//               Private
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SECTION */}
//       <form
//         onSubmit={onSubmitHandler}
//         className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg max-w-sm w-full"
//       >
//         <h2 className="font-medium text-2xl">Login</h2>

//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email Address"
//           className="p-2 border border-gray-500 rounded-md bg-white/30"
//           required
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="p-2 border border-gray-500 rounded-md bg-white/30"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-gradient-to-r from-purple-400 to-violet-600 py-3 rounded-md cursor-pointer text-white font-semibold shadow-[0_4px_24px_0_rgba(111,78,124,0.17),0_1.5px_7px_0_rgba(185,124,255,0.19)] hover:shadow-[0_8px_32px_0_rgba(111,78,124,0.28),0_2.5px_15px_0_rgba(185,124,255,0.33)] active:scale-95 active:shadow-[0_2px_8px_0_rgba(111,78,124,0.13),0_1px_4px_0_rgba(185,124,255,0.11)] transition-all duration-150 ease-out"
//         >
//           Login Here
//         </button>

//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <input type="checkbox" className="cursor-pointer" required />
//           <p>Agree to the terms of use and privacy policy</p>
//         </div>

//         <p className="text-sm text-gray-600 text-center">
//           Don’t have an account?
//           <a href="/signup" className="text-violet-500 ml-2">
//             Sign Up
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;



{
/*First snippet:
Simple: submit → login("login", { email, password }).
But you cannot see what happens after login (no redirect), so the UX is incomplete.

Second snippet:
Shows the full login flow: submit → call login → then go to /.
This makes the component’s purpose more explicit and easier to understand when reading later.
*/}


import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login2.png";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await login("login", { email, password });
    navigate("/"); // ✅ login ke baad turant index
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* LEFT SECTION */}
      <div className="flex flex-col items-center gap-6">
        <img
          src={loginImg}
          alt="Login"
          className="w-[min(38vw,360px)] h-auto object-contain"
        />

        <div className="flex flex-col items-center gap-3 text-sm">
           <p className="text-cyan-300 font-medium tracking-wide">
             Start Your Journey Today
           </p>

           <div className="flex gap-3">
             <button className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-colors cursor-pointer">
               Free
             </button>
             <button className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-colors cursor-pointer">
               Easy Setup
             </button>
             <button className="px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 transition-colors cursor-pointer">
               Private
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="font-medium text-2xl">Login</h2>

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

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-violet-600 py-3 rounded-md cursor-pointer text-white font-semibold shadow-[0_4px_24px_0_rgba(111,78,124,0.17),0_1.5px_7px_0_rgba(185,124,255,0.19)] hover:shadow-[0_8px_32px_0_rgba(111,78,124,0.28),0_2.5px_15px_0_rgba(185,124,255,0.33)] active:scale-95 active:shadow-[0_2px_8px_0_rgba(111,78,124,0.13),0_1px_4px_0_rgba(185,124,255,0.11)] transition-all duration-150 ease-out"
        >
          Login Here
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" className="cursor-pointer" required />
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        <p className="text-sm text-gray-600 text-center">
          Don’t have an account?
          <a href="/signup" className="text-violet-500 ml-2">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
