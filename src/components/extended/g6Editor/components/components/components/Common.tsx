import React from 'react';
import {Tooltip} from 'antd';
import styles from './Common.less';
import {EToolTag} from '../../ToolsBar';
import {ENode} from '../Nodes';

type IButton = {
  name: string,
  desc: string,
  type: EToolTag
  list: { name: ENode, desc: string }[]
  onClick: (name: ENode, type: EToolTag) => void
  onGroupClick?: (tag: EToolTag) => void
  visible: boolean
  tag: EToolTag
}
const Common: React.FC<IButton> = (props) => {
  const onGroupClick = () => {
    props.onGroupClick && props.onGroupClick(props.tag);
  };
  const onListClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const node = event.currentTarget.dataset.name as ENode;
    if (node) {
      props.onClick(node, props.tag);
    }
  };
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
  };
  return <div className={styles.group}>
    <Tooltip placement="right" title={props.desc}>
      <div onMouseDown={onMouseDown} className={styles.button} onClick={onGroupClick}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#icon-${props.name}`}></use>
        </svg>
      </div>
    </Tooltip>
    <div className={`${props.visible ? styles.list : 'disappear'}`}>
      {props.list.map((item, index) => {
        return <Tooltip placement="right" title={item.desc} key={index}>
          <div onMouseDown={onMouseDown} onClick={onListClick} data-name={item.name} className={styles.button}>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={`#icon-${item.name}`}></use>
            </svg>
          </div>
        </Tooltip>
        ;
      })}
    </div>
  </div>;
};
export default Common;
