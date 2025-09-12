import { InputWithLabel } from '../../components/InputWithLabel';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';
import Block from '../../framework/Block';
import PageRouter from '../../framework/PageRouter';
import ValidateRegistrationPage from './validate';
import AuthApi from '../../api/AuthApi';

export default class RegistrationPage extends Block {
  constructor() {
    const apiRequest = new AuthApi();
    const router = PageRouter.getInstance();
    const validatePage = new ValidateRegistrationPage();
    const inputWithLabelArray: InputWithLabel[] = [
      new InputWithLabel({
        text: 'Имя',
        name: 'first_name',
        type: 'text',
        class: 'input',
        currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Фамилия',
        name: 'second_name',
        type: 'text',
        class: 'input',
        currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Логин',
        name: 'login',
        type: 'text',
        class: 'input',
        currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Пароль',
        name: 'password',
        type: 'text',
        class: 'input',
        currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Почта',
        name: 'email',
        type: 'text',
        class: 'input',
        currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Номер телефона',
        name: 'phone',
        type: 'text',
        class: 'input',
        currentPage: 'registrationPage',
      }),
    ];
    super({
      lists: inputWithLabelArray,
      children: {
        CommonButton: new Button({
          text: 'Создать профиль',
          id: 'createProfile',
          class: 'button',
          type: 'button',
          currentPage: 'registrationPage',
          events: {
            click: () => {
              validatePage.initButton('createProfile');
              if (validatePage.validateInputs()) {
                apiRequest
                  .signUpRequest()
                  .then(() => {
                    router.go('commonPage');
                  })
                  .catch((error) => {
                    console.error('При регистрации возникли ошибки:', error);
                  });
              }
            },
          },
        }),
        FooterSignIn: new Footer({ linkPage: 'startPage', text: 'Войти' }),
      },
    });
  }

  override render(): string {
    return `<main class="app">
                <h1>Регистрация</h1>
                <form class="registrationPage">
                {{{ lists }}}
                </form>
                {{{ CommonButton }}}   
                {{{ FooterSignIn }}} 
                </main>`;
  }
}
