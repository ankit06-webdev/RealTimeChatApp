import express from "express";
import cors from "cors";
import http from "http";
import { Server } from 'socket.io';
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import Message from "./src/models/messages.js";
import messageRoutes from "./src/routes/messageRoutes.js";


dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Realtime Chat App");
});



let onlineUsers = 0;

io.on("connection", (socket) => {

    onlineUsers++;

    io.emit("online_users", onlineUsers);

    console.log(`User Connected ${socket.id}`);

    socket.on("send_message", (data) => {
        console.log(`Message sent by ${socket.id}`);
        io.emit("receive_message", data);
    });

    socket.on("typing", (username) => {
        socket.broadcast.emit("user_typing", username);
    });

    socket.on("stop_typing", () => {
        socket.broadcast.emit("user_stopped_typing");
    });

    socket.on("disconnect", () => {
        onlineUsers--;
        io.emit("online_users", onlineUsers);
        console.log(`User Disconnected ${socket.id}`);
    });
});





server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});