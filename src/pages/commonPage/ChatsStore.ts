import { chatAPI } from "../../api/ChatApi";
import { IChat } from "../../types";

class ChatsStore {
  public chats: IChat[] = [];

  public async getChats() {
    this.chats = await chatAPI.getChatList();
  }
}

export const chatsStore = new ChatsStore();
