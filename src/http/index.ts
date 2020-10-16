import {message, Modal} from 'antd';

/**
 *
 * @param {number} statusCode 错误码
 * @return {string} 错误描述
 */
function getErrorMessage(statusCode: number): string | undefined {
  const statusMsgMap: { [propsName: string]: string } = {
    400: '请求的参数错误，请稍后重试（400 Bad Request）',
    401: '用户未登录或登录已失效（401 Unauthorized）',
    403: '用户无权限（403 Forbidden）',
    404: '服务器发生了一个错误，请稍后重试（404 Not Found）',
    405: '请求的方法不允许（405 Method Not Allowed）',
    406: '无法访问（406 Not Acceptable）',
    407: '代理服务器未认证（407 Proxy Authentication Required）',
    408: '请求超时，请稍后重试（408 Request Timeout）',
    409: '请求冲突，请稍后重试（409 Conflict）',
    410: '请求的资源已经不存在（410 Gone）',
    417: '请求的参数错误，请稍后重试（417 Expectation Failed）',
    500: '服务器发生了一个错误，请稍后重试（500 Internal Server Error）',
    501: '服务未实现（501 Not Implemented）',
    502: '网关错误（502 Bad Gateway）',
    503: '服务器发生了一个错误，请稍后重试（503 Service Unavailable）',
    504: '请求超时，请稍后重试（504 Gateway Timeout）',
    505: '请求的参数错误，请稍后重试（505 HTTP Version Not Supported）',
  };
  return statusMsgMap[statusCode];
}

const getRequestInit: (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  headers?: { [key: string]: string | number },
  body?: any) => RequestInit =
  (method, headers, body) => {
    const allHeaders: HeadersInit = {
      'Content-Type': 'application/json; charset=UTF-8',
      // 'Authorization': `Bearer ${localStorage.token}`,
      ...headers,
    };
    if (localStorage.token) {
      allHeaders['Authorization'] = `Bearer ${localStorage.token}`;
    }
    // const requestInit: RequestInit =

    return {
      method: method,
      headers: allHeaders,
      body: JSON.stringify(body),
    };
  };

export interface IHttp {
  get: <R>(url: string, parameter: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => Promise<{ headers: Headers, text: R } | undefined>,
  post: <R>(url: string, parameter: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => Promise<{ headers: Headers, text: R } | undefined>,
  put: <R>(url: string, parameter: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => Promise<{ headers: Headers, text: R } | undefined>,
  delete: <R>(url: string, parameter: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => Promise<{ headers: Headers, text: R } | undefined>,
}

export type IHttpFetch = <R>(requestUrl: string, requestInit: RequestInit) => Promise<{ headers: Headers, text: R } | undefined>

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};
export const logoutWarning = () => {
  Modal.warning({
    content: '您的账号已下线，请重新登录',
    onOk: () => {
      logout();
    },
  });
};
const httpFetch: IHttpFetch = async <R>(requestUrl: string, requestInit: RequestInit) => {
  const response: Response = await fetch(requestUrl, requestInit);
  if (response.status >= 200 && response.status < 300) {
    const headers: Headers = response.headers;
    const responseStr = await response.text();
    let text: R;
    try {
      text = eval(`(${responseStr})`) as R;
    } catch (error) {
      text = responseStr as any;
    }
    const res: { headers: Headers, text: R } = {
      headers,
      text,
    };
    return res;
  } else if (response.status == 401) {
    logoutWarning();
    return undefined;
  } else {
    message.error(getErrorMessage(response.status));
    return undefined;
  }
};
export const Http: IHttp = {
  get: async <R>(url: string, parameter: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => {
    let parameterStr = '?';
    if (parameter) {
      for (const key in parameter) {
        if (parameter.hasOwnProperty(key)) {
          parameterStr += (key + '=' + parameter[key] + '&');
        }
      }
    }
    parameterStr = parameterStr.substr(0, parameterStr.length - 1);
    const requestUrl = url + parameterStr;
    const requestInit: RequestInit = getRequestInit('GET', headers);
    const result: { headers: Headers, text: R } | undefined = await httpFetch<R>(requestUrl, requestInit);
    return result;
  },
  post: async <R>(url: string, parameter: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => {
    const requestInit: RequestInit = getRequestInit('POST', headers, parameter);
    const result: { headers: Headers, text: R } | undefined = await httpFetch<R>(url, requestInit);
    return result;
  },
  put: async <R>(url: string, parameter: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => {
    const requestInit: RequestInit = getRequestInit('PUT', headers, parameter);
    const result: { headers: Headers, text: R } | undefined = await httpFetch<R>(url, requestInit);
    return result;
  },
  delete: async <R>(url: string, parameter: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => {
    const requestInit: RequestInit = getRequestInit('DELETE', headers, parameter);
    const result: { headers: Headers, text: R } | undefined = await httpFetch<R>(url, requestInit);
    return result;
  },
};
export default Http;
