import React, {useState} from 'react';
import {Button, Modal, Card, Tabs, Space, Tooltip} from 'antd';
import GithubLogo from '@/asset/login/github.svg';
import styles from './index.less';
import Register from './components/register';
import Login from './components/login';

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
  return <div>
    <Button type="link" onClick={onShow}>登陆</Button>
    <Modal
      // title="请选择登陆方式"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      closable={false}
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
            <Login/>

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
            <Register/>
          </div>
        </Tabs.TabPane>
      </Tabs>

    </Modal>
  </div>;
};
export default UserCenter;
