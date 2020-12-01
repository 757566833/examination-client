import {Modal} from 'antd';
import {httpUrl} from '@/config/url';

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

const getRequestInit: (method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', headers?: { [key: string]: string | number }, body?: any) => RequestInit = (method, headers, body) => {
  const allHeaders: HeadersInit = {
    'Content-Type': 'application/json; charset=UTF-8',
    // 'Authorization': `Bearer ${localStorage.token}`,
    ...headers,
  };
  if (localStorage.token) {
    allHeaders['Authorization'] = `${localStorage.token}`;
    // allHeaders['Authorization'] = `Bearer ${localStorage.token}`;
  }
  if (method == 'GET') {
    return {
      method: method,
      headers: allHeaders,
      // body: JSON.stringify(body),
    };
  }
  return {
    method: method,
    headers: allHeaders,
    body: JSON.stringify(body),
  };
};
const getRequestFormInit: (method: 'POST' | 'PUT' | 'DELETE' | 'PATCH', body: FormData) => RequestInit = (method, body) => {
  const allHeaders: HeadersInit = {};
  if (localStorage.token) {
    allHeaders['Authorization'] = `${localStorage.token}`;
    // allHeaders['Authorization'] = `Bearer ${localStorage.token}`;
  }
  return {
    method: method,
    headers: allHeaders,
    body: body,
  };
};

export interface IResponse<T> {
  code: number,
  data: T,
  message: string
}

export type IFetchReqHeader = { [key: string]: string | number }
export type IFetchRes<R> = { headers: Headers, text: R, status: number }
export type IHttpGet = <R>(url: string, parameter?: { [key: string]: any }, headers?: IFetchReqHeader) => Promise<IFetchRes<R>>
export type IHttpPost = <R>(url: string, parameter?: { [key: string]: any }, headers?: IFetchReqHeader) => Promise<IFetchRes<R>>
export type IHttpPostFrom = <R>(url: string, parameter: FormData, headers?: undefined) => Promise<IFetchRes<R>>
export type IHttpPut = <R>(url: string, parameter?: { [key: string]: any }, headers?: IFetchReqHeader) => Promise<IFetchRes<R>>
export type IHttpPatch = <R>(url: string, parameter?: { [key: string]: any }, headers?: IFetchReqHeader) => Promise<IFetchRes<R>>
export type IHttpDelete = <R>(url: string, parameter?: { [key: string]: any }, headers?: IFetchReqHeader) => Promise<IFetchRes<R>>

export interface IHttp {
  get: IHttpGet,
  post: IHttpPost,
  postForm: IHttpPostFrom,
  put: IHttpPut,
  patch: IHttpPatch,
  delete: IHttpDelete,
}

export type IHttpFetch = <R>(requestUrl: string, requestInit: RequestInit) => Promise<IFetchRes<R>>

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};
let logoutWarn: ReturnType<typeof Modal.warning> | undefined = undefined;
const httpFetch: IHttpFetch = async <R>(requestUrl: string, requestInit: RequestInit) => {
  let url = requestUrl;
  if (!requestUrl.includes('http')) {
    url = httpUrl + requestUrl;
  }
  const response: Response = await fetch(url, requestInit);
  const headers: Headers = response.headers;
  const status = response.status;
  const responseStr = await response.text();
  if (status >= 200 && status < 300) {
    let text: R;
    try {
      text = eval(`(${responseStr})`) as R;
    } catch (error) {
      text = responseStr as any;
    }
    const res: { status: number, headers: Headers, text: R } = {
      status,
      headers,
      text,
    };
    return res;
  } else if (response.status == 401) {
    if (logoutWarn != undefined) {
      logoutWarn = Modal.warning({
        content: await response.text(),
        // content: '登录超时请重新登录！',
        okText: '确认',
        onOk: () => {
          localStorage.removeItem('token');
          // const revertUrl = encodeURIComponent(location.href);
          location.href = `/`;
        },
      });
    }
    const res: { status: number, headers: Headers, text: R } = {
      status,
      headers,
      text: getErrorMessage(response.status) as any,
    };
    return res;
    // throw new Error(getErrorMessage(response.status));
    // // return undefined;
  } else {
    const res: { status: number, headers: Headers, text: R } = {
      status,
      headers,
      text: getErrorMessage(response.status) as any,
    };
    return res;
  }
};
export const Http: IHttp = {
  get: async <R>(url: string, parameter?: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => {
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
    const result: IFetchRes<R> = await httpFetch<R>(requestUrl, requestInit);
    return result;
  },
  post: async <R>(url: string, parameter?: { [key: string]: any }, headers?: { [key: string]: string | number }) => {
    const requestInit: RequestInit = getRequestInit('POST', headers, parameter);
    const result: IFetchRes<R> = await httpFetch<R>(url, requestInit);
    return result;
  },
  postForm: async <R>(url: string, parameter: FormData) => {
    const requestInit: RequestInit = getRequestFormInit('POST', parameter);
    const result: IFetchRes<R> = await httpFetch<R>(url, requestInit);
    return result;
  },
  put: async <R>(url: string, parameter?: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => {
    const requestInit: RequestInit = getRequestInit('PUT', headers, parameter);
    const result: IFetchRes<R> = await httpFetch<R>(url, requestInit);
    return result;
  },
  patch: async <R>(url: string, parameter?: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => {
    const requestInit: RequestInit = getRequestInit('PATCH', headers, parameter);
    const result: IFetchRes<R> = await httpFetch<R>(url, requestInit);
    return result;
  },
  delete: async <R>(url: string, parameter?: { [key: string]: number | string }, headers?: { [key: string]: string | number }) => {
    const requestInit: RequestInit = getRequestInit('DELETE', headers, parameter);
    const result: IFetchRes<R> = await httpFetch<R>(url, requestInit);
    return result;
  },
};
export default Http;
