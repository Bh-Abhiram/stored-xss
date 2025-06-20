import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to the Stored-XSS Attack Demonstration</h1>
      <p>This demonstration showcases how stored XSS vulnerabilities work.</p>
      <Link to="/signup" className="btn">Get Started</Link>
    </div>
  );
};

export default Welcome;
