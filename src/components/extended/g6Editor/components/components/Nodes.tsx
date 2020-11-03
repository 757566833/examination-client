import React from 'react';
import Common from './components/Common';
// import styles from './ToolsBar.less';
const nodeList = [
  'data',
  'call-activity',
  'end-event-none',
  'triangle',
  'diamond',
];

const Nodes: React.FC = () => {
  const onClick = (name: string, node: string) => {
    console.log(name, node);
  };
  return <div>
    <Common
      name={'end-event-none'}
      desc={'节点'}
      type={'node'}
      list={nodeList}
      onClick={onClick}
    />
  </div>;
};
export default Nodes;
