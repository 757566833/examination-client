import {useContext} from 'react';
import {LocalStorageContext} from '@/context/components/LocalStorageProvider';
import {MouseListenerContext} from '@/context/components/MouseListenerProvider';

export const useLocalStorage: (key: string) => [any, (key: string) => void] = (key) => {
  const localStorageValue = useContext(LocalStorageContext);
  const setLocalStorage = (_value: string) => {
    localStorageValue.dispatch({[key]: _value});
    localStorage.setItem(key, _value);
  };
  return [localStorageValue.state[key], setLocalStorage];
};

export const useMouseContent = () => {
  const mouseListenerValue = useContext(MouseListenerContext);

  return mouseListenerValue;
};
