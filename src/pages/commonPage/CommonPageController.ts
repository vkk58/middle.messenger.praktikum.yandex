import { chatAPI } from "../../api/ChatApi";

export default class CommonPageController {
  private _chatId: number = 0;
  get chatId(): number {
    return this._chatId;
  }
  set chatId(value: number) {
    this._chatId = value;
  }

  private static instance: CommonPageController | null = null;
  public static getInstance(): CommonPageController {
    if (!CommonPageController.instance) {
      CommonPageController.instance = new CommonPageController();
    }
    return CommonPageController.instance;
  }

  public async createChat() {
    let el: HTMLInputElement;
    let ret = false;
    el = document.getElementById("nameForNewChat") as HTMLInputElement;
    debugger;
    if (el.value != "") {
      try {
        const answer = await chatAPI.createChat(el.value as string);
        const fileInput = document.getElementById("avatar") as HTMLInputElement;

        // Проверяем файл только один раз
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
}
