import React, {useState} from 'react';
import Line from '@/components/custom/line/Line';
import Drag from '@/components/custom/dragLine/Drag';
import styles from './DragModal.less';
import {CloseCircleTwoTone} from '@ant-design/icons';

interface IModal {
  onCancel: () => void;
  className?: any;
  title?: string;
  style?: React.CSSProperties;
  defaultSize?: [number, number]
  onZoomEnd?: (width: number, height: number) => void
}

export interface IDragModal extends IModal {
  visible: boolean;
  destroyOnClose?: boolean;
}

const defaultWidth = 600;
const defaultHeight = 400;
const defaultPoint: [number, number] = [document.body.clientWidth / 2 - 300, document.body.clientHeight / 2 - 200];
const defaultMinSize = [100, 100];
const getMin = (current: number, min: number) => {
  return current > min ? current : min;
};

const Modal: React.FC<IModal> = (props) => {
  const [width, setWidth] = useState(props.defaultSize ? props.defaultSize[0] : defaultWidth);
  const [height, setHeight] = useState(props.defaultSize ? props.defaultSize[1] : defaultHeight);
  const [point, setPoint] = useState<[number, number]>(defaultPoint);
  const onTitleMove = (offset: [number, number]) => {
    setPoint([
      point[0] + offset[0],
      point[1] + offset[1],
    ]);
  };
  const onRightUpMove = (offset: [number, number]) => {
    // console.log(offset);
    setWidth(getMin(width + offset[0], defaultMinSize[0]));
    setHeight(getMin(height - offset[1], defaultMinSize[1]));
    setPoint([
      point[0],
      point[1] + offset[1],
    ]);
  };
  const onRightMove = (offset: [number, number]) => {
    // console.log(offset);
    setWidth(getMin(width + offset[0], defaultMinSize[0]));
  };
  const onRightDownMove = (offset: [number, number]) => {
    // console.log(offset);
    setWidth(getMin(width + offset[0], defaultMinSize[0]));
    setHeight(getMin(height + offset[1], defaultMinSize[1]));
  };
  const onDownMove = (offset: [number, number]) => {
    // console.log(offset);

    setHeight(getMin(height + offset[1], defaultMinSize[1]));
  };
  const onDownLeftMove = (offset: [number, number]) => {
    // console.log(offset);
    setWidth(getMin(width - offset[0], defaultMinSize[0]));
    setHeight(getMin(height + offset[1], defaultMinSize[1]));
    setPoint([
      point[0] + offset[0],
      point[1],
    ]);
  };
  const onLeftMove = (offset: [number, number]) => {
    // console.log(offset);
    setWidth(getMin(width - offset[0], defaultMinSize[0]));
    setPoint([
      point[0] + offset[0],
      point[1],
    ]);
  };
  const onLeftUpMove = (offset: [number, number]) => {
    // console.log(offset);
    setWidth(getMin(width - offset[0], defaultMinSize[0]));
    setHeight(getMin(height - offset[1], defaultMinSize[1]));
    setPoint([
      point[0] + offset[0],
      point[1] + offset[1],
    ]);
  };


  // // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-vars-experimental
  // const onModalBodyPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
  //   // event.stopPropagation();
  //   // event.preventDefault();
  // };
  const onClose = () => {
    props.onCancel();
  };
  const onEnd = () => {
    props.onZoomEnd && props.onZoomEnd(width, height);
  };
  return <div
    style={props.style ?
      {...props.style, width, height, top: point[1], left: point[0]} :
      {width, height, top: point[1], left: point[0]}
    }
    className={props.className ? `${props.className} ${styles.modal} flex` : `${styles.modal} flex`}

  >
    <Drag
      onMove={onTitleMove}
      className={`${styles.title} flex`}
      onEnd={onEnd}
    >
      <div>{props.title}</div>
      <div><CloseCircleTwoTone onClick={onClose}/></div>
    </Drag>
    <Drag
      onMove={onRightUpMove}
      className={styles.upRight}
      onEnd={onEnd}
    />
    <Drag
      onMove={onRightMove}
      className={styles.right}
      onEnd={onEnd}
    />
    <Drag
      onMove={onRightDownMove}
      className={styles.rightDown}
      onEnd={onEnd}
    />
    <Drag
      onMove={onDownMove}
      className={styles.down}
      onEnd={onEnd}
    />
    <Drag
      onMove={onDownLeftMove}
      className={styles.downLeft}
      onEnd={onEnd}
    />
    <Drag
      onMove={onLeftMove}
      className={styles.left}
      onEnd={onEnd}
    />
    <Drag
      onMove={onLeftUpMove}
      className={styles.leftUp}
      onEnd={onEnd}
    />
    <Line/>
    <div
      className={styles.modalBody}
      // onPointerDown={onModalBodyPointerDown}
    >
      {props.children}
    </div>

  </div>
  ;
};

const DragModal: React.FC<IDragModal> = (props) => {
  if (props.destroyOnClose) {
    return <>{props.visible && <Modal

      onCancel={props.onCancel}
      className={props.className}
      title={props.title}
      style={props.style}
      defaultSize={props.defaultSize}
    >
      {props.children}
    </Modal>}
    </>;
  }
  return <Modal
    className={props.visible ? `${props.className}` : 'disappear'}
    onCancel={props.onCancel}
    title={props.title}
    style={props.style}
    defaultSize={props.defaultSize}
  >
    {props.children}
  </Modal>;
};

export default DragModal;
