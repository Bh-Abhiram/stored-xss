import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // ✅ Import the new CSS module

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <label>Username</label>
          <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className={styles.loginButton} onClick={handleLogin}>Login</button>
        <p className={styles.signupLink}>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
}

export default Login;
