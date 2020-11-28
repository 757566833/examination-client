import React, {useEffect, useState} from 'react';
import {Button, Modal, Tabs, Space, Tooltip} from 'antd';
import GithubLogo from '@/asset/login/github.svg';
import styles from './index.less';
import Register from './components/register';
import Login from './components/login';
import {useLocalStorage} from '@/hooks/context';
import {useHistory} from 'react-router';
import {useSocket} from '@/hooks/notHook/webSocket';
import {clientId, returnUrl} from '@/config/oauth';

const UserCenter: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const onCancel = () => {
    setVisible(false);
  };
  const onOk = () => {
    setVisible(false);
  };
  const onShow = () => {
    setVisible(true);
  };
  const [token] = useLocalStorage('token');
  const his = useHistory();
  const goCenter = () => {
    his.push('/center');
  };

  return <div>
    {token ? <Button type="link" onClick={goCenter}>个人中心</Button> : <Button type="link" onClick={onShow}>登陆</Button>}
    <Modal
      // title="请选择登陆方式"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      // closable={false}
      destroyOnClose={true}
      maskClosable={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <Tabs
        defaultActiveKey="login"
        centered={true}
        // keyboard={false}
      >
        <Tabs.TabPane tab="登陆1" key="login">
          <div className={`${styles.login}`}>
            <Login onSuccess={onCancel}/>

            <Space
              className={`max_width ${styles.oauth2_icons}`}
              align="baseline"
            >

              <GithubLogin close={onOk}/>

            </Space>
            <div className="height_24"/>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="注册" key="register">

          <div className={`${styles.register}`}>
            <Register onSuccess={onCancel}/>
          </div>
        </Tabs.TabPane>
      </Tabs>

    </Modal>
  </div>;
};
export default UserCenter;
const openWindow = (url: string, width: number, height: number, name: string) => {
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  const newWin = window.open(url, name, 'left=' + left + ',top=' + top + ',width=' + width + ',height=' + height + ',');
  newWin?.focus();
  return newWin;
};
//
// OpenWindow("aa.aspx",300,200);
const GithubLogin: React.FC<{ close: () => void }> = (props) => {
  const {close} = props;
  const [socket] = useSocket();
  const [, setToken] = useLocalStorage('token');
  const githubLogin = () => {
    openWindow(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user user:email&redirect_uri=${returnUrl}?socketId=${socket.id}`, 600, 800, '登陆');
  };
  useEffect(() => {
    // socket.offAny();
    socket.on('login', (data: any) => {
      console.log('接收到了token:' + data.token);
      setToken(data.token);
      close();
    });
    return () => {
      socket.off('login');
    };
  }, [close, setToken, socket]);


  return <Tooltip title="github登陆">
    <img
      width={28}
      height={28}
      alt="github登陆"
      src={GithubLogo}
      onClick={githubLogin}
    />
  </Tooltip>;
};
