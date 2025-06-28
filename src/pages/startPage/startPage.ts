import { InputWithLabel } from "../../components/InputWithLabel";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";
import Block from "../../framework/Block";
import { LinkList } from "../../components/LinkList";
import ValidateStartPage from "./validate";
import PageRouter from "../../framework/PageRouter";

export default class StartPage extends Block{
    constructor() {
        let router       = new PageRouter();
        let validatePage = new ValidateStartPage();
        let inputWithLabelArray: InputWithLabel[] = [
            new InputWithLabel({text: "Логин", name: 'login', type: 'text', class: 'input', placeholder: "Логин",currentPage: 'startPage' }),
            new InputWithLabel({text: "Пароль", name: 'password', type: 'text', class: 'input', placeholder: "Пароль",currentPage: 'startPage'}),
        ]    
        super(
            {
                children:{
                LinkList: new LinkList(),             
                ButtonSignIn: new Button({text: "Вход", id: 'signIn', class: 'button', type: 'submit',                                         
                                        events: {
                                            click: () => {
                                                validatePage.initButton('signIn');
                                                if(validatePage.validateInputs()) {
                                                    router.go("commonPage");
                                                }
                                            },
                                        }
                                    }),
                FooterRegistry: new Footer({linkPage: "registrationPage", text: 'Нет аккаунта?'}),   
                                },
                lists: inputWithLabelArray        
            }
        );
    };

    override render(): string {
        
        return `<main class="app">
            <h1>Вход</h1>
            <form class="startPage">
            {{{ lists }}}
            {{{ ButtonSignIn }}}
            </form>
            {{{ FooterRegistry }}}
             {{{ LinkList}}}
            </main>`;
    }
}
