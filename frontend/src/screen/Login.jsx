import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; // HTTP requests

export default function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [isLoading, setIsLoading] = useState(false); // State for button loading

  const { login } = useAuth(); // Destructure login method from context
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Start loading when the request is initiated

    try {

      const payload = { email, password }; // Prepare request payload

      // Send POST request to the /login endpoint
      const response = await axios.post("http://localhost:3000/login", payload);


      // If the login is successful
      if (response.data.success) {
        login({ email, password }); // Call the login function to update user context
        alert("Login successful!"); // Notify the user
        navigate("/"); // Redirect to the homepage
      } else {
        console.error("Login failed:", response.data.message);
        alert(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false); // Stop loading after the request is completed
    }

    // Reset the input fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
