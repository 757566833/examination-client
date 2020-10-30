import React,
{
  RefObject,
  useEffect,
  useRef,
  useState,
  useCallback,
  EffectCallback,
} from 'react';

export interface State {
  x: number;
  y: number;
}

export const useScroll = (ref: RefObject<HTMLElement>): State => {
  const [state, setState] = useAnimationState<State>({
    x: 0,
    y: 0,
  });
  const handler = () => {
    if (ref?.current) {
      setState({
        x: ref.current.scrollLeft,
        y: ref.current.scrollTop,
      });
    }
  };
  useEffectOnce(() => {
    if (ref?.current) {
      ref.current.addEventListener('scroll', handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (ref?.current) {
        ref.current.removeEventListener('scroll', handler);
      }
    };
  });

  return state;
};


export const useAnimationState: <S>(initialState: S) => [S, React.Dispatch<React.SetStateAction<S>>] =
  (initialState) => {
    const frame = useRef(0);
    const [state, setState] = useState(initialState);
    // 这里为什么拿不到范型s?只能用 typeof
    const setRafState:
      (value: React.SetStateAction<typeof initialState>) => void =
      useCallback((value) => {
        cancelAnimationFrame(frame.current);

        frame.current = requestAnimationFrame(() => {
          setState(value);
        });
      }, []);

    useUnmount(() => {
      cancelAnimationFrame(frame.current);
    });

    return [state, setRafState];
  };

export const useUnmount = (fn: () => any): void => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffectOnce(() => () => fnRef.current());
};
export const useEffectOnce = (effect: EffectCallback) => {
  // 这里面我只希望触发一次
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};


