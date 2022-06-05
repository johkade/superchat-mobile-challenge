import {MotiView} from 'moti';
import React from 'react';

const AppearMoti = ({
  delay,
  children,
}: {
  delay: number;
  children: JSX.Element;
}) => (
  <MotiView
    from={{opacity: 0, translateX: 50}}
    animate={{opacity: 1, translateX: 0}}
    transition={{delay, type: 'timing', duration: 400}}>
    {children}
  </MotiView>
);

export default AppearMoti;
