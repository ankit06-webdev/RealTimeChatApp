import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FaUser } from "react-icons/fa";

// Initialize socket connection outside the component to prevent memory leaks
const socket = io("http://localhost:5000");

function App() {
  // --- STATE MANAGEMENT ---
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat history
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- INITIALIZATION ---
  useEffect(() => {
    const name = prompt("Enter your username to join the chat:");
    if (name) setUsername(name);
  }, []);

  // Fetch chat history from the backend database
  useEffect(() => {
    fetch("http://localhost:5000/api/messages/history")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error("Failed to fetch history:", err));
  }, []);

  // --- REAL-TIME LISTENERS ---
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    // Cleanup function
    return () => socket.off("receive_message", handleReceiveMessage);
  }, []);

  // --- ACTION HANDLERS ---
  const sendMessage = async () => {
    if (messageInput.trim() === "") return;

    const messageData = {
      sender: username || "Anonymous",
      message: messageInput,
    };

    try {
      // 1. Save to Database
      await fetch("http://localhost:5000/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });

      // 2. Broadcast via WebSockets
      socket.emit("send_message", messageData);

      // 3. Clear input
      setMessageInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // --- UI RENDERING ---
  return (
    // Main Container
    <div className="max-w-[600px] mx-auto mt-10 bg-[#efeae2] rounded-xl shadow-lg flex flex-col h-[80vh] font-sans overflow-hidden">

      {/* 1. APP HEADER */}
      <header className="bg-[#075e54] text-white py-4 px-5 flex justify-between items-center">
        <h2 className="m-0 text-xl font-semibold">Realtime Chat </h2>
        <span className=" flex justify-center items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
          <FaUser /> {username || "Guest"}
        </span>
      </header>

      {/* 2. CHAT HISTORY DISPLAY */}
      <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, index) => {
  const isMe = msg.sender === username;

  return (
    // Message Row Alignment
    <div
      key={index}
      className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
    >
      {/* Message Bubble (Timestamp ab iske andar aayega) */}
      <div
        className={`max-w-[70%] px-4 py-2 shadow-sm flex flex-col ${isMe
            ? "bg-[#dcf8c6] rounded-t-lg rounded-bl-lg rounded-br-none"
            : "bg-white rounded-t-lg rounded-br-lg rounded-bl-none"
          }`}
      >
        {/* Sender Name (Hidden for your own messages) */}
        {!isMe && (
          <div className="text-[11px] font-bold text-[#075e54] mb-1">
            {msg.sender}
          </div>
        )}
        
        {/* Message Text */}
        <div className="text-sm text-gray-800 break-words">
          {msg.message}
        </div>

        {/* Timestamp (Bubble ke andar, Right aligned) */}
        <div className="text-[10px] text-gray-500 text-right mt-1">
          {msg.createdAt 
            ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        </div>
      </div>
    </div>
  );
})}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. MESSAGE INPUT AREA */}
      <div className="flex p-4 bg-gray-100 gap-3">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          className="flex-1 px-4 py-3 rounded-full border-none outline-none text-[15px] shadow-sm focus:ring-2 focus:ring-[#00bfa5] transition-all"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2.5 bg-[#00bfa5] hover:bg-[#00a891] text-white rounded-full font-bold transition-colors shadow-sm"
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default App;