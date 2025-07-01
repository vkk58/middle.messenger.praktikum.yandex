import ValidateCommonPage from '../../pages/commonPage/validate';
import ValidateProfilePage from '../../pages/profilePage/validate';
import ValidateRegistrationPage from '../../pages/registrationPage/validate';
import ValidateStartPage from '../../pages/startPage/validate';

export default class PageValidator {
  static validate(page:string, name?: string): boolean {
    let validClass: ValidateStartPage | ValidateRegistrationPage | ValidateProfilePage | ValidateCommonPage;
    let ret: boolean;
    switch (page) {
      case 'startPage':
        validClass = new ValidateStartPage(name);
        break;
      case 'registrationPage':
        validClass = new ValidateRegistrationPage(name);
        break;
      case 'profilePage':
        validClass = new ValidateProfilePage(name);
        break;
      case 'commonPage':
        validClass = new ValidateCommonPage(name);
        break;
      default:
        return true;
    }

    if (name) {
      ret = validClass.validateInput();
    } else {
      ret = validClass.validateInputs();
    }

    return ret;
  }
}
