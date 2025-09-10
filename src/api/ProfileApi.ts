import HTTPTransport from '../framework/HTTPTransport';

const URLResources = 'https://ya-praktikum.tech/api/v2/resources';

export default class ProfileApi extends HTTPTransport {
  async getuserInfo() {
    let el: HTMLInputElement;
    let avatarElement: HTMLImageElement;
    const result = false;

    try {
      const answer = await this.get('/auth/user');
      const profileValue = JSON.parse(answer.response);

      if (answer.status < 400) {
        el = document.getElementById('first_name') as HTMLInputElement;
        el.value = profileValue.first_name;
        el = document.getElementById('second_name') as HTMLInputElement;
        el.value = profileValue.second_name;
        el = document.getElementById('login') as HTMLInputElement;
        el.value = profileValue.login;
        el = document.getElementById('display_name') as HTMLInputElement;
        el.value = profileValue.display_name;
        el = document.getElementById('email') as HTMLInputElement;
        el.value = profileValue.email;
        el = document.getElementById('phone') as HTMLInputElement;
        el.value = profileValue.phone;

        avatarElement = document.getElementsByTagName('img')[0];
        avatarElement.src = URLResources + profileValue.avatar;
      } else {
        console.log(profileValue.reason);
      }
    } catch (error) {
      console.log(error);
      return false;
    }

    return result;
  }

  async changeAvatar() {
    const fileInput = document.getElementById('avatar') as HTMLInputElement;

    if (fileInput && !fileInput.files?.[0]) {
      alert('Выберите файл');
      return;
    }

    const formData = new FormData();
    if (fileInput.files) {
      formData.append('avatar', fileInput.files[0]);
    }

    try {
      await this.put('/user/profile/avatar', { data: formData });
    } catch (error) {
      console.log(error);
    }
  }

  async changeUserProfile() {
    let el: HTMLInputElement;
    let avatarElement: HTMLImageElement;
    let elOldPassword: HTMLInputElement;
    let elNewPassword: HTMLInputElement;
    el = document.getElementById('first_name') as HTMLInputElement;
    const first_name = el.value;
    el = document.getElementById('second_name') as HTMLInputElement;
    const second_name = el.value;
    el = document.getElementById('login') as HTMLInputElement;
    const login = el.value;
    el = document.getElementById('display_name') as HTMLInputElement;
    const display_name = el.value;
    el = document.getElementById('email') as HTMLInputElement;
    const email = el.value;
    el = document.getElementById('phone') as HTMLInputElement;
    const phone = el.value;

    try {
      const answer = await this.put('/user/profile', {
        data: { first_name, second_name, login, display_name, email, phone },
      });
      const profileValue = JSON.parse(answer.response);

      if (answer.status < 400) {
        el = document.getElementById('first_name') as HTMLInputElement;
        el.value = profileValue.first_name;
        el = document.getElementById('second_name') as HTMLInputElement;
        el.value = profileValue.second_name;
        el = document.getElementById('login') as HTMLInputElement;
        el.value = profileValue.login;
        el = document.getElementById('display_name') as HTMLInputElement;
        el.value = profileValue.display_name;
        el = document.getElementById('email') as HTMLInputElement;
        el.value = profileValue.email;
        el = document.getElementById('phone') as HTMLInputElement;
        el.value = profileValue.phone;
        avatarElement = document.getElementsByTagName('img')[0];
        avatarElement.src = URLResources + profileValue.avatar;
      } else {
        console.log(profileValue.reason);
      }
    } catch (error) {
      console.log(error);
    }

    elOldPassword = document.getElementById('oldPassword') as HTMLInputElement;
    elNewPassword = document.getElementById('newPassword') as HTMLInputElement;

    if (
      elNewPassword.value != '' &&
      elOldPassword.value != '' &&
      elNewPassword.value != elOldPassword.value
    ) {
      this.changeUserPassword(elOldPassword.value, elNewPassword.value);
      elNewPassword.value = '';
      elOldPassword.value = '';
    }
  }

  async changeUserPassword(oldPassword: string, newPassword: string) {
    try {
      const answer = await this.put('/user/password', {
        data: { oldPassword, newPassword },
      });
      if (answer.status < 400) {
        alert('Пароль изменен');
      } else {
        const jsonParse = JSON.parse(answer.responseText);
        alert(jsonParse.reason);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    let result = false;

    try {
      const answer = await this.post('/auth/logout');

      if (answer.status < 400) {
        result = true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }

    return result;
  }
}
