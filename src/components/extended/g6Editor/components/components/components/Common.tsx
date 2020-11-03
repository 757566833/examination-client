import React from 'react';
import {Tooltip} from 'antd';
import styles from './Common.less';
import { EToolTag } from '../../ToolsBar';

type IButton = {
  name: string,
  desc: string,
  type: 'node' | 'line'
  list:string[]
  onClick: (name: string, type: string) => void
  onGroupClick? : (tag:EToolTag)=>void
  visible:boolean
  tag:EToolTag
}
const Common: React.FC<IButton> = (props) => {
  const onGroupClick = () => {
    props.onGroupClick && props.onGroupClick(props.tag);
  };
  const onListClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    console.log(event.currentTarget)
  }
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
  };
  return <div className={styles.group}>
    <Tooltip title={props.desc}>
      <div onMouseDown={onMouseDown} className={styles.button} onClick={onGroupClick}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#icon-${props.name}`}></use>
        </svg>
      </div>
    </Tooltip>
    <div onClick={onListClick} className={`${props.visible?styles.list:'disappear'}`}>
      {props.list.map((item,index)=>{
        return  <div onMouseDown={onMouseDown} key={index} data-name={item} className={styles.button}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#icon-${item}`}></use>
        </svg>
      </div>
      })}
    </div>
  </div>;
};
export default Common;
