import React from 'react';
import styles from './index.less';

const Layout: React.FC = (props) => {
  return (
    <div className={`${styles.layout} flex`}>{props.children}</div>
  );
};
export default Layout;
