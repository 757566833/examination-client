import React, {Dispatch, useReducer} from 'react';
export const localStorageReducer = (state: { [key: string]: string }, action: { [key: string]: string }) => {
  return {...state, ...action};
};
export const localStorageDefaultValue: { [key: string]: string } = JSON.parse(JSON.stringify(localStorage));
export const LocalStorageContext = React.createContext<{ state: { [key: string]: string }, dispatch: Dispatch<{ [key: string]: string }> }>({
  state: {}, dispatch: () => {
    //
  },
});

const LocalStorageProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(localStorageReducer, localStorageDefaultValue);
  const value = {
    state,
    dispatch,
  };
  return <LocalStorageContext.Provider value={value}>{props.children}</LocalStorageContext.Provider>;
};
export default LocalStorageProvider;
