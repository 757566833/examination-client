import React,{useState} from 'react';
// import styles from './ToolsBar.less';
import Nodes from './components/Nodes';

export enum EToolTag{
  操作='handler',
  节点='node',
  线='edge',
}
const ToolsBar: React.FC = () => {
  const [selected,setSelected] = useState<null|EToolTag>();
  // const [active,setActive] = useState<null|EToolTag>();
  return <div>
    <Nodes 
      tag={EToolTag.节点}
      visible={selected==EToolTag.节点}
    />
  </div>;
};
export default ToolsBar;
