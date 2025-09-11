import { InputWithLabel } from "../../components/InputWithLabel";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Label } from "../../components/Label";
import Block from "../../framework/Block";
import { ListElement } from "../../components/ListElement";
import ValidateCommonPage from "./validate";
import PageValidator from "../../framework/validate/PageValidator";
import { ChatsList } from "../../components/ChatsList";
import { MessageContainer } from "../../components/MessageContainer";
import { TextMessage } from "../../components/TextMessage";
import { chatAPI } from "../../api/ChatApi";
import { Dialog } from "../../components/Dialog";
import CommonPageController from "./CommonPageController";
import { ChatsStore } from "./ChatsStore";
import { MessageData } from "../../framework/WebSocketController";
import { UserList } from "../../components/UserList";
import { UserPoint } from "../../components/UserPoint";
import { URLRESOURCES } from "../../framework/HTTPTransport";
import { DialogDeleteUser } from "../../components/DialogDeleteUser";

export interface User {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
}
export default class CommonPage extends Block {
  private ChatsListComponent: ChatsList;

  private MessageContainerComponent: MessageContainer;

  private UserListComponent: UserList;

  private updateInterval: NodeJS.Timeout | null = null;

  private updateCounter: number = 0;

  private DialogCreator: Dialog;

  private DialogDeleteUserChoose: DialogDeleteUser;

  constructor() {
    const validateInput = new ValidateCommonPage();
    const ChatsListComponent = new ChatsList({ chats: [] });
    const MessageContainerComponent = new MessageContainer({ chatStock: [] });
    const UserListComponent = new UserList({ id: "user-list", userList: [] });
    const DialogCreator = new Dialog({ class: "dialog-hidden" });
    const DialogDeleteUserChoose = new DialogDeleteUser({
      class: "dialog-hidden",
    });
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
            try {
              this.updateChats();
            } catch (e) {
              console.log(e);
            }
          }
        },
      },
    });
    super({
      children: {
        LinkProfile: new Link({
          href: "#",
          datapage: "profilePage",
          text: "Профиль >",
          class: "footer-link profileLink",
        }),
        InputWithLabelSearch: new InputWithLabel({
          text: "Поиск пользователя",
          name: "search",
          type: "text",
          class: "input",
          currentPage: "commonPage",
          list: "user-list",
        }),
        ButtonCreateChat: new Button({
          text: "Создать чат",
          id: "createChat",
          class: "mini-button margin-button",
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
          class: "mini-button margin-button",
          type: "button",
          events: {
            click: () => {
              const commonPageController = CommonPageController.getInstance();
              if (commonPageController) {
                commonPageController
                  .deleteChat()
                  .then(() => {
                    this.updateChats();
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            },
          },
        }),
        ButtonAddUserToChat: new Button({
          text: "Добавить пользователя",
          id: "addUserToChat",
          class: "mini-button-add-user",
          type: "button",
          events: {
            click: () => {
              const elSearch = document.getElementById(
                "search"
              ) as HTMLInputElement;
              const searchedUserId =
                CommonPageController.getInstance().searchUserList[
                  elSearch.value
                ];
              if (searchedUserId) {
                chatAPI
                  .addUserToChat(
                    [searchedUserId],
                    CommonPageController.getInstance().chatId
                  )
                  .then(() => {
                    alert(`Пользователь ${elSearch.value} добавлен`);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            },
          },
        }),
        ButtonDeleteUserFromChat: new Button({
          text: "Удалить пользователя из чата",
          id: "deleteUserFromChat",
          class: "mini-button-add-user",
          type: "button",
          events: {
            click: () => {
              debugger;
              CommonPageController.clearInputDeleteUserFromChat();
              CommonPageController.getInstance().getChatUsers();
              this.DialogDeleteUserChoose.show();
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
            keydown: (event: KeyboardEvent) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            },
          },
        }),
        UserListComponent,
        ButtonSendMessage,
        ChatsListComponent,
        MessageContainerComponent,
        DialogCreator,
        DialogDeleteUserChoose,
      },
    });

    this.ChatsListComponent = ChatsListComponent;
    this.startChatUpdates();

    this.MessageContainerComponent = MessageContainerComponent;

    this.UserListComponent = UserListComponent;

    this.DialogCreator = DialogCreator;

    this.DialogDeleteUserChoose = DialogDeleteUserChoose;
  }

  public normalizeUsers(userLists: User[]) {
    const listforStore: Record<string, number> = {};
    const ret = userLists.map((userList) => {
      const userValue = `${userList.login} (${userList.first_name} ${userList.second_name})`;
      listforStore[userValue] = userList.id;

      return new UserPoint({
        id: String(userList.id),
        value: userValue,
      });
    });

    if (Object.keys(listforStore).length !== 0) {
      CommonPageController.getInstance().searchUserList = listforStore;
    }

    return ret;
  }

  /**Поиск пользователей --------------->*/
  public updateUserList(userLists: User[]) {
    const ret = this.normalizeUsers(userLists);

    this.UserListComponent.updateUserList(ret);
  }
  /**<-------------------- */

  /**Получение списка пользователей --------------->*/
  public getChatUsers(userLists: User[]) {
    const ret = this.normalizeUsers(userLists);

    this.DialogDeleteUserChoose.updateUserList(ret);
  }
  /**<-------------------- */

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

  public updateChats() {
    this._updateChats()
      .then(() => {
        console.log("Чаты обновлены");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  public async _updateChats() {
    this.updateCounter++;
    const chatList = await chatAPI.getChatList();
    const ret = chatList.map((chat) => {
      return new ListElement({
        image:
          chat.avatar == null
            ? "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig"
            : URLRESOURCES + chat.avatar,
        class: "miniImg",
        alt: "Аватар",
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

  /** НАСТРОЙКА ВЫБОРА ЧАТА */
  private handleSendMessage(): void {
    const elMessage = document.getElementById("message") as HTMLInputElement;

    if (elMessage.value) {
      const controller = CommonPageController.getInstance();
      controller.sendMessage(elMessage.value);
      elMessage.value = "";
    }
  }

  private normalizeMessage(data: MessageData) {
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

  public updateMessages(messages: MessageData[]): void {
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

  public addMessage(message: MessageData) {
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
                    <div>
                    {{{ InputWithLabelSearch }}}
                    {{{UserListComponent}}}
                    {{{ButtonAddUserToChat}}}
                    {{{ButtonDeleteUserFromChat}}}
                    </div>
                    {{{ButtonCreateChat}}}
                    {{{ButtonDeleteChat}}}
                    <div class="lineBreak"></div>
                    </form>
                    {{{ ChatsListComponent }}}
                  </aside>
                  {{{DialogDeleteUserChoose}}}
                  {{{DialogCreator}}}
                  <main class="right-content">
                    {{{MessageContainerComponent}}}
                    <section class="messageElements">
                    {{{ LabelForMessage }}}
                      <form class="messageContainer">
                        {{{ InputMessage }}}
                        {{{ ButtonSendMessage }}}
                      </form>
                    </section>  
                  </main>
                </main>`;
  }
}
