import {useContext, useReducer} from 'react';
import LocalStorageContext from '@/context/components/localStorage';

const localStorageReducer = (state: { [key: string]: string }, action: { [key: string]: string }) => {
  return {...state, [action.key]: action.value};
};
export const useLocalStorage = (key: string) => {
  const localStorageValue = useContext(LocalStorageContext);
  const [state, update] = useReducer(localStorageReducer, localStorageValue);
  const setLocalStorage = (_value: string) => {
    update({[key]: _value});
    localStorage.setItem(key, _value);
  };
  return [state, setLocalStorage];
};
