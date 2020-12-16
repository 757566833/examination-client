import React, {useState} from 'react';
import {FormInstance} from 'antd/es/form';
import {IAddColumn} from '@/service/note';
import {Button, Form, Input} from 'antd';
import UploadSingleImg from '@/components/extended/upload/UploadSingleImg';
import UploadSingleImgWithCrop from '@/components/composite/upload/UploadSingleImgWithCrop';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const Add: React.FC<{ form: FormInstance<IAddColumn> }> = (props) => {
  const onUpload = (url: string) => {
    console.log('url', url);
    props.form.setFieldsValue({
      img: url,
    });
  };
  return <Form {...layout} form={props.form} name="control-hooks">

    <Form.Item name="title" label="标题" rules={[{required: true}]}>
      <Input/>
    </Form.Item>
    <Form.Item name="description" label="备注" rules={[{required: true}]}>
      <Input/>
    </Form.Item>
    <Form.Item name="img" label="logo" rules={[{required: true}]}>

      <UploadSingleImgWithCrop onChange={onUpload}>
        <Form.Item
          noStyle={true}
          shouldUpdate={(prevValues, currentValues) => prevValues.img !== currentValues.img}
        >
          {({getFieldValue}) => {
            return getFieldValue('img') ? <div
              // className={styles.editImg}
              style={{
                backgroundImage: `url(${getFieldValue('img')})`,
                height: 200,
                width: 200,
              }}/> : <Button>上传</Button>;
          }}
        </Form.Item>

      </UploadSingleImgWithCrop>
    </Form.Item>
    <Form.Item name="detail" label="详情" rules={[{required: true}]}>
      <Input.TextArea/>
    </Form.Item>
  </Form>;
};
export default Add;
