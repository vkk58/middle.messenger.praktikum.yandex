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
      await https.post('/auth/signin', {
        data: { login, password },
      });
      result = true;
    } catch (error) {
      console.log(error);
      const valid = new CommonValidator('password');
      valid.parmInputElement(el);
      valid.parmErrorTxt(error.reason);
      valid.createErrorText();
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
      await https.post('/auth/signup', {
        data: {
          first_name: firstnameValue,
          second_name: secondnameValue,
          login: loginValue,
          email: emailValue,
          password: passwordValue,
          phone: phoneValue,
        },
      });
      result = true;
    } catch (error) {
      console.log(error);
      const jsonParse = error;
      const valid = new CommonValidator('phone');
      valid.parmInputElement(el);
      valid.parmErrorTxt(jsonParse.reason);
      valid.createErrorText();
      return false;
    }

    return result;
  }

  public async checkIsUserAuth() {
    try {
      await this.get('/auth/user');
      return true;
    } catch {
      return false;
    }
  }
}
