import React, {useState} from 'react';
import {Form, Input, Button, message} from 'antd';
import {Store} from 'rc-field-form/lib/interface';
import {UserOutlined, LockOutlined, MessageOutlined} from '@ant-design/icons';
import styles from './index.less';
import {sendEmail} from '@/service/mail';
import {CountDown} from '@/components/custom/countDown/CountDown';
import {register} from '@/service/auth';
import {useLocalStorage} from '@/hooks/context';

const span0 = {
  span: 0,
};
const span24 = {
  span: 24,
};

const Register: React.FC<{ onSuccess: () => void }> = (props) => {
  const [isCountDown, setIsCountDown] = useState(false);
  const [codeFetching, setCodeFetching] = useState(false);
  const [registerFetching, setRegisterFetching] = useState(false);
  const [, setToken] = useLocalStorage('token');
  const [form] = Form.useForm();
  const onFinish = async (values: Store) => {
    console.log('Success:', values);
    setRegisterFetching(true);
    const res = await register(values.email, values.password, values.code, 2);
    setRegisterFetching(false);
    if (res) {
      message.success('注册成功');
      setToken(res.text.data.token);
      props.onSuccess();
    }
  };
  const getCode = async () => {
    setCodeFetching(true);
    const res = await sendEmail(form.getFieldValue('email'));
    setCodeFetching(false);
    if (res) {
      setIsCountDown(true);
    }
  };
  const countDownFinish = () => {
    setIsCountDown(false);
  };
  return (
    <Form
      labelCol={span0}
      wrapperCol={span24}
      name="register"
      form={form}
      onFinish={onFinish}
      preserve={false}
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
      <Form.Item className={`${styles.form_item_inline} flex`}>
        <Form.Item
          label="验证码"
          name="code"
          rules={[{required: true}]}
          className={styles.form_item_inline_block}
          labelCol={span0}
        >
          <Input
            prefix={<MessageOutlined className={styles.icon_color}/>}
            placeholder="验证码"
          />
        </Form.Item>
        <Form.Item
          className={styles.form_item_inline_block}
        >
          <Button loading={codeFetching} disabled={isCountDown} className="max_width" onClick={getCode}>
            {isCountDown ? <>重新发送验证码 <CountDown onFinish={countDownFinish}/></> : '发送验证码'}
          </Button>
        </Form.Item>
      </Form.Item>
      <Form.Item
        wrapperCol={span24}
        labelCol={span0}
      >
        <Button loading={registerFetching} type="primary" className="max_width" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Register;

