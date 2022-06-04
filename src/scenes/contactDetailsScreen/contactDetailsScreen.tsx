import React, {useLayoutEffect} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {SPACE} from '../../style/theme/misc';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/elements';
import Contact from '../../model/types/contact';
import FloatingActionButton from '../../components/floatingActionButton';
import Avatar from '../../components/avatar';
import getAvatarBackground from '../../util/getAvatarBackground';
import useTheme from '../../style/theme/hooks/useTheme';
import {FC} from '../../style/theme/fontConfig';
import CText from '../../components/cText';

type ScreenProps = {
  navigation: NavigationProp<any, any>;
  route: {params: {contact: Contact}};
};

const ContactDetailsScreen = ({navigation, route}: ScreenProps) => {
  const theme = useTheme();
  const {id, first_name, last_name, email, phone} = route.params.contact;

  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({title: getTitle(route.params.contact)});
  }, [navigation, route.params.contact]);

  const onNewConversation = () => {};

  return (
    <SafeAreaView edges={['bottom']} style={styles.SAV}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight}>
        <>
          <Avatar
            letter={(first_name ?? last_name ?? '?')[0]}
            bg={getAvatarBackground(theme, id)}
            size={92}
            fontConfig={FC.h1}
            style={styles.avatar}
          />
          <CText
            text={`${first_name ?? ''} ${last_name ?? ''}`}
            fontConfig={FC.h3}
          />
          <CText
            text={`${email ?? 'no email available'}`}
            fontConfig={FC.textL}
          />
          <CText text={`${phone ?? ''}`} fontConfig={FC.textL} />
          <FloatingActionButton
            onPress={onNewConversation}
            icon={'chatbubble-outline'}
          />
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ContactDetailsScreen;

const styles = StyleSheet.create({
  SAV: {flex: 1},
  container: {
    flex: 1,
    paddingTop: SPACE.l16,
    alignItems: 'center',
  },
  messageItem: {
    marginBottom: SPACE.m12,
    marginHorizontal: SPACE.sidePadding,
  },
  avatar: {
    marginBottom: SPACE.m12,
  },
});

const emojis = ['🥸', '🙃', '🤓', '😎'];
function getTitle(contact: Contact) {
  const {first_name, last_name} = contact;
  const emojiIndex =
    Math.abs((first_name?.[0] ?? last_name?.[0] ?? 'a').charCodeAt(0) - 97) %
    emojis.length;

  return `${first_name ?? ''} ${last_name ?? ''} ${emojis[emojiIndex]}`;
}
