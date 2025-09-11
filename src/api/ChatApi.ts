import HTTPTransport from '../framework/HTTPTransport';
import { IChat } from '../types';

class ChatAPI extends HTTPTransport {
  async getChatList() {
    return this.get<IChat[]>('/chats');
  }

  async createChat(title: string) {
    return this.post('/chats', { data: { title } });
  }

  async getuserInfo() {
    return this.get('/auth/user');
  }

  async auth(login: string, password: string) {
    return this.post('/auth/signin', { data: { login, password } });
  }

  async uploadChatAvatar(formData: FormData) {
    return this.put('/chats/avatar', { data: formData });
  }

  async deleteChat(chatId: number) {
    return this.delete('/chats', { data: { chatId } });
  }

  async getToken(chatId: number) {
    return this.post(`/chats/token/${chatId}`);
  }

  async getUserList(login: string) {
    return this.post('/user/search', { data: { login } });
  }

  async addUserToChat(userId: number[], chatId: number) {
    return this.put('/chats/users', { data: { users: userId, chatId } });
  }

  async deleteUserFromChat(userId: number[], chatId: number) {
    return this.delete('/chats/users', { data: { users: userId, chatId } });
  }

  async getChatUsers(chatId: number) {
    return this.get(`/chats/${chatId}/users`);
  }
}

export const chatAPI = new ChatAPI();
