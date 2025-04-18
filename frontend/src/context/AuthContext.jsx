import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("authUser"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const signup = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      throw new Error("User already exists. Please log in.");
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("authUser", JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = async ({ email, password }) => {
    try {

      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.data.success) {
        const authenticatedUser = response.data.user;

        localStorage.setItem("authUser", JSON.stringify(authenticatedUser));

        setUser(authenticatedUser);
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    window.location.reload();
  };

  const isAdmin = user?.email === "admin@shop.com";


  return (
    <AuthContext.Provider value={{ user,isAdmin, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);