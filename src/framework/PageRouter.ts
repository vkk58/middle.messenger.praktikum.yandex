import RegistrationPage from '../pages/registrationPage/registrationPage';
import ProfilePage from '../pages/profilePage/profilePage';
import StartPage from '../pages/startPage/startPage';

export default class PageRouter {
  public go(pageName: string) {
    let changingPage: any;   
    debugger;
    switch(pageName)
    {
        case "registrationPage":
          changingPage = new RegistrationPage();  
          break;
        case "profilePage":
          changingPage = new ProfilePage();
          break;
        case "startPage":
          changingPage = new StartPage();
          break;
        default:
            return;
    }
    const mainElement = document.querySelector('main');

    if (mainElement) {
        const parent = mainElement.parentElement;
        
        if (parent) {
            parent.replaceChild(changingPage.getContent(), mainElement);
        }
    }
  }
}