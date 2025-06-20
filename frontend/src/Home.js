import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Home.module.css"; // ✅ Import CSS module

function Home() {
  const [currentTab, setCurrentTab] = useState("home");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/comments");
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (currentTab === "stored-xss") fetchComments();
  }, [currentTab]);

  const handleComment = async () => {
    if (!comment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add-comment", { username, comment });
      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className={styles.homeContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <h2>Stored XSS Demo</h2>
        <div className={styles.navLinks}>
          <button onClick={() => setCurrentTab("home")}>Home</button>
          <button onClick={() => setCurrentTab("stored-xss")}>Stored XSS</button>
          <button onClick={() => setCurrentTab("mitigation")}>Mitigation</button>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </nav>

      {/* Dynamic Content */}
      <div className={styles.content}>
        {/* Home Section */}
        {currentTab === "home" && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
            className={styles.homeSection}
          >
            <h3>🔍 Understanding XSS Attacks</h3>
            <p>Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages. This can steal user data, manipulate website content, or even take control of a user's session.</p>

            <h4>📌 Types of XSS Attacks:</h4>
            <ul className={styles.xssTypes}>
              <li><strong>Stored XSS:</strong> Malicious scripts are permanently stored in a database and executed when the victim loads the page.</li>
              <li><strong>Reflected XSS:</strong> Attacker injects scripts via URL parameters, which are immediately reflected on the page.</li>
              <li><strong>DOM-Based XSS:</strong> The attack is executed via JavaScript manipulating the webpage DOM.</li>
            </ul>

            <h4>⚠️ How XSS Works?</h4>
            <p>Attackers can inject JavaScript code into input fields, which gets executed when another user views the page.</p>
            <pre className={styles.codeSnippet}>
              {`<script>alert('Hacked!');</script>`}
            </pre>

            <h4>🔥 Example XSS Payloads:</h4>
            <ul className={styles.payloadList}>
              <li>{`<script>alert('XSS Attack!');</script>`}</li>
              <li>{`<img src=x onerror=alert('Hacked')>`}</li>
              <li>{`<iframe src="javascript:alert('Hacked!')"></iframe>`}</li>
            </ul>
          </motion.div>
        )}

        {/* Stored XSS Section */}
        {currentTab === "stored-xss" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className={styles.storedXssSection}
          >
            <h3>💥 Stored XSS Attack Example</h3>
            <p>This section demonstrates how a Stored XSS attack works by allowing users to post comments. If XSS protection is weak, malicious scripts can execute when another user views the comments.</p>

            {/* Comment Form */}
            <div className={styles.commentSection}>
              <h4>📝 Post a Comment</h4>
              <input type="text" placeholder="Your Name" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.inputField} />
              <textarea placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} className={styles.textareaField}></textarea>
              <button className={styles.postBtn} onClick={handleComment}>Post Comment</button>
            </div>

            {/* Comments Display */}
            <div className={styles.commentsContainer}>
              <h4>📢 User Comments</h4>
              {comments.map((c, index) => (
                <div className={styles.commentBox} key={index}>
                  <strong className={styles.commentUsername}>{c.username}:</strong>
                  <span dangerouslySetInnerHTML={{ __html: c.comment }} className={styles.commentText}></span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mitigation Section */}
        {currentTab === "mitigation" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className={styles.mitigationSection}
          >
            <h3>🛡️ XSS Prevention Techniques</h3>
            <p>Protect your website against XSS attacks with the following best practices:</p>
            <ul className={styles.mitigationList}>
              <li>✅ Use **Content Security Policy (CSP)** to prevent script execution.</li>
              <li>✅ **Sanitize & Escape** user input before rendering.</li>
              <li>✅ Use **HTTP-only Cookies** to protect session tokens.</li>
              <li>✅ **Validate input** on both client & server side.</li>
              <li>✅ Implement **WAF (Web Application Firewall)**.</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Home;
