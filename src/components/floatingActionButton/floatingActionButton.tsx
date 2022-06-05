import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import CIcon, {AvailableIcon} from '../cIcon/cIcon';
import useTheme from '../../style/theme/hooks/useTheme';
import {
  ACTIVE_OPACITY,
  BOX_SHADOW_STYLE,
  ICON_SIZE,
  SPACE,
} from '../../style/theme/misc';
import COLORS from '../../style/theme/colors';
import hapticFeedback from '../../util/haptic/hapticFeedback';
import {PlatformPressable} from '@react-navigation/elements';

type Props = {
  onPress: () => void;
  icon: AvailableIcon;
  style?: ViewStyle;
};
const sizes = {
  height: SPACE.floatingActionButton,
  width: SPACE.floatingActionButton,
};
const iconSize = ICON_SIZE.l24;

const FloatingActionButton = ({onPress = () => {}, icon, style}: Props) => {
  const theme = useTheme();
  return (
    <PlatformPressable
      pressOpacity={ACTIVE_OPACITY}
      pressColor={theme.ripple}
      style={[styles.container, {backgroundColor: theme.primary}, style]}
      onPress={() => {
        onPress();
        hapticFeedback('light');
      }}>
      <CIcon icon={icon} color={COLORS.white} size={iconSize} padding={0} />
    </PlatformPressable>
  );
};
export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    ...sizes,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    ...BOX_SHADOW_STYLE,
  },
});
