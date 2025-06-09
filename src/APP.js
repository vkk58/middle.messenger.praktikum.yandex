import Handlebars from "handlebars";
import * as Pages from "./pages";

// Register partials
import Input from "./components/Input.js";
import Button from "./components/Button.js";
import Select from "./components/Select.js";
import ErrorMessage from "./components/ErrorMessage.js";
import Link from "./components/Link.js";
import Label from "./components/Label.js";
import Footer from "./components/Footer.js";
import Image from "./components/Image.js";
import Text from "./components/Text.js";
import LinkList from "./components/LinkList.js";

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Select", Select);
Handlebars.registerPartial("ErrorMessage", ErrorMessage);
Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("Label", Label);
Handlebars.registerPartial("Footer", Footer);
Handlebars.registerPartial("Image", Image);
Handlebars.registerPartial("Text", Text);
Handlebars.registerPartial("LinkList", LinkList);


export default class App {
  constructor() {
    this.state = {
      currentPage: "startPage",
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    let template;
    let elementsList;
    switch(this.state.currentPage)
    {
      case "startPage":
        elementsList = [
          {ElementId: "login", Label: true, LabelText: "Логин", PlaceHolder: "Логин"},
          {ElementId: "password", Label: true, LabelText: "Пароль", PlaceHolder: "Пароль"}
        ];
        template = Handlebars.compile(Pages.StartPage);
        this.appElement.innerHTML = template({
          elementsList: elementsList,
          linkPage: "registrationPage",
          textFooter: "Нет аккаунта?",
        });
        break;   
      case "registrationPage":
        elementsList = [
          {ElementId: "first_name", Label: true, LabelText: "Имя"},
          {ElementId: "second_name", Label: true, LabelText: "Фамилия"},
          {ElementId: "login", Label: true, LabelText: "Логин"},
          {ElementId: "email", Label: true, LabelText: "Почта"},
          {ElementId: "password", Label: true, LabelText: "Пароль"},
          {ElementId: "phone", Label: true, LabelText: "Номер телефона"}
        ];
        template = Handlebars.compile(Pages.RegistrationPage);

        this.appElement.innerHTML = template({
          elementsList: elementsList,
          linkPage: "startPage",
          textFooter: "Войти",
        });
        break;
      case "commonPage":
        template = Handlebars.compile(Pages.CommonPage);   
        let imageData = {Value: "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig", Class: "miniImg", Сaption: "Пользователь", ImageName: "123"};
        let contactLists = [imageData,imageData,imageData];   
        this.appElement.innerHTML = template({
          contactLists: contactLists
        });
        break;
      case "profilePage":
        elementsList = [
          {ElementId: "first_name", Label: true, LabelText: "Имя"},
          {ElementId: "second_name", Label: true, LabelText: "Фамилия"},
          {ElementId: "display_name", Label: true, LabelText: "Ник"},
          {ElementId: "login", Label: true, LabelText: "Логин"},
          {ElementId: "email", Label: true, LabelText: "Почта"},
          {ElementId: "phone", Label: true, LabelText: "Телефон"},
          {ElementId: "oldPassword", Label: true, LabelText: "Старый пароль"},
          {ElementId: "newPassword", Label: true, LabelText: "Новый пароль"}        
        ];
        template = Handlebars.compile(Pages.ProfilePage);

        this.appElement.innerHTML = template({
          imageData: {Value: "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig", Class: "round-img", Сaption: "Пользователь"},
          elementsList: elementsList,
          linkPage: "startPage",
          textFooter: "Войти",
        });
        break;
      case "errorPage500":
      case "errorPage400":        
        template = Handlebars.compile(Pages.ErrorPage);
        const errorObj = {ErrorNumber: this.state.currentPage == "errorPage500" ? "500" : "404",
                          ErrorDescriptionNumber: this.state.currentPage == "errorPage500" ? "Мы уже фиксим" : "Не туда попали"};
        this.appElement.innerHTML = template({
          errorObj: errorObj,
          linkPage: "commonPage",
          textFooter: "Назад к чатам",
        });
        break;
    } 
    this.attachEventListeners();
  }

  attachEventListeners() {
    switch(this.state.currentPage)
    {
      case "startPage":
        const signIn = document.getElementById("signIn");
        signIn.addEventListener("click", () => this.commonPage());

        
        const error500 = document.getElementById("error500");
        error500.addEventListener("click", () => this.errorPage("500"));
        const error404 = document.getElementById("error404");
        error404.addEventListener("click", () => this.errorPage("400"));
        break;
      case "registrationPage":
        const createProfile = document.getElementById("createProfile");
        createProfile.addEventListener("click", () => this.commonPage());
        break;        
      case "profilePage":
        const returnToCommonPage = document.getElementById("returnToCommonPage");
        returnToCommonPage.addEventListener("click", () => this.commonPage());
        const exitFromProfile = document.getElementById("exitFromProfile");
        exitFromProfile.addEventListener("click", () => this.startPage());

        document.getElementById('avatar').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) 
        {
          const reader = new FileReader();
          reader.onload = function(event) 
          {
            document.getElementsByClassName('round-img')[0].src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
  });

    }

    const footerLinks = document.querySelectorAll(".footer-link");
    footerLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    });
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }

  startPage() {
    this.state.currentPage = "startPage";
    this.render();
  }

  commonPage() {
    this.state.currentPage = "commonPage";
    this.render();
  }

  profilePage() {
    this.state.currentPage = "profilePage";
    this.render();
  }

  errorPage(errorNumber) {
    switch(errorNumber)
    {
      case "500": 
        this.state.currentPage = "errorPage500";
        break;
      case "400":        
        this.state.currentPage = "errorPage400";
        break;
    }
    this.render();
  }
}
