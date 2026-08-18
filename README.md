<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=7c3aed&height=140&section=header&text=Akash+Varta&fontSize=80&fontColor=ffffff&animation=fadeIn" width="100%" />

# 💬 Akash Varta (QuickChat)

**A high-performance, real-time messaging platform built with React, Node.js, Express, Socket.IO, and MongoDB.**

[![GitHub](https://img.shields.io/badge/GitHub-Source_Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SniperRavan/Akash-Varta)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## ✦ Features

- ⚡ **Real-Time 1-on-1 Messaging**: Instant bi-directional messaging powered by Socket.IO WebSockets.
- 🟢 **Live Online/Offline Presence**: Real-time user presence tracking with automatic multi-tab connection handling.
- 📬 **Unread Message Badges**: Aggregated unread counter per contact with instant clearing upon opening.
- 👁️ **Live Read Receipts (WhatsApp-style Double Ticks)**: Real-time `messagesSeen` events updating delivery ticks from grey to blue.
- 🖼️ **Image & Media Sharing**: Upload and share images with cloud hosting via Cloudinary.
- 👤 **Profile Customization**: Update profile photo (Cloudinary), display name, and bio.
- 🚀 **1-Click Demo Accounts**: Instant demo logins for quick evaluation without manual signup.
- 🛡️ **JWT Authentication**: Secure Bearer token authentication with password hashing via Bcrypt.

---

## 🛠️ Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

---

## 📁 Project Structure

```text
Akash-Varta/
├── client/                     # Frontend application (Vite + React 19)
│   ├── src/
│   │   ├── assets/             # Vector icons, avatars, and assets
│   │   ├── components/         # ChatContainer, Sidebar, RightSidebar
│   │   ├── context/            # AuthContext, ChatContext
│   │   ├── lib/                # Utility helpers & time formatters
│   │   ├── pages/              # HomePage, LoginPage, SignupPage, ProfilePage
│   │   ├── App.jsx             # Main router & theme provider
│   │   └── main.jsx            # React root
│   └── package.json
├── server/                     # Backend API & WebSocket server
│   ├── controllers/            # userController, messageController
│   ├── lib/                    # db.js, cloudinary.js, utils.js, models
│   ├── middleware/             # auth.js (JWT protectRoute)
│   ├── routes/                 # userRoutes.js, messageRoutes.js
│   ├── server.js               # Express app + Socket.IO server
│   └── package.json
├── README.md                   # Project documentation
├── SECURITY.md                 # Security policy
└── LICENSE                     # MIT License
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/SniperRavan/Akash-Varta.git
cd Akash-Varta
```

### 2. Configure Environment Variables

**Server (`server/.env`):**
```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chat-app
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Client (`client/.env`):**
```env
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Start Backend Server
```bash
cd server
npm install
npm run dev
```

### 4. Start Frontend Client
```bash
cd ../client
npm install
npm run dev
```

---

## 👥 Demo Accounts

| Name | Email | Password |
|---|---|---|
| Alex Mercer | `alex@example.com` | `password123` |
| Caroline Gray | `caroline@example.com` | `password123` |
| Presley Martin | `martin@example.com` | `password123` |
| John Johnson | `john@example.com` | `password123` |

---

## 📬 Contact & Author

<a href="https://linkedin.com/in/akash-das-dhibar-81983a2a1">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>
&nbsp;
<a href="https://github.com/sniperravan">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

<div align="center">
  <sub>Built by <a href="https://github.com/sniperravan">SniperRavan</a></sub>
</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=7c3aed&height=80&section=footer" width="100%" />

