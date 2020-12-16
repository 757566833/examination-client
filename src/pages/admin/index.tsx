import React from 'react';

import {Tabs} from 'antd';
import {
  UserOutlined,
  MenuUnfoldOutlined,

} from '@ant-design/icons';

import styles from './index.less';
import ColumnList from '@/pages/admin/components/columnList/ColumnList';
import UserList from '@/pages/admin/components/userList/UserList';

const {TabPane} = Tabs;

const Admin: React.FC = () => {
  return <div className={`${styles.admin} flex`}>
    <Tabs className={styles.tabs}>
      <TabPane
        tab={
          <span>
            <UserOutlined/>
          用户列表
          </span>
        }
        key="1"
      >
        <UserList/>
      </TabPane>
      <TabPane
        tab={
          <span>
            <MenuUnfoldOutlined/>
          分类
          </span>
        }
        key="2"
      >
        <ColumnList/>
      </TabPane>
    </Tabs>

  </div>;
};


export default Admin;


