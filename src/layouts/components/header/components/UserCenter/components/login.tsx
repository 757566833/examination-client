import React, {useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {Store} from 'rc-field-form/lib/interface';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import styles from './index.less';
import {login} from '@/service/auth';
import {useLocalStorage} from '@/hooks/context';

const span0 = {
  span: 0,
};
const span24 = {
  span: 24,
};

const Login: React.FC<{ onSuccess: () => void }> = (props) => {
  const [, setToken] = useLocalStorage('token');
  const [logging, setLogging] = useState(false);
  const onFinish = async (values: Store) => {
    console.log('Success:', values);
    message.success('登陆');
    setLogging(true);
    const res = await login(values.email, values.password);
    setLogging(false);
    if (res) {
      setToken(res.text.data.token);
      props.onSuccess();
    }
  };
  return (
    <Form
      labelCol={span0}
      wrapperCol={span24}
      name="basic"
      onFinish={onFinish}
    >
      <Form.Item
        label="邮箱"
        name="email"
        rules={[{required: true}, {type: 'email'}]}
      >
        <Input
          prefix={<UserOutlined className={styles.icon_color}/>}
          placeholder="邮箱"
        />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{required: true}]}
      >
        <Input.Password
          prefix={<LockOutlined className={styles.icon_color}/>}
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
        wrapperCol={span24}
        labelCol={span0}
      >
        <Button type="primary" loading={logging} className="max_width" htmlType="submit">
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
