import React, {ElementType} from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import math from 'remark-math';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mermaid from 'remark-mermaid';
// 数学符号库 这玩意没ts文件
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {InlineMath, BlockMath} from 'react-katex';
import 'katex/dist/katex.min.css';
// hljs 单色
// import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';

// prism 彩色
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism';


import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
// import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';

const Code: React.FC<{ value: string, language: string }> = (props) => {
  // console.log('renderers', props);
  return <SyntaxHighlighter style={a11yDark} language={props.language}>{props.value}</SyntaxHighlighter>;
};

const MarkdownInlineMath: React.FC<{ value: string, language: string }> = (props) => {
  // console.log('inlineMath', props);
  return <InlineMath math={props.value}/>;
};

const MarkdownMath: React.FC<{ value: string, language: string }> = (props) => {
  // console.log('math', props);
  return <BlockMath math={props.value}/>;
};

const renderers: { [key: string]: ElementType<{ value: string, language: string }> } = {
  code: Code,
  inlineMath: MarkdownInlineMath,
  math: MarkdownMath,
};

const Markdown: React.FC<{ value: string }> = (props) => {
  return <div style={{height: '100%', overflow: 'auto'}}>
    <ReactMarkdown
      renderers={renderers}

      className={'markdown-body'}
      plugins={[

        gfm,
        mermaid,
        math]}
    >
      {props.value}
    </ReactMarkdown>
  </div>;
};

export default Markdown;
