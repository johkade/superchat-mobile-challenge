import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
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
import ROUTE from '../../nav/routes';
import ConversationWithContact from '../../model/types/conversationWithName';
import {useMutation, useQueryClient} from 'react-query';
import postConversation from '../../service/api/requests/postConversation';
import Conversation, {ConversationType} from '../../model/types/conversation';
import ResponsiveScreenWrapper from '../../components/responsiveScreenWrapper/responsiveScreenWrapper';
import EditContactModal from './components/editContactModal';
import AppearMoti from '../../components/appearMoti';
import {MotiView} from 'moti';
import useRotateAnimation from '../../util/animation/useRotateAnimation';

type ScreenProps = {
  navigation: NavigationProp<any, any>;
  route: {params: {contact: Contact}};
};

const ContactDetailsScreen = ({navigation, route}: ScreenProps) => {
  const theme = useTheme();
  const {id, first_name, last_name, email, phone} = route.params.contact;
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const {state: rotationState, to: rotateTo} = useRotateAnimation([
    '0deg',
    '-45deg',
  ]);

  useEffect(() => {
    modalOpen && rotateTo(1);
    !modalOpen && rotateTo(0);
  }, [modalOpen, rotateTo]);

  const {mutate: createConversation} = useMutation(postConversation, {
    onSuccess: response => {
      queryClient.invalidateQueries('conversations');
      const conversationWithName: ConversationWithContact = {
        ...response,
        last_name,
        first_name,
        email,
        phone,
      };
      navigation.navigate(ROUTE.CONVERSATION_DETAILS, {conversationWithName});
    },
  });

  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({title: getTitle(route.params.contact)});
  }, [navigation, route.params.contact]);

  const navigateToExistingOrNewConversation = (type: ConversationType) => {
    const conversations: Conversation[] | undefined =
      queryClient.getQueryData('conversations');

    const existingConv = conversations?.find(
      conv => conv.contactId === id && conv.conversationType === type,
    );
    if (existingConv) {
      navigation.navigate(ROUTE.CONVERSATION_DETAILS, {
        conversationWithName: {...existingConv, last_name, first_name},
      });
    } else {
      createConversation({conversationType: type, contactId: id});
    }
  };

  const onPressEmail = () => {
    Linking.openURL(`mailto:${email}`).catch(() =>
      Alert.alert('', 'Could not open mail app to start conversation.'),
    );
  };

  const onPressPhoneNumber = () => {
    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert('', 'Could not open phone app to start a call.'),
    );
  };

  return (
    <>
      <ResponsiveScreenWrapper>
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
                style={styles.bottomMargined}
              />
              <CText
                text={`${first_name ?? ''} ${last_name ?? ''}`}
                fontConfig={FC.h1}
                style={styles.bottomMargined}
              />
              <CText
                text={`${email ?? 'no email address ????'}`}
                fontConfig={FC.textL}
                style={styles.bottomMargined}
                color={email ? theme.secondary : theme.fontLight}
                onPress={email ? onPressEmail : undefined}
              />
              <CText
                text={`${phone ?? 'no phone number ????'}`}
                fontConfig={FC.textL}
                color={phone ? theme.secondary : theme.fontLight}
                onPress={email ? onPressPhoneNumber : undefined}
              />
              <View style={styles.actionButtonContainer}>
                {phone?.length && (
                  <AppearMoti delay={100}>
                    <FloatingActionButton
                      onPress={() => navigateToExistingOrNewConversation('SMS')}
                      icon={'chatbubble-outline'}
                      style={styles.actionButton}
                    />
                  </AppearMoti>
                )}
                {email?.length && (
                  <AppearMoti delay={200}>
                    <FloatingActionButton
                      onPress={() =>
                        navigateToExistingOrNewConversation('MAIL')
                      }
                      icon={'mail-outline'}
                      style={styles.actionButton}
                    />
                  </AppearMoti>
                )}
                <MotiView
                  state={rotationState}
                  transition={{type: 'timing', duration: 400}}>
                  <AppearMoti delay={300}>
                    <FloatingActionButton
                      onPress={() => setModalOpen(true)}
                      icon={'pencil-outline'}
                    />
                  </AppearMoti>
                </MotiView>
              </View>
            </>
          </KeyboardAvoidingView>
          <EditContactModal
            contact={route.params.contact}
            visible={modalOpen}
            onPressOutside={() => setModalOpen(false)}
          />
        </SafeAreaView>
      </ResponsiveScreenWrapper>
    </>
  );
};
export default ContactDetailsScreen;

const styles = StyleSheet.create({
  SAV: {flex: 1},
  container: {
    flex: 1,
    paddingTop: SPACE.l16,
    paddingBottom: 64,
    alignItems: 'center',
  },
  actionButtonContainer: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
    marginBottom: 64,
    marginRight: SPACE.sidePadding,
  },
  actionButton: {marginBottom: SPACE.s8},
  bottomMargined: {
    marginBottom: SPACE.m12,
  },
});

function getTitle(contact: Contact) {
  const {first_name, last_name} = contact;
  return `${first_name ?? ''} ${last_name ?? ''} `;
}
