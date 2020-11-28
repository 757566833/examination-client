import React, {useState} from 'react';
import {addColumn, getColumnList, IColumn, patchColumn} from '@/service/note';
import {useEffectOnce} from '@/hooks/common';
import {Button, Input, message} from 'antd';

const Admin: React.FC = () => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [selected, setSelected] = useState<IColumn|undefined>(undefined);
  const getColumns = async () => {
    const res = await getColumnList();
    setColumns(res?.text.data || []);
  };
  useEffectOnce(() => {
    getColumns().then();
  });
  return <div>
    {columns.map((item) => {
      return <div key={item.cid} onClick={() => setSelected(item)}>{item.title}</div>;
    })}
    <Add/>
    <Edit column={selected}/>
  </div>;
};

export default Admin;
const Add: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [detail, setDetail] = useState('');
  const sub = async () => {
    const res = await addColumn({
      title, description, img, detail,
    });
    if (res?.text.code == 10000) {
      message.success('成功');
    }
  };
  return <div>
    <Input value={title} onChange={(e) => setTitle(e.target.value)} prefix={'标题'}/>
    <Input value={description} onChange={(e) => setDesc(e.target.value)} prefix={'备注'}/>
    <Input value={img} onChange={(e) => setImg(e.target.value)} prefix={'logo'}/>
    <Input.TextArea value={detail} onChange={(e) => setDetail(e.target.value)} prefix={'详情'}/>
    <Button onClick={sub}>添加</Button>
  </div>;
};
const Edit: React.FC<{ column?: IColumn }> = (props) => {
  const def: any = props.column || {};
  const [title, setTitle] = useState(def.title);
  const [description, setDesc] = useState(def.description);
  const [img, setImg] = useState(def.img);
  const [detail, setDetail] = useState(def.detail);
  const sub = async () => {
    const res = await patchColumn({
      cid: props.column?.cid,
      title, description, img, detail,
    });
    if (res?.text.code == 10000) {
      message.success('成功');
    }
  };
  return <div>
    <Input value={title} onChange={(e) => setTitle(e.target.value)} prefix={'标题'}/>
    <Input value={description} onChange={(e) => setDesc(e.target.value)} prefix={'备注'}/>
    <Input value={img} onChange={(e) => setImg(e.target.value)} prefix={'logo'}/>
    <Input.TextArea value={detail} onChange={(e) => setDetail(e.target.value)} prefix={'详情'}/>
    <Button onClick={sub} disabled={!props.column}>修改</Button>
  </div>;
};
