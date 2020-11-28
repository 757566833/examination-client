import Http from '@/http';

export const base64Upload = (base64: string) => {
  const url = '/file/base64/upload';
  return Http.post(url, {base64, filename: 'what'});
};


