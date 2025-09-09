import PageRouter from './framework/PageRouter';

export default class App {
  private _appElement: HTMLElement | null;

  private router: PageRouter;

  constructor() {
    this._appElement = document.getElementById('app');
    this.router = PageRouter.getInstance();
  }

  public start(): void {
    this.router.start();
  }
}
