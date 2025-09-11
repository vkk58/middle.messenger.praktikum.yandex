import RegistrationPage from '../pages/registrationPage/registrationPage';
import ProfilePage from '../pages/profilePage/profilePage';
import StartPage from '../pages/startPage/startPage';
import CommonPage from '../pages/commonPage/commonPage';
import ErrorPage from '../pages/errorPage/errorPage';
import AuthApi from '../api/AuthApi';

export default class PageRouter {
  private changingPage:
  | RegistrationPage
  | ProfilePage
  | StartPage
  | CommonPage
  | ErrorPage;

  private static instance: PageRouter | null = null;

  private _urls: Record<string, string> = {
    startPage: '/start',
    registrationPage: '/registration',
    profilePage: '/profile',
    commonPage: '/common',
    errorPage400: '/error400',
    errorPage500: '/error500',
  };

  public static getInstance(): PageRouter {
    if (!PageRouter.instance) {
      PageRouter.instance = new PageRouter();
    }
    return PageRouter.instance;
  }

  public parmChangingPage() {
    return this.changingPage;
  }

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

  public navigateToCurrentUrl() {
    this._navigateToCurrentUrl()
      .then(() => {
        console.log('GO');
      })
      .catch(() => {
        this.go('startPage');
      });
  }

  private async _navigateToCurrentUrl() {
    const authApi = new AuthApi();
    const path = window.location.pathname;
    if (this._pages[path] && path != '/start') {
      this.go(this._pages[path]);
    } else {
      this.go(
        (await authApi.checkIsUserAuth()) == true ? 'commonPage' : 'startPage',
      );
    }
  }

  public go(pageName: string) {
    if (this.changingPage != null) {
      this.changingPage.componentWillUnmount();
    }

    switch (pageName) {
      case 'registrationPage':
        this.changingPage = new RegistrationPage();
        break;
      case 'profilePage':
        this.changingPage = new ProfilePage();
        break;
      case 'startPage':
        this.changingPage = new StartPage();
        break;
      case 'commonPage':
        this.changingPage = new CommonPage();
        break;
      case 'errorPage400':
        this.changingPage = new ErrorPage('400', 'Не туда попали');
        break;
      case 'errorPage500':
        this.changingPage = new ErrorPage('500', 'Мы уже фиксим');
        break;
      default:
        return;
    }

    const url = this._urls[pageName];
    if (!url) return;

    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.innerHTML = '';
      appElement.appendChild(this.changingPage.getContent());
    }

    if (!this._isHandlingPopState) {
      window.history.pushState({ page: pageName }, '', url);
    }
  }
}
