import {useState} from 'react';
import {IHttp, IHttpGet} from '@/http';

export const useLoading: <R extends IHttpGet<T>>(fetch: R, params: any) => any = (fetch, params) => {
  const [loading, setLoading] = useState(false);
  const http = async () => {
    setLoading(true);
    const res = await fetch(params);
    setLoading(false);
    return res;
  };
  return [http, loading];
};
