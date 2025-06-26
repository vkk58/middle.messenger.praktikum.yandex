import { InputWithLabel } from "../../components/InputWithLabel";
import { Button } from "../../components/Button";
import { LinkList } from "../../components/LinkList";
import Block from "../../framework/Block";
import { Image } from "../../components/Image";
import { Input } from "../../components/Input";

export default class ProfilePage extends Block{
    constructor() {
        let inputWithLabelArray: InputWithLabel[] = [
            new InputWithLabel({text: "Имя", name: 'first_name', type: 'text', class: 'input', value: "", placeholder: ""}),
            new InputWithLabel({text: "Фамилия", name: 'second_name', type: 'text', class: 'input', value: "", placeholder: ""}),
            new InputWithLabel({text: "Ник", name: 'display_name', type: 'text', class: 'input', value: "", placeholder: ""}),
            new InputWithLabel({text: "Логин", name: 'login', type: 'text', class: 'input', value: "", placeholder: ""}),
            new InputWithLabel({text: "Почта", name: 'email', type: 'text', class: 'input', value: "", placeholder: ""}),
            new InputWithLabel({text: "Номер телефона", name: 'phone', type: 'text', class: 'input', value: "", placeholder: ""}),
            new InputWithLabel({text: "Старый пароль", name: 'oldPassword', type: 'text', class: 'input', value: "", placeholder: ""}),
            new InputWithLabel({text: "Новый пароль", name: 'newPassword', type: 'text', class: 'input', value: "", placeholder: ""})
        ];
        let buttonArray: Button[] = [
            new Button({text: "Изменить данные", id: 'changeProfileData', class: 'button', type: 'submit'}),
            new Button({text: "Вернуться к сообщениям", id: 'returnToCommonPage', class: 'button', type: 'button', buttonRoute: 'commonPage'}),
            new Button({text: "Выйти из профиля", id: 'exitFromProfile', class: 'button', type: 'button', buttonRoute: 'startPage'})
        ]
        super(
            {
                LinkList: new LinkList(),
                ImageAvatar:            new Image({image: "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig", class: "round-img", alt: "Пользователь"}),
                InputAvatar:            new Input({id: "avatar",  type: "file",  name: "avatar", class: "input", value: "", placeholder: ""}),
                inputWithLabelArray,
                buttonArray
            }
        );
    };

    override render(): string {
        return `<main class="app">
                  <h1>Профиль</h1>
                  <form>
                  {{{ ImageAvatar }}}
                  {{{ InputAvatar }}}
                  </form>
                  <form class="registrationPage">
                  {{{ inputWithLabelArray }}}
                  {{{ buttonArray }}}
                  </form>
                  {{{ LinkList}}}
                </main>`;
    }
}