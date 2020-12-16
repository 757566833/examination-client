import React, {useState} from 'react';
// import ScrollList from '@/components/composite/scrollList/ScrollList';
import styles from './index.less';
import {Button, Avatar, Card, Typography} from 'antd';
import {HighlightOutlined, SmileOutlined, SmileFilled} from '@ant-design/icons';
import {useHistory} from 'react-router';
import {useSocket} from '@/hooks/notHook/webSocket';
import {useLoading} from '@/hooks/common/loading';
import {getSelfInfo, IUserInfo} from '@/service/auth';
import {useEffectOnce} from '@/hooks/common';


const Center: React.FC = () => {
  const his = useHistory();
  const goCreate = () => {
    his.push('/note/create');
  };
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    account: '',
    avatar: 'string',
    github_url: 'string',
    register_type: 1,
    uid: -1,
    username: '',
  });

  const [socket] = useSocket();
  socket.on('connect', () => {
    console.log('socket.id:' + socket.id);
  });
  socket.on('login', (data: any) => {
    console.log('login' + data?.token);
  });
  const [loadSelf, loading] = useLoading(getSelfInfo);
  const getData = async () => {
    const res = await loadSelf();
    setUserInfo(res.data);
  };
  useEffectOnce(() => {
    getData().then();
  });

  return <div className={`${styles.center} flex`}>

    <div className={`${styles.body} flex`}>
      <div className={styles.list}>
        {/* <ScrollList<IText[]> getData={getList}/>*/}
      </div>
      <div className={styles.panel}>
        <Card loading={loading}>
          <Avatar size={64} src={userInfo.avatar}/>
          <Typography.Paragraph>
            {userInfo.username}
          </Typography.Paragraph>
          <Typography.Paragraph>
            {userInfo.github_url}
          </Typography.Paragraph>

          <div><Button type="primary" onClick={goCreate}>写文章</Button></div>
        </Card>
      </div>
    </div>
  </div>;
};
export default Center;
