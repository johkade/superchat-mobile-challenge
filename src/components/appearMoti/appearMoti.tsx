import {MotiView} from 'moti';
import React from 'react';

type Props = {
  delay?: number;
  duration?: number;
  translateX?: number;
  children: JSX.Element;
};

const AppearMoti = ({
  delay = 0,
  duration = 400,
  translateX = 50,
  children,
}: Props) => (
  <MotiView
    from={{opacity: 0, translateX: translateX}}
    animate={{opacity: 1, translateX: 0}}
    exit={{opacity: 0, translateX: translateX}}
    transition={{delay, type: 'timing', duration}}>
    {children}
  </MotiView>
);

export default AppearMoti;
