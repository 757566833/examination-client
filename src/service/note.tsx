import Http, {IResponse} from '@/http';
import {IList} from '@/service/interface';

export interface IText {
  tid: number;
  avatar: string;
  username: string;
  category: string;
  title: string;
  description: string;
  subTitle: string;
  text: string;
  tags: string[];
  // eslint-disable-next-line camelcase
  create_time: string
  // eslint-disable-next-line camelcase
  update_time: string
}

export const getList = (params: { page: number, size: number }) => {
  const url = '/note/text/list';
  return Http.get<IResponse<IList<IText>>>(url, params);
};

export const addNote = (note: Pick<IText, 'title' | 'description' | 'subTitle' | 'text' | 'tags'>) => {
  const url = '/note/text/create';
  return Http.post<IResponse<{ tid: number }>>(url, note);
};

export const update = (id: number | string, note: Partial<IText>) => {
  const url = `/note/text/update/${id}`;
  return Http.put<IResponse<{ nid: number }>>(url, note);
};

export const patch = (id: number | string, note: Partial<IText>) => {
  const url = `/note/text/patch/${id}`;
  return Http.put<IResponse<{ nid: number }>>(url, note);
};
export const del = (id: string) => {
  const url = `/note/text/delete/${id}`;
  return Http.delete<IResponse<{ nid: number }>>(url);
};
export const getNoteById = (id: string) => {
  const url = `/note/text/get/${id}`;
  return Http.get<IResponse<IText>>(url);
};

/**
 * 文章分类的属性，会出现在主页
 */
export interface IColumn {
  cid: string,
  title: string,
  description: string,
  img: string,
  detail: string,
}


export type IAddColumn = Pick<IColumn, 'title' | 'description' | 'img' | 'detail'>
export type IUpdateColumn = IColumn
export type IPatchColumn = Partial<IColumn> & Pick<IColumn, 'cid'>

export const getColumnList = () => {
  const url = `/note/column/list`;
  return Http.get<IResponse<IColumn[]>>(url);
};
export const getColumnById = (id: string) => {
  const url = `/note/column/id/${id}`;
  return Http.get<IResponse<IColumn>>(url);
};
export const addColumn = (column: IAddColumn) => {
  const url = `/note/column/add`;
  return Http.post<IResponse<string>>(url, column);
};
export const updateColumn = (column: IUpdateColumn) => {
  const url = `/note/column/update`;
  return Http.put<IResponse<string>>(url, column);
};
export const patchColumn = (column: IPatchColumn) => {
  const url = `/note/column/add`;
  return Http.patch<IResponse<string>>(url, column);
};
export const delColumn = (id: string) => {
  const url = `/note/column/add`;
  return Http.delete<IResponse<string>>(url, {cid: id});
};
