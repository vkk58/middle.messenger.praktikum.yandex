import  StartPage  from './pages/startPage/startPage';

interface AppState {
  currentPage: string;
}

export default class App {
  private state: AppState;

  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: 'registrationPage'
    };
    this.appElement = document.getElementById('app');
  }

  render(): string {
      const startPage = new StartPage();
      console.log(startPage.getContent());
      if (this.appElement) {
        this.appElement.replaceWith(startPage.getContent());
      }
    
    return '';
  }
}
