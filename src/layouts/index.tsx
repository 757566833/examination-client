import React from 'react';
import styles from './index.less';
import Header from './components/header';

const Layout: React.FC = (props) => {
  return (

    <div className={`${styles.layout} flex`}>
      <Header/>
      {props.children}
    </div>
  );
};
export default Layout;
