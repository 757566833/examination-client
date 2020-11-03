import {EButtonName, IButtonCollection} from '../ToolsBar';


const toolsBarExecCommand = (params: { name: IButtonCollection, text: string } | { name: EButtonName.字体颜色, text: string, value: string }) => {
  console.log('toolsBarExecCommand');
  // debugger;
  switch (params.name) {
    case EButtonName.后退:
      document.execCommand('undo', false);
      break;
    case EButtonName.前进:
      document.execCommand('redo', false);
      break;
    case EButtonName.一级标题:
      console.log('一级标题');
      document.execCommand('insertText', false, `\n  # ${params.text} \n`);
      break;
    case EButtonName.二级标题:
      document.execCommand('insertText', false, `\n  ## ${params.text} \n`);
      break;
    case EButtonName.三级标题:
      document.execCommand('insertText', false, `\n  ### ${params.text} \n`);
      break;

    case EButtonName.加粗:
      document.execCommand('insertText', false, `**${params.text}**`);
      break;
    case EButtonName.斜体:
      document.execCommand('insertText', false, `*${params.text}*`);
      break;
    case EButtonName.斜体加粗:
      document.execCommand('insertText', false, `***${params.text}***`);
      break;
    case EButtonName.删除线:
      document.execCommand('insertText', false, `~~${params.text}~~`);
      break;

    case EButtonName.引用:
      document.execCommand('insertText', false, `\n >>${params.text}`);
      break;
    case EButtonName.分割线:
      document.execCommand('insertText', false, `-----`);
      break;
    case EButtonName.上传图片:
      document.execCommand('insertText', false, `***${params.text}***`);
      break;
    case EButtonName.超链接:
      document.execCommand('insertText', false, `[${params.text}](${params.text})`);
      break;

    case EButtonName.有序列表:
      document.execCommand('insertText', false, `1. ${params.text}`);
      break;
    case EButtonName.无序列表:
      document.execCommand('insertText', false, `+ ${params.text}`);
      break;
    case EButtonName.多选序列:
      document.execCommand('insertText', false, `* [ ] ${params.text} \n * [x] \n `);
      break;

    case EButtonName.表格:
      document.execCommand('insertText', false, `${params.text}|${params.text}|${params.text} \n --|:--:|--: \n 1|2|3`);
      break;
    case EButtonName.代码:
      document.execCommand('insertText', false, `~~~javascript \n ${params.text} \n ~~~`);
      break;
      // case EButtonName.流程:
      //   document.execCommand('insertText', false, `\`\`\`flow \n st=>start: 开始 \n op=>operation: My Operation \n cond=>condition: Yes or No? \n e=>end \n st->op->cond \n cond(yes)->e \n cond(no)->op \n &\`\`\``);
      //   break;

    case EButtonName.字体颜色:
      document.execCommand('insertText', false, `～～${params.text}～～`);
      break;
  }
};

export default toolsBarExecCommand;

