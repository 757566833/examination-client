import React from 'react';
import styled from 'styled-components';
import { Flex } from '@/css';
const LayoutDom = styled(Flex)`
  flex-direction: column;
  height:100%;
`;
const Layout:React.FC = (props)=>{
  return (
    <LayoutDom>{props.children}</LayoutDom>
  );
};
export default Layout;
