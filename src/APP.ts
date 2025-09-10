import PageRouter from "./framework/PageRouter";

export default class App {
  private router: PageRouter;

  constructor() {
    const _appElement = document.getElementById("app");
    this.router = PageRouter.getInstance();
  }

  public start(): void {
    this.router.start();
  }
}
