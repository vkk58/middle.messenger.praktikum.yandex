import { ChatsStore } from "../pages/commonPage/ChatsStore";
import CommonPage from "../pages/commonPage/commonPage";
import PageRouter from "./PageRouter";

export default class WebSocketController {
  private socket: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private messageListeners: ((data: any) => void)[] = [];

  constructor(
    private userId: number,
    private chatId: number,
    private token: string
  ) {}

  public connect() {
    try {
      const wsUrl = `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`;
      this.socket = new WebSocket(wsUrl);
      this.socket.addEventListener("open", () => {
        console.log("WebSocket соединение установлено");
        setTimeout(() => this.getOldMessages(0), 100);
        this.startPing();
      });

      this.socket.addEventListener("message", (event) => {
        this.handleMessage(event.data);
      });

      this.socket.addEventListener("close", (event) => {
        console.log("WebSocket соединение закрыто", event);
        this.cleanup();
      });

      this.socket.addEventListener("error", (error) => {
        console.error("WebSocket ошибка:", error);
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public sendMessage(content: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content,
          type: "message",
        })
      );
    } else {
      console.error("WebSocket не готов к отправке");
    }
  }

  public getOldMessages(offset: number = 0) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: String(offset),
          type: "get old",
        })
      );
    }
  }

  public addMessageListener(listener: (data: any) => void): void {
    this.messageListeners.push(listener);
  }

  public removeMessageListener(listener: (data: any) => void): void {
    this.messageListeners = this.messageListeners.filter((l) => l !== listener);
  }

  public close(): void {
    if (this.socket) {
      this.socket.close();
    }
    this.cleanup();
  }

  private startPing(): void {
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: "ping" }));
      }
    }, 10000);
  }

  private cleanup(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    this.messageListeners = [];
  }

  private handleMessage(data: string): void {
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.type === "pong") {
        return;
      }
      if (parsedData.type === "user connected") {
        console.log(`Пользователь ${parsedData.content} подключился`);
        return;
      }
      if (Array.isArray(parsedData)) {
        const commonPage = PageRouter.getInstance().parmChangingPage();
        if (commonPage && typeof (commonPage as CommonPage)) {
          const chatStore = ChatsStore.getInstance();
          chatStore.clearMessages();
          (commonPage as CommonPage).updateMessages(parsedData);
        }
      }
      if (parsedData.type === "message") {
        const commonPage = PageRouter.getInstance().parmChangingPage();
        if (commonPage && typeof (commonPage as CommonPage)) {
          if (parsedData) {
            (commonPage as CommonPage).addMessage(parsedData);
          }
        }
      }
    } catch (error) {
      console.error("Ошибка парсинга сообщения:", error, data);
    }
  }
}
