import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Avatar from '../avatar';
import CText from '../cText';
import {FC} from '../../style/theme/fontConfig';
import {
  ACTIVE_OPACITY,
  BORDER_RADIUS,
  ICON_SIZE,
  SPACE,
} from '../../style/theme/misc';
import useTheme from '../../style/theme/hooks/useTheme';
import Contact from '../../model/types/contact';
import getAvatarBackground from '../../util/getAvatarBackground';
import CIcon from '../cIcon';

type Props = {
  contact: Contact;
  style: ViewStyle;
  onPress: (contact: Contact) => void;
};

const ContactDisplay = ({contact, style, onPress}: Props) => {
  const theme = useTheme();
  const {first_name, last_name, id} = contact;

  const avatarBg = getAvatarBackground(theme, id);

  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      style={[styles.container, {backgroundColor: theme.card}, style]}
      onPress={() => onPress(contact)}>
      <Avatar letter={first_name?.[0] ?? last_name?.[0] ?? '?'} bg={avatarBg} />
      <CText
        text={`${first_name ?? ''} ${last_name ?? ''}`}
        fontConfig={FC.h3}
        style={styles.text}
      />
      <CIcon icon={'person-outline'} size={ICON_SIZE.m16} />
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
export default ContactDisplay;
