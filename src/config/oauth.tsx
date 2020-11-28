const clientIdMap: { [key: string]: string } = {
  dev: '90f700c2634fcadd2084',
  prod: '1aeb61169dcca263aa3c',

};
const returnUrlMap: { [key: string]: string } = {
  prod: 'https://api.fzcode.com/auth/github',
  dev: 'http://127.0.0.1:9100/auth/github',
};
export const clientId = clientIdMap[mode];

export const returnUrl = returnUrlMap[mode];
