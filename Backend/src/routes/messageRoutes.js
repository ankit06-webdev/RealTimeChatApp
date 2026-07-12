import express from "express";
import messageController from "../controllers/messageController.js";

const router = express.Router();

router.get("/history", messageController.getMessages);
router.post("/send", messageController.sendMessage);

export default router;
