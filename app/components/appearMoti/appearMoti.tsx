import {MotiView} from 'moti';
import React from 'react';
import {ViewStyle} from 'react-native';

type Props = {
  delay?: number;
  duration?: number;
  translateX?: number;
  children: JSX.Element | JSX.Element[];
  style?: ViewStyle | ViewStyle[];
};

const AppearMoti = ({
  delay = 0,
  duration = 400,
  translateX = 50,
  children,
  style,
}: Props) => (
  <MotiView
    from={{opacity: 0, translateX: translateX}}
    animate={{opacity: 1, translateX: 0}}
    exit={{opacity: 0, translateX: translateX}}
    transition={{delay, type: 'timing', duration}}
    style={style}>
    {children}
  </MotiView>
);

export default AppearMoti;
