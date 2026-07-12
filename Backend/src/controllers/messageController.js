import Message from "../models/messages.js";

const getMessages = async (req, res) => {
    try{
        const messages = await Message.find().sort({ createdAt: 1 });
        res.json(messages);
    }
    catch(err){
        res.status(500).json(err);
    }
};

const sendMessage = async (req, res) => {
    try{
        const { message, sender } = req.body;
        const newMessage = new Message({ message, sender });
        await newMessage.save();
        res.json(newMessage);
    }
    catch(err){
        res.status(500).json(err);
    }
};

export default {
    getMessages,
    sendMessage
};