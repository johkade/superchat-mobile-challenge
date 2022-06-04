import React from 'react';
import {useWindowDimensions, View, ViewStyle} from 'react-native';

type Props = {
  children: JSX.Element | JSX.Element[];
  style?: ViewStyle;
};

const ResponsiveScreenWrapper = ({children, style}: Props) => {
  const {width} = useWindowDimensions();
  const marginHorizontal = width > 800 ? width * 0.2 : 0;
  return <View style={{flex: 1, ...style, marginHorizontal}}>{children}</View>;
};

export default ResponsiveScreenWrapper;
