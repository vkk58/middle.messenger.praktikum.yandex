import { InputWithLabel } from '../../components/InputWithLabel';
import { Link } from '../../components/Link';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { LinkList } from '../../components/LinkList';
import { Label } from '../../components/Label';
import Block from '../../framework/Block';
import { ListElement } from '../../components/ListElement';
import PageRouter from '../../framework/PageRouter';
import ValidateCommonPage from './validate';
import PageValidator from '../../framework/validate/PageValidator';

export default class CommonPage extends Block {
  constructor() {
    const validateInput = new ValidateCommonPage();
    const router = new PageRouter();
    const listEl: ListElement[] = [
      new ListElement({
        image: 'https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig',
        class: 'miniImg',
        alt: 'Пользователь1',
        text: 'Последнее сообщение',
        classSecond: 'contactTextMessageType',
        captionText: 'Друг1',
      }),
      new ListElement({
        image: 'https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig',
        class: 'miniImg',
        alt: 'Пользователь2',
        text: 'Последнее сообщение',
        classSecond: 'contactTextMessageType',
        captionText: 'Друг2',
      }),
      new ListElement({
        image: 'https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig',
        class: 'miniImg',
        alt: 'Пользователь3',
        text: 'Последнее сообщение',
        classSecond: 'contactTextMessageType',
        captionText: 'Друг3',
      }),
    ];
    super(
      {
        children: {
          LinkList: new LinkList(),
          LinkProfile: new Link({
            href: '#',
            datapage: 'profilePage',
            text: 'Профиль >',
            class: 'footer-link profileLink',
          }),
          InputWithLabelSearch: new InputWithLabel({
            text: 'Поиск', name: 'search', type: 'text', class: 'input', currentPage: 'commonPage',
          }),
          LabelForMessage: new Label({ text: 'Отправка сообщения', for: 'message' }),
          InputMessage: new Input({
            id: 'message', type: 'text', class: 'input', name: 'message', placeholder: 'Сообщение...', value: '', 
            events: { blur: () => { PageValidator.validate('commonPage', 'message'); } },
          }),
          ButtonSendMessage: new Button({
            text: 'Отправить',
            id: 'sendMessage',
            class: 'mini-button',
            type: 'submit',
            events: { click: () => {
              validateInput.initButton('sendMessage');
              if (validateInput.validateInput()) {
                console.log('Отправка сообщения'); 
                router.go('commonPage');
              }
            }, 
            },
          }),
        },
        lists: listEl,
      },
    );
  }

  override render(): string {
    return `<main class="page-layout">
                  <aside class="leftBox">
                    <div  class="profile-link-container">
                    {{{ LinkProfile }}}
                    </div>
                    <form>
                    {{{ InputWithLabelSearch }}}
                    <div class="lineBreak"></div>
                    </form>
                    <main class="gridCommonPage">    
                    {{{ lists }}}
                    </main>
                  </aside>
                  <main class="messages-container">
                    <div class="message incoming">
                        Привет! Как твои дела?
                    </div>
                    <div class="message outgoing">
                        Привет! Все отлично, спасибо. А у тебя как?
                    </div>
                    <div class="message incoming">
                        Тоже хорошо. Ты уже посмотрел документы, которые я отправил?
                    </div>
                    <div class="message outgoing">
                        Да, уже ознакомился. В целом все выглядит хорошо, но есть пара замечаний.
                    </div>
                    <div class="message incoming">
                        Какие именно? Можешь уточнить?
                    </div>
                  </main>
                  <main class="right-content">
                    <section class="messageElements">
                    {{{ LabelForMessage }}}
                      <form class="messageContainer">
                        {{{ InputMessage }}}
                        {{{ ButtonSendMessage }}}
                      </form>
                  {{{ LinkList }}}
                    </section>
                  </main>
                </main>`;
  }
}
