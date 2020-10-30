import Http, {IResponse} from '@/http';

export const register = (email: string, password: string, code: string, registerType: 1 | 2) => {
  const url = '/auth/register';
  return Http.post<IResponse<{ token: string }>>(url, {email, password, code, registerType});
};

export const login = (email: string, password: string) => {
  const url = '/auth/login';
  return Http.post<IResponse<{ token: string }>>(url, {email, password});
};
