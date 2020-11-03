import React from 'react';
import styles from './index.less';
import Logo from '@/asset/logo.svg';
import Search from './components/Search';
import UserCenter from './components/UserCenter';
const name = ['一', '谷', '科', '技'];
const Header: React.FC = () => {
  return <div className={`${styles.header} flex animate__animated animate__fadeInRightSmall`}>
    <div className="flex">
      <img className={styles.logo} src={Logo}/>
      <div className={`${styles.text} flex`}>
        {name.map((item, index) => <div key={index}>{item}</div>)}
      </div>
      <div className={'width_12'}/>
      <Search/>
    </div>
    <div>
      <UserCenter/>
    </div>
  </div>;
};
export default Header;
