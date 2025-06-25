import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";
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

interface Chat {
  id: string;
  guestUid: string;
  friendUid: string;
  offerId?: string;
  createdAt: { toDate: () => Date } | string;
  lastMessage?: string;
  isRead: boolean;
  friendName: string;
}

type Message = {
  senderUid: string;
  text: string;
  timestamp: string;
  isRead: boolean;
};

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    // TODO : refactor
    const uid = sessionStorage.getItem("uid");
    let guestChats: Chat[] = [];
    let friendChats: Chat[] = [];

    const updateMerged = () => {
      const all = [...guestChats, ...friendChats];
      const map = new Map<string, Chat>();
      all.forEach((c) => map.set(c.id, c));
      const sorted = Array.from(map.values()).sort((a, b) => {
        const getTimestamp = (createdAt: Chat["createdAt"]) => {
          if (typeof createdAt === "string") {
            return new Date(createdAt).getTime();
          } else if (createdAt && typeof createdAt.toDate === "function") {
            return createdAt.toDate().getTime();
          }
          return 0;
        };
        const aTime = getTimestamp(a.createdAt);
        const bTime = getTimestamp(b.createdAt);
        return bTime - aTime; // 降順：新しい順
      });

      setChats(sorted);
    };

    const getUserName = async (uid: string): Promise<string> => {
      const doc = await db.collection("userProfiles").doc(uid).get();
      if (doc.exists) {
        const data = doc.data() as any;
        return data.name;
      } else {
        throw new Error("User not found");
      }
    };

    let unsubGuest: () => void = () => {};
    let unsubFriend: () => void = () => {};

    unsubGuest = db
      .collection("chats")
      .where("guestUid", "==", uid)
      .orderBy("createdAt", "desc")
      .onSnapshot(async (snapshot) => {
        const chatPromises = snapshot.docs.map(async (doc) => {
          const chatId = doc.id;
          const friendUid = doc.data().friendUid;
          const chatData = doc.data();

          const messageArray = chatData.messages
            ? (Object.values(chatData.messages) as Message[])
            : [];

          const lastMessage =
            messageArray.length > 0
              ? messageArray.sort(
                  (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
                )[0]
              : null;

          const friendName = await getUserName(friendUid);

          return {
            id: chatId,
            guestUid: uid,
            friendUid: friendUid,
            createdAt: lastMessage?.timestamp,
            isRead: lastMessage?.isRead,
            lastMessage: lastMessage?.text,
            friendName: friendName,
            ...chatData,
          } as Chat;
        });

        guestChats = await Promise.all(chatPromises);
        updateMerged();
      });

    unsubFriend = db
      .collection("chats")
      .where("friendUid", "==", uid)
      .orderBy("createdAt", "desc")
      .onSnapshot(async (snapshot) => {
        const chatPromises = snapshot.docs.map(async (doc) => {
          const chatId = doc.id;
          const friendUid = doc.data().guestUid;
          const chatData = doc.data();

          const messageArray = chatData.messages
            ? (Object.values(chatData.messages) as Message[])
            : [];

          const lastMessage =
            messageArray.length > 0
              ? messageArray.sort(
                  (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
                )[0]
              : null;

          const friendName = await getUserName(friendUid);

          return {
            id: chatId,
            guestUid: uid,
            friendUid: friendUid,
            createdAt: lastMessage?.timestamp,
            isRead: lastMessage?.isRead,
            lastMessage: lastMessage?.text,
            friendName: friendName,
            ...chatData,
          } as Chat;
        });

        friendChats = await Promise.all(chatPromises);
        updateMerged();
      });

    // cleanup both auth and firestore listeners
    return () => {
      unsubGuest();
      unsubFriend();
    };
  }, []);

  return (
    <div className="chat-history">
      {chats.map((chat) => {
        const created =
          typeof chat.createdAt === "string"
            ? chat.createdAt
            : chat.createdAt.toDate().toISOString();
        return (
          <Link
            key={chat.id}
            to={`/chat/${chat.id}`}
            className="chat-item-link"
          >
            <div className="chat-item">
              <i className="material-icons avatar">person</i>
              <div className="content">
                <div className="info">
                  <div className="name-time">
                    <span className="name">{chat.friendName}</span>
                    <span className="time">{formatDisplayTime(created)}</span>
                  </div>
                  <div className="last-message">
                    <span className="message-text">
                      {chat.lastMessage || ""}
                    </span>
                  </div>
                </div>
              </div>
              {!chat.isRead && <span className="new-badge">NEW</span>}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ChatPage;
