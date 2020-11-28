import React from 'react';
import styles from './ToolsBar.less';
import Tool, {ITool} from './components/Tool';


export enum EButtonName {
  后退 = 'chexiao',
  前进 = 'zhongzuo',
  一级标题 = 'h1',
  二级标题 = 'h',
  三级标题 = 'h2',
  加粗 = 'jiacu',
  斜体 = 'xieti',
  斜体加粗 = 'xietiweixuanzhong',
  删除线 = 'shanchuxian',
  引用 = 'yinyong',
  分割线 = 'fengexian',
  上传图片 = 'shangchuantupian',
  超链接 = 'chaolianjie',
  有序列表 = 'youxuliebiao',
  无序列表 = 'wuxuliebiao',
  多选序列 = 'youxuliebiaozhongyitiao',
  表格 = 'biaoge',
  代码 = 'charudaima',
  流程 = 'liucheng',
  字体颜色 = 'zitiyanse',
}
export type IButtonCollection = EButtonName.后退 |
  EButtonName.前进 |
  EButtonName.一级标题 |
  EButtonName.二级标题 |
  EButtonName.三级标题 |
  EButtonName.加粗 |
  EButtonName.斜体 |
  EButtonName.斜体加粗 |
  EButtonName.删除线 |
  EButtonName.引用 |
  EButtonName.分割线 |
  EButtonName.上传图片 |
  EButtonName.超链接 |
  EButtonName.有序列表 |
  EButtonName.无序列表 |
  EButtonName.多选序列 |
  EButtonName.表格 |
  EButtonName.代码
export type IToolsClickParams =
  {
    name: IButtonCollection
  }
  | { name: EButtonName.字体颜色, value: string }

  | { name: EButtonName.流程, value: string }
export interface IToolsBar {
  onClick: (params: IToolsClickParams) => void
}

const ToolsBar: React.FC<IToolsBar> = (props) => {
  const onClick = (name:IButtonCollection) => {
    // console.log('ToolsBar');
    props.onClick({name: name});
  };
  const onColor = (name: EButtonName.字体颜色, value: string) => {
    props.onClick({name, value});
  };
  const onFlow = (name: EButtonName.流程, value: string) => {
    props.onClick({name, value});
  };
  const buttonList: ITool[] = [
    {type: 'button', name: EButtonName.后退, desc: '后退', onClick},
    {type: 'button', name: EButtonName.前进, desc: '前进', onClick},
    {type: 'line'},
    {type: 'button', name: EButtonName.一级标题, desc: '一级标题', onClick},
    {type: 'button', name: EButtonName.二级标题, desc: '二级标题', onClick},
    {type: 'button', name: EButtonName.三级标题, desc: '三级标题', onClick},
    {type: 'line'},
    {type: 'button', name: EButtonName.加粗, desc: '加粗', onClick},
    {type: 'button', name: EButtonName.斜体, desc: '斜体', onClick},
    {type: 'button', name: EButtonName.斜体加粗, desc: '斜体加粗', onClick},
    {type: 'button', name: EButtonName.删除线, desc: '删除线', onClick},
    {type: 'line'},
    {type: 'button', name: EButtonName.引用, desc: '引用', onClick},
    {type: 'button', name: EButtonName.分割线, desc: '分割线', onClick},
    {type: 'button', name: EButtonName.上传图片, desc: '上传图片', onClick},
    {type: 'button', name: EButtonName.超链接, desc: '超链接', onClick},
    {type: 'line'},
    {type: 'button', name: EButtonName.有序列表, desc: '有序列表', onClick},
    {type: 'button', name: EButtonName.无序列表, desc: '无序列表', onClick},
    {type: 'button', name: EButtonName.多选序列, desc: '多选序列', onClick},
    {type: 'line'},
    {type: 'button', name: EButtonName.表格, desc: '表格', onClick},
    {type: 'button', name: EButtonName.代码, desc: '代码', onClick},
    {type: 'line'},
    {type: 'color', name: EButtonName.字体颜色, desc: '字体颜色', onClick: onColor},
    {type: 'line'},
    {type: 'flow', name: EButtonName.流程, desc: '流程', onClick: onFlow},
  ];
  return <div className={`${styles.toolsBar} flex`}>
    {buttonList.map((item, index) => {
      return <Tool key={index} {...item}/>;
    })}
    {/* <ColorInput onClick={onClick}/>*/}
  </div>;
};

export default ToolsBar;
