import React from 'react';
import { ProgressPlugin } from 'webpack';
import { EToolTag } from '../ToolsBar';
import Common from './components/Common';
// import styles from './ToolsBar.less';
const nodeList = [

];

const Handler: React.FC<{tag:EToolTag,visible:boolean}> = (props) => {
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
      onGroupClick={onGroupClick}
      tag={props.tag}
      visible={props.visible}
    />
  </div>;
};
export default Handler;
