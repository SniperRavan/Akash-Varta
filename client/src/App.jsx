// import React from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import HomePage from './pages/HomePage'
// import LoginPage from './pages/LoginPage'
// import ProfilePage from './pages/ProfilePage'
// import {Toaster} from "react-hot-toast";

// const App = () => {
//   const {authUser} = React.useContext(AuthContext);
//   return (
//     <div className= "bg-[url('./src/assets/bgImage.svg')] bg-contain">
//       <Toaster />
//       <Routes>
//         <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
//         <Route path='/login' element={authUser ?  <LoginPage /> : <Navigate to="/" />} />
//         <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
//       </Routes>
//     </div>
//   )
// }

// export default App;




// import React from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import ProfilePage from "./pages/ProfilePage";
// import { Toaster } from "react-hot-toast";
// import { AuthContext } from "./context/AuthContext.jsx";

// const App = () => {
//   const { authUser } = React.useContext(AuthContext);

//   return (
//     <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
//       <Toaster />
//       <Routes>
//         <Route
//           path="/"
//           element={authUser ? <HomePage /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/login"
//           element={!authUser ? <LoginPage /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/profile"
//           element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </div>
//   )
// }

// export default App;




import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, authLoading } = useContext(AuthContext);

  // ⛔ WAIT until auth check finishes
  if (authLoading) {
    return (
      <div className="text-white p-5 text-center">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={
            authUser ? <HomePage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            !authUser ? <LoginPage /> : <Navigate to="/" />
          }
        />

         <Route path="/signup" element={
          !authUser ? <SignupPage /> : <Navigate to="/" />
        } />

        <Route
          path="/profile"
          element={
            authUser ? <ProfilePage /> : <Navigate to="/login" />
          }
        />

        {/* 404 fallback */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;

