import React from 'react';
import {StyleSheet, View} from 'react-native';
import Avatar from './components';
import Contact from '../../model/types/contact';
import Conversation from '../../model/types/conversation';
import CText from '../cText';
import {FC} from '../../style/theme/fontConfig';
import {BORDER_RADIUS, ICON_SIZE, SPACE} from '../../style/theme/misc';
import CIcon from '../cIcon';
import {AvailableIcon} from '../cIcon/cIcon';
import useTheme from '../../style/theme/hooks/useTheme';

type Props = {conversation: Conversation; contact: Contact};

const ConversationDisplay = ({conversation, contact}: Props) => {
  const theme = useTheme();

  const icon: AvailableIcon =
    conversation.conversationType === 'Mail'
      ? 'mail-outline'
      : 'chatbubble-outline';

  return (
    <View style={[styles.container, {backgroundColor: theme.card}]}>
      <Avatar letter={contact.firstName[0]} bg={'#543'} />
      <CText
        text={`${contact.firstName} ${contact.lastName} `}
        fontConfig={FC.h3}
        style={styles.text}
      />
      <CIcon icon={icon} size={ICON_SIZE.m16} />
    </View>
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
