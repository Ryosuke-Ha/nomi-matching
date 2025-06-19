import React from "react";
import { Link } from "react-router-dom";
import "./ChatPage.css";

// helper to format display time
const formatDisplayTime = (createdAt: string) => {
  const d = new Date(createdAt);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return "Yesterday";
};

const ChatPage: React.FC = () => {
  // sample data; replace with real data source
  const chats = [
    {
      id: 1,
      name: "Alice",
      createdAt: "2025-06-19 10:30",
      lastMessage: "こんにちは！",
      unread: true,
    },
    {
      id: 2,
      name: "Bob",
      createdAt: "2025-06-19 09:45",
      lastMessage: "よろしくお願いします。",
      unread: false,
    },
    {
      id: 3,
      name: "Charlie",
      createdAt: "2025-06-18 18:20",
      lastMessage: "昨日の件、確認しました。",
      unread: true,
    },
  ];

  return (
    <div className="chat-history">
      {chats.map((chat) => (
        <Link key={chat.id} to={`/chat/${chat.id}`} className="chat-item-link">
          <div className="chat-item">
            <i className="material-icons avatar">person</i>
            <div className="content">
              <div className="info">
                <div className="name-time">
                  <span className="name">{chat.name}</span>
                  <span className="time">
                    {formatDisplayTime(chat.createdAt)}
                  </span>
                </div>
                <div className="last-message">
                  <span className="message-text">{chat.lastMessage}</span>
                </div>
              </div>
            </div>
            {chat.unread && <span className="new-badge">NEW</span>}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatPage;
