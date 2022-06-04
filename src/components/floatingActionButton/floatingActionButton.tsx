import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
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

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  icon: AvailableIcon;
};
const sizes = {height: 48, width: 48};
const iconSize = ICON_SIZE.l24;

const FloatingActionButton = ({onPress, icon}: Props) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      style={[styles.container, {backgroundColor: theme.primary}]}
      onPress={onPress}>
      <CIcon icon={icon} color={COLORS.white} size={iconSize} padding={0} />
    </TouchableOpacity>
  );
};
export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    ...sizes,
    bottom: 64,
    right: SPACE.sidePadding,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    ...BOX_SHADOW_STYLE,
  },
});
