import React from 'react';
import {ConfigProvider} from 'antd';
import LocalStorageProvider from './components/LocalStorageProvider';
import {antdProvider} from './components/antdForm';
import MouseListenerProvider from '@/context/components/MouseListenerProvider';


const Context: React.FC = (props) => {
  return (
    <ConfigProvider {...antdProvider}>
      <LocalStorageProvider>
        <MouseListenerProvider>
          {props.children}
        </MouseListenerProvider>
      </LocalStorageProvider>
    </ConfigProvider>

  );
};
export default Context;
