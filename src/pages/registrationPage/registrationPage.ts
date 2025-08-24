import { InputWithLabel } from '../../components/InputWithLabel';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';
import { LinkList } from '../../components/LinkList';
import Block from '../../framework/Block';
import PageRouter from '../../framework/PageRouter';
import ValidateRegistrationPage from './validate';
import AuthApi from '../../api/AuthApi';

export default class RegistrationPage extends Block {
  constructor() {
    const apiRequest = new AuthApi();
    const router = new PageRouter();
    const validatePage = new ValidateRegistrationPage();
    const inputWithLabelArray: InputWithLabel[] = [
      new InputWithLabel({
        text: 'Имя', name: 'first_name', type: 'text', class: 'input', currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Фамилия', name: 'second_name', type: 'text', class: 'input', currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Логин', name: 'login', type: 'text', class: 'input', currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Пароль', name: 'password', type: 'text', class: 'input', currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Почта', name: 'email', type: 'text', class: 'input', currentPage: 'registrationPage',
      }),
      new InputWithLabel({
        text: 'Номер телефона', name: 'phone', type: 'text', class: 'input', currentPage: 'registrationPage',
      }),
    ];
    super(
      {
        lists: inputWithLabelArray,
        children: {
          LinkList: new LinkList(),
          CommonButton: new Button({
            text: 'Создать профиль',
            id: 'createProfile',
            class: 'button',
            type: 'button',//'submit',
            currentPage: 'registrationPage',
            events: {
              click: async() => {
                validatePage.initButton('createProfile');
                if (validatePage.validateInputs()) {
                  const createUser = await apiRequest.signUpRequest();
                  
                  if(createUser)
                  {                    
                    router.go('commonPage');
                  }
                }
              },
            },
          }),
          FooterSignIn: new Footer({ linkPage: 'startPage', text: 'Войти' }),
        },
      },
    );
  }

  override render(): string {
    return `<main class="app">
                <h1>Регистрация</h1>
                <form class="registrationPage">
                {{{ lists }}}
                </form>
                {{{ CommonButton }}}   
                {{{ FooterSignIn }}}                 
                {{{ LinkList}}}
                </main>`;
  }
}
