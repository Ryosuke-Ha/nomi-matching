import { Chat } from "../../domain/models/Chat";
import "../pages/ChatPage.css";

const formatDisplayTime = (createdAt: string) => {
  const d = new Date(createdAt);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return "Yesterday";
};

const ChatListItem = ({
  chat,
  onClick,
}: {
  chat: Chat;
  onClick: () => void;
}) => {
  const created =
    typeof chat.createdAt === "string"
      ? chat.createdAt
      : chat.createdAt.toDate().toISOString();

  return (
    <div className="chat-item" onClick={onClick}>
      <i className="material-icons avatar">person</i>
      <div className="content">
        <div className="info">
          <div className="name-time">
            <span className="name">{chat.friendName}</span>
            <span className="time">{formatDisplayTime(created)}</span>
          </div>
          <div className="last-message">
            <span className="message-text">{chat.lastMessage || ""}</span>
          </div>
        </div>
      </div>
      {!chat.isRead && <span className="new-badge">NEW</span>}
    </div>
  );
};

export default ChatListItem;
