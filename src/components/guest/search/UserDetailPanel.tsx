import React, { useState } from "react";
import "./UserDetailPanel.css";

interface User {
  name: string;
  age: string;
  region: string;
  intro: string;
  image: string;
  availability: string;
  personality: string;
  maxPeople: number;
}

interface Props {
  user: User;
  isOffered: boolean;
  onClose: () => void;
  onSendOffer: (message: string) => void;
  onGoToChat: () => void;
}

const UserDetailPanel: React.FC<Props> = ({
  user,
  isOffered,
  onClose,
  onSendOffer,
  onGoToChat,
}) => {
  const [message, setMessage] = useState("");

  return (
    <div className="detail-overlay">
      <div className="detail-panel">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="detail-header">
          {user.image ? (
            <img src={user.image} alt={user.name} />
          ) : (
            <i className="material-icons">person</i>
          )}
          <h2>{user.name}</h2>
        </div>
        <div className="detail-info">
          <p>
            <strong>年齢:</strong> {user.age}歳
          </p>
          <p>
            <strong>地域:</strong> {user.region}
          </p>
          <p>
            <strong>自己紹介:</strong> {user.intro}
          </p>
          <p>
            <strong>空いてる曜日と時間:</strong> {user.availability}
          </p>
          <p>
            <strong>性格:</strong> {user.personality}
          </p>
          <p>
            <strong>参加人数:</strong> {user.maxPeople}人まで
          </p>
        </div>
        <div className="offer-area">
          {!isOffered ? (
            <>
              <textarea
                placeholder="オファーメッセージを入力"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="send-offer-btn"
                disabled={!message.trim()}
                onClick={() => onSendOffer(message)}
              >
                <i className="material-icons">send</i> オファー送信
              </button>
            </>
          ) : (
            <>
              <textarea value={message} disabled />
              <button className="send-offer-btn" onClick={onGoToChat}>
                <i className="material-icons">chat</i> チャットへ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPanel;

export {};
