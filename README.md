<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=39d353&height=120&section=header&text=Akash+Varta&fontSize=80&fontColor=ffffff&animation=fadeIn" width="100%" />

# 💬 Akash Varta

**A social chat room web application built to explore real-time communication, client-server architecture, and full-stack project structure.**

[![GitHub](https://img.shields.io/badge/GitHub-Source_Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SniperRavan/Akash-Varta)

</div>

---

## 📸 Preview

> **Add screenshots here.**  
> Suggested: login page, main chat room, mobile layout, message panel.

```text
[ Add screenshot: login page ]
[ Add screenshot: chat room / main interface ]
[ Add screenshot: mobile view ]
[ Add screenshot: message UI ]
```

---

## ✦ About

**Akash Varta** is a chat room web application built to explore how modern communication platforms work across both frontend and backend layers. The name combines **Akash** (my name) with **Varta**, a Bengali word associated with talking or conversation, which reflects the purpose of the project.

This project is part of my learning journey in building larger full-stack applications with separate client and server directories, interactive interfaces, and communication-focused workflows. The repository currently contains a `client/` folder, a `server/` folder, a `loginpage.jsx` file, and a `SECURITY.md` policy file, showing that it is structured as more than a simple static frontend. [page:1]

---

## 🛠️ Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/JSX-323330?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black" />
</p>

### Core
- **JavaScript** — primary language used across the project.  
- **JSX** — used for component-based UI work (`loginpage.jsx`).  
- **Client–Server Architecture** — project is separated into frontend and backend folders.  

### Frontend
- **Client-side Web Application** — handled inside the `client/` directory.  
- **Component-based UI structure** — indicated by JSX usage.  

### Backend
- **Server-side Application** — handled inside the `server/` directory.  

### Project Setup
- **Git & GitHub** — version control and source hosting.  
- **Security Policy** — included through `SECURITY.md`.  

Visible repository signals:
- Separate `client/` and `server/` directories. [page:1]
- `loginpage.jsx` present in the root. [page:1]
- `SECURITY.md` included. [page:1]
- Codebase is 99.2% JavaScript. [page:1]

> Add exact technologies here if used, such as React, Node.js, Express, Socket.IO, MongoDB, Firebase, or Supabase.

---

## ⚙️ Current Scope

This project is intended as a social chat application, with the repository publicly described as “Trying to make a social chat helping web app.” [page:1]

Depending on your implementation, this app may include or aim to include:
- User login / identity flow
- Chat room or conversation interface
- Real-time messaging
- User-to-user or room-based interaction
- Separated frontend and backend logic

> Only keep the features that are already implemented.

---

## 🧱 Architecture

The project is structured in a client/server format, which is a stronger layout than a single static-site repository. [page:1]

- **Client**: Handles UI rendering, page flow, user interaction, and chat interface.
- **Server**: Handles backend logic, communication flow, and data-related operations.
- **Login page**: A dedicated login-related component exists as `loginpage.jsx`. [page:1]
- **Security**: A `SECURITY.md` file is present, which is a good sign of project discipline. [page:1]

If WebSockets or Socket.IO are part of the implementation, this is the section where you should mention them explicitly.

---

## 📁 Project Structure

```text
Akash-Varta/
├── client/          # Frontend application
│   └── ...          # Components, pages, assets, and UI logic
├── server/          # Backend application
│   └── ...          # API, server logic, communication handling
├── .gitignore       # Git ignore rules
├── loginpage.jsx    # Login page component / UI work
├── README.md        # Project documentation
└── SECURITY.md      # Security policy
```

This reflects the top-level structure currently visible in the repository. [page:1]

> Replace the `...` lines with the actual nested folders once you map the full tree.

---

## 🚀 Getting Started

```bash
git clone https://github.com/SniperRavan/Akash-Varta.git
cd Akash-Varta
```

Because the project is split into `client` and `server`, each side will likely need to be installed and run separately. [page:1]

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd ../server
npm install
npm run dev
```

> Replace these commands if your actual package scripts are different.

---

## ✦ What I Learned

- How to work with a multi-folder full-stack project structure.
- How frontend and backend parts of a chat application connect conceptually.
- How communication-driven applications differ from static websites.
- How login flow and chat UI require more planning than single-page demos.
- How to organize JavaScript projects at a larger scale. [page:1]

---

## 📚 Learning Context

This project was built as part of learning how chat applications are structured and implemented.  
It also draws from tutorial-based learning around WebSocket/chat app development, which helped shape the project workflow.

If you want to make the README more transparent, add the exact tutorial here:
- Tutorial name
- Tutorial link
- What was followed directly
- What was modified independently

That makes the project look more honest, not less impressive.

---

## 🧭 Roadmap

- Improve authentication flow
- Build or polish real-time messaging
- Add chat rooms or conversation grouping
- Add online/offline user presence
- Improve responsiveness for smaller screens
- Add deployment instructions and live demo
- Document exact stack and environment variables

---

## 📬 Contact

<a href="https://linkedin.com/in/akash-das-dhibar-81983a2a1">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>
&nbsp;
<a href="https://github.com/sniperravan">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

<div align="center">
  <sub>Built by <a href="https://github.com/sniperravan">SniperRavan</a> — Akash + Varta, a conversation-driven project.</sub>
</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=39d353&height=80&section=footer" width="100%" />
