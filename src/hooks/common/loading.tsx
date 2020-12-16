import {useState} from 'react';
import {IFetchRes, IResponse} from '@/http';
import {message} from 'antd';
import {getErrorMessage} from '@/util/httpError';


export const useLoading: <T>(fetch: (params: any) => Promise<IFetchRes<IResponse<T>>>) => [(params?: any) => Promise<IResponse<T>>, boolean] = (fetch) => {
  const [loading, setLoading] = useState(false);

  const http = async (params = {}) => {
    setLoading(true);
    const res = await fetch(params || {});
    setLoading(false);
    if (res.status < 200 || res.status >= 300) {
      message.error(getErrorMessage(res.status));
      throw Error(res.text as any);
    }
    return res.text;
  };
  return [http, loading];
};

// 未完成！！！！
export const useLoadingWithFormData: <T>(fetch: (params: FormData) => Promise<IFetchRes<IResponse<T>>>) => [(params: any) => Promise<IResponse<T>>, boolean] = (fetch) => {
  const [loading, setLoading] = useState(false);

  const http = async (params: FormData) => {
    setLoading(true);
    const res = await fetch(params);
    setLoading(false);
    if (res.status < 200 || res.status >= 300) {
      message.error(getErrorMessage(res.status));
      throw Error(res.text as any);
    }
    return res.text;
  };
  return [http, loading];
};
