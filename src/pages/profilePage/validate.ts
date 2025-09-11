import ValidateRegistrationPage from '../registrationPage/validate';

export default class ValidateProfilePage extends ValidateRegistrationPage {
  initButton(id: string): void {
    this.button = document.getElementById(id) as HTMLButtonElement;
  }

  public validateInput(): boolean {
    if (!this.name) return true;

    if (!this.button) {
      this.button = document.getElementById(
        'changeProfileData',
      ) as HTMLButtonElement;
    }

    this.check = super.validateInput();

    if (this.check === true && this.inputElement.value != '') {
      const inputValue = this.inputElement.value;
      switch (this.name) {
        case 'oldPassword':
        case 'newPassword':
          if (
            this.checkLength(inputValue, 8, 40) ||
            /[A-Z]/.test(inputValue) === false ||
            /[0-9]/.test(inputValue) === false
          ) {
            this.check = false;
            this.errorTxt =
              'Условия не соблюдены: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
          }
          break;
        default:
          this.check = true;
      }
    }

    this.setupErrorText();

    return this.check;
  }
}
