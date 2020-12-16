import moment from 'moment';

export const dateRender = (str: string) => {
  if (!str) {
    return '';
  }
  return moment(str).format('YYYY-MM-DD');
};

export const timeRender = (str: string) => {
  if (!str) {
    return '';
  }
  return moment(str).format('YYYY-MM-DD h:mm:ss');
};
