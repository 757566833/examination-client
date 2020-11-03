import React, {useEffect, useRef, useState} from 'react';
import ScrollList from '@/components/composite/scrollList/ScrollList';
import styles from './index.less';
import {Button} from 'antd';
import {getList} from '@/service/elastic';
import {INote} from '@/service/elastic';
import {useHistory} from 'react-router';
import DragModal from '@/components/extended/dragModal/DragModal';
import G6, {Graph} from '@antv/g6';

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
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'Circle1',
      x: 150,
      y: 150,
    },
    {
      id: 'node2',
      label: 'Circle2',
      x: 400,
      y: 150,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};
const Center: React.FC = () => {
  const his = useHistory();
  const goCreate = () => {
    his.push('/note/create');
  };
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  let graph: Graph|null = null;
  if (!graph && ref.current) {
    graph = new G6.Graph({
      container: ref.current,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'circle',
        size: [100],
        color: '#5B8FF9',
        style: {
          fill: '#9EC9FF',
          lineWidth: 3,
        },
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 20,
          },
        },
      },
      defaultEdge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
    });
  }

  useEffect(() => {
    if (graph) {
      graph.data(data);
      graph.render();
    }
  }, [graph]);
  // useEffect(() => {
  //
  // }, []);

  return <div className={`${styles.center} flex`}>
    <DragModal visible={visible} onCancel={() => setVisible(false)}>
      <div ref={ref}></div>
    </DragModal>
    <div className={`${styles.body} flex`}>
      <div className={styles.list}>
        <ScrollList<INote> getData={getList}/>
      </div>
      <div className={styles.panel}>
        <div><Button type="primary" onClick={goCreate}>写文章</Button></div>
        <Button onClick={() => setVisible(true)}>test</Button>
      </div>
    </div>
  </div>;
};
export default Center;
