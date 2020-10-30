import React from 'react';
import {Space} from 'antd';

const IconText: React.FC<{ icon: any, text: string }> = (props) => (
  <Space>
    {React.createElement(props.icon)}
    {props.text}
  </Space>
);
export default IconText;
