# 💬 Hush - Secure Real-Time Messaging

> Hush is a secure, real-time messaging application designed for private conversations with live user presence and an elegant dark interface.

## ✨ Key Features

Hush delivers a seamless and modern chat experience with a focus on speed, real-time updates, and security:

* **Real-Time Messaging:** Instant message delivery and receipt confirmation using **Socket.IO**.
* **Live User Presence:** See which contacts are currently online in real-time.
* **Optimistic UI:** Messages appear instantly on the sender's screen for a smooth experience, then reconcile with the server response.
* **Persistent Chat View:** The last selected chat and messages are preserved across page refreshes using local storage.
* **Authentication & Authorization:** Secure JWT-based authentication for user login, signup, and protected routes.
* **Profile Management:** Users can securely upload and update their profile pictures using **Cloudinary**.
* **Email Notifications:** Automated welcome email sent to new users using **Resend**.
* **Security Middleware:** Integration of **Arcjet** for crucial API rate limiting and bot detection.
* **Custom Dark Theme:** A clean, production-ready dark interface with a vibrant **Emerald Green** accent.

## 🛠️ Technology Stack

Hush is a full-stack application built with a modern MERN-like stack, utilizing powerful real-time technologies.

### Frontend
<div class="project-tech">
    <span class="tech-tag">React</span>
    <span class="tech-tag">Zustand (State Management)</span>
    <span class="tech-tag">Tailwind CSS & DaisyUI</span>
    <span class="tech-tag">Socket.IO Client</span>
    <span class="tech-tag">Axios</span>
</div>

### Backend
<div class="project-tech">
    <span class="tech-tag">Node.js & Express</span>
    <span class="tech-tag">MongoDB (via Mongoose)</span>
    <span class="tech-tag">Socket.IO</span>
    <span class="tech-tag">JWT & bcryptjs (Auth & Security)</span>
    <span class="tech-tag">Cloudinary (Image Storage)</span>
    <span class="tech-tag">Resend (Email Service)</span>
    <span class="tech-tag">Arcjet (Security/Rate Limiting)</span>
</div>

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js (version 20.0.0 or higher)
* MongoDB Instance (Local or Atlas)
* Cloudinary Account
* Resend Account (for email service)
* Arcjet Account (for security middleware)

### 1. Installation

Clone the repository and install dependencies for both the frontend and backend.

```bash
# Clone the repository
git clone [https://github.com/sumitgupta24/Hush.git](https://github.com/sumitgupta24/Hush.git)
cd Hush

# Install all dependencies (handled by root scripts)
npm install


# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT Secret for Auth Token Signing
JWT_SECRET=your_jwt_secret_key

# Cloudinary Credentials for Image Uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Resend Email Service Credentials
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM="email@example.com"
EMAIL_FROM_NAME="Hush Messenger"

# Arcjet Security
ARCJET_KEY=your_arcjet_project_key

# Client URL (use http://localhost:5173 or whatever your vite client runs on)
CLIENT_URL=http://localhost:3000 

# Port for the server
PORT=3000


# Start the backend server and MongoDB connection
npm start
# Server will run on PORT:3000

# In a new terminal, navigate to the frontend directory
cd frontend

# Start the frontend development server
npm run dev
# Frontend will typically run on http://localhost:5173