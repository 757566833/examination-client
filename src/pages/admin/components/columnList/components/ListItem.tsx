import React from 'react';
import {IColumn, IUpdateColumn, updateColumn} from '@/service/note';
import {Button, Form, Input, List, message} from 'antd';
import {useEffectOnce} from '@/hooks/common';
import UploadSingleImgWithCrop from '@/components/composite/upload/UploadSingleImgWithCrop';
// import styles from '@/pages/admin/index.less';

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
export default ListItem;
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
              return <div
                // className={styles.editImg}
                style={{
                  backgroundImage: `url(${getFieldValue('img')})`,
                  height: 200,
                  width: 200,
                }}/>;
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
