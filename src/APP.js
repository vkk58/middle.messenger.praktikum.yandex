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

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Select", Select);
Handlebars.registerPartial("ErrorMessage", ErrorMessage);
Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("Label", Label);
Handlebars.registerPartial("Footer", Footer);

export default class App {
  constructor() {
    this.state = {
      currentPage: "startPage",
    };
    this.appElement = document.getElementById("app");
  }

  loginValue = "";
  passwordValue = "";

  render() {
    let template;
    if (this.state.currentPage === "startPage") {
      template = Handlebars.compile(Pages.StartPage);
      this.appElement.innerHTML = template({
        registrationPage: "registrationPage",
        textFooter: "Нет аккаунта?",
        loginValue: this.loginValue,
        passwordValue: this.passwordValue,
      });
      console.log(this.appElement);
    } else if (this.state.currentPage === "registrationPage") {
      template = Handlebars.compile(Pages.RegistrationPage);

      this.appElement.innerHTML = template({
        registrationPage: "startPage",
        textFooter: "Войти",
      });
    } else if (this.state.currentPage === "commonPage") {
      template = Handlebars.compile(Pages.CommonPage);
      this.appElement.innerHTML = template({});
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.state.currentPage === "startPage") {
      const signIn = document.getElementById("signIn");
      const login = document.getElementById("login");
      const password = document.getElementById("password");
      signIn.addEventListener("click", () => this.commonPage());

      login.addEventListener("blur", () => {
        this.loginValue = login.value.trim();
        this.render();
      });
      password.addEventListener("blur", () => {
        this.passwordValue = password.value.trim();
        this.render();
      });
    } else if (this.state.currentPage === "registrationPage") {
      const returnToStartPage = document.getElementById("returnToStartPage");
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
}
