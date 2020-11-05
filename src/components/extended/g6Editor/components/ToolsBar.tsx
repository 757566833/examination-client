import React, {useState} from 'react';
import styles from './ToolsBar.less';
import Nodes, {ENode} from './components/Nodes';

export enum EToolTag {
  操作 = 'handler',
  节点 = 'node',
  线 = 'edge',
}

export interface IToolGroup {
  tag: EToolTag,
  visible: boolean,
  onGroupClick: (tag: EToolTag) => void
  onSelect: (selected: ENode, type: EToolTag) => void
}

const ToolsBar: React.FC<{ onSelect: (selected: ENode, type: EToolTag) => void }> = (props) => {
  const [active, setActive] = useState<null | EToolTag>();
  const onGroupClick = (tag: EToolTag) => {
    setActive(tag);
  };
  const onSelect = (selected: ENode, type: EToolTag) => {
    props.onSelect(selected, type);
  };

  return <div className={styles.toolsBar}>
    <Nodes
      tag={EToolTag.节点}
      visible={active == EToolTag.节点}
      onGroupClick={onGroupClick}
      onSelect={onSelect}
    />
  </div>;
};
export default ToolsBar;
