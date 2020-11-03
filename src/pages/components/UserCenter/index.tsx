import React, {useState} from 'react';
import {Button, Modal, Tabs, Space, Tooltip} from 'antd';
import GithubLogo from '@/asset/login/github.svg';
import styles from './index.less';
import Register from './components/register';
import Login from './components/login';
import {useLocalStorage} from '@/hooks/context';
import {useHistory} from 'react-router';

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
        <Tabs.TabPane tab="登陆" key="login">
          <div className={`${styles.login}`}>
            <Login onSuccess={onCancel}/>

            <Space
              className={`max_width ${styles.oauth2_icons}`}
              align="baseline"
            >
              <Tooltip title="github登陆">
                <img width={28} height={28} alt="github登陆" src={GithubLogo}/>
              </Tooltip>
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
