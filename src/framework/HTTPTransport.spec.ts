import MockXMLHttpRequest from '../mocks/MockXMLHttpRequest';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
  let http: HTTPTransport;
  let xhrMock: MockXMLHttpRequest;

  beforeEach(() => {
    http = new HTTPTransport();
    global.XMLHttpRequest = jest.fn(() => {
      xhrMock = new MockXMLHttpRequest();
      return xhrMock as unknown as XMLHttpRequest;
    }) as unknown as typeof XMLHttpRequest;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('должен кодировать специальные символы', () => {
    const data = { 'user name': 'Ya Test', login: 'yaTest' };
    const result = http.queryStringify(data);
    expect(result).toBe('?user%20name=Ya%20Test&login=yaTest');
  });

  it('Создание корректной строки', () => {
    const data = { name: 'YaTest', age: 60 };
    const result = http.queryStringify(data);
    expect(result).toBe('?name=YaTest&age=60');
  });

  it('Обработка ошибки', async () => {
    const promise = http.get('/test');

    await Promise.resolve();

    xhrMock.simulateError(404, { error: 'Not found' });

    await expect(promise).rejects.toEqual({ error: 'Not found' });
  });

  it('Обработка верного ответа', async () => {
    const promise = http.get('/test');

    await Promise.resolve();

    xhrMock.simulateSuccess('OK');

    const response = await promise;
    expect(response).toBe('OK');
  });
});
