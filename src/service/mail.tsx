import Http from '@/http';

export const sendEmail = (email:string) => {
  const url = 'http://127.0.0.1:9000/mail/sendEmail';
  return Http.post(url, {email});
};

