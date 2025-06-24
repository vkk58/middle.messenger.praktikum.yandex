import { InputWithLabel } from "../../components/InputWithLabel";
import { Button } from "../../components/Button";
import { LinkList } from "../../components/LinkList";
import Block from "../../framework/Block";
import { Image } from "../../components/Image";
import { Input } from "../../components/Input";

export default class ProfilePage extends Block{
    constructor() {
        super(
            {
                LinkList: new LinkList(),
                ImageAvatar:            new Image({image: "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig", class: "round-img", alt: "Пользователь"}),
                InputAvatar:            new Input({id: "avatar",  type: "file",  name: "avatar", class: "input", value: "", placeholder: ""}),
                InputWithLabelName:     new InputWithLabel({text: "Имя", name: 'first_name', type: 'text', class: 'input', value: "", placeholder: ""}),
                InputWithLabelSurname:  new InputWithLabel({text: "Фамилия", name: 'second_name', type: 'text', class: 'input', value: "", placeholder: ""}),
                InputWithLabelDisplay:  new InputWithLabel({text: "Ник", name: 'display_name', type: 'text', class: 'input', value: "", placeholder: ""}),
                InputWithLabelLogin:    new InputWithLabel({text: "Логин", name: 'login', type: 'text', class: 'input', value: "", placeholder: ""}),
                InputWithLabelEmail:    new InputWithLabel({text: "Почта", name: 'email', type: 'text', class: 'input', value: "", placeholder: ""}),
                InputWithLabelPhone:    new InputWithLabel({text: "Номер телефона", name: 'phone', type: 'text', class: 'input', value: "", placeholder: ""}),
                InputWithLabelOldPass:  new InputWithLabel({text: "Старый пароль", name: 'oldPassword', type: 'text', class: 'input', value: "", placeholder: ""}),
                InputWithLabelNewPass:  new InputWithLabel({text: "Новый пароль", name: 'newPassword', type: 'text', class: 'input', value: "", placeholder: ""}),
                ButtonChangeProfile:    new Button({text: "Изменить данные", id: 'changeProfileData', class: 'button', type: 'submit'}),
                ButtonReturn:           new Button({text: "Вернуться к сообщениям", id: 'returnToCommonPage', class: 'button', type: 'button', buttonRoute: 'commonPage'}),
                ButtonLeaveFromProfile: new Button({text: "Выйти из профиля", id: 'exitFromProfile', class: 'button', type: 'button', buttonRoute: 'startPage'}),
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
                  {{{ InputWithLabelName }}}
                  {{{ InputWithLabelSurname }}}
                  {{{ InputWithLabelDisplay }}}
                  {{{ InputWithLabelLogin }}}
                  {{{ InputWithLabelEmail }}}
                  {{{ InputWithLabelPhone }}}
                  {{{ InputWithLabelPassword }}}
                  {{{ ButtonChangeProfile }}}
                  {{{ ButtonReturn }}}
                  {{{ ButtonLeaveFromProfile }}}
                  </form>
                  {{{ LinkList}}}
                </main>`;
    }
}