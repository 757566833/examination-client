import React from 'react';
import ScrollList from '@/components/composite/ScrollList';
import styles from './index.less';
import {Button} from 'antd';
import {getList} from '@/service/elastic';
import {INote} from '@/service/elastic';
import {useHistory} from 'react-router';

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
  return <div className={`${styles.center} flex`}>
    <div className={`${styles.body} flex`}>
      <div className={styles.list}>
        <ScrollList<INote> getData={getList}/>
      </div>
      <div className={styles.panel}>
        <div><Button type="primary" onClick={goCreate}>写文章</Button></div>
      </div>
    </div>
  </div>;
};
export default Center;
