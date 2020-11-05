import React from 'react';
import Common from './components/Common';
import styles from './Nodes.less';
import {EToolTag, IToolGroup} from '../ToolsBar';
import circle from '@/asset/antv/circle.svg';
import ellipse from '@/asset/antv/ellipse.svg';
import rect from '@/asset/antv/rect.svg';
import diamond from '@/asset/antv/diamond.svg';
import star from '@/asset/antv/star.svg';
import triangle from '@/asset/antv/triangle.svg';

export enum ENode {
  数据库 = 'data',
  矩形 = 'call-activity',
  圆形 = 'end-event-none',
  三角形 = 'triangle',
  菱形 = 'diamond',
}

const nodeList: string[] = [
  circle,
  ellipse,
  rect,
  diamond,
  star,
  triangle,
];

const Nodes: React.FC<IToolGroup> = () => {
  // const onClick = (name: ENode, type: EToolTag) => {
  //   props.onSelect(name, type);
  // };
  // const onGroupClick = (tag: EToolTag) => {
  //   props.onGroupClick(tag);
  // };
  return <>
    {nodeList.map((item, index) => {
      return <img draggable="true" className={styles.node} height={'100%'} key={index} src={item}/>;
    })}

  </>
  ;
};
export default Nodes;
