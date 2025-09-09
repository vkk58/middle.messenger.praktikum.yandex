import { InputWithLabel } from "../../components/InputWithLabel";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { LinkList } from "../../components/LinkList";
import { Label } from "../../components/Label";
import Block from "../../framework/Block";
import { ListElement } from "../../components/ListElement";
import PageRouter from "../../framework/PageRouter";
import ValidateCommonPage from "./validate";
import PageValidator from "../../framework/validate/PageValidator";
import { ChatsList } from "../../components/ChatsList";
import { MessageContainer } from "../../components/MessageContainer";
import { TextMessage } from "../../components/TextMessage";
import { chatAPI } from "../../api/ChatApi";
import { Dialog } from "../../components/Dialog";
import { URLRESOURCES } from "../../api/base-api";
import CommonPageController from "./CommonPageController";
import WebSocketController from "../../framework/WebSocketController";
import { ChatsStore } from "./ChatsStore";

export default class CommonPage extends Block {
  private ChatsListComponent: ChatsList;
  private MessageContainerComponent: MessageContainer;
  private messages: any;
  private socketController: WebSocketController | null = null;
  private updateInterval: NodeJS.Timeout | null = null;
  private updateInterval4Message: NodeJS.Timeout | null = null;
  private updateCounter: number = 0;
  private DialogCreator: Dialog;
  constructor() {
    const validateInput = new ValidateCommonPage();
    const router = PageRouter.getInstance();
    const ChatsListComponent = new ChatsList({ chats: [] });
    const MessageContainerComponent = new MessageContainer({ chatStock: [] });
    const DialogCreator = new Dialog({ class: "dialog-hidden" });
    const ButtonSendMessage = new Button({
      text: "Отправить",
      id: "sendMessage",
      class: "mini-button",
      type: "button",
      events: {
        click: () => {
          validateInput.initButton("sendMessage");
          if (validateInput.validateInput()) {
            this.handleSendMessage();
            this.updateChats();
          }
        },
      },
    });
    super({
      children: {
        LinkList: new LinkList(),
        LinkProfile: new Link({
          href: "#",
          datapage: "profilePage",
          text: "Профиль >",
          class: "footer-link profileLink",
        }),
        InputWithLabelSearch: new InputWithLabel({
          text: "Поиск",
          name: "search",
          type: "text",
          class: "input",
          currentPage: "commonPage",
        }),
        ButtonCreateChat: new Button({
          text: "Создать чат",
          id: "createChat",
          class: "mini-button",
          type: "button",
          events: {
            click: () => {
              CommonPageController.clearDialogBeforeCreate();
              this.DialogCreator.show();
            },
          },
        }),
        ButtonDeleteChat: new Button({
          text: "Удалить чат",
          id: "deleteChat",
          class: "mini-button",
          type: "button",
          events: {
            click: async () => {
              const commonPageController = CommonPageController.getInstance();
              if (commonPageController) {
                await commonPageController.deleteChat();
                this.updateChats();
              }
            },
          },
        }),
        LabelForMessage: new Label({
          text: "Отправка сообщения",
          for: "message",
        }),
        InputMessage: new Input({
          id: "message",
          type: "text",
          class: "input",
          name: "message",
          placeholder: "Сообщение...",
          value: "",
          events: {
            blur: () => {
              PageValidator.validate("commonPage", "message");
            },
          },
        }),
        ButtonSendMessage,
        ChatsListComponent,
        MessageContainerComponent,
        DialogCreator,
      },
    });

    this.ChatsListComponent = ChatsListComponent;
    this.startChatUpdates();

    this.MessageContainerComponent = MessageContainerComponent;

    this.DialogCreator = DialogCreator;
  }

  /**СПИСОК ЧАТОВ НАЧАЛО---------------> */
  private startChatUpdates(): void {
    this.updateChats();

    this.updateInterval = setInterval(() => {
      this.updateChats();
    }, 10000);
  }

  private stopChatUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  public async updateChats() {
    this.updateCounter++;
    const chatList = await chatAPI.getChatList();
    const ret = chatList.map((chat) => {
      return new ListElement({
        image:
          chat.avatar == null
            ? "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig"
            : URLRESOURCES + chat.avatar,
        class: "miniImg",
        alt: `Аватар`,
        text: chat.last_message?.content
          ? chat.last_message.content
          : "Сообщений не было",
        classSecond: "contactTextMessageType",
        captionText: chat.title,
        id: chat.id.toString(),
        classSelectedChat:
          chat.id == CommonPageController.getInstance().chatId
            ? "selectedCurrentChat"
            : "",
      });
    });

    this.ChatsListComponent.updateChats(ret);
  }

  public componentWillUnmount(): void {
    this.stopChatUpdates();
    const controller = CommonPageController.getInstance();
    controller.closeWebSocket();
  }
  /**<--------------- СПИСОК ЧАТОВ КОНЕЦ */

  /**СООБЩЕНИЯ НАЧАЛО ---------------> */
  public setupMessageListeners(): void {
    const controller = CommonPageController.getInstance();

    controller.addMessageListener((data: any) => {
      this.handleIncomingMessage(data);
    });

    this.setupChatSelectionListeners();
  }

