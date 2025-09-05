import HTTPTransport from "../framework/HTTPTransport";
import CommonValidator from "../framework/validate/CommonValidate";

export default class AuthApi {
  async signInRequest(): Promise<boolean> {
    const https = new HTTPTransport();
    let login: string;
    let password: string;
    let el: HTMLInputElement;
    let result = false;

    el = document.getElementById("login") as HTMLInputElement;
    login = el.value || "";
    el = document.getElementById("password") as HTMLInputElement;
    password = el.value || "";

    try {
      let answer = await https.post("/auth/signin", {
        data: { login, password },
      });
      if (answer.status < 400) {
        result = true;
      } else {
        let jsonParse = JSON.parse(answer.responseText);
        let valid = new CommonValidator("password");
        valid.parmInputElement(el);
        valid.parmErrorTxt(jsonParse.reason);
        valid.createErrorText();
      }
    } catch (error) {
      console.log(error);
      return false;
    }

    return result;
  }

  async signUpRequest(): Promise<boolean> {
    const https = new HTTPTransport();
    let firstnameValue: string;
    let secondnameValue: string;
    let loginValue: string;
    let emailValue: string;
    let passwordValue: string;
    let phoneValue: string;
    let el: HTMLInputElement;
    let result = false;

    el = document.getElementById("first_name") as HTMLInputElement;
    firstnameValue = el.value || "";
    el = document.getElementById("second_name") as HTMLInputElement;
    secondnameValue = el.value || "";
    el = document.getElementById("login") as HTMLInputElement;
    loginValue = el.value || "";
    el = document.getElementById("email") as HTMLInputElement;
    emailValue = el.value || "";
    el = document.getElementById("password") as HTMLInputElement;
    passwordValue = el.value || "";
    el = document.getElementById("phone") as HTMLInputElement;
    phoneValue = el.value || "";

    try {
      let answer = await https.post("/auth/signup", {
        data: {
          first_name: firstnameValue,
          second_name: secondnameValue,
          login: loginValue,
          email: emailValue,
          password: passwordValue,
          phone: phoneValue,
        },
      });

      if (answer.status < 400) {
        result = true;
      } else {
        let jsonParse = JSON.parse(answer.responseText);
        let valid = new CommonValidator("phone");
        valid.parmInputElement(el);
        valid.parmErrorTxt(jsonParse.reason);
        valid.createErrorText();
      }
    } catch (error) {
      console.log(error);
      return false;
    }

    return result;
  }
}
