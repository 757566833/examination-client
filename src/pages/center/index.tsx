import React from 'react';
import ScrollList from '@/components/composite/scrollList/ScrollList';
import UploadSingleImgWithCrop from '@/components/composite/upload/UploadSingleImgWithCrop';
import styles from './index.less';
import {Button} from 'antd';
import {getList} from '@/service/note';
import {INote} from '@/service/note';
import {useHistory} from 'react-router';
import {useSocket} from '@/hooks/notHook/webSocket';


const listData: any = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const Center: React.FC = () => {
  const his = useHistory();
  const goCreate = () => {
    his.push('/note/create');
  };

  const [socket] = useSocket();
  socket.on('connect', () => {
    console.log('socket.id:' + socket.id);
  });
  socket.on('login', (data: any) => {
    console.log('login' + data?.token);
  });

  return <div className={`${styles.center} flex`}>

    <div className={`${styles.body} flex`}>
      <div className={styles.list}>
        <ScrollList<INote> getData={getList}/>
      </div>
      <div className={styles.panel}>
        <div><Button type="primary" onClick={goCreate}>写文章</Button></div>
      </div>
      <UploadSingleImgWithCrop/>
    </div>
  </div>;
};
export default Center;
