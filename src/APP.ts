import PageRouter from './framework/PageRouter';

export default class App {
  private _appElement: HTMLElement | null;
  private router: PageRouter;

  constructor() {
    this._appElement = document.getElementById('app');
    this.router = new PageRouter();
  }

  public start(): void {
    this.router.start();
  }
}