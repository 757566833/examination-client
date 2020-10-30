import React, {useState} from 'react';
import {Input} from 'antd';
import Markdown from '@/components/extended/markdown/Markdown';
import styles from './index.less';
import {markdownDefaultValue} from '@/config/defaultValue';
import DragLine from '@/components/custom/dragLine/DragLIne';

const style: React.CSSProperties = {
  resize: 'none',
};
const Create: React.FC = () => {
  const [text, setText] = useState(markdownDefaultValue);
  const [width, setWidth] = useState(400);
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const onMove = (offset: [number, number]) => {
    // console.log(offset);
    setWidth(width + offset[0]);
  };
  return <div className={`${styles.create} flex`}>
    <div className={styles.input} style={{width}}>
      <Input.TextArea
        bordered={false}
        autoSize={true}
        style={style}
        value={text}
        onChange={onChange}
      />
    </div>
    <DragLine type="vertical" onMove={onMove}/>
    <div className={styles.markdown}>
      <Markdown value={text}/>
    </div>

  </div>;
};
export default Create;
