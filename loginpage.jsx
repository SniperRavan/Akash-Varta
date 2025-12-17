import React, { useState } from 'react';
import assets from '../assets/assets';
import img from '../assets/login.png';


const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up" );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [showLoginImage, setShowLoginImage] = useState(false);



  const onSubmitHandler = (event) => {
    event.preventDefault();


    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }
  };
  
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* left */}
      {/* <img src={assets.logo_big} alt="Login" className="w-[min(30vw,250px)]" /> */}
      <img src={img} alt="Login" className="w-[min(40vw,380px)] h-auto object-contain" />


{/* wanna trying to add a new image here */}


{/* {showLoginImage && (
  <img
    src={assets.login_picture}   // put your image import/key here
    alt="Login illustration"
    className="w-[min(40vw,380px)] h-auto object-contain"
  />
)} */}



      {/* right */}
      <form onSubmit={onSubmitHandler} className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted &&
          <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className="w-5 cursor-pointer" /> 
          }
        </h2>


        {currState === "Sign up" && !isDataSubmitted && (
          <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
            type='text' className='p-2 border border-gray-500 rounded-md  
            bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder="Full Name" required />
        )}


        {!isDataSubmitted && (
          <>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
            type='email' className='p-2 border border-gray-500 rounded-md  
            bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500' 
            placeholder="Email Adress" required />
          <input onChange={(e)=>setPassword(e.target.value)} value={password}
            type='password' className='p-2 border border-gray-500 rounded-md  
            bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-500' 
            placeholder="Password" required />
          </>
        )}  


        {currState === "Sign up" && isDataSubmitted && (
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
            className='p-2 border border-gray-500 rounded-md  
            bg-white/30 placeholder-white/70 focus:outline-none 
            focus:ring-2 focus:ring-yellow-500' rows={4.9} 
            placeholder="Provide a Short Bio..." required />
        )}


        <button type="submit" 
        className="bg-gradient-to-r from-purple-400 to-violet-600 text-white
              font-semibold py-3 px-4 rounded-md
              shadow-[0_4px_24px_0_rgba(111,78,124,0.17),0_1.5px_7px_0_rgba(185,124,255,0.19)]
              hover:shadow-[0_8px_32px_0_rgba(111,78,124,0.28),0_2.5px_15px_0_rgba(185,124,255,0.33)]
              active:scale-95 active:shadow-[0_2px_8px_0_rgba(111,78,124,0.13),0_1px_4px_0_rgba(185,124,255,0.11)]
              transition-all duration-150 ease-out cursor-pointer">
          {currState === "Sign up" ? "Create Account" : "Login Here"}
        </button>


        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type='checkbox' className='cursor-pointer' />
          <p>Agree to the terms of use and privacy policy</p>
        </div>


        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600 ml-5'>
              Already have an Account? 
              {/* <span onClick={()=> setCurrState("Login")}
              className='font-medium text-violet-500 cursor-pointer ml-6'>Login Here</span> */}
              <span
  onClick={() => {
    setCurrState("Login");
    setShowLoginImage(true);
  }}
  className="font-medium text-violet-500 cursor-pointer ml-3"
>
  Login Here
</span>


            </p>
          ) : ( 
            <p 
            className='text-sm text-gray-600'>Create an Account 
            <span onClick={()=> setCurrState("Sign up")}
            className='font-medium text-violet-500 cursor-pointer ml-10'> CLick Here
              </span>
            </p>
/*
<p className="text-sm text-gray-600">
  Create an Account
  <span
    onClick={() => setCurrState("Sign up")}
    className="font-medium text-violet-500 cursor-pointer ml-6"
  >
    Click Here
  </span>
</p>


*/
          )}
        </div>


      </form>
    </div>
  );
};


export default LoginPage; 