import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ChatDetailPage.css";

interface Message {
  id: number;
  text: string;
  fromMe: boolean;
}

const ChatDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // sample message history; replace with real data
  const initialMessages: Message[] = [
    { id: 1, text: "こんにちは！", fromMe: false },
    { id: 2, text: "こんにちは、元気ですか？", fromMe: true },
    { id: 3, text: "はい、元気です。", fromMe: false },
  ];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      text: input.trim(),
      fromMe: true,
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="chat-detail">
      <header className="chat-detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &larr;
        </button>
        <h2 className="chat-title">User {id}</h2>
      </header>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.fromMe ? "message-row me" : "message-row other"}
          >
            {!msg.fromMe && <i className="material-icons avatar">person</i>}
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage} className="send-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDetailPage;
