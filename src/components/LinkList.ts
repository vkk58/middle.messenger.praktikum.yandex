import Block from '../framework/Block';
import { Link } from '../components/Link';

export class LinkList extends Block {
  constructor() {
    super({
      LinkStartPage: new Link({
        href:     '#',
        datapage: "startPage",
        text:     "Авторизация",
        attr: {
        class: "footer-link"
        },
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        }
      }),
      LinkRegistrationPage: new Link({
        href:     '#',
        datapage: "registrationPage",
        text:     "Регистрация",
        attr: {
        class: "footer-link"
        },
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        }
      }),
        LinkCommonPage: new Link({
        href:     '#',
        datapage: "commonPage",
        text:     "Основная",
        attr: {
        class: "footer-link"
        },
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        }
      }),
        LinkProfilePage: new Link({
        href:     '#',
        datapage: "profilePage",
        text:     "Профиль",
        attr: {
        class: "footer-link"
        },
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        }
      }),
        LinkErrorPage500Page: new Link({
        href:     '#',
        datapage: "errorPage500",
        text:     "Ошибка 500",
        attr: {
        class: "footer-link"
        },
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        }
      }),
        LinkErrorPage400Page: new Link({
        href:     '#',
        datapage: "errorPage400",
        text:     "Ошибка 404",
        attr: {
        class: "footer-link"
        },
        onClick: (event: Event) => {
          console.log('CLICK');
          event.preventDefault();
          event.stopPropagation();
        }
      })
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
