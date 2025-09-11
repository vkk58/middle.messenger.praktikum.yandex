import HTTPTransport from '../framework/HTTPTransport';

interface UserInfoResponse {
  first_name: string;
  second_name: string;
  login: string;
  display_name: string;
  email: string;
  phone: string;
  avatar: string;
}

const URLResources = 'https://ya-praktikum.tech/api/v2/resources';

export default class ProfileApi extends HTTPTransport {
  async getuserInfo() {
    let el: HTMLInputElement;
    let avatarElement: HTMLImageElement;
    const result = false;

    try {
      const answer = (await this.get(
        '/auth/user',
      )) as unknown as UserInfoResponse;
      el = document.getElementById('first_name') as HTMLInputElement;
      el.value = answer.first_name;
      el = document.getElementById('second_name') as HTMLInputElement;
      el.value = answer.second_name;
      el = document.getElementById('login') as HTMLInputElement;
      el.value = answer.login;
      el = document.getElementById('display_name') as HTMLInputElement;
      el.value = answer.display_name;
      el = document.getElementById('email') as HTMLInputElement;
      el.value = answer.email;
      el = document.getElementById('phone') as HTMLInputElement;
      el.value = answer.phone;

      avatarElement = document.getElementsByTagName('img')[0];
      avatarElement.src = URLResources + answer.avatar;
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
    el = document.getElementById('first_name') as HTMLInputElement;
    const firstName = el.value;
    el = document.getElementById('second_name') as HTMLInputElement;
    const secondName = el.value;
    el = document.getElementById('login') as HTMLInputElement;
    const login = el.value;
    el = document.getElementById('display_name') as HTMLInputElement;
    const displayName = el.value;
    el = document.getElementById('email') as HTMLInputElement;
    const email = el.value;
    el = document.getElementById('phone') as HTMLInputElement;
    const phone = el.value;
    try {
      const answer = (await this.put('/user/profile', {
        data: {
          first_name: firstName,
          second_name: secondName,
          login,
          display_name: displayName,
          email,
          phone,
        },
      })) as unknown as UserInfoResponse;

      el = document.getElementById('first_name') as HTMLInputElement;
      el.value = answer.first_name;
      el = document.getElementById('second_name') as HTMLInputElement;
      el.value = answer.second_name;
      el = document.getElementById('login') as HTMLInputElement;
      el.value = answer.login;
      el = document.getElementById('display_name') as HTMLInputElement;
      el.value = answer.display_name;
      el = document.getElementById('email') as HTMLInputElement;
      el.value = answer.email;
      el = document.getElementById('phone') as HTMLInputElement;
      el.value = answer.phone;
      avatarElement = document.getElementsByTagName('img')[0];
      avatarElement.src = URLResources + answer.avatar;
      alert('Данные изменены');
    } catch (error) {
      console.log(error);
    }

    const elOldPassword = document.getElementById(
      'oldPassword',
    ) as HTMLInputElement;
    const elNewPassword = document.getElementById(
      'newPassword',
    ) as HTMLInputElement;

    if (
      elNewPassword.value != '' &&
      elOldPassword.value != '' &&
      elNewPassword.value != elOldPassword.value
    ) {
      this.changeUserPassword(elOldPassword.value, elNewPassword.value)
        .then(() => {
          elNewPassword.value = '';
          elOldPassword.value = '';
        })
        .catch((error) => {
          console.error('пароль не обновлен:', error);
        });
    }
  }

  async changeUserPassword(oldPassword: string, newPassword: string) {
    try {
      await this.put('/user/password', {
        data: { oldPassword, newPassword },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    const result = false;

    try {
      await this.post('/auth/logout');
    } catch (error) {
      console.log(error);
      return false;
    }

    return result;
  }
}
