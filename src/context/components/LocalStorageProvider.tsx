import React, {Dispatch, useReducer} from 'react';

type IAction = {
  type: 'add',
  value: { [key: string]: string }
} | {
  type: 'remove',
  key: string
}
export const localStorageReducer: (state: { [key: string]: string }, action: IAction) => { [key: string]: string } = (state, action) => {
  if (action.type == 'add') {
    return {...state, ...action.value};
  } else {
    const nextState = {...state};
    delete nextState[action.key];
    return nextState;
  }
};
export const localStorageDefaultValue: { [key: string]: string } = JSON.parse(JSON.stringify(localStorage));
export const LocalStorageContext = React.createContext<{ state: { [key: string]: string }, dispatch: Dispatch<IAction> }>({
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
