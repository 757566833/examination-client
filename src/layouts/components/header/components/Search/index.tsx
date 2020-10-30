import React from 'react';
import {Input} from 'antd';
import styles from './index.less';
// import {useLocalStorage} from '@/hooks/context';

const Search: React.FC = () => {
  // const [token, setToken] = useLocalStorage('token');
  const onSearch = (value: string) => {
    console.log(value);
    // setToken(value);
  };

  return <div className={`${styles.search_body} flex`}>
    <Input.Search size="small" onSearch={onSearch}/>
    {/* {token}*/}
  </div>;
};
export default Search;
