import express from "express";
import cors from "cors";
import http from "http";
import { Server } from 'socket.io';
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
import messageRoutes from "./src/routes/messageRoutes.js";


dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

connectDB();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Realtime Chat App");
});

io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);
    socket.on("send_message", (data) => {
        console.log(`Message sent by ${socket.id}`);
        io.emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        console.log(`User Disconnected ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
