import { InputWithLabel } from "../../components/InputWithLabel";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { LinkList } from "../../components/LinkList";
import { Label } from "../../components/Label";
import Block from "../../framework/Block";
import { ListElement } from "../../components/ListElement";

export default class CommonPage extends Block{
    
    constructor() {      
        let listEl: ListElement[] = [
          new ListElement({image:       "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig", 
                          class:        "round-img", 
                          alt:          "Пользователь1",
                          text:         "Последнее сообщение",
                          classSecond:  "contactTextMessageType",
                          id:           "p"}),
          new ListElement({image: "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig", 
                          class:  "round-img", 
                          alt:    "Пользователь2",
                          text:         "Последнее сообщение",
                          classSecond:  "contactTextMessageType",
                          id:           "p"}),
          new ListElement({image: "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig", 
                          class:  "round-img", 
                          alt:    "Пользователь3",
                          text:         "Последнее сообщение",
                          classSecond:  "contactTextMessageType",
                          id:           "p"})
        ];
        super(
            {
                LinkList: new LinkList(),
                
                LinkProfile: new Link({
                                        href:     '#',
                                        datapage: "profilePage",
                                        text:     "Профиль >",
                                        onClick: (event: Event) => {
                                          console.log('CLICK');          
                                          event.preventDefault();
                                          event.stopPropagation();
                                        },                                        
                                        attr: {
                                          class: "footer-link profileLink"
                                        }
                                      }),
              InputWithLabelSearch:     new InputWithLabel({text: "Поиск", name: 'search', type: 'text', class: 'input'}),
                LabelForMessage:        new Label({text: "Отправка сообщения", for: 'message'}),
                InputMessage:           new Input({id: "message", type: "text", class: "input", name: "message"}),
                InputWithLabelPassword: new InputWithLabel({text: "Пароль", name: 'password', type: 'text', class: 'input'}),
                InputWithLabelEmail:    new InputWithLabel({text: "Почта", name: 'email', type: 'text', class: 'input'}),
                InputWithLabelPhone:    new InputWithLabel({text: "Номер телефона", name: 'phone', type: 'text', class: 'input'}),
                ButtonSendMessage:      new Button({text: "Отправить", id: 'createProfile', class: 'miniButton', type: 'submit'}),
                listEl
            }
        );
    };

    override render(): string {
        return `<main class="page-layout">
                  <aside class="leftBox">
                    <div  class="profile-link-container">
                      {{{LinkProfile}}}
                    </div>
                    <form>
                    {{{ InputWithLabelSearch }}}
                    <div class="lineBreak"></div>
                    </form>
                    <main class="gridCommonPage">
                        <figure class="gridElementCommonPage">
                        <figcaption class="contactTextType">Контакт</figcaption>
                          <div class="messageContainer">        
                          {{{ listEl }}}
                          </div>
                        </figure>
                      <div class="lineBreak"></div>
                    </main>
                  </aside>
                  <main class="right-content">
                    <section class="messageElements">
                    {{{ LabelForMessage }}}
                      <form class="messageContainer">
                        {{{ InputMessage }}}
                        {{{ ButtonSendMessage }}}
                      </form>
                    </section>
                  </main>
                  {{{ LinkList }}}
                </main>`;
    }
}
