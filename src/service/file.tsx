import Http from '@/http';

export const base64Upload = (base64: string) => {
  const url = '/file/upload/base64';
  return Http.post(url, {base64, filename: 'what'});
};


export const formDataUpload = (formData: FormData) => {
  const url = '/file/upload/form';
  return Http.postForm(url, formData);
};
