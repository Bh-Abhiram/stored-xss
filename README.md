🧪 Project Flow – Stored XSS Attack (Credential Theft)
This project demonstrates a Stored XSS attack that targets a vulnerable comment section to steal user credentials through social engineering and a fake login form.

🔁 Attack Flow:
Reconnaissance:
The attacker explores the web application and identifies a comment section that is vulnerable to stored XSS (i.e., it stores and reflects unsanitized user input in the frontend).

Fake Server Setup:
The attacker creates a fake server running in the background (e.g., using a Python Flask/Node.js app) designed to receive and save stolen credentials into a file named stolen_credentials.txt.

Fake Login Form Creation:
The attacker clones the real platform’s login form (same look and feel) to use inside a malicious <script> that will render this fake login UI.

XSS Payload Injection:
The attacker posts a comment that includes a malicious script displaying a phishing message like:

"🎉 Get Diwali + Christmas discounts! Click the button below to auto-apply coupons!"

Clicking the button executes JavaScript that displays the fake login form.

Phishing in Action:
When legitimate users view the comment section:

They see the attractive discount offer and click the fake button.

The fake login form appears, identical to the real one.

Thinking it's legitimate, users enter their credentials.

Credential Theft:
On form submission:

The credentials (username and password) are silently sent to the attacker’s server.

The data is stored in stolen_credentials.txt.

Post-Exploitation:
The attacker now has valid user credentials and can:

Log in as the victim.

Perform unauthorized actions.

Bypass access controls, impersonate users, or extract sensitive data.
