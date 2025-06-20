const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = "XSS_SECRET"; // Secret key for JWT

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "XSSDEMO",
    password: "XSSAttack", // Add your MySQL password here
    database: "stored_xss",
});

db.connect((err) => {
    if (err) throw err;
    console.log("✅ Connected to MySQL Database");
});

// 🟢 USER SIGNUP API
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User registered successfully!" });
        }
    );
});

// 🟢 USER LOGIN API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(400).json({ message: "User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, username: user.username });
    });
});

// Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No token provided!" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized!" });
        req.user = decoded; // Store decoded user data
        next();
    });
};

// 🟢 VULNERABLE COMMENT POSTING (Stored XSS)
app.post("/add-comment", (req, res) => {
    const { username, comment } = req.body;

    if (!username || !comment.trim()) {
        return res.status(400).json({ error: "Username and comment cannot be empty" });
    }

    // 🚨 VULNERABLE TO XSS: No input sanitization!
    db.query("INSERT INTO comments (username, comment) VALUES (?, ?)", [username, comment], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Comment added successfully!" });
    });
});

// 🟢 FETCH COMMENTS (Will Execute XSS)
app.get("/comments", (req, res) => {
    db.query("SELECT username, comment FROM comments", (err, result) => {
        if (err) return res.status(500).json({ error: "Error fetching comments" });
        res.json(result);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
