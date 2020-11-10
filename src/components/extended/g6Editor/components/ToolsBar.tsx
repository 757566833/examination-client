import React, {useState} from 'react';
import {Button, Divider, Input, Radio} from 'antd';

import {
  ArrowRightOutlined,
  DragOutlined,
  LineOutlined,
  DeleteOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import styles from './ToolsBar.less';
import Nodes from './components/Nodes';
import {RadioChangeEvent} from 'antd/es/radio';
import {Item} from '@antv/g6/lib/types';


const optionsWithMouse = [
  {label: <DragOutlined/>, value: 'drag'},
  {label: <LineOutlined/>, value: 'line'},
];
const optionsWithEdge = [
  {label: <ArrowRightOutlined/>, value: 'horizontal'},
  {label: <LineOutlined/>, value: 'vertical'},
];

interface IToolsBarProps {
  // active: 'drag' | 'horizontal' | 'vertical'
  active: 'drag' | 'line'
  onActiveChange: (ac: 'drag' | 'line') => void
  selected: { type: 'edge' | 'node', value: string, item: Item } | null
  onLabelChange: (value: string) => void
  onEdgeChange: (value: 'horizontal' | 'vertical') => void
  onDelete: () => void
}

const ToolsBar: React.FC<IToolsBarProps> = (props) => {
  const onChange = (e: RadioChangeEvent) => {
    props.onActiveChange(e.target.value);
  };
  const onEdgeChange = (e: RadioChangeEvent) => {
    props.onEdgeChange(e.target.value);
  };
  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onLabelChange(e.target.value);
  };
  return <div className={`${styles.toolsBar} flex`}>
    <Nodes/>
    <Radio.Group
      options={optionsWithMouse}
      // value={value4}
      optionType="button"
      buttonStyle="solid"
      size={'small'}
      value={props.active}
      onChange={onChange}
    />
    <Divider type='vertical'/>
    <Input size={'small'} className={styles.input} value={props.selected?.value} onChange={onLabelChange}/>
    {props.selected?.type == 'edge' && <>
      <div className={'width_6'}/>
      <Radio.Group
        options={optionsWithEdge}
        // value={value4}
        optionType="button"
        buttonStyle="solid"
        size={'small'}
        value={props.selected?.value}
        onChange={onEdgeChange}
      /></>}


    <Divider type='vertical'/>
    {props.selected && <Button size={'small'} onClick={props.onDelete}>
      <DeleteOutlined/>
    </Button>}
    <div className={'width_24'}/>
  </div>;
};
export default ToolsBar;
