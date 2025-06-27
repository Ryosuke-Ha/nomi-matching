import { Chat } from "../../domain/models/Chat";
import { ChatRepository } from "../../domain/repositories/ChatRepository";
import { db } from "../../../../shared/config/firebaseConfig";

type Message = {
  senderUid: string;
  text: string;
  timestamp: string;
  isRead: boolean;
};

export class ChatRepositoryFirebase implements ChatRepository {
  subscribeToUserChats(
    uid: string,
    onUpdate: (chats: Chat[]) => void
  ): () => void {
    let guestChats: Chat[] = [];
    let friendChats: Chat[] = [];

    const updateMerged = () => {
      const all = [...guestChats, ...friendChats];
      const map = new Map<string, Chat>();
      all.forEach((c) => map.set(c.id, c));
      const sorted = Array.from(map.values()).sort((a, b) => {
        const toTimestamp = (c: Chat) =>
          typeof c.createdAt === "string"
            ? new Date(c.createdAt).getTime()
            : c.createdAt?.toDate?.()?.getTime?.() ?? 0;

        return toTimestamp(b) - toTimestamp(a);
      });

      onUpdate(sorted);
    };

    const getUserName = async (uid: string): Promise<string> => {
      const doc = await db.collection("userProfiles").doc(uid).get();
      if (!doc.exists) return "Unknown";
      return (doc.data() as any).name;
    };

    const unsubGuest = db
      .collection("chats")
      .where("guestUid", "==", uid)
      .orderBy("createdAt", "desc")
      .onSnapshot(async (snapshot) => {
        const chatPromises = snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const chatId = doc.id;
          const friendUid = data.friendUid;

          const messages = Object.values(data.messages || {}) as Message[];
          const lastMessage = messages.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )[0];

          const friendName = await getUserName(friendUid);

          return {
            id: chatId,
            guestUid: uid,
            friendUid,
            friendName,
            lastMessage: lastMessage?.text,
            isRead: lastMessage?.isRead,
            createdAt: lastMessage?.timestamp || data.createdAt,
          } as Chat;
        });

        guestChats = await Promise.all(chatPromises);
        updateMerged();
      });

    const unsubFriend = db
      .collection("chats")
      .where("friendUid", "==", uid)
      .orderBy("createdAt", "desc")
      .onSnapshot(async (snapshot) => {
        const chatPromises = snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const chatId = doc.id;
          const friendUid = data.guestUid;

          const messages = Object.values(data.messages || {}) as Message[];
          const lastMessage = messages.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )[0];

          const friendName = await getUserName(friendUid);

          return {
            id: chatId,
            guestUid: friendUid,
            friendUid: uid,
            friendName,
            lastMessage: lastMessage?.text,
            isRead: lastMessage?.isRead,
            createdAt: lastMessage?.timestamp || data.createdAt,
          } as Chat;
        });

        friendChats = await Promise.all(chatPromises);
        updateMerged();
      });

    return () => {
      unsubGuest();
      unsubFriend();
    };
  }
}
