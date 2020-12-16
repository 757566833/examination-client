import React, {useCallback, useMemo, useRef, useState} from 'react';
import Markdown from '@/components/extended/markdown/Markdown';
import styles from './MarkdownEditor.less';
import ToolsBar, {EButtonName, IToolsClickParams} from '@/components/composite/markdownEditor/components/ToolsBar';
import toolsBarExecCommand from '@/components/composite/markdownEditor/components/util/toolsBarExecCommand';
import DragLine from '@/components/extended/dragLine/DragLine';

export interface IMarkdownEditor {
  value?: string,
  onChange?: (str: string) => void
}

const MarkdownEditor: React.FC<IMarkdownEditor> = (props) => {
  const [text, setText] = useState(props.value || '');
  const {value, onChange} = props;
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(600);
  const onMarkdownChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    onChange && onChange(event.target.value);
  }, [onChange]);
  const onWidthMove = (offset: [number, number]) => {
    // console.log(offset);
    setWidth(width + offset[0]);
  };
  const onHeightMove = (offset: [number, number]) => {
    // console.log(offset);
    setHeight(height + offset[1]);
  };
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const onClick = (params: IToolsClickParams) => {
    // console.log('params', params);
    const start = inputRef.current?.selectionStart;
    const end = inputRef.current?.selectionEnd;
    // const text = inputRef.current.se;
    // console.log(end, start);
    if (typeof start == 'number' && typeof end == 'number' && end > start) {
      if (params.name == EButtonName.字体颜色) {
        toolsBarExecCommand({
          name: params.name,
          text: value ? value.slice(start, end) : text.slice(start, end),
          value: params.value,
        });
      } else if (params.name == EButtonName.流程) {
        // console.log('dsadsa');
        // toolsBarExecCommand({name: params.name, text: text.slice(start, end)});
      } else {
        // console.log('dsadsa');
        toolsBarExecCommand({name: params.name, text: value ? value.slice(start, end) : text.slice(start, end)});
      }
    }
  };
  const TextareaMemo = useMemo(() => <textarea
    className={styles.textarea}
    // id={'test'}
    value={value}
    onChange={onMarkdownChange}
    ref={inputRef}
  />, [onMarkdownChange, value]);
  const MarkDownMemo = useMemo(() => <Markdown value={value || text}/>, [text, value]);
  return <div className={styles.editor}>
    <ToolsBar onClick={onClick}/>
    <div className={`${styles.text} flex`}>
      <div className={`${styles.inputs} flex`} style={{width, height}}>
        {/* <Input.TextArea bordered={false} placeholder={'标题'}/>*/}
        {/* <Line/>*/}
        {/* <Input.TextArea bordered={false} placeholder={'副标题'}/>*/}
        {/* <Line/>*/}
        {TextareaMemo}
      </div>
      <DragLine type="vertical" onMove={onWidthMove}/>
      <div className={styles.markdown}>
        {MarkDownMemo}
      </div>

    </div>
    <DragLine type="horizontal" onMove={onHeightMove}/>
  </div>;
};
export default MarkdownEditor;
