import Http, {IResponse} from '@/http';
import {IList} from '@/service/interface';

export interface INote {
  id: number;
  title: string;
  description: string;
  subTitle: string;
  text: string;
  tags: string[];
}

export const getList = (params: { page: number, size: number }) => {
  const url = '/elastic/note/list';
  return Http.get<IResponse<IList<INote>>>(url, params);
};

export const add = (note: Pick<INote, 'title' | 'description' | 'subTitle' | 'text' | 'tags'>) => {
  const url = '/elastic/note/list';
  return Http.post<IResponse<{ nid: number }>>(url, note);
};

export const update = (id: number | string, note: Partial<INote>) => {
  const url = `/elastic/note/update/${id}`;
  return Http.put<IResponse<{ nid: number }>>(url, note);
};

export const patch = (id: number | string, note: Partial<INote>) => {
  const url = `/elastic/note/patch/${id}`;
  return Http.put<IResponse<{ nid: number }>>(url, note);
};
export const del = (id: string) => {
  const url = `/elastic/note/delete/${id}`;
  return Http.delete<IResponse<{ nid: number }>>(url);
};
export const getById = (id: string) => {
  const url = `/elastic/note/delete/${id}`;
  return Http.get<IResponse<{ nid: number }>>(url);
};
