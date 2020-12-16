import React from 'react';
import styles from './index.less';
import Header from './components/header';
import ErrorBoundary from './components/error/ErrorBoundary';

const Layout: React.FC = (props) => {
  return (
    // <ErrorBoundary>
    <div className={`${styles.layout} flex`}>
      <Header/>
      {props.children}
    </div>
    // </ErrorBoundary>
  );
};
export default Layout;
