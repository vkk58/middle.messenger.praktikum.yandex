import { InputWithLabel } from "../../components/InputWithLabel";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import Block from "../../framework/Block";
import { LinkList } from "../../components/LinkList";
import ValidateStartPage from "./validate";
import PageRouter from "../../framework/PageRouter";
import AuthApi from "../../api/AuthApi";

export default class StartPage extends Block {
  constructor() {
    const apiRequest = new AuthApi();
    const router = PageRouter.getInstance();
    const validatePage = new ValidateStartPage();
    const inputWithLabelArray: InputWithLabel[] = [
      new InputWithLabel({
        text: "Логин",
        name: "login",
        type: "text",
        class: "input",
        placeholder: "Логин",
        currentPage: "startPage",
      }),
      new InputWithLabel({
        text: "Пароль",
        name: "password",
        type: "text",
        class: "input",
        placeholder: "Пароль",
        currentPage: "startPage",
      }),
    ];
    super({
      children: {
        LinkList: new LinkList(),
        ButtonSignIn: new Button({
          text: "Вход",
          id: "signIn",
          class: "button",
          type: "button",
          events: {
            click: async () => {
              validatePage.initButton("signIn");
              if (validatePage.validateInputs()) {
                const sign = await apiRequest.signInRequest();
                if (sign) {
                  router.go("commonPage");
                }
              }
            },
          },
        }),
        FooterRegistry: new Footer({
          linkPage: "registrationPage",
          text: "Нет аккаунта?",
        }),
      },
      lists: inputWithLabelArray,
    });
  }

  override render(): string {
    return `<main class="app">
            <h1>Вход</h1>
            <form class="startPage">
            {{{ lists }}}
            {{{ ButtonSignIn }}}
            </form>
            {{{ FooterRegistry }}}
             {{{ LinkList}}}
            </main>`;
  }
}
