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

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Select", Select);
Handlebars.registerPartial("ErrorMessage", ErrorMessage);
Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("Label", Label);
Handlebars.registerPartial("Footer", Footer);
Handlebars.registerPartial("Image", Image);
Handlebars.registerPartial("Text", Text);


export default class App {
  constructor() {
    this.state = {
      currentPage: "startPage",
    };
    this.appElement = document.getElementById("app");
  }

  contactLists = ["1", "2", "3"];

  render() {
    let template;
    if (this.state.currentPage === "startPage") {
      const elementsList = [
        {ElementId: "login", Label: true, LabelText: "Логин", PlaceHolder: "Логин"},
        {ElementId: "password", Label: true, LabelText: "Пароль", PlaceHolder: "Пароль"}
      ];
      template = Handlebars.compile(Pages.StartPage);
      this.appElement.innerHTML = template({
        elementsList: elementsList,
        linkPage: "registrationPage",
        textFooter: "Нет аккаунта?",
      });
    } 
    else if (this.state.currentPage === "registrationPage") {
      const elementsList = [
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
    } 
    else if (this.state.currentPage === "commonPage") {
      template = Handlebars.compile(Pages.CommonPage);
      this.appElement.innerHTML = template({
        contactLists: this.contactLists,
      });
    }    
    else if (this.state.currentPage === "profilePage") {
      const elementsList = [
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
        imageData: {Value: "https://avatars.mds.yandex.net/get-yapic/58107/TKl7WKkXP1ybjbpKY7eyvAwGwi4-1/orig", Class: "round-img"},
        elementsList: elementsList,
        linkPage: "startPage",
        textFooter: "Войти",
      });
    } 
    else if (this.state.currentPage === "errorPage500" || this.state.currentPage === "errorPage400")
    {
      template = Handlebars.compile(Pages.ErrorPage);
      const errorObj = {ErrorNumber: this.state.currentPage == "errorPage500" ? "500" : "404",
                  ErrorDescriptionNumber: this.state.currentPage == "errorPage500" ? "Мы уже фиксим" : "Не туда попали"};
      this.appElement.innerHTML = template({
        errorObj: errorObj,
        linkPage: "commonPage",
        textFooter: "Назад к чатам",
      });
    } 
    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.state.currentPage === "startPage") {
      const signIn = document.getElementById("signIn");
      signIn.addEventListener("click", () => this.commonPage());

      
      const error500 = document.getElementById("error500");
      error500.addEventListener("click", () => this.errorPage("500"));
      const error404 = document.getElementById("error404");
      error404.addEventListener("click", () => this.errorPage("400"));
    } 
    else if (this.state.currentPage === "registrationPage") {
      const returnToStartPage = document.getElementById("returnToStartPage");
      const signIn = document.getElementById("createProfile");
      signIn.addEventListener("click", () => this.commonPage());
    }
    else if (this.state.currentPage === "profilePage") {      
      const returnToCommonPage = document.getElementById("returnToCommonPage");
      returnToCommonPage.addEventListener("click", () => this.commonPage());
      const exitFromProfile = document.getElementById("exitFromProfile");
      exitFromProfile.addEventListener("click", () => this.startPage());
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
    if(errorNumber === "500")
      this.state.currentPage = "errorPage500";
    else(errorNumber === "400")
      this.state.currentPage = "errorPage400";

    this.render();
  }
}
