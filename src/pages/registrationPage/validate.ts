import CommonValidator from '../../framework/validate/CommonValidate';

export default class ValidateRegistrationPage extends CommonValidator {
  initButton(id: string): void {
    this.button = document.getElementById(id) as HTMLButtonElement;
  }

  public validateInput():boolean {
    this.check = true;
    this.errorTxt = '';

    if (!this.name) return this.check;

    if (!this.button) {
      this.button = document.getElementById('createProfile') as HTMLButtonElement;
    }

    this.inputElement = document.getElementById(this.name) as HTMLInputElement;

    if (this.inputElement.type != 'text') {
      return true;
    }
    const inputValue = this.inputElement.value;

    if (this.inputElement && inputValue.length === 0) return false;

    switch (this.name) {
      case 'first_name':
      case 'second_name':
        if (/^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*[a-zA-Zа-яёА-ЯЁ-]$/.test(inputValue) === false) {
          this.check = false;
          this.errorTxt = 'Поле должно быть заполнено латиницей или кириллицей, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов';
        }
        break;
      case 'login':
        if (this.checkLength(inputValue, 3, 20)
                || /[a-zA-Z-_]/.test(inputValue) === false
                || /[а-яА-ЯёЁ_-]/.test(inputValue) === true) {
          this.check = false;
          this.errorTxt = 'Условия не соблюдены: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)';
        }
        break;
      case 'password':
        if (this.checkLength(inputValue, 8, 40)
                || /[A-Z]/.test(inputValue) === false
                || /[0-9]/.test(inputValue) === false) {
          this.check = false;
          this.errorTxt = 'Условия не соблюдены: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
        }
        break;
      case 'email':
        if (/^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(inputValue) === false) {
          this.check = false;
          this.errorTxt = 'Условия не соблюдены: латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.';
        }
        break;
      case 'phone':
        if (this.checkLength(inputValue, 10, 15)
                || /^[0-9+][0-9]/.test(inputValue) === false) {
          this.check = false;
          this.errorTxt = 'Условия не соблюдены: от 10 до 15 символов, состоит из цифр, может начинается с плюса.';
        }
        break;
      default:
        this.check = true;
        this.errorTxt = '';
        break;
    }

    
    this.setupErrorText();

    return this.check;
  }

  public validateInputs() {
    const inputElements = this.getInputList();
    let ret = true;
    let counter = inputElements.length;

    while (counter !== 0) {
      counter -= 1;
      this.name = inputElements.item(counter)?.name;
      ret = this.validateInput() && ret;
    }

    if (!ret) {
      this.button.disabled = true;
    }

    return ret;
  }
}
