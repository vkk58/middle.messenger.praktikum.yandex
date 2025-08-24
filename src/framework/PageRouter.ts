import RegistrationPage from '../pages/registrationPage/registrationPage';
import ProfilePage from '../pages/profilePage/profilePage';
import StartPage from '../pages/startPage/startPage';
import CommonPage from '../pages/commonPage/commonPage';
import ErrorPage from '../pages/errorPage/errorPage';

export default class PageRouter {
  private _urls: Record<string, string> = {
    'startPage': '/start',
    'registrationPage': '/registration',
    'profilePage': '/profile',
    'commonPage': '/common',
    'errorPage400': '/error400',
    'errorPage500': '/error500',
  };  

  private _pages: Record<string, string> = {
    '/start': 'startPage',
    '/registration': 'registrationPage',
    '/profile': 'profilePage',
    '/common': 'commonPage',
    '/error400': 'errorPage400',
    '/error500': 'errorPage500',
  };

  private _isHandlingPopState = false;
  
  public start() {
    this.setupRouteListener();
    this.navigateToCurrentUrl();
  }

  private setupRouteListener() {
    window.addEventListener('popstate', () => {
      this._isHandlingPopState = true;
      this.navigateToCurrentUrl();
      this._isHandlingPopState = false;
    });
  }

  private navigateToCurrentUrl() {    
    const path = window.location.pathname;
    const pageName = this._pages[path] || 'startPage';
    
    this.go(pageName);
  }

  public go(pageName: string) {
    let changingPage: RegistrationPage | ProfilePage | StartPage | CommonPage | ErrorPage;
    switch (pageName) {
      case 'registrationPage':
        changingPage = new RegistrationPage();
        break;
      case 'profilePage':
        changingPage = new ProfilePage();
        break;
      case 'startPage':
        changingPage = new StartPage();
        break;
      case 'commonPage':
        changingPage = new CommonPage();
        break;
      case 'errorPage400':
        changingPage = new ErrorPage('400', 'Не туда попали');
        break;
      case 'errorPage500':
        changingPage = new ErrorPage('500', 'Мы уже фиксим');
        break;
      default:
        return;
    }
    
    const url = this._urls[pageName];
    if (!url) return;

    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.innerHTML = '';
      appElement.appendChild(changingPage.getContent());
    }

    if (!this._isHandlingPopState) {
      window.history.pushState(
      { page: pageName },
      '',
      url
      );
    }
  }
}
