import { chatAPI } from "../../api/ChatApi";
import WebSocketController from "../../framework/WebSocketController";

export default class CommonPageController {
  private socketController: WebSocketController | null = null;

  private _chatId: number = 0;

  get chatId(): number {
    return this._chatId;
  }

  set chatId(value: number) {
    this._chatId = value;
  }

  private _userId: number = 0;

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  private static instance: CommonPageController | null = null;

  public static getInstance(): CommonPageController {
    if (!CommonPageController.instance) {
      CommonPageController.instance = new CommonPageController();
    }
    return CommonPageController.instance;
  }

  public async createChat() {
    let ret = false;
    const el = document.getElementById("nameForNewChat") as HTMLInputElement;
    if (el.value != "") {
      try {
        const answer = await chatAPI.createChat(el.value);
        const fileInput = document.getElementById("avatar") as HTMLInputElement;

        const avatarFile = fileInput.files?.[0];
        if (avatarFile) {
          const formData = new FormData();
          formData.append("chatId", answer.id.toString());
          formData.append("avatar", avatarFile);

          try {
            await chatAPI.uploadChatAvatar(formData);
            ret = true;
          } catch (error) {
            console.log(error);
          }
        }
      } catch (e) {
        alert(e);
      }
    } else {
      alert("Название чата не может быть пустым");
    }

    return ret;
  }

  public async deleteChat() {
    const chatElement = document.querySelector(".selectedCurrentChat");
    if (chatElement) {
      const id = Number(chatElement.getAttribute("id"));

      if (id) {
        try {
          await chatAPI.deleteChat(id);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  public static clearDialogBeforeCreate() {
    const dialogContent = document.querySelector(".dialog-content");
    if (!dialogContent) return;

    const avatarInput = dialogContent.querySelector(
      "#avatar"
    ) as HTMLInputElement;
    if (avatarInput) {
      avatarInput.value = "";
    }

    const chatNameInput = dialogContent.querySelector(
      "#nameForNewChat"
    ) as HTMLInputElement;
    if (chatNameInput) {
      chatNameInput.value = "";
    }

    const avatarImage = dialogContent.querySelector(
      ".round-img"
    ) as HTMLImageElement;
    if (avatarImage) {
      avatarImage.src =
        "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig";
    }
  }

  public async initWebSocket(chatId: number): Promise<void> {
    this.closeWebSocket();

    this.chatId = chatId;

    try {
      const [tokenResponse, userResponse] = await Promise.all([
        chatAPI.getToken(chatId),
        this.userId === 0
          ? chatAPI.getuserInfo()
          : Promise.resolve({ id: this.userId }),
      ]);

      const token = tokenResponse.token;
      this.userId = userResponse.id;

      if (token && this.userId && chatId) {
        this.socketController = new WebSocketController(
          this.userId,
          chatId,
          token
        );
        await this.socketController.connect();
        this.socketController.getOldMessages(0);
      }
    } catch (error) {
      console.error("Ошибка инициализации WebSocket:", error);
      throw error;
    }
  }

  public sendMessage(message: string): void {
    if (this.socketController && this.chatId) {
      this.socketController.sendMessage(message);
    } else {
      console.error("WebSocket не инициализирован или чат не выбран");
    }
  }

  public addMessageListener(listener: (data: unknown) => void): void {
    if (this.socketController) {
      this.socketController.addMessageListener(listener);
    }
  }

  public closeWebSocket(): void {
    if (this.socketController) {
      this.socketController.close();
      this.socketController = null;
    }
    this.chatId = 0;
  }
}
