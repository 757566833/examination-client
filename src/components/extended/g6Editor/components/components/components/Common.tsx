import React from 'react';
import {Tooltip} from 'antd';
import styles from './Common.less';

type IButton = {
  name: string,
  desc: string,
  type: 'node' | 'line'
  list:string[]
  onClick: (name: string, type: string) => void

}
const Common: React.FC<IButton> = (props) => {
  const onClick = () => {
    props.onClick && props.onClick(props.name, props.type);
  };
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
  };
  return <>
    <Tooltip title={props.desc}>
      <div onMouseDown={onMouseDown} className={styles.button} onClick={onClick}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#icon-${props.name}`}></use>
        </svg>
      </div>
    </Tooltip>
    <div>
      {props.list}
    </div>
  </>;
};
export default Common;
