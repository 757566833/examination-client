import Http, {IResponse} from '@/http';

export const sendEmail = (params: { email: string }) => {
  const url = '/mail/register';
  return Http.post<IResponse<string>>(url, params);
};


