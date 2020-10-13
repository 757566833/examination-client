import React from 'react';

export const localStorageDefaultValue:{[key:string]:string} = JSON.parse(JSON.stringify(localStorage));
const LocalStorageContext = React.createContext(localStorageDefaultValue);
export default LocalStorageContext;
