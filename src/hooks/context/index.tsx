import {useContext} from 'react';
import {LocalStorageContext} from '@/context/components/LocalStorageProvider';
import {MouseListenerContext} from '@/context/components/MouseListenerProvider';

export const useLocalStorage: (key: string) => [string, (key: string) => void, () => void] = (key) => {
  const localStorageValue = useContext(LocalStorageContext);
  const setLocalStorage = (_value: string) => {
    localStorageValue.dispatch({type: 'add', value: {[key]: _value}});
    localStorage.setItem(key, _value);
  };
  const removeLocalStorage = () => {
    localStorageValue.dispatch({type: 'remove', key});
    localStorage.removeItem(key);
  };
  return [localStorageValue.state[key], setLocalStorage, removeLocalStorage];
};

export const useMouseContent = () => {
  const mouseListenerValue = useContext(MouseListenerContext);

  return mouseListenerValue;
};
