import { Chat } from "../models/Chat";

export interface ChatRepository {
  subscribeToUserChats(
    uid: string,
    onUpdate: (chats: Chat[]) => void
  ): () => void;
}
