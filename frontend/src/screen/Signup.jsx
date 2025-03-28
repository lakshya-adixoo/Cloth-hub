import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    const payload = { email, password }; 

  
    try {
      
      const response = await axios.post('http://localhost:3000/signup', payload);
  

  
      if (response.data.success) {
        signup({ email, password }); 
        alert("Signup successful!");
        navigate("/login"); 
      } else {
        alert(response.data.message || "Signup failed");
      }
    } catch (error) {
      
      console.error("Error occurred during signup:", error);
      alert(`Error: ${error.response?.data?.msg || error.message}`);
    }
  
    setEmail('');
    setPassword('');
    
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
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
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
}
