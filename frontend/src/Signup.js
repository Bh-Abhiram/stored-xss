import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css"; // ✅ Import the new CSS module

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/signup", { username, password });
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      alert("Signup failed!");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <h2>Sign Up</h2>
        <div className={styles.inputGroup}>
          <label>Username</label>
          <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className={styles.signupButton} onClick={handleSignup}>Create Account</button>
        <p className={styles.loginLink}>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Signup;
