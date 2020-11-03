import Http from '@/http';

export const sendEmail = (email: string) => {
  const url = '/mail/register';
  return Http.post(url, {email});
};


