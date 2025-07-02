import StartPage from './pages/startPage/startPage';

export default class App {
  private appElement: HTMLElement | null;

  constructor() {
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
