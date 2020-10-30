import React, {useEffect, useState} from 'react';
import styles from './Dragline.less';
import {useMouseContent} from '@/hooks/context';

interface IDragLineProps {
  type: 'horizontal' | 'vertical',
  onMove?: (offset: [number, number], point: [number, number]) => void
  onEnd?: (offset: [number, number], point: { form: [number, number], to: [number, number] }) => void
}

const defaultValue: [number, number] = [-1, -1];
const DragLine: React.FC<IDragLineProps> = (props) => {
  const [isMoved, setIsMoved] = useState(false);
  const [initClient, setInitClient] = useState<[number, number]>(defaultValue);
  const [currentClient, setCurrentClient] = useState<[number, number]>(defaultValue);
  const {state} = useMouseContent();
  const onPointerDown = () => {
    setIsMoved(true);
    setInitClient([state.x, state.y]);
    setCurrentClient([state.x, state.y]);
  };
  const onPointerUp = () => {
    setIsMoved(false);
    setInitClient(defaultValue);
    setCurrentClient(defaultValue);
    props.onEnd && props.onEnd(
        [state.x - initClient[0], state.y - initClient[1]],
        {form: initClient, to: [state.x, state.y]});
  };
  useEffect(() => {
    if (isMoved) {
      if (state.x != currentClient[0] || state.y != currentClient[1]) {
        props.onMove && props.onMove(
            [state.x - currentClient[0], state.y - currentClient[1]],
            [state.x, state.y],
        );
        setCurrentClient([state.x, state.y]);
      }
    }
  }, [currentClient, isMoved, props, state.x, state.y]);


  return <div
    className={`${styles[props.type]} ${styles.line}`}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
  />;
};
export default DragLine;
