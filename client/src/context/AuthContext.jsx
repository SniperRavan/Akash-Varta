// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5173";
// // NOTE: property name is baseURL (not baseUrl)
// axios.defaults.baseURL = backendUrl;

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [authUser, setAuthUser] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [socket, setSocket] = useState(null);

//   // check auth on mount / when token changes
//   useEffect(() => {
//     if (!token) return;
//     axios.defaults.headers.common["token"] = token;
//     checkAuth();
//   }, [token]);

//   const checkAuth = async () => {
//     try {
//       const res = await axios.get("/api/auth/check");
//       const data = res.data;
//       if (data.success) {
//         setAuthUser(data.user);
//         connectSocket(data.user);
//       }
//     } catch (error) {
//       toast.error(error.message || "Authentication check failed");
//     }
//   };

//   // login
//   const login = async (state, credentials) => {
//     try {
//       const res = await axios.post(`/api/auth/${state}`, credentials);
//       const data = res.data;
//       if (data.success) {
//         setToken(data.token);
//         localStorage.setItem("token", data.token);
//         setAuthUser(data.user);
//         axios.defaults.headers.common["token"] = data.token;
//         connectSocket(data.user);
//         toast.success(data.message || "Login successful");
//       } else {
//         toast.error(data.message || "Login failed");
//       }
//     } catch (error) {
//       toast.error(error.message || "Login failed");
//     }
//   };

//   // logout
//   const logout = async () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setAuthUser(null);
//     setOnlineUsers([]);
//     axios.defaults.headers.common["token"] = null;
//     toast.success("Logged out successfully");
//     if (socket) {
//       socket.disconnect();
//       setSocket(null);
//     }
//   };

//   // update profile
//   const updateProfile = async (profileData) => {
//     try {
//       const res = await axios.put("/api/auth/profile", profileData);
//       const data = res.data;
//       if (data.success) {
//         setAuthUser(data.user);
//         toast.success(data.message || "Profile updated successfully");
//       } else {
//         toast.error(data.message || "Profile update failed");
//       }
//     } catch (error) {
//       toast.error(error.message || "Profile update failed");
//     }
//   };

//   // connect socket
//   const connectSocket = (userData) => {
//     if (!userData || socket?.connected) return;

//     const newSocket = io(backendUrl, {
//       query: { userId: userData._id },
//     });

//     setSocket(newSocket);

//     newSocket.on("online-users", (users) => {
//       // assuming 'users' is the array you want
//       setOnlineUsers(users);
//     });
//   };

//   const value = {
//     axios,
//     authUser,
//     onlineUsers,
//     socket,
//     login,
//     logout,
//     updateProfile,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




//uses 2nd version below

// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
// axios.defaults.baseURL = backendUrl;

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(localStorage.getItem("authToken") || null);
//     const [authUser, setAuthUser] = useState(null);
//     const [onlineUsers, setOnlineUsers] = useState([]);
//     const [socket, setSocket] = useState(null);

//     axios.interceptors.request.use((config) => {
//         const token = localStorage.getItem("authToken");
//         if (token) {
//             config.headers.token = token;
//         }
//         return config;
//         });

//     const checkAuth = async () => {
//         try {
//             // const { data } = await axios.get("/api/auth/check");
//             const { data } = await axios.get("/api/auth/check-auth");
//             if (data.success) {
//                 setAuthUser(data.user);
//                 connectSocket(data.user);
//             }
//         } catch (error) {
//             toast.error(error.message || "Authentication check failed");
//         }
//     };

//     const login = async (loginType, credentials) => {
//         try {
//             const { data } = await axios.post(`/api/auth/${loginType}`, credentials);
//             if (data.success) {
//                 setToken(data.token);
//                 localStorage.setItem("authToken", data.token);
//                 setAuthUser(data.user);
//                 connectSocket(data.user);
//                 axios.defaults.headers.common["token"] = data.token;
//                 toast.success(data.message || "Login successful");
//             } else {
//                 toast.error(data.message || "Login failed");
//             }
//         } catch (error) {
//             toast.error(error.message || "Login failed");
//         }
//     };

//     const logout = async () => {
//         try {
//             localStorage.removeItem("authToken");
//             setToken(null);
//             setAuthUser(null);
//             setOnlineUsers([]);
//             // axios.defaults.headers.common["token"] = null;
//             delete axios.defaults.headers.common["token"];

// {/*
//     🔴 ROOT CAUSE (important)

// Your logout function clears state, BUT
// your AuthContext immediately logs you back in because of this:

