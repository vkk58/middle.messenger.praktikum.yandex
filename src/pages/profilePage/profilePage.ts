import { InputWithLabel } from '../../components/InputWithLabel';
import { Button } from '../../components/Button';
import { LinkList } from '../../components/LinkList';
import Block from '../../framework/Block';
import { Image } from '../../components/Image';
import { Input } from '../../components/Input';
import PageRouter from '../../framework/PageRouter';
import ValidateProfilePage from './validate';
import { Global } from '../../helpers/functions';

export default class ProfilePage extends Block {
  constructor() {
    const globalClass = new Global();
    const router = new PageRouter();
    const validatePage = new ValidateProfilePage();
    const blocksArray: InputWithLabel[] = [
      new InputWithLabel({
        text: 'Имя', name: 'first_name', type: 'text', class: 'input', currentPage: 'profilePage',
      }),
      new InputWithLabel({
        text: 'Фамилия', name: 'second_name', type: 'text', class: 'input', currentPage: 'profilePage',
      }),
      new InputWithLabel({
        text: 'Ник', name: 'display_name', type: 'text', class: 'input', currentPage: 'profilePage',
      }),
      new InputWithLabel({
        text: 'Логин', name: 'login', type: 'text', class: 'input', currentPage: 'profilePage',
      }),
      new InputWithLabel({
        text: 'Почта', name: 'email', type: 'text', class: 'input', currentPage: 'profilePage',
      }),
      new InputWithLabel({
        text: 'Номер телефона', name: 'phone', type: 'text', class: 'input', currentPage: 'profilePage',
      }),
      new InputWithLabel({
        text: 'Старый пароль', name: 'oldPassword', type: 'text', class: 'input', currentPage: 'profilePage',
      }),
      new InputWithLabel({
        text: 'Новый пароль', name: 'newPassword', type: 'text', class: 'input', currentPage: 'profilePage',
      }),
    ];
    super(
      {
        children: {
          LinkList: new LinkList(),
          ImageAvatar: new Image({ image: 'https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig', class: 'round-img', alt: 'Пользователь' }),
          InputAvatar: new Input({
            id: 'avatar',
            type: 'file',
            name: 'avatar',
            class: 'input',
            value: '',
            placeholder: '',
            events: { change: (e: Event) => { globalClass.changePicture(e, 'round-img'); } },
          }),
          ChangeProfileButton: new Button({
            text: 'Изменить данные',
            id: 'changeProfileData',
            class: 'button',
            type: 'submit',
            events: {
              click: () => {
                validatePage.initButton('changeProfileData');
                if (validatePage.validateInputs()) {
                  router.go('commonPage');
                }
              },
            },
          }),
          ReturnButton: new Button({
            text: 'Вернуться к сообщениям',
            id: 'returnToCommonPage',
            class: 'button',
            type: 'button',
            events: { click: () => { router.go('commonPage'); } },
          }),
          ExitButton: new Button({
            text: 'Выйти из профиля',
            id: 'exitFromProfile',
            class: 'button',
            type: 'button',
            events: { click: () => { router.go('startPage'); } },
          }),
        },
        lists: blocksArray,
      },
    );
  }

  override render(): string {
    return `<main class="app">
                  <h1>Профиль</h1>
                  <form>
                  {{{ ImageAvatar }}}
                  {{{ InputAvatar }}}
                  </form>
                  <form class="profilePage">
                  {{{ lists }}}
                  {{{ ChangeProfileButton }}}
                  {{{ ReturnButton }}}
                  {{{ ExitButton }}}
                  </form>
                  {{{ LinkList}}}
                </main>`;
  }
}
