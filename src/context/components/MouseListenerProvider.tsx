import React, {Dispatch, useEffect, useState} from 'react';
 interface IState {
  x: number;
  y: number;
}
const defaultState = {
  x: 0,
  y: 0,
};
export const MouseListenerContext = React.createContext<{ state: IState, dispatch: Dispatch<{ [key: string]: string }> }>({
  state: defaultState, dispatch: () => {
    //
  },
});
const dispatch = () => {
  //
};
const MouseListenerProvider: React.FC = (props) => {
  const [state, setState] = useState<IState>(defaultState);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      // event.stopPropagation();
      // event.preventDefault();
      setState({
        x: event.pageX,
        y: event.pageY,
      });
      return false;
    };

    document.addEventListener('mousemove', handler);

    return () => {
      document.removeEventListener('mousemove', handler);
    };
  }, []);

  return <MouseListenerContext.Provider value={{
    state, dispatch,
  }}>{props.children}</MouseListenerContext.Provider>;
};
export default MouseListenerProvider;