// useEffect(() => {
//   if (token) {
//     axios.defaults.headers.common["token"] = token;
//     checkAuth();
//   }
// }, [token]);

// After logout:

// localStorage is cleared ✅

// setToken(null) runs ✅

// BUT your interceptor still sends token from memory

// checkAuth() succeeds

// authUser is set again ❌
// */}
            
//             if (socket) {
//                 socket.disconnect();
//             }
//             toast.success("Logged out successfully");
//         } catch (error) {
//             toast.error("Logout failed");
//         }
//     };

//     const updateProfile = async (profileData) => {
//         try {
//             // const { data } = await axios.put("/api/auth/profile", profileData);
//             const { data } = await axios.put("/api/auth/update-profile", profileData);
//             {/* PUT /api/auth/profile → 404 — WHERE to fix */}
//             if (data.success) {
//                 setAuthUser(data.user);
//                 toast.success(data.message || "Profile updated successfully");
//             } else {
//                 toast.error(data.message || "Profile update failed");
//             }
//         } catch (error) {
//             toast.error(error.message || "Profile update failed");
//         }
//     };

//     const connectSocket = (userData) => {
//         if (!userData || socket?.connected) return;
        
//         const newSocket = io(backendUrl, {
//             query: {
//                 userId: userData._id
//             }
//         });
        
//         newSocket.on("connect", () => {
//             setSocket(newSocket);
//         });

//         newSocket.on("online-users", (users) => {
//             setOnlineUsers(users);
//         });

//         newSocket.on("disconnect", () => {
//             setSocket(null);
//         });
//     };

//     useEffect(() => {
//         if (token) {
//             axios.defaults.headers.common["token"] = token;
//             checkAuth();
//         }
//     }, [token]);

//     const value = {
//         authUser,
//         onlineUsers,
//         socket,
//         login,
//         logout,
//         updateProfile,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
/*Has issuess with logout/login state management {with comments explaining EXACTLY:
where checkAuth lives
why it runs once
why refresh behavior is now fixed}*/


//Full and final version below


import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("authToken")
  );

  // 🔑 VERY IMPORTANT
  // This tells app: "wait until auth is checked"
  const [authLoading, setAuthLoading] = useState(true);

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  /* ---------------- ATTACH TOKEN TO REQUESTS ---------------- */
  // axios.interceptors.request.use((config) => {
  //   const storedToken = localStorage.getItem("authToken");
  //   if (storedToken) {
  //     config.headers.token = storedToken;
  //   }
  //   return config;
  // });

  /*❗ Why this is bad
React re-renders → interceptor added AGAIN
After some actions → multiple interceptors fire
Headers get duplicated
Requests become unstable
Backend may reject → 500  
  */

useEffect(() => {
  const interceptor = axios.interceptors.request.use((config) => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      config.headers.token = storedToken;
    }
    return config;
  });

  return () => {
    axios.interceptors.request.eject(interceptor);
  };
}, []);


  /* ---------------- CHECK AUTH (RUNS ON APP LOAD) ---------------- */
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check-auth");

      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      setAuthUser(null);
    } finally {
      // ✅ auth check finished (success OR failure)
      setAuthLoading(false);
    }
  };

  /* ---------------- RUN ONCE WHEN APP STARTS ---------------- */
  useEffect(() => {
    checkAuth();
  }, []);

  /* ---------------- LOGIN ---------------- */
  const login = async (type, credentials) => {
    try {
      const { data } = await axios.post(
        `/api/auth/${type}`,
        credentials
      );

      if (data.success) {
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
        setAuthUser(data.user);
        connectSocket(data.user);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthUser(null);
    setToken(null);
    setOnlineUsers([]);

    if (socket) socket.disconnect();

    toast.success("Logged out successfully");
  };

  /* ---------------- UPDATE PROFILE ---------------- */
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put("/api/auth/update-profile", profileData);
      const data = res.data;
      if (data.success) {
        setAuthUser(data.user);
        toast.success(data.message || "Profile updated successfully");
      } else {
        toast.error(data.message || "Profile update failed");
      }
    } catch (error) {
      toast.error(error.message || "Profile update failed");
    }
  };

  /* ---------------- SOCKET ---------------- */
  const connectSocket = (user) => {
    if (!user || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: { userId: user._id },
    });

    setSocket(newSocket);

    newSocket.on("online-users", (users) => {
      setOnlineUsers(users);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        authLoading, // 🔑 exposed to App.jsx
        login,
        logout,
        onlineUsers,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
