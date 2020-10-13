import React from 'react';
import LocalStorageContext, {localStorageDefaultValue} from '@/context/components/localStorage';

const Context: React.FC = (props) => {
  return (
    <LocalStorageContext.Provider value={localStorageDefaultValue}>
      {props.children}
    </LocalStorageContext.Provider>
  );
};
export default Context;
