import { InputWithLabel } from "../../components/InputWithLabel";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import { LinkList } from "../../components/LinkList";
import Block from "../../framework/Block";

export default class RegistrationPage extends Block{
    constructor() {
        super(
            {
                LinkList: new LinkList(),
                InputWithLabelName: new InputWithLabel({text: "Имя", name: 'first_name', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelSurname: new InputWithLabel({text: "Фамилия", name: 'second_name', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelLogin: new InputWithLabel({text: "Логин", name: 'login', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelPassword: new InputWithLabel({text: "Пароль", name: 'password', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelEmail: new InputWithLabel({text: "Почта", name: 'email', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelPhone: new InputWithLabel({text: "Номер телефона", name: 'phone', type: 'text', class: 'input', placeholder: "", value: ""}),
                ButtonCreateProfile: new Button({text: "Создать профиль", id: 'createProfile', class: 'button', type: 'submit'}),
                FooterSignIn: new Footer({linkPage: "commonPage", text: 'Войти'})               
            }
        );
    };

    override render(): string {
        return `<main class="app">
                <h1>Регистрация</h1>
                <form class="registrationPage">
                {{{ InputWithLabelName }}}
                {{{ InputWithLabelSurname }}}
                {{{ InputWithLabelLogin }}}
                {{{ InputWithLabelPassword }}}
                {{{ InputWithLabelEmail }}}
                {{{ InputWithLabelPhone }}}
                {{{ ButtonCreateProfile }}}
                </form>
                {{{ FooterSignIn }}}                 
                {{{ LinkList}}}
                </main>`;
    }
}