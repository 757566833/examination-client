import React from 'react';
import Drag from '@/components/custom/dragLine/Drag';
import styles from './DragLine.less';

interface IDragProps {
  type: 'horizontal' | 'vertical',
  onMove?: (offset: [number, number], point: [number, number]) => void
}

const DragLine: React.FC<IDragProps> = (props) => {
  return <Drag className={`${styles[props.type]}`} onMove={props.onMove}/>;
};
export default DragLine;
