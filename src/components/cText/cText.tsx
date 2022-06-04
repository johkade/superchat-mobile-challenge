import React from 'react';
import {GestureResponderEvent, Text, TextStyle} from 'react-native';
import FontConfig from '../../style/theme/types/FontConfig';
import useTheme from '../../style/theme/hooks/useTheme';
import {FC} from '../../style/theme/fontConfig';

type Props = {
  text: string;
  fontConfig: FontConfig;
  color?: string;
  style?: TextStyle | TextStyle[];
  onPress?: (event: GestureResponderEvent) => void;
};

const CText = ({text, fontConfig = FC.textL, color, style, onPress}: Props) => {
  const theme = useTheme();

  const styles = {
    ...fontConfig,
    color: color ?? theme.fontStd,
  };
  return (
    <Text style={[styles, style]} onPress={onPress}>
      {text}
    </Text>
  );
};

export default CText;
