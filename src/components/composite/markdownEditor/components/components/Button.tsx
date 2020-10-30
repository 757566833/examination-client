import React from 'react';
import styles from './Button.less';
import {Tooltip} from 'antd';

export type IButton = { name: string, desc: string, type: 'button' | 'line', onClick?: (name: string, value?: string) => void }
const Common: React.FC<IButton> = (props) => {
  const onClick = () => {
    props.onClick && props.onClick(props.name);
  };
  return <>
    <Tooltip title={props.desc}>
      <div className={styles.button} onClick={onClick}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#icon-${props.name}`}></use>
        </svg>
      </div>
    </Tooltip>
  </>;
};
const Vertical: React.FC = () => {
  return <div className={styles.vertical}/>;
};
const Button: React.FC<IButton> = (props) => {
  switch (props.type) {
    case 'line':
      return <Vertical/>;
    case 'button':
      return <Common {...props}/>;
    default:
      return <Common {...props}/>;
  }
};

export default Button;
