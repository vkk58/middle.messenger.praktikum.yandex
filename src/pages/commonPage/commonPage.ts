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

export default class CommonPage extends Block {
  private ChatsListComponent: ChatsList;
  private MessageContainerComponent: MessageContainer;
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
            click: () => {
              alert("delete диалог");
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
        ButtonSendMessage: new Button({
          text: "Отправить",
          id: "sendMessage",
          class: "mini-button",
          type: "submit",
          events: {
            click: () => {
              validateInput.initButton("sendMessage");
              if (validateInput.validateInput()) {
                router.go("commonPage");
              }
            },
          },
        }),
        ChatsListComponent,
        MessageContainerComponent,
        DialogCreator,
      },
    });

    this.ChatsListComponent = ChatsListComponent;
    this.startChatUpdates();

    this.MessageContainerComponent = MessageContainerComponent;
    this.startMessageUpdates();

    this.DialogCreator = DialogCreator;
  }

  /**СПИСОК ЧАТОВ НАЧАЛО---------------> */
  /**
   * Запускает периодическое обновление чатов
   */
  private startChatUpdates(): void {
    this.updateChats();

    this.updateInterval = setInterval(() => {
      this.updateChats();
    }, 5000);
  }

  /**
   * Останавливает автоматическое обновление чатов
   */
  private stopChatUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  /**
   * Обновляет список чатов новыми данными
   */
  private async updateChats() {
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
        text: chat.last_message ? chat.last_message : "Сообщений не было",
        classSecond: "contactTextMessageType",
        captionText: chat.title,
      });
    });

    // Используем публичный метод вместо прямого доступа к props
    this.ChatsListComponent.updateChats(ret);
  }

  /**
   * Генерирует случайный список чатов для демонстрации
   */
  private generateRandomChats() {
    const friendNames = [
      "Алексей",
      "Мария",
      "Иван",
      "Елена",
      "Дмитрий",
      "Ольга",
      "Сергей",
      "Анна",
    ];
    const messages = [
      "Привет! Как дела?",
      "Посмотрел документы",
      "Встречаемся завтра?",
      "Отправил файлы",
      "Спасибо за помощь!",
      "Как прошла презентация?",
      "Жду ответа",
      "Отличные новости!",
      "Нужна твоя помощь",
      "Когда сможешь созвониться?",
    ];

    // Случайное количество чатов от 1 до 6
    const chatCount = Math.floor(Math.random() * 6) + 1;
    const usedNames = new Set<string>();

    return Array.from({ length: chatCount }, (_, index) => {
      // Убеждаемся, что имена не повторяются
      let randomName: string;
      do {
        randomName =
          friendNames[Math.floor(Math.random() * friendNames.length)];
      } while (
        usedNames.has(randomName) &&
        usedNames.size < friendNames.length
      );

      usedNames.add(randomName);

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      const messageTime = new Date().toLocaleTimeString();

      return new ListElement({
        image:
          "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig",
        class: "miniImg",
        alt: `Аватар ${randomName}`,
        text: `${randomMessage} (${messageTime})`,
        classSecond: "contactTextMessageType",
        captionText: `${randomName} #${this.updateCounter}.${index + 1}`,
      });
    });
  }

  /**
   * Метод жизненного цикла - вызывается перед удалением компонента
   */
  public componentWillUnmount(): void {
    this.stopMessagesUpdates();
    this.stopChatUpdates();
  }

  /**
   * Дополнительный метод для ручного обновления (например, по кнопке)
   */
  public manualUpdateChats(): void {
    this.updateChats();
  }
  /**<--------------- СПИСОК ЧАТОВ КОНЕЦ */

  /**СООБЩЕНИЯ НАЧАЛО ---------------> */
  private startMessageUpdates(): void {
    setTimeout(() => {
      this.updateMessages();
    }, 1000);

    this.updateInterval4Message = setInterval(() => {
      this.updateMessages();
    }, 10000);
  }

  private stopMessagesUpdates(): void {
    if (this.updateInterval4Message) {
      clearInterval(this.updateInterval4Message);
      this.updateInterval4Message = null;
    }
  }

  private updateMessages(): void {
    this.updateCounter++;
    const newChats = this.generateRandomMessages();

    // Используем публичный метод вместо прямого доступа к props
    this.MessageContainerComponent.updateMessages(newChats);
  }

  private generateRandomMessages() {
    const messages = [
      "Привет! Как дела?",
      "Посмотрел документы",
      "Встречаемся завтра?",
      "Отправил файлы",
      "Спасибо за помощь!",
      "Как прошла презентация?",
      "Жду ответа",
      "Отличные новости!",
      "Нужна твоя помощь",
      "Когда сможешь созвониться?",
    ];

    // Случайное количество чатов от 1 до 6
    const chatCount = Math.floor(Math.random() * 6) + 1;
    const usedNames = new Set<string>();

    return Array.from({ length: chatCount }, (_, index) => {
      // Убеждаемся, что имена не повторяются

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      const messageTime = new Date().toLocaleTimeString();

      return new TextMessage({
        class: "message outgoing",
        text: `${randomMessage} (${messageTime})`,
      });
    });
  }

  /**
   * Дополнительный метод для ручного обновления (например, по кнопке)
  + */
  public manualUpdateMessages(): void {
    this.updateMessages();
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
