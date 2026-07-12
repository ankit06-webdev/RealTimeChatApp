# Real-Time Chat Application 

A full-stack real-time chat application built using the MERN stack and Socket.io. This project was developed as part of the Vedaz intern assignment.

**🌐 Live Demo (Frontend):** (https://real-time-chat-app-three-blond.vercel.app/)
**⚙️ Live API (Backend):** (https://realtimechatapp-63kq.onrender.com)

## 🚀 Features
- **Real-Time Messaging:** Instant message delivery without page refresh using Socket.io.
- **Persistent Chat History:** All messages are saved and fetched from a MongoDB database.
- **Timestamps:** Each message displays the exact time it was sent.
- **Auto-Scroll UX:** Chat box automatically scrolls to the latest message.
- **Responsive UI:** Clean, WhatsApp-style UI built with Tailwind CSS.
- **Dummy Authentication:** Username-based entry for testing multi-user interactions.

## 🛠️ Technology Stack
- **Frontend:** React (Vite), Tailwind CSS, Socket.io-client
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB Atlas (Mongoose)

---

## 💻 Project Setup Instructions

### Prerequisites
Make sure you have Node.js and Git installed on your system.

### 1. Steps to run the Backend
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
    ```bash
   npm install
   ```
3. Create a .env file in the backend root directory and add the required environment variables (see below).
4. Start the server:
   ```bash
   npm start
   ```
   (The server will run on http://localhost:5000)
   
### 1. Steps to run the Frontend
1. Open a new terminal and navigate to the frontend directory:
    ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   (The app will open on http://localhost:5173)

## 🔑 Environment Variables Required

To run this project locally, create a `.env` file in the **Backend** folder and add the following variables:

```env
PORT=5000
MONGO_URI=<YOUR_MONGODB_ATLAS_CONNECTION_STRING>
```
(Note: Replace <YOUR_MONGODB_ATLAS_CONNECTION_STRING> with your actual MongoDB connection string. Never commit your actual .env file to GitHub.)

## 🧠 Design Decisions
* **Vite over CRA:** Chose Vite for the React frontend for faster hot-module replacement (HMR) and optimized production builds.
* **Separation of Concerns:** Kept REST APIs for fetching history/saving messages, and strictly used WebSockets (Socket.io) for real-time broadcasting to keep the architecture clean.
* **Tailwind CSS:** Used utility-first CSS for rapid UI development and to keep the bundle size small without writing custom CSS files.
* **useRef for UX:** Implemented a dummy div with `useRef` at the bottom of the chat box to ensure smooth auto-scrolling when new messages arrive.

## 💡 Assumptions Made
* **Authentication:** As per the bonus requirements, full JWT auth was skipped in favor of a prompt-based username entry to quickly test real-time Socket communication.
* **Database:** Assumed MongoDB Atlas is the best fit over SQLite for real-time MERN stack applications due to its seamless JSON-like document integration with Node.js.
