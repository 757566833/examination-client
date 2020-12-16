import Http, {IResponse} from '@/http';
import {ERegisterType} from '@/enum/auth';
import {IList} from '@/service/interface';

export const register = (params: { email: string, password: string, code: string, registerType: '1' | '2' }) => {
  const url = '/auth/register';
  return Http.post<IResponse<{ token: string }>>(url, params);
};

export const login = (email: string, password: string) => {
  const url = '/auth/login';
  return Http.post<IResponse<{ token: string }>>(url, {email, password});
};

export interface IAccount {
  account: string;
  avatar: string;
  // eslint-disable-next-line camelcase
  create_time: string;
  // eslint-disable-next-line camelcase
  delete_by: string;
  enabled: 1 | 0;
  expired: 1 | 0
  // eslint-disable-next-line camelcase
  github_url: string;
  // eslint-disable-next-line camelcase
  is_delete: 1 | 0;
  locked: 1 | 0
  // eslint-disable-next-line camelcase
  register_type: ERegisterType
  uid: number
  // eslint-disable-next-line camelcase
  update_by: string
  // eslint-disable-next-line camelcase
  update_time: string
  username: string
  authority: 'ADMIN' | 'USER'
}

export const getUserList = (params: { page: number, size: number }) => {
  const url = '/auth/admin/account';
  return Http.get<IResponse<IList<IAccount[]>>>(url, params);
};

export interface IUserInfo {
  account: string
  avatar: string
  // eslint-disable-next-line camelcase
  github_url: string
  // eslint-disable-next-line camelcase
  register_type: ERegisterType
  uid: number
  username: string
}

export const getSelfInfo = () => {
  const url = '/auth/self';
  return Http.get<IResponse<IUserInfo>>(url);
};
