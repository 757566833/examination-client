import React from 'react';
import styles from './ToolsBar.less';
import Button, {IButton} from './components/Button';
import ColorInput from './components/ColorInput';

const buttonList: IButton[] = [
  {type: 'button', name: 'chexiao', desc: '后退'},
  {type: 'button', name: 'zhongzuo', desc: '前进'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: 'h1', desc: '一级标题'},
  {type: 'button', name: 'h', desc: '二级标题'},
  {type: 'button', name: 'h2', desc: '三级标题'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: 'jiacu', desc: '加粗'},
  {type: 'button', name: 'xieti', desc: '斜体'},
  {type: 'button', name: 'xietiweixuanzhong', desc: '斜体加粗'},
  {type: 'button', name: 'shanchuxian', desc: '删除线'},
  {type: 'button', name: 'shanchuxian', desc: '删除线'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: 'yinyong', desc: '引用'},
  {type: 'button', name: 'fengexian', desc: '分割线'},
  {type: 'button', name: 'shangchuantupian', desc: '上传图片'},
  {type: 'button', name: 'chaolianjie', desc: '超链接'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: 'youxuliebiao', desc: '有序列表'},
  {type: 'button', name: 'wuxuliebiao', desc: '无序列表'},
  {type: 'button', name: 'youxuliebiaozhongyitiao', desc: '多选序列'},
  {type: 'line', name: 'line', desc: 'line'},
  {type: 'button', name: 'biaoge', desc: '表格'},
  {type: 'button', name: 'charudaima', desc: '代码'},
  {type: 'button', name: 'liucheng', desc: '流程'},
  {type: 'line', name: 'line', desc: 'line'},
  // {type: 'customize', name: 'yanse', desc: '字体颜色'},

];

const ToolsBar: React.FC = () => {
  return <div className={`${styles.toolsBar} flex`}>
    {buttonList.map((item, index) => {
      return <Button key={index} name={item.name} type={item.type} desc={item.desc}/>;
    })}
    <ColorInput/>
  </div>
  ;
};

export default ToolsBar;
