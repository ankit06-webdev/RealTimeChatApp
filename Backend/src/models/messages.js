import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

export default mongoose.model("messages", messageSchema);