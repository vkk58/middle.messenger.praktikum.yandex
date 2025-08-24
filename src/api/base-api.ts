enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const URLAPI = "https://ya-praktikum.tech/api/v2";

type Options = {
  method: METHOD;
  data?: Record<string, string | number | boolean>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class BaseApi {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  async post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const { method, data } = options;
    url = URLAPI + url;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method,  
        method == METHOD.GET && data ? `${url}${this.queryStringify(data)}` : url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.withCredentials = true;
      xhr.onload = function () {
        resolve(JSON.parse(xhr.response));
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  queryStringify(data: Record<string, string | number | boolean>) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      const enkey = encodeURIComponent(key);
      const enDatakey = encodeURIComponent(String(data[key]));
      return `${result}${enkey}=${enDatakey}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
  }
}
