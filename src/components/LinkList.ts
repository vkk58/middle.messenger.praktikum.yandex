import Block from '../framework/Block';
import { Link } from '../components/Link';

export class LinkList extends Block {
  constructor() {
    super({
      children: {
      LinkStartPage: new Link({
        href:     '#',
        datapage: "startPage",
        text:     "Авторизация",
        class: "footer-link"}),
      LinkRegistrationPage: new Link({
        href:     '#',
        datapage: "registrationPage",
        text:     "Регистрация",
        class: "footer-link"
      }),
        LinkCommonPage: new Link({
        href:     '#',
        datapage: "commonPage",
        text:     "Основная",
        class: "footer-link"
      }),
        LinkProfilePage: new Link({
        href:     '#',
        datapage: "profilePage",
        text:     "Профиль",
        class: "footer-link"
      }),
        LinkErrorPage500Page: new Link({
        href:     '#',
        datapage: "errorPage500",
        text:     "Ошибка 500",
        class: "footer-link"
      }),
        LinkErrorPage400Page: new Link({
        href:     '#',
        datapage: "errorPage400",
        text:     "Ошибка 404",
        class: "footer-link"
      })
      }
    })
  };

  override render(): string {
    return `<nav>
              <ul>
                <li>
                    {{{ LinkStartPage }}}       
                    {{{ LinkRegistrationPage }}}
                    {{{ LinkCommonPage}}}
                    {{{ LinkProfilePage }}}       
                    {{{ LinkErrorPage500Page }}}
                    {{{ LinkErrorPage400Page}}}    
                </li>
              </ul>
            </nav>`;
  }
}
