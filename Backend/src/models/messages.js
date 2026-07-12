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
    status: {
      type: String,
      default: "sent", // By default message 'sent' (single tick) 
      enum: ["sent", "delivered", "read"] 
    }
},{timestamps: true});

export default mongoose.model("messages", messageSchema);