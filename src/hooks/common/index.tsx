import React,
{
  RefObject,
  useEffect,
  useRef,
  EffectCallback,
} from 'react';
import useAnimationState from '@/hooks/common/animation';

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


