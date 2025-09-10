import HTTPTransport from '../framework/HTTPTransport';
import CommonValidator from '../framework/validate/CommonValidate';

export default class AuthApi extends HTTPTransport {
  async signInRequest(): Promise<boolean> {
    const https = new HTTPTransport();
    let el: HTMLInputElement;
    let result = false;

    el = document.getElementById('login') as HTMLInputElement;
    const login = el.value || '';
    el = document.getElementById('password') as HTMLInputElement;
    const password = el.value || '';

    try {
      const answer = await https.post('/auth/signin', {
        data: { login, password },
      });
      if (answer.status < 400) {
        result = true;
      } else {
        const jsonParse = JSON.parse(answer.responseText);
        const valid = new CommonValidator('password');
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
    let el: HTMLInputElement;
    let result = false;

    el = document.getElementById('first_name') as HTMLInputElement;
    const firstnameValue = el.value || '';
    el = document.getElementById('second_name') as HTMLInputElement;
    const secondnameValue = el.value || '';
    el = document.getElementById('login') as HTMLInputElement;
    const loginValue = el.value || '';
    el = document.getElementById('email') as HTMLInputElement;
    const emailValue = el.value || '';
    el = document.getElementById('password') as HTMLInputElement;
    const passwordValue = el.value || '';
    el = document.getElementById('phone') as HTMLInputElement;
    const phoneValue = el.value || '';

    try {
      const answer = await https.post('/auth/signup', {
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
        const jsonParse = JSON.parse(answer.responseText);
        const valid = new CommonValidator('phone');
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

  public async checkIsUserAuth() {
    const answer = await this.get('/auth/user');

    if (answer.status < 400) {
      return true;
    }

    return false;
  }
}
