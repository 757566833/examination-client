import {useState, useCallback} from 'react';
import {IFetchRes, IResponse} from '@/http';
import {useEffectOnce} from '@/hooks/common/index';

/**
 * 期望每一个useLoading是唯一的，不可以通过控制fetch来改变useLoading
 * params 不可以是匿名变量
 * @param {Object} fetch
 * @param {Object} params
 * @param {Object} defaultRes
 * @return {Object} array
 */
export const useLoadingWithGet: <T>(fetch: (params: any) => Promise<IFetchRes<IResponse<T>>>, params: any, defaultRes: T) => [T, boolean, any] = (fetch, params, defaultRes) => {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(defaultRes);
  const http = useCallback(async () => {
    setLoading(true);
    const res = await fetch(params);
    setLoading(false);
    if (res.status < 200 || res.status >= 300) {
      throw Error(res.text as any);
    }
    setRes(res.text.data);
    // 这里我希望每个fetch是不可变更的
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffectOnce(() => {
    http().then();
  });
  return [res, loading, http];
};

export const useLoadingWithOther: <T>(fetch: (params: any) => Promise<IFetchRes<IResponse<T>>>) => [(params: any) => Promise<IResponse<T>>, boolean] = (fetch) => {
  const [loading, setLoading] = useState(false);

  const http = async (params?: any) => {
    setLoading(true);
    const res = await fetch(params || {});
    setLoading(false);
    if (res.status < 200 || res.status >= 300) {
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
      throw Error(res.text as any);
    }
    return res.text;
  };
  return [http, loading];
};
