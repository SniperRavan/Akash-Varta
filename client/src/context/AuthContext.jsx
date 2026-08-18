import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [authLoading, setAuthLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Attach token interceptor cleanly
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers.token = storedToken;
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  // Connect socket
  const connectSocket = (user) => {
    if (!user?._id) return;
    if (socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: { userId: user._id },
    });

    newSocket.on("online-users", (users) => {
      setOnlineUsers(users || []);
    });

    setSocket(newSocket);
  };

  // Check auth status on app start
  const checkAuth = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setAuthUser(null);
      setAuthLoading(false);
      return;
    }

    try {
      const { data } = await axios.get("/api/auth/check-auth", {
        headers: {
          token: storedToken,
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (data.success && data.user) {
        setAuthUser(data.user);
        connectSocket(data.user);
      } else {
        setAuthUser(null);
        localStorage.removeItem("authToken");
        setToken(null);
      }
    } catch (error) {
      console.warn("Auth check failed:", error.message);
      setAuthUser(null);
      localStorage.removeItem("authToken");
      setToken(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Login / Signup method
  const login = async (type, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${type}`, credentials);

      if (data.success && data.token) {
        const userObj = data.user || data.userData;
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
        setAuthUser(userObj);
        connectSocket(userObj);
        toast.success(data.message || "Welcome!");
        return true;
      } else {
        toast.error(data.message || "Authentication failed");
        return false;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Authentication failed";
      toast.error(msg);
      return false;
    }
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthUser(null);
    setToken(null);
    setOnlineUsers([]);

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    toast.success("Logged out successfully");
  };

  // Update profile method
  const updateProfile = async (profileData) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", profileData);

      if (data.success) {
        const updated = data.user || data.userData;
        setAuthUser(updated);
        toast.success(data.message || "Profile updated successfully");
        return true;
      } else {
        toast.error(data.message || "Profile update failed");
        return false;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Profile update failed";
      toast.error(msg);
      return false;
    }
  };

  const value = {
    authUser,
    authLoading,
    token,
    socket,
    axios,
    onlineUsers,
    login,
    logout,
    updateProfile,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

