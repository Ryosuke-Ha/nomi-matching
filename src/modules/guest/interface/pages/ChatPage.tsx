import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatPage.css";
import { Chat } from "../../domain/models/Chat";
import { ChatRepositoryFirebase } from "../../infrastructure/firebase/ChatRepositoryFirebase";
import { GetUserChatsUseCase } from "../../application/usecases/GetUserChatsUseCase";
import ChatListItem from "../components/ChatListItem";

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const uid = sessionStorage.getItem("uid")!;
  const navigate = useNavigate();

  useEffect(() => {
    const repo = new ChatRepositoryFirebase();
    const useCase = new GetUserChatsUseCase(repo);
    const unsubscribe = useCase.execute(uid, setChats);
    return () => unsubscribe();
  }, [uid]);

  return (
    <div className="chat-history">
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          onClick={() => navigate(`/chat/${chat.id}`)}
        />
      ))}
    </div>
  );
};

export default ChatPage;
