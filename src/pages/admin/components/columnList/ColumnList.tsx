import React, {useState} from 'react';
import {Button, Form, List, message, Modal} from 'antd';
import Add from './components/Add';
import ListItem from './components/ListItem';
import {addColumn, getColumnList, IAddColumn, IColumn} from '@/service/note';
import {useLoading} from '@/hooks/common/loading';
import {useEffectOnce} from '@/hooks/common';

const ColumnList: React.FC = () => {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [form] = Form.useForm<IAddColumn>();
  const [visible, setVisible] = useState(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [loadColumns, loading] = useLoading<IColumn[]>(getColumnList);
  const onFinish = async () => {
    await form.validateFields();
    console.log(form.getFieldsValue());
    const res = await addColumn(form.getFieldsValue());
    if (res) {
      setVisible(false);
      message.success('创建成功');
      const res = await loadColumns();

      setColumns(res.data);
    }
  };
  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const getData =async ()=>{
    const res = await loadColumns();

    setColumns(res.data);
  };
  useEffectOnce(() => {
    getData().then();
  });
  return <div>
    <Modal
      title="添加分类"
      visible={visible}
      onOk={onFinish}
      onCancel={onClose}
      destroyOnClose={true}
    >
      <Add form={form}/>
    </Modal>
    <List
      loading={loading}
      itemLayout="vertical"
      size="large"
      // className={styles.list}
      header={<div>
        <Button onClick={onOpen}>添加</Button>
      </div>}
      pagination={false}
      dataSource={columns}
      renderItem={(item) => (
        <ListItem item={item} onSelected={setSelected} selected={selected || ''} reload={loadColumns}/>
      )}
    />
  </div>;
};
export default ColumnList;
