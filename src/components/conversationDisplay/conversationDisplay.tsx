import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Avatar from './components';
import CText from '../cText';
import {FC} from '../../style/theme/fontConfig';
import {
  ACTIVE_OPACITY,
  BORDER_RADIUS,
  ICON_SIZE,
  SPACE,
} from '../../style/theme/misc';
import CIcon from '../cIcon';
import {AvailableIcon} from '../cIcon/cIcon';
import useTheme from '../../style/theme/hooks/useTheme';
import ConversationWithName from '../../model/types/conversationWithName';
import UnwrappedTheme from '../../style/theme/types/UnwrappedTheme';

type Props = {
  conversationWithName: ConversationWithName;
  style: ViewStyle;
  onPress: (convWithName: ConversationWithName) => void;
};

const iconsForType: {MAIL: AvailableIcon; SMS: AvailableIcon} = {
  MAIL: 'mail-outline',
  SMS: 'chatbubble-outline',
};

const ConversationDisplay = ({conversationWithName, style, onPress}: Props) => {
  const theme = useTheme();
  const {first_name, last_name, conversationType, id} = conversationWithName;

  const icon: AvailableIcon = iconsForType[conversationType];
  const avatarBg = getAvatarBackground(theme, id);

  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      style={[styles.container, {backgroundColor: theme.card}, style]}
      onPress={() => onPress(conversationWithName)}>
      <Avatar letter={first_name?.[0] ?? '?'} bg={avatarBg} />
      <CText
        text={`${first_name} ${last_name}`}
        fontConfig={FC.h3}
        style={styles.text}
      />
      <CIcon icon={icon} size={ICON_SIZE.m16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACE.m12,
    paddingVertical: SPACE.s8,
    borderRadius: BORDER_RADIUS.xs,
  },
  text: {flex: 1, marginHorizontal: SPACE.s8},
});
export default ConversationDisplay;

function getAvatarBackground(theme: UnwrappedTheme, id: number) {
  return theme.avatarBackgrounds[id % theme.avatarBackgrounds.length];
}
