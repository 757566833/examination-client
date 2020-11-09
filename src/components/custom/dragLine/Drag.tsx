import React, {useEffect, useState} from 'react';
import styles from './Drag.less';
import {useMouseContent} from '@/hooks/context';
import {useTimeout} from '@/hooks/common/time';
import {useDocumentSelect} from '@/hooks/document';

interface IDragLineProps {
  // type: 'horizontal' | 'vertical',
  onMove?: (offset: [number, number], point: [number, number]) => void
  onEnd?: (offset: [number, number], point: { form: [number, number], to: [number, number] }) => void
  className?: any
}

const defaultValue: [number, number] = [-1, -1];
const Drag: React.FC<IDragLineProps> = (props) => {
  const [isMoved, setIsMoved] = useState(false);
  const [initClient, setInitClient] = useState<[number, number]>(defaultValue);
  const [currentClient, setCurrentClient] = useState<[number, number]>(defaultValue);
  const [switchSelect] = useDocumentSelect();
  const [, clear, set] = useTimeout(() => {
    setIsMoved(false);
    switchSelect(true);
  }, 280);
  const {state} = useMouseContent();
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    // event.preventDefault();
    setIsMoved(true);
    switchSelect(false);
    setInitClient([state.x, state.y]);
    setCurrentClient([state.x, state.y]);
    // return false;
  };
  const onPointerUp = () => {
    setIsMoved(false);
    switchSelect(true);
    setInitClient(defaultValue);
    setCurrentClient(defaultValue);
    props.onEnd && props.onEnd(
        [state.x - initClient[0], state.y - initClient[1]],
        {form: initClient, to: [state.x, state.y]});
  };
  const onPointerLeave = () => {
    set();
  };
  const onPointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.buttons == 1) {
      clear();
    }
  };
  useEffect(() => {
    if (isMoved) {
      if (state.x != currentClient[0] || state.y != currentClient[1]) {
        props.onMove && props.onMove(
            [state.x - currentClient[0], state.y - currentClient[1]],
            [state.x, state.y],
        );
        setCurrentClient([state.x, state.y]);
        // window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // window.getSelection().removeAllRanges()
        // window.getSelection()?.removeAllRanges();
      }
    }
  }, [currentClient, isMoved, props, state.x, state.y]);


  return <div
    className={props.className ? `${styles.line} ${props.className}` : `${styles.line}`}
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerEnter={onPointerEnter}
    onPointerLeave={onPointerLeave}
  >{props.children}</div>;
};
export default Drag;
