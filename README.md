# 🎓 EduMate – Online Course Management System

**EduMate** is a full-stack **online course management platform** that allows students to browse and enroll in educational courses, and instructors to manage and publish course content. Built using **React.js** for the frontend and **Node.js/Express.js** for the backend, this system simulates a real-world LMS (Learning Management System).

> 🚀 Developed as part of the CDAC Training Project (2025)

---

## 📌 Key Features

- 📚 Browse and view detailed course content
- 🧑‍🎓 Student enrollment with real-time validation
- 🧑‍🏫 Instructor-side course creation and updates
- 🔐 User authentication and session handling
- 🔄 Seamless integration between frontend and backend
- 💡 Modular folder structure for scalability

---

## 🛠️ Tech Stack

| Frontend            | Backend             | Styling        | Utilities / Tools   |
|---------------------|----------------------|----------------|----------------------|
| React.js (Vite)     | Node.js + Express.js | CSS / Tailwind (if used) | Axios, Postman        |
| TypeScript (optional) | RESTful APIs        | React Router   | .env, GitHub, Vite    |

---

## 📂 Folder Structure

EduMate/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js / main.jsx
│ ├── public/
│ └── package.json
│
├── server/ # Node.js backend
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ ├── server.js
│ └── package.json
│
├── .env.sample
├── README.md
└── .gitignore


---

## 🚀 Getting Started

### 1️⃣ Prerequisites

Ensure **Node.js** and **npm** are installed globally.

---

### 2️⃣ Backend Setup

```bash
cd EduMate/server
npm install
node server.js
The backend will run at http://localhost:5000 (or your configured port).

3️⃣ Frontend Setup
bash
Copy
Edit
cd EduMate/client
npm install
npm run dev
The frontend will run at http://localhost:3000 or 5173 based on your Vite configuration.

🔐 Environment Configuration
Duplicate .env.sample as .env and update variables as needed:

env
Copy
Edit
PORT=5000
DATABASE_URI=mongodb://localhost:27017/edumate
JWT_SECRET=your_jwt_secret
💡 Integrate MongoDB if not already configured.

🧪 How It Works
The React frontend makes API calls to the Express backend to fetch or modify course and enrollment data.

The backend handles routing, business logic, and interactions with a database (MongoDB or another if integrated).

Student and instructor workflows are isolated via roles and authentication layers.

📸 Screenshots (Add Once UI Finalized)
Homepage	Course Details	Enrollment Flow

📈 Future Enhancements
 MongoDB integration for persistent storage

 Role-based dashboard (Instructor vs. Student)

 Profile management and progress tracking

 Payment gateway for paid courses

 Course rating and reviews

👨‍💻 Contributors
Mohammed Azam — Full Stack Developer
🔗 Portfolio | LinkedIn

EdumateCdac — Collaborator

⭐ Feedback & Support
If you found this project helpful or inspiring:

🌟 Star this repo

🐛 Report issues

📬 Contact via LinkedIn or email

"Empowering education through clean, scalable software."
