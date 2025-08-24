
import HTTPTransport from '../framework/HTTPTransport';


  class ChatAPI extends HTTPTransport {
    async getChatList() {
      return this.get('/chats');
    }
    async createChat(title: string) {
      return this.post('/chats', {data: {title}}); 
    }
    async getuserInfo() {
      return this.get("/auth/user");
    }
  }

  export const chatAPI = new ChatAPI();