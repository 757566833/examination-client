import React from 'react';
import {Form, Input, Checkbox, Button} from 'antd';
import {Store} from 'rc-field-form/lib/interface';
import {UserOutlined, LockOutlined, MessageOutlined} from '@ant-design/icons';
import styles from './index.less';

const span0 = {
  span: 0,
};
const span24 = {
  span: 24,
};

const Register: React.FC = () => {
  const onFinish = (values: Store) => {
    console.log('Success:', values);
  };
  return (
    <Form
      labelCol={span0}
      wrapperCol={span24}
      name="basic"
      onFinish={onFinish}
    >
      <Form.Item
        // label="邮箱"
        name="username"
        rules={[{required: true, message: 'Please input your username!'}]}
      >
        <Input
          prefix={<UserOutlined className={styles.icon_color}/>}
          placeholder="邮箱"
        />
      </Form.Item>

      <Form.Item
        // label="密码"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password
          prefix={<LockOutlined className={styles.icon_color}/>}
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item style={{marginBottom: 0}}>
        <Form.Item
          name="year"
          rules={[{required: true}]}
          style={{display: 'inline-block', width: 'calc(60% - 8px)'}}
        >
          <Input
            prefix={<MessageOutlined className={styles.icon_color}/>}
            placeholder="验证码"
          />
        </Form.Item>
        <Form.Item
          style={{display: 'inline-block', width: 'calc(40% - 8px)', margin: '0 8px'}}
        >
          <Button className="max_width">发送验证码</Button>
        </Form.Item>
      </Form.Item>
      <Form.Item
        wrapperCol={span24}
        labelCol={span0}
      >
        <Button type="primary" className="max_width" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Register;
