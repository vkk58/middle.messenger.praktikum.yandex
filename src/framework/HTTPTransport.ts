enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const URLAPI = 'https://ya-praktikum.tech/api/v2';
export const URLRESOURCES = 'https://ya-praktikum.tech/api/v2/resources';

interface ChatUsersData {
  users: number[];
  chatId: number;
}

type Options = {
  method: METHOD;
  data?: Record<string, string | number | boolean> | FormData | ChatUsersData;
};

type HTTPMethod = <R = unknown>(
  url: string,
  options?: OptionsWithoutMethod
) => Promise<R>;

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.POST });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.PUT });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHOD.DELETE });
  };

  request<T = XMLHttpRequest>(
    url: string,
    options: Options = { method: METHOD.GET },
  ): Promise<T> {
    const { method, data } = options;
    url = URLAPI + url;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method,
        method == METHOD.GET && data
          ? `${url}${this.queryStringify(
            data as Record<string, string | number | boolean>,
          )}`
          : url,
      );
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.withCredentials = true;
      xhr.onload = function () {
        const response =
          xhr.responseText === 'OK'
            ? xhr.responseText
            : JSON.parse(xhr.response);
        if (xhr.status < 400) {
          resolve(response);
        } else {
          reject(response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      console.log(data);
      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
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
      return `${result}${enkey}=${enDatakey}${
        index < keys.length - 1 ? '&' : ''
      }`;
    }, '?');
  }
}
