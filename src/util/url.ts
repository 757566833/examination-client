import * as H from 'history';

export const getParams: <T extends { [key: string]: string }>(urlSearch: H.Search) => T = (urlSearch) => {
  const search = decodeURI(urlSearch);
  const jsonStr = search.slice(1);
  const jsonArray = jsonStr.split('&');
  const json: any = {};
  for (const jsonItem of jsonArray) {
    const [key, value] = jsonItem.split('=');
    json[key] = value;
  }
  return json;
};
