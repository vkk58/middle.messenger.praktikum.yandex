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
import { chatsStore } from "./ChatsStore";
import { ChatsList } from "../../components/ChatsList";
import { IChat } from "../../types";

export default class CommonPage extends Block {
  private ChatsListComponent: ChatsList;
  private updateInterval: NodeJS.Timeout | null = null;
  private updateCounter: number = 0;
  constructor() {
    const validateInput = new ValidateCommonPage();
    const router = new PageRouter();
    const ChatsListComponent = new ChatsList({
      chats: [
        new ListElement({
          image:
            "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig",
          class: "miniImg",
          alt: "Пользователь1",
          text: "Последнее сообщение",
          classSecond: "contactTextMessageType",
          captionText: "Друг1",
        }),
      ],
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
                console.log("Отправка сообщения");
                router.go("commonPage");
              }
            },
          },
        }),
        ChatsListComponent,
      },
    });

    this.ChatsListComponent = ChatsListComponent;
    this.startChatUpdates();
  }

  /**
   * Запускает периодическое обновление чатов
   */
  private startChatUpdates(): void {
    console.log("Запуск автоматического обновления чатов...");

    // Первое обновление через 1 секунду после инициализации
    setTimeout(() => {
      this.updateChats();
    }, 1000);

    // Затем каждые 10 секунд
    this.updateInterval = setInterval(() => {
      this.updateChats();
    }, 100000);
  }

  /**
   * Останавливает автоматическое обновление чатов
   */
  private stopChatUpdates(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      console.log("Автоматическое обновление чатов остановлено");
    }
  }

  /**
   * Обновляет список чатов новыми данными
   */
  private updateChats(): void {
    console.log("Eto apdeit");
    this.updateCounter++;
    const newChats = this.generateRandomChats();

    // Используем публичный метод вместо прямого доступа к props
    this.ChatsListComponent.updateChats(newChats);

    console.log(
      `Чаты обновлены (${this.updateCounter} раз) в:`,
      new Date().toLocaleTimeString()
    );
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
    this.stopChatUpdates();
    console.log("Компонент CommonPage будет удален, интервалы очищены");
  }

  /**
   * Дополнительный метод для ручного обновления (например, по кнопке)
   */
  public manualUpdateChats(): void {
    console.log("Ручное обновление чатов");
    this.updateChats();
  }

  override render(): string {
    return /*html*/ `<main class="page-layout">
                  <aside class="leftBox">
                    <div  class="profile-link-container">
                    {{{ LinkProfile }}}
                    </div>
                    <form>
                    {{{ InputWithLabelSearch }}}
                    <div class="lineBreak"></div>
                    </form>
                    {{{ ChatsListComponent }}}
                  </aside>
                  <main class="right-content">
                    <main class="messages-container">
                      <div class="message incoming">
                          Привет! Как твои дела?
                      </div>
                      <div class="message outgoing">
                          Привет! Все отлично, спасибо. А у тебя как?
                      </div>
                      <div class="message incoming">
                          Тоже хорошо. Ты уже посмотрел документы, которые я отправил?
                      </div>
                      <div class="message outgoing">
                          Да, уже ознакомился. В целом все выглядит хорошо, но есть пара замечаний.
                      </div>
                      <div class="message incoming">
                          Какие именно? Можешь уточнить?
                      </div>
                    </main>  

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
