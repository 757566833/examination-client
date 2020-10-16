import React, {useCallback, useEffect, useRef, useState} from 'react';

export const useCountdown: (second?: number) => [number, () => void] = (second = 60) => {
  const [value, setValue] = useState(0);
  const timer = useRef<number | null>();
  const doSomeThing = useCallback(() => {
    console.log('doSomeThing', value);
    if (value > 0) {
      setValue((value) => value - 1);
    } else {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  }, [value]);
  const countdown = useCallback(() => {
    timer.current = setInterval(doSomeThing, 1000);
  }, [doSomeThing]);
  const countdownStart = () => {
    console.log('countdownStart');
    setValue(second);
  };
  useEffect(() => {
    if (value == second) {
      countdown();
    }
  }, [countdown, second, value]);
  return [value, countdownStart];
};


