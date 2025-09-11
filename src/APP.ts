import PageRouter from './framework/PageRouter';

export default class App {
  private router: PageRouter;

  constructor() {
    document.getElementById('app');
    this.router = PageRouter.getInstance();
  }

  public start(): void {
    this.router.start();
  }
}
