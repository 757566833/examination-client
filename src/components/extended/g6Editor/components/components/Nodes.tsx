import React from 'react';
import Common from './components/Common';
// import styles from './ToolsBar.less';
import {EToolTag} from '../ToolsBar'
const nodeList = [
  'data',
  'call-activity',
  'end-event-none',
  'triangle',
  'diamond',
];

const Nodes: React.FC<{tag:EToolTag,visible:boolean}> = (props) => {
  const onClick = (name: string, node: string) => {
    console.log(name, node);
  };
  const onGroupClick = ()=>{

  }
  return <div>
    <Common
      name={'end-event-none'}
      desc={'节点'}
      type={'node'}
      list={nodeList}
      onClick={onClick}
      tag={props.tag}
      visible={props.visible}
    />
  </div>;
};
export default Nodes;
