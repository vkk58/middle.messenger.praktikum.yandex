import { InputWithLabel } from "../../components/InputWithLabel";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { LinkList } from "../../components/LinkList";
import Block from "../../framework/Block";

export default class RegistrationPage extends Block{
    constructor() {
        let inputWithLabelArray: InputWithLabel[] = [
            new InputWithLabel({text: "Имя", name: 'first_name', type: 'text', class: 'input',currentPage: 'registrationPage'}),
            new InputWithLabel({text: "Фамилия", name: 'second_name', type: 'text', class: 'input',currentPage: 'registrationPage'}),
            new InputWithLabel({text: "Логин", name: 'login', type: 'text', class: 'input',currentPage: 'registrationPage'}),
            new InputWithLabel({text: "Пароль", name: 'password', type: 'text', class: 'input',currentPage: 'registrationPage'}),
            new InputWithLabel({text: "Почта", name: 'email', type: 'text', class: 'input',currentPage: 'registrationPage'}),
            new InputWithLabel({text: "Номер телефона", name: 'phone', type: 'text', class: 'input',currentPage: 'registrationPage'}),
            new Button({text: "Создать профиль", id: 'createProfile', class: 'button', type: 'submit',currentPage: 'registrationPage'}),
        ]
        super(
            {
                LinkList: new LinkList(),
                inputWithLabelArray, 
                FooterSignIn: new Footer({linkPage: "startPage", text: 'Войти'})               
            }
        );
    };

    override render(): string {
        return `<main class="app">
                <h1>Регистрация</h1>
                <form class="registrationPage">
                {{{ inputWithLabelArray }}}
                </form>
                {{{ FooterSignIn }}}                 
                {{{ LinkList}}}
                </main>`;
    }
}