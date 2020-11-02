import React, {useMemo, useRef, useState} from 'react';
import {Input} from 'antd';
import Markdown from '@/components/extended/markdown/Markdown';
import styles from './MarkdownEditor.less';
import {markdownDefaultValue} from '@/config/defaultValue';
import DragLine from '@/components/custom/dragLine/DragLIne';
import Line from '@/components/custom/line/Line';
import ToolsBar, {EButtonName, IToolsClickParams} from '@/components/composite/markdownEditor/components/ToolsBar';
import toolsBarExecCommand from '@/components/composite/markdownEditor/components/util/toolsBarExecCommand';

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
  const onClick = (params: IToolsClickParams) => {
    console.log('params', params);
    const start = inputRef.current?.selectionStart;
    const end = inputRef.current?.selectionEnd;
    // const text = inputRef.current.se;
    console.log(end, start);
    if (typeof start == 'number' && typeof end == 'number' && end > start) {
      if (params.name == EButtonName.字体颜色) {
        toolsBarExecCommand({name: params.name, text: text.slice(start, end), value: params.value});
      } else {
        console.log('dsadsa');
        toolsBarExecCommand({name: params.name, text: text.slice(start, end)});
      }
    }
  };
  const TextareaMemo = useMemo(() => <textarea
    className={styles.textarea}
    // id={'test'}
    value={text}
    onChange={onChange}
    ref={inputRef}
  />, [text]);
  const MarkDownMemo = useMemo(() => <Markdown value={text}/>, [text]);
  return <div className={styles.editor}>
    <ToolsBar onClick={onClick}/>
    <div className={`${styles.text} flex`}>
      <div className={`${styles.inputs} flex`} style={{width}}>
        <Input.TextArea bordered={false} placeholder={'标题'}/>
        <Line/>
        <Input.TextArea bordered={false} placeholder={'副标题'}/>
        <Line/>
        {TextareaMemo}
      </div>
      <DragLine type="vertical" onMove={onMove}/>
      <div className={styles.markdown}>
        {MarkDownMemo}
      </div>

    </div>
  </div>;
};
export default MarkdownEditor;
