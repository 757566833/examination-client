import React, {useRef, useState} from 'react';
import {Input} from 'antd';
import Markdown from '@/components/extended/markdown/Markdown';
import styles from './MarkdownEditor.less';
import {markdownDefaultValue} from '@/config/defaultValue';
import DragLine from '@/components/custom/dragLine/DragLIne';
import Line from '@/components/custom/line/Line';
import ToolsBar from '@/components/composite/markdownEditor/components/ToolsBar';

// import TextArea from 'antd/es/input/TextArea';
const style: React.CSSProperties = {
  resize: 'none',
  border: 'none',
  width: '100%',
};
const MarkdownEditor: React.FC = () => {
  const [text, setText] = useState(markdownDefaultValue);
  const [width, setWidth] = useState(400);
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const onMove = (offset: [number, number]) => {
    // console.log(offset);
    setWidth(width + offset[0]);
  };
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const onClick = (name: string, value?: string) => {
    console.log(name, value);
    const aaa: any = window;
    aaa.gggg = inputRef.current;
    console.log(inputRef.current);
    const start = inputRef.current?.selectionStart;
    const end = inputRef.current?.selectionEnd;
    // const text = inputRef.current.se;
    if (typeof start == 'number' && typeof end == 'number') {
      const nextValue = `${text.slice(0, start)}\n # ${text.slice(start)}`;
      // console.log('click2', nextValue);
      setText(nextValue);
    }
  };

  return <div className={styles.editor}>
    <ToolsBar onClick={onClick}/>
    <div className={`${styles.text} flex`}>
      <div className={`${styles.inputs} flex`} style={{width}}>
        <Input.TextArea bordered={false} placeholder={'标题'}/>
        <Line/>
        <Input.TextArea bordered={false} placeholder={'副标题'}/>
        <Line/>
        <textarea
          // bordered={false}
          // autoSize={true}
          className={styles.textarea}
          style={style}
          id={'test'}
          value={text}
          onChange={onChange}
          ref={inputRef}
        />
      </div>
      <DragLine type="vertical" onMove={onMove}/>
      <div className={styles.markdown}>
        <Markdown value={text}/>
      </div>

    </div>
  </div>;
};
export default MarkdownEditor;
