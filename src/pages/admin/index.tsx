import React, {useState} from 'react';
import {addColumn, getColumnList, IAddColumn, IColumn, IUpdateColumn, updateColumn} from '@/service/note';
import {useEffectOnce} from '@/hooks/common';
import {Button, Input, message, List, Modal, Form} from 'antd';
import {FormInstance} from 'antd/es/form';
import UploadSingleImg from '@/components/extended/upload/UploadSingleImg';
import styles from './index.less';
import {useLoadingWithGet} from '@/hooks/common/loading';
import UploadSingleImgWithCrop from '@/components/composite/upload/UploadSingleImgWithCrop';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const getColumnParams = {};
const Admin: React.FC = () => {
  // const [columns, setColumns] = useState<IColumn[]>([]);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [form] = Form.useForm<IAddColumn>();
  const [visible, setVisible] = useState(false);
  const [columns, loading, reloadColumns] = useLoadingWithGet<IColumn[]>(getColumnList, getColumnParams, []);
  const onFinish = async () => {
    await form.validateFields();
    console.log(form.getFieldsValue());
    const res = await addColumn(form.getFieldsValue());
    if (res) {
      setVisible(false);
      message.success('创建成功');
      await reloadColumns();
    }
  };
  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return <div className={`${styles.admin} flex`}>
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
      className={styles.list}
      header={<div>
        <Button onClick={onOpen}>添加</Button>
      </div>}
      pagination={false}
      dataSource={columns}
      renderItem={(item) => (
        <ListItem item={item} onSelected={setSelected} selected={selected || ''} reload={reloadColumns}/>
      )}
    />
  </div>;
};
const ListItem: React.FC<{ item: IColumn, selected: string, onSelected: (cid: string | undefined) => void, reload: () => void }> = (props) => {
  const onEdit = () => {
    props.onSelected(item.cid);
  };
  const onCancel = () => {
    props.onSelected(undefined);
  };

  const CommonActions = [
    <Button size='small' key='edit' onClick={onEdit}>修改</Button>,
    <Button size='small' type="primary" key='delete' danger={true}>删除</Button>,
  ];
  const item = props.item;
  const onSave = () => {
    props.onSelected(undefined);
    props.reload();
  };
  return props.selected == item.cid ? <ListItemEdit column={item} onSave={onSave} onCancel={onCancel}/> :
    <ListItemDetail column={item} actions={CommonActions}/>;
};

const ListItemDetail: React.FC<{ column: IColumn, actions: React.ReactNode[] }> = (props) => {
  return <List.Item
    key={props.column.cid}
    extra={
      <img
        width={224}
        alt="logo"
        src={props.column.img}
      />
    }
    actions={props.actions}
  >
    <List.Item.Meta
      title={props.column.title}
      description={props.column.description}
    />
    {props.column.detail}
  </List.Item>;
};
const listItemEditLayout = {
  labelCol: {span: 0},
  wrapperCol: {span: 24},
};
const ListItemEdit: React.FC<{ column: IColumn, onSave: () => void, onCancel: () => void }> = (props) => {
  const [form] = Form.useForm<Pick<IUpdateColumn, 'title' | 'description' | 'detail' | 'img'>>();
  const onFinish = async () => {
    const formData: Pick<IUpdateColumn, 'title' | 'description' | 'detail' | 'img'> = form.getFieldsValue();
    console.log(formData);
    //
    const res = await updateColumn({
      cid: props.column.cid,
      ...formData,
    });
    message.success(`更新成功:${res.text.data}`);
    props.onSave();
  };
  useEffectOnce(() => {
    console.log(props.column);
    form.setFieldsValue({
      title: props.column.title,
      description: props.column.description,
      detail: props.column.detail,
      img: props.column.img,
    });
  });
  const onUpload = (url: string) => {
    console.log('url', url);
    form.setFieldsValue({
      img: url,
    });
  };
  const onCancel = () => {
    props.onCancel();
  };
  return <Form {...listItemEditLayout} form={form} name="control-hooks" onFinish={onFinish}><List.Item
    key={props.column.cid}
    extra={
      // <UploadSingleImg >
      <Form.Item name='img'>
        <UploadSingleImgWithCrop onChange={onUpload}>
          <Form.Item
            noStyle={true}
            shouldUpdate={(prevValues, currentValues) => prevValues.img !== currentValues.img}
          >
            {({getFieldValue}) => {
              return <div className={styles.editImg} style={{backgroundImage: `url(${getFieldValue('img')})`}}/>;
            }}
          </Form.Item>

        </UploadSingleImgWithCrop>

      </Form.Item>
    }
    actions={[
      <Form.Item key='save'><Button size='small' htmlType="submit" type="primary">保存</Button></Form.Item>,
      <Button size='small' key='cancel' onClick={onCancel}>取消</Button>,
    ]}
  >
    <List.Item.Meta
      title={<Form.Item name="title" label="标题" rules={[{required: true}]}>
        <Input/>
      </Form.Item>}
      description={<Form.Item name="description" label="备注" rules={[{required: true}]}>
        <Input/>
      </Form.Item>}
    />
    <Form.Item name="detail" label="详情" rules={[{required: true}]}>
      <Input/>
    </Form.Item>
  </List.Item></Form>;
};
export default Admin;
const Add: React.FC<{ form: FormInstance<IAddColumn> }> = (props) => {
  return <Form {...layout} form={props.form} name="control-hooks">

    <Form.Item name="title" label="标题" rules={[{required: true}]}>
      <Input/>
    </Form.Item>
    <Form.Item name="description" label="备注" rules={[{required: true}]}>
      <Input/>
    </Form.Item>
    <Form.Item name="img" label="logo" rules={[{required: true}]}>
      <Input addonAfter={<UploadSingleImg onChange={(url) => props.form.setFieldsValue({img: url})}/>}/>
    </Form.Item>
    <Form.Item name="detail" label="详情" rules={[{required: true}]}>
      <Input.TextArea/>
    </Form.Item>
  </Form>;
};

