import { IChat } from "../types";
import { BaseApi } from "./base-api";

class ChatAPI extends BaseApi {
  async getChatList() {
    return this.get<IChat[]>("/chats");
  }
  async createChat(title: string) {
    return this.post("/chats", { data: { title } });
  }
  async getuserInfo() {
    return this.get("/auth/user");
  }

  async auth(login: string, password: string) {
    return this.post("/auth/signin", { data: { login, password } });
  }

  async uploadChatAvatar(formData: FormData) {
    return this.put("/chats/avatar", { data: formData });
  }
}

export const chatAPI = new ChatAPI();
