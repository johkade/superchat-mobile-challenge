import React from 'react';
import useTheme from '../../style/theme/hooks/useTheme';
import {GestureResponderEvent, StyleSheet, ViewStyle} from 'react-native';
import {ACTIVE_OPACITY, BORDER_RADIUS, SPACE} from '../../style/theme/misc';
import {PlatformPressable} from '@react-navigation/elements';
import CText from '../cText';
import {FC} from '../../style/theme/fontConfig';

type Props = {
  text: string;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  width?: number;
};

const CButton = ({
  text,
  style,
  onPress,
  disabled,
  width = SPACE.buttonWidth,
}: Props) => {
  const theme = useTheme();
  const dynamicContainerStyle = [
    styles.container,
    {backgroundColor: theme.cardActiveAlt, width},
    style,
  ];

  return (
    <PlatformPressable
      disabled={disabled}
      onPress={onPress}
      pressOpacity={ACTIVE_OPACITY}
      style={dynamicContainerStyle}>
      <CText text={text} fontConfig={FC.h3} />
    </PlatformPressable>
  );
};

export default CButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.s,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACE.xs4,
  },
});
