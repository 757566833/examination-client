import React, {useState} from 'react';
import MarkdownEditor from '@/components/composite/markdownEditor/MarkdownEditor';
import {markdownDefaultValue} from '@/config/defaultValue';
import {Button, Form, Input, message, Modal, Select, Spin} from 'antd';
import {
  ReloadOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import {FormInstance} from 'antd/lib/form/hooks/useForm';
import {useColumns} from '@/hooks/remote/Columns';
import InputTag from '@/components/composite/InputTag';
import {addNote} from '@/service/note';
import {useLoading} from '@/hooks/common/loading';

const Create: React.FC = () => {
  const [form] = Form.useForm();
  const [confirmForm] = Form.useForm<{ cid: string, tags: string[] }>();
  const [visible, setVisible] = useState(false);
  const [saveNote, loading] = useLoading<{ tid: number }>(addNote);
  const nextStep = () => {
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
    confirmForm.resetFields();
  };
  const save = async () => {
    const res = await saveNote({
      ...form.getFieldsValue(),
      ...confirmForm.getFieldsValue(),
    });
    message.success(res.message);
    setVisible(false);
  };
  return <div className={styles.create}>
    <Modal
      visible={visible}
      destroyOnClose={true}
      closeIcon={false}
      maskClosable={false}
      onCancel={onCancel}
      title="分类和标签"
      onOk={save}
      confirmLoading={loading}
    >
      <SaveModal form={confirmForm}/>
    </Modal>
    <Form form={form}>
      <Form.Item
        noStyle={true}
        name="title"
        wrapperCol={{span: 24}}
        labelCol={{span: 0}}
        label="title"
        rules={[{required: true}]}
      >
        <Input className={styles.textarea} placeholder={'标题'}/>
      </Form.Item>
      <Form.Item
        noStyle={true}
        name="text"
        wrapperCol={{span: 24}}
        labelCol={{span: 0}}
        label="text"
        rules={[{required: true}]}
      >
        <MarkdownEditor/>
      </Form.Item>

      <Button type="primary" onClick={nextStep}>
        下一步
      </Button>
    </Form>
    {/* <MarkdownEditor value={text} onChange={setText}/>*/}
    {/* <Line/>*/}
    {/* <div className={`flex ${styles.tags}`}>*/}
    {/*  <Input className={styles.input}*/}
    {/*    addonAfter={<Button size='small' onClick={() => setTags([...tags, 'dsa'])}>添加</Button>}/>*/}
    {/*  <div className={styles.list}>*/}
    {/*    {tags.map((item, index) => <Tag key={index}>{item}</Tag>)}*/}
    {/*  </div>*/}
    {/* </div>*/}
    {/* <Button>保存</Button>*/}
  </div>;
};
export default Create;

const SaveModal: React.FC<{ form: FormInstance<any> }> = (props) => {
  const [columns, reload, loading] = useColumns();
  return <Form form={props.form}>
    <Form.Item name="cid" label="分类" rules={[{required: true}]}>
      <Select
        // loading={loading}
        suffixIcon={<ReloadOutlined spin={loading} onClick={reload}/>}
      >
        {columns.map((column) => {
          return <Select.Option key={column.cid} value={column.cid}>{column.title}</Select.Option>;
        })}
      </Select>
    </Form.Item>
    <Form.Item
      name="tags" label="标签" rules={[{required: true}]}
    >
      <InputTag/>
    </Form.Item>
  </Form>;
};