  /** НАСТРОЙКА ВЫБОРА ЧАТА */
  private setupChatSelectionListeners(): void {
    setTimeout(() => {
      const chatsContainer = document.querySelector(".chats-list");
      if (chatsContainer) {
        chatsContainer.addEventListener("click", (event) => {
          const target = event.target as HTMLElement;
          const chatElement = target.closest(".list-element");

          if (chatElement) {
            const chatId = chatElement.getAttribute("id");
            if (chatId) {
              this.handleChatSelection(Number(chatId));
            }
          }
        });
      }
    }, 100);
  }

  private async handleChatSelection(chatId: number): Promise<void> {
    debugger;
    try {
      const controller = CommonPageController.getInstance();

      await controller.initWebSocket(chatId);

      // Обновляем выделение выбранного чата
      this.updateChatSelection(chatId);
    } catch (error) {
      console.error("Ошибка при выборе чата:", error);
      alert("Не удалось подключиться к чату");
    }
  }

  /** ОБНОВЛЕНИЕ ВЫДЕЛЕНИЯ ВЫБРАННОГО ЧАТА */
  private updateChatSelection(selectedChatId: number): void {
    // Убираем выделение со всех чатов
    const allChats = document.querySelectorAll(".list-element");
    allChats.forEach((chat) => {
      chat.classList.remove("selectedCurrentChat");
    });

    // Добавляем выделение выбранному чату
    const selectedChat = document.querySelector(`[id="${selectedChatId}"]`);
    if (selectedChat) {
      selectedChat.classList.add("selectedCurrentChat");
    }
  }

  private handleSendMessage(): void {
    const elMessage = document.getElementById("message") as HTMLInputElement;

    if (elMessage.value) {
      const controller = CommonPageController.getInstance();
      controller.sendMessage(elMessage.value);
      elMessage.value = "";
    }
  }

  private handleIncomingMessage(data: any): void {
    debugger;
    if (Array.isArray(data)) {
      this.messages = data.map((msg) => this.normalizeMessage(msg));
    } else if (data.type === "message") {
      // Новое сообщение
      const newMessage = this.normalizeMessage(data);
      this.messages.push(newMessage);
    }

    this.updateMessageDisplay();
  }

  private normalizeMessage(data: {}) {
    const userId = CommonPageController.getInstance().userId;

    return {
      content: data.content,
      id: data.id || Date.now(),
      user_id: data.user_id,
      time: data.time || new Date().toISOString(),
      type: data.type,
      isMine: data.user_id === userId,
    };
  }

  private updateMessageDisplay(): void {
    const sortedMessages = [...this.messages].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    const messageElements = sortedMessages.map(
      (message) =>
        new TextMessage({
          class: message.isMine ? "message outgoing" : "message incoming",
          text: `${message.content} (${new Date(
            message.time
          ).toLocaleTimeString()})`,
        })
    );

    this.MessageContainerComponent.updateMessages(messageElements);
  }

  public updateMessages(messages: []): void {
    const chatStore = ChatsStore.getInstance();
    chatStore.messages = messages
      .sort((a, b) => Date.parse(a.time) - Date.parse(b.time))
      .map((message) => {
        const messageData = this.normalizeMessage(message);
        return new TextMessage({
          class: messageData.isMine ? "message outgoing" : "message incoming",
          text: `${messageData.content} (${new Date(
            messageData.time
          ).toLocaleTimeString()})`,
        });
      });
    this.MessageContainerComponent.updateMessages(chatStore.messages);
  }

  public async addMessage(message: {}) {
    this.MessageContainerComponent.updateMessages([]);
    const chatStore = ChatsStore.getInstance();
    const messageData = this.normalizeMessage(message);
    chatStore.addMessage(
      new TextMessage({
        class: messageData.isMine ? "message outgoing" : "message incoming",
        text: `${messageData.content} (${new Date(
          messageData.time
        ).toLocaleTimeString()})`,
      })
    );

    this.MessageContainerComponent.updateMessages(chatStore.messages);
  }
  /**<--------------- СООБЩЕНИЯ КОНЕЦ */

  override render(): string {
    return /*html*/ `<main class="page-layout">
                  <aside class="leftBox">
                    <div  class="profile-link-container">
                    {{{ LinkProfile }}}
                    </div>
                    <form>
                    {{{ InputWithLabelSearch }}}
                    {{{ButtonCreateChat}}}
                    {{{ButtonDeleteChat}}}
                    <div class="lineBreak"></div>
                    </form>
                    {{{ ChatsListComponent }}}
                  </aside>
                  {{{DialogCreator}}}
                  <main class="right-content">
                    {{{MessageContainerComponent}}}
                    <section class="messageElements">
                    {{{ LabelForMessage }}}
                      <form class="messageContainer">
                        {{{ InputMessage }}}
                        {{{ ButtonSendMessage }}}
                      </form>
                    {{{ LinkList }}}
                    </section>  
                  </main>
                </main>`;
  }
}
