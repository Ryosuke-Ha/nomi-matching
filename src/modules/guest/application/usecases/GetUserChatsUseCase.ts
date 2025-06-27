import { ChatRepository } from "../../domain/repositories/ChatRepository";
import { Chat } from "../../domain/models/Chat";

export class GetUserChatsUseCase {
  constructor(private repo: ChatRepository) {}

  execute(uid: string, onUpdate: (chats: Chat[]) => void): () => void {
    return this.repo.subscribeToUserChats(uid, onUpdate);
  }
}
