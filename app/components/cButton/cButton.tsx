import React from 'react';
import useTheme from '../../style/theme/hooks/useTheme';
import {StyleSheet, ViewStyle} from 'react-native';
import {ACTIVE_OPACITY, BORDER_RADIUS, SPACE} from '../../style/theme/misc';
import {PlatformPressable} from '@react-navigation/elements';
import CText from '../cText';
import {FC} from '../../style/theme/fontConfig';
import hapticFeedback from '../../util/haptic/hapticFeedback';

type Props = {
  text: string;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  width?: number;
};

const CButton = ({
  text,
  style,
  onPress = () => {},
  disabled,
  width = SPACE.buttonWidth,
}: Props) => {
  const theme = useTheme();
  const dynamicContainerStyle = [
    styles.container,
    {
      backgroundColor: disabled
        ? `${theme.cardActiveAlt}99`
        : theme.cardActiveAlt,
      width,
    },
    style,
  ];

  return (
    <PlatformPressable
      disabled={disabled}
      onPress={() => {
        hapticFeedback('light');
        onPress();
      }}
      pressOpacity={ACTIVE_OPACITY}
      style={dynamicContainerStyle}>
      <CText
        text={text}
        fontConfig={FC.h3}
        color={disabled ? theme.fontLight : theme.fontStd}
      />
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
