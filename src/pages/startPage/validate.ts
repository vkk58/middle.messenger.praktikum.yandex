import ValidateRegistrationPage from '../registrationPage/validate';

export default class ValidateStartPage extends ValidateRegistrationPage {
  initButton(id:string): void {
    this.button    = document.getElementById(id) as HTMLButtonElement;
  }

  public validateInput():boolean {
    if (!this.name) return true;

    if (!this.button) {
      this.button = document.getElementById('signIn') as HTMLButtonElement;
    }

    this.check = super.validateInput();

    return this.check;
  }
}
