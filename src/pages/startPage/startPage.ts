import { InputWithLabel } from "../../components/InputWithLabel";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import Block from "../../framework/Block";
import { LinkList } from "../../components/LinkList";
import { ListElement } from "../../components/ListElement";
export default class StartPage extends Block{
    constructor() {
        super(
            {
                LinkList: new LinkList(),
                InputWithLabelLogin: new InputWithLabel({text: "Логин", name: 'login', type: 'text', class: 'input', placeholder: "Логин", value: ""}),
                InputWithLabelPassword: new InputWithLabel({text: "Пароль", name: 'password', type: 'text', class: 'input', placeholder: "Пароль", value: ""}),
                ButtonSignIn: new Button({text: "Вход", id: 'signIn', class: 'button', type: 'submit', buttonRoute: 'commonPage'}),
                FooterRegistry: new Footer({linkPage: "registrationPage", text: 'Нет аккаунта?'}),
                LinkEl: new ListElement({image:       "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig", 
                                          class:        "round-img", 
                                          alt:          "Пользователь1",
                                          text:         "Последнее сообщение",
                                          classSecond:  "contactTextMessageType",
                                          id:           "p"}),               
            }
        );
    };

    override render(): string {
        
        return `<main class="app">
            <h1>Вход</h1>
            <form class="startPage">
            {{{ InputWithLabelLogin }}}
            {{{ InputWithLabelPassword }}}
            {{{ ButtonSignIn }}}
            </form>
            {{{ FooterRegistry }}}
             {{{ LinkList}}}
             {{{ LinkEl}}}
            </main>`;
    }
}