class MockXMLHttpRequest {
  open = jest.fn();

  send = jest.fn();

  setRequestHeader = jest.fn();

  withCredentials = false;

  onload: (() => void) | null = null;

  onerror: (() => void) | null = null;

  onabort: (() => void) | null = null;

  ontimeout: (() => void) | null = null;

  status = 200;

  responseText = '{}';

  response = '{}';

  simulateSuccess(response: any, status = 200) {
    this.status = status;
    this.responseText =
      typeof response === 'string' ? response : JSON.stringify(response);
    this.response = this.responseText;
    if (this.onload) {
      this.onload();
    }
  }

  simulateError(status = 500, response: any = {}) {
    this.status = status;
    this.responseText =
      typeof response === 'string' ? response : JSON.stringify(response);
    this.response = this.responseText;
    if (this.onload) {
      this.onload();
    }
  }
}

export default MockXMLHttpRequest;
