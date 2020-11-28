const httpUrlMap: { [key: string]: string } = {
  prod: '//api.fzcode.com',
  dev: '//127.0.0.1:9100',
};
const websocketUrlMap: { [key: string]: string } = {
  prod: '//websocket.fzcode.com',
  dev: '//127.0.0.1:9799',
};
export const httpUrl = httpUrlMap[mode];
export const websocketUrl = websocketUrlMap[mode];
