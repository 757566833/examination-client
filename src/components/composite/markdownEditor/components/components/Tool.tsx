import React, {useState} from 'react';
import styles from './Tool.less';
import {Tooltip} from 'antd';
import {ColorResult, PhotoshopPicker} from 'react-color';
import {EButtonName, IButtonCollection} from '@/components/composite/markdownEditor/components/ToolsBar';
import G6Editor from '@/components/extended/g6Editor/G6Editor';
import DragModal from '@/components/extended/dragModal/DragModal';

type IButton = {
  name: IButtonCollection,
  desc: string,
  type: 'button',
  onClick: (name: IButtonCollection) => void
}
type ILine = {
  type: 'line',
}
type IColor = {
  name: EButtonName.字体颜色,
  desc: string,
  type: 'color',
  onClick: (name: EButtonName.字体颜色, value: string) => void
}
type IFlow = {
  name: EButtonName.流程,
  desc: string,
  type: 'flow',
  onClick: (name: EButtonName.流程, value: string) => void
}
export type ITool = IButton | ILine | IColor | IFlow
const Common: React.FC<IButton> = (props) => {
  const onClick = () => {
    props.onClick && props.onClick(props.name);
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
  </>;
};
const Vertical: React.FC = () => {
  return <div className={styles.vertical}/>;
};

const Color: React.FC<IColor> = (props) => {
  const [color, setColor] = useState<string>('#000000');
  const [visible, setVisible] = useState(false);
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
  };
  const handleClick = () => {
    setVisible(true);
  };

  // const handleClose = () => {
  //   // this.setState({displayColorPicker: false});
  //   setVisible(false);
  // };

  const handleChange = (color: ColorResult) => {
    // this.setState({ color: color.rgb });
    setColor(color.hex);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const onAccept = () => {
    props.onClick(EButtonName.字体颜色, color);
  };
  return <>
    <Tooltip title={props.desc}>
      <div onMouseDown={onMouseDown} className={styles.button} onClick={handleClick}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#icon-${props.name}`}></use>
        </svg>
      </div>
    </Tooltip>
    <div style={{position: 'relative'}}>
      <div className={visible ? '' : 'disappear'} style={{position: 'absolute', zIndex: 300, top: 50}}>
        <PhotoshopPicker
          color={color}
          onChange={handleChange}
          onCancel={handleCancel}
          header='颜色选择'
          onAccept={onAccept}
        />
      </div>
    </div>
  </>;
};
const initFlowSize: [number, number] = [800, 600];
const Flow: React.FC<IFlow> = (props) => {
  const [size, setSize] = useState<[number, number]>(initFlowSize);

  const [visible, setVisible] = useState(false);
  const onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
  };
  const handleClick = () => {
    setVisible(true);
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onZoomEnd = (width: number, height: number) => {
    setSize([width, height]);
  };
  return <>
    <Tooltip title={props.desc}>
      <div
        onMouseDown={onMouseDown}
        className={styles.button}
        onClick={handleClick}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#icon-${props.name}`}></use>
        </svg>
      </div>
    </Tooltip>
    <div style={{position: 'relative'}}>
      <div style={{position: 'absolute', zIndex: 300, top: 50}}>
        <DragModal
          defaultSize={initFlowSize}
          visible={visible}
          onCancel={onCancel}
          onZoomEnd={onZoomEnd}
        >
          <G6Editor width={size[0]} height={size[1]}/>
        </DragModal>
      </div>
    </div>
  </>;
};
const Tool: React.FC<ITool> = (props) => {
  switch (props.type) {
    case 'line':
      return <Vertical/>;
    case 'button':
      return <Common {...props}/>;
    case 'color':
      return <Color {...props}/>;
    case 'flow':
      return <Flow {...props}/>;
    default:
      return <div/>;
  }
};

export default Tool;
