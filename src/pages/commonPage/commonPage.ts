/*
{{> LinkList}}
<main class="page-layout">
  <aside class="leftBox">
    <div  class="profile-link-container">
      {{> Link href="#" class="footer-link profileLink" data-page ="profilePage" text ="Профиль >"}}
    </div>
    <form>
    {{> Label forAttr="search" text="Поиск" }}
    {{> Input id="search" type="text"  class="input"}}
    <div class="lineBreak"></div>
    </form>
    <main class="gridCommonPage">
      {{#if contactLists.length}}
        {{#each contactLists}}
        <figure class="gridElementCommonPage">
        <figcaption class="contactTextType">Контакт</figcaption>
          <div class="messageContainer">        
          {{> Image image=this.Value className=this.Class alt=this.Сaption}}
          {{> Text tag='p' class="contactTextMessageType" text= "Последнее сообщение"}}
          </div>
        </figure>
      <div class="lineBreak"></div>
        {{/each}}
    {{/if}}
    </main>
  </aside>
  <main class="right-content">
    <section class="messageElements">
    {{> Label forAttr="message" text="Отправка сообщения" }}
      <form class="messageContainer">
        {{> Input id="message" type="text" class="input"}}
        {{> Button id="sendMessage" class="miniButton" text="Отправить" disabled = true type="submit"}}
      </form>
    </section>
  </main>
</main>
*/
import { InputWithLabel } from "../../components/InputWithLabel";
import { Link } from "../../components/Link";
import { Button } from "../../components/Button";
import { LinkList } from "../../components/LinkList";
import Block from "../../framework/Block";

export default class RegistrationPage extends Block{
    constructor() {
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
                InputWithLabelSearch: new InputWithLabel({text: "Поиск", name: 'search', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelSurname: new InputWithLabel({text: "Фамилия", name: 'second_name', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelLogin: new InputWithLabel({text: "Логин", name: 'login', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelPassword: new InputWithLabel({text: "Пароль", name: 'password', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelEmail: new InputWithLabel({text: "Почта", name: 'email', type: 'text', class: 'input', placeholder: "", value: ""}),
                InputWithLabelPhone: new InputWithLabel({text: "Номер телефона", name: 'phone', type: 'text', class: 'input', placeholder: "", value: ""}),
                ButtonCreateProfile: new Button({text: "Создать профиль", id: 'createProfile', class: 'button', type: 'submit'}),
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
                      {{#if contactLists.length}}
                        {{#each contactLists}}
                        <figure class="gridElementCommonPage">
                        <figcaption class="contactTextType">Контакт</figcaption>
                          <div class="messageContainer">        
                          {{> Image image=this.Value className=this.Class alt=this.Сaption}}
                          {{> Text tag='p' class="contactTextMessageType" text= "Последнее сообщение"}}
                          </div>
                        </figure>
                      <div class="lineBreak"></div>
                        {{/each}}
                    {{/if}}
                    </main>
                  </aside>
                  <main class="right-content">
                    <section class="messageElements">
                    {{> Label forAttr="message" text="Отправка сообщения" }}
                      <form class="messageContainer">
                        {{> Input id="message" type="text" class="input"}}
                        {{> Button id="sendMessage" class="miniButton" text="Отправить" disabled = true type="submit"}}
                      </form>
                    </section>
                  </main>
                  {{> LinkList}}
                </main>`;
    }
}
