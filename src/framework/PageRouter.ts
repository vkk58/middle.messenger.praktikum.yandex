import RegistrationPage from '../pages/registrationPage/registrationPage';
import ProfilePage from '../pages/profilePage/profilePage';
import StartPage from '../pages/startPage/startPage';
import CommonPage from '../pages/commonPage/commonPage';
import ErrorPage from '../pages/errorPage/errorPage';
export default class PageRouter {
  public go(pageName: string) {
    let changingPage: any;   
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
        case "commonPage":
          changingPage = new CommonPage();
          break;
        case "errorPage400":
          changingPage = new ErrorPage("400", "Не туда попали");
          break;
        case "errorPage500":
          changingPage = new ErrorPage("500", "Мы уже фиксим");
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

    console.log(changingPage.getContent());
  }
}