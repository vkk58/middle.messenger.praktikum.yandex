import { chatAPI } from "../../api/ChatApi";

export default class CommonPageController {
  public async createChat() {
    let el: HTMLInputElement;
    let ret = false;
    el = document.getElementById("nameForNewChat") as HTMLInputElement;
    if (el.value != "") {
      try {
        const answer = await chatAPI.createChat(el.value as string);
        const fileInput = document.getElementById("avatar") as HTMLInputElement;

        // Проверяем файл только один раз
        debugger;
        const avatarFile = fileInput.files?.[0];
        if (avatarFile) {
          const formData = new FormData();
          const tst = answer.id.toString();
          formData.append("chatId", answer.id.toString());
          formData.append("avatar", avatarFile);

          try {
            const tst = await chatAPI.uploadChatAvatar(formData);
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
}
