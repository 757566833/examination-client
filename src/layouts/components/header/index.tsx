import React from 'react';
import styles from './index.less';
import Logo from '@/asset/test.svg';
import Search from './components/Search';
import UserCenter from './components/UserCenter';
import {useHistory} from 'react-router';

// const name = ['f', 'z', 'c', 'o', 'd', 'e'];
const Header: React.FC = () => {
  const his = useHistory();
  const toIndex = () => {
    his.push('/');
  };
  return <div className={`${styles.header} flex animate__animated animate__fadeInRightSmall`}>
    <div className="flex">
      <img className={styles.logo} src={Logo} onClick={toIndex}/>
      {/* <div className={`${styles.text} flex`}>*/}
      {/*  {name.map((item, index) => <div key={index}>{item}</div>)}*/}
      {/* </div>*/}
      <div className={'width_12'}/>
      <Search/>
    </div>
    <div>

      <UserCenter/>
    </div>
  </div>;
};
export default Header;
