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
  圆形 = 'circle',
  椭圆 = 'ellipse',
  矩形 = 'rect',
  三角形 = 'triangle',
  星 = 'star',
  菱形 = 'diamond',
  未知 = 'unKnow'
}

const nodeList: { src: string, type: string }[] = [
  {src: circle, type: ENode.圆形},
  {src: ellipse, type: ENode.椭圆},
  {src: rect, type: ENode.矩形},
  {src: diamond, type: ENode.三角形},
  {src: star, type: ENode.星},
  {src: triangle, type: ENode.菱形},
];

const Nodes: React.FC<IToolGroup> = () => {
  // const onClick = (name: ENode, type: EToolTag) => {
  //   props.onSelect(name, type);
  // };
  // const onGroupClick = (tag: EToolTag) => {
  //   props.onGroupClick(tag);
  // };
  const onDragStart = (event: React.DragEvent<HTMLImageElement>) => {
    const type: ENode = event.currentTarget.dataset.type as ENode || ENode.未知;
    event.dataTransfer.setData('type', type);
    console.log(event);
  };
  return <>
    {nodeList.map((item, index) => {
      return <img
        draggable={true}
        className={styles.node}
        height={'100%'}
        key={index}
        src={item.src}
        data-type={item.type}
        onDragStart={onDragStart}
      />;
    })}

  </>
  ;
};
export default Nodes;
