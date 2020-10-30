import React, {useState} from 'react';
import {useInterval} from '@/hooks/common/time';

/**
 * 倒计时组件
 * @param {object} props onFinish 结束的回调  defaultDelay 循环周期 单位（秒） 默认值为60
 * @constructor
 */
export const CountDown: React.FC<{ onFinish?: () => void, defaultDelay?:number }> = (props) => {
  const [time, setTime] = useState(props.defaultDelay||60);
  const [delay, setDelay] = useState<number | null>(1000);
  useInterval(() => {
    // Your custom logic here
    if (time > 0) {
      setTime(time - 1);
    } else {
      setDelay(null);
      props.onFinish&&props.onFinish();
    }
  }, delay);

  return <>{time}</>;
};
export default CountDown;
