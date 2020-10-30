import React, {useState} from 'react';
import {Input} from 'antd';
import Markdown from '@/components/extended/markdown/Markdown';
import styles from './MarkdownEditor.less';
import {markdownDefaultValue} from '@/config/defaultValue';
import DragLine from '@/components/custom/dragLine/DragLIne';
import Line from '@/components/custom/line/Line';
import ToolsBar from '@/components/composite/markdownEditor/components/ToolsBar';

const style: React.CSSProperties = {
  resize: 'none',
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

  return <div className={styles.editor}>
    <ToolsBar/>
    <div className={`${styles.text} flex`}>
      <div className={styles.input} style={{width}}>
        <Input.TextArea bordered={false} placeholder={'标题'}/>
        <Line/>
        <Input.TextArea bordered={false} placeholder={'副标题'}/>
        <Line/>
        <Input.TextArea
          bordered={false}
          autoSize={true}
          style={style}
          id={'test'}
          value={text}
          onChange={onChange}
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
