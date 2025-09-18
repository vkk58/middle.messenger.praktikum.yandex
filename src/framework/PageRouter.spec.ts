import PageRouter from './PageRouter';

describe('PageRouter', () => {
  let router: PageRouter;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    router = PageRouter.getInstance();
  });

  it('Проверка добавления страницы в историю', () => {
    router.go('registrationPage');

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(window.history.pushState).toHaveBeenCalledWith(
      { page: 'registrationPage' },
      '',
      '/registration',
    );
  });

  it('Переход на страницу роутера', () => {
    router.go('registrationPage');

    const appElement = document.getElementById('app');
    expect(appElement?.innerHTML).not.toBe('');
  });
});
