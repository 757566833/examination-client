import React, {useState} from 'react';
import {getColumnList, IColumn} from '@/service/note';
import {useEffectOnce} from '@/hooks/common';

export const useColumns: () => [IColumn[], () => Promise<void>, boolean] = () => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const res = await getColumnList();
    setLoading(false);
    setColumns(res.text.data);
  };
  useEffectOnce(() => {
    getData().then();
  });
  return [columns, getData, loading];
};
