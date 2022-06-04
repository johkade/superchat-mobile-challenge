import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ACTIVE_OPACITY,
  BOX_SHADOW_STYLE,
  ICON_SIZE,
  SPACE,
} from '../../../../style/theme/misc';
import useTheme from '../../../../style/theme/hooks/useTheme';
import {Filter} from '../../conversationListScreen';
import CIcon from '../../../../components/cIcon';
import COLORS from '../../../../style/theme/colors';
import FilterButton from '../filterButton';
import CText from '../../../../components/cText';
import {FC} from '../../../../style/theme/fontConfig';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};
const sizes = {height: 48, width: 48};
const iconSize = ICON_SIZE.l24;

const ToContactsButton = ({onPress}: Props) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      style={[styles.container, {backgroundColor: theme.primary}]}
      onPress={onPress}>
      <CIcon
        icon={'person-outline'}
        color={COLORS.white}
        size={iconSize}
        style={styles.contactIcon}
        padding={0}
      />
    </TouchableOpacity>
  );
};
export default ToContactsButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    ...sizes,
    bottom: 64,
    right: SPACE.sidePadding,
    borderRadius: 1000,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...BOX_SHADOW_STYLE,
  },
  contactIcon: {},
  messageIcon: {},
});
