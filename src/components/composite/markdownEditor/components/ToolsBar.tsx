import React from 'react';
import styles from './ToolsBar.less';
import Button, {IButton} from './components/Button';
import ColorInput from './components/ColorInput';

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
}

const buttonList: IButton[] = [
  {type: 'button', name: EButtonName.后退, desc: '后退'},
  {type: 'button', name: EButtonName.前进, desc: '前进'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: EButtonName.一级标题, desc: '一级标题'},
  {type: 'button', name: EButtonName.二级标题, desc: '二级标题'},
  {type: 'button', name: EButtonName.三级标题, desc: '三级标题'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: EButtonName.加粗, desc: '加粗'},
  {type: 'button', name: EButtonName.斜体, desc: '斜体'},
  {type: 'button', name: EButtonName.斜体加粗, desc: '斜体加粗'},
  {type: 'button', name: EButtonName.删除线, desc: '删除线'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: EButtonName.引用, desc: '引用'},
  {type: 'button', name: EButtonName.分割线, desc: '分割线'},
  {type: 'button', name: EButtonName.上传图片, desc: '上传图片'},
  {type: 'button', name: EButtonName.超链接, desc: '超链接'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: EButtonName.有序列表, desc: '有序列表'},
  {type: 'button', name: EButtonName.无序列表, desc: '无序列表'},
  {type: 'button', name: EButtonName.无序列表, desc: '无序列表'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: EButtonName.表格, desc: '表格'},
  {type: 'button', name: EButtonName.代码, desc: '代码'},
  {type: 'button', name: EButtonName.流程, desc: '流程'},
  {type: 'line', name: 'line', desc: 'line'},
];

const ToolsBar: React.FC<{ onClick: (name: string, value?: string) => void }> = (props) => {
  const onClick = (name: string, value?: string) => {
    console.log('ToolsBar', name, value);
    props.onClick(name, value);
  };
  return <div className={`${styles.toolsBar} flex`}>
    {buttonList.map((item, index) => {
      return <Button onClick={onClick} key={index} name={item.name} type={item.type} desc={item.desc}/>;
    })}
    <ColorInput onClick={onClick}/>
  </div>
  ;
};

export default ToolsBar;
