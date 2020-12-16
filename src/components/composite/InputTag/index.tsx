import React, {useRef, useState} from 'react';
import {Tag, Input} from 'antd';
import {TweenOneGroup} from 'rc-tween-one';
import {PlusOutlined} from '@ant-design/icons';

export interface IInputTag {
  defaultValue?: string[]
  value?: string[]
  onChange?: (value: string[]) => void
}

const InputTag: React.FC<IInputTag> = (props) => {
  const {value, defaultValue, onChange} = props;
  const [tags, setTags] = useState(value || defaultValue || []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<Input>(null);
  const handleClose = (removedTag: string) => {
    const nextTags = value ? value.filter((tag) => tag !== removedTag) : tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    setTags(nextTags);
    onChange && onChange(nextTags);
  };
  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{display: 'inline-block'}}>
        {tagElem}
      </span>
    );
  };
  const showInput = () => {
    setInputVisible(true);
    inputRef.current?.focus();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // this.setState({ inputValue: e.target.value });
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      let nextTags;
      if (value) {
        nextTags = [...value, inputValue];
      } else {
        nextTags = [...tags, inputValue];
      }
      // const nextTags = [...tags, inputValue];
      setInputValue('');
      setInputVisible(false);
      setTags(nextTags);
      onChange && onChange(nextTags);
    }
  };
  return <>
    <div style={{marginBottom: 16}}>
      <TweenOneGroup
        enter={{
          scale: 0.8,
          opacity: 0,
          type: 'from',
          duration: 100,
          onComplete: (e: any) => {
            e.target.style = '';
          },
        }}
        leave={{opacity: 0, width: 0, scale: 0, duration: 200}}
        appear={false}
      >
        {value ? value.map(forMap) : tags.map(forMap)}
      </TweenOneGroup>
    </div>
    {inputVisible && (
      <Input
        ref={inputRef}
        type="text"
        size="small"
        style={{width: 78}}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    )}
    {!inputVisible && (
      <Tag onClick={showInput} className="site-tag-plus">
        <PlusOutlined/> New Tag
      </Tag>
    )}
  </>;
};
export default InputTag;
