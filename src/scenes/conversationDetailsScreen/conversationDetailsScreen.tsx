import React, {useLayoutEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {SPACE} from '../../style/theme/misc';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import getMessages from '../../service/api/requests/getMessages';
import Message from '../../model/types/message';
import MessageDisplay from '../../components/messageDisplay';
import ConversationWithContact from '../../model/types/conversationWithName';
import MessageBar from './components/messageBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHeaderHeight} from '@react-navigation/elements';
import postMessage from '../../service/api/requests/postMessage';
import ResponsiveScreenWrapper from '../../components/responsiveScreenWrapper/responsiveScreenWrapper';
import HeaderTouchable from './components/headerTouchable';
import ROUTE from '../../nav/routes';
import Contact from '../../model/types/contact';
import AppearMoti from '../../components/appearMoti';
import {AnimatePresence} from 'moti';

type ScreenProps = {
  navigation: NavigationProp<any, any>;
  route: {
    params: {conversationWithName: ConversationWithContact};
  };
};

type RenderItemParams = {
  item: Message;
  index: number;
};

const renderConversationDisplay = ({item, index}: RenderItemParams) => {
  return (
    <AppearMoti translateX={0} delay={(index + 1) * 150}>
      <MessageDisplay message={item} style={styles.messageItem} />
    </AppearMoti>
  );
};

const ConversationDetailsScreen = ({navigation, route}: ScreenProps) => {
  const {id, contactId, first_name, last_name, email, phone} =
    route.params.conversationWithName;
  const queryKey = 'messages' + id;

  const queryClient = useQueryClient();
  const {data: messages} = useQuery(queryKey, () => getMessages(id));

  const {mutate: send} = useMutation(postMessage, {
    onSuccess: () => {
      queryClient?.invalidateQueries(queryKey);
      setNewMessage('');
    },
  });

  const [newMessage, setNewMessage] = useState('');
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    const title = getTitle(route.params.conversationWithName);
    const contact: Contact = {
      id: contactId,
      first_name,
      last_name,
      email,
      phone,
    };
    navigation.setOptions({
      //title: title,
      headerRight: () => (
        <HeaderTouchable
          title={title}
          onPress={() =>
            navigation.navigate(ROUTE.CONTACT_DETAILS, {
              contact: contact,
            })
          }
        />
      ),
    });
  }, [navigation, route.params.conversationWithName]);

  const sendMessage = () => {
    send({payload: newMessage, conversationId: id});
  };

  return (
    <ResponsiveScreenWrapper>
      <SafeAreaView edges={['bottom']} style={styles.SAV}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={
            headerHeight + Platform.select({android: 80, default: 0})
          }>
          <AnimatePresence>
            <FlatList
              inverted
              data={messages}
              renderItem={renderConversationDisplay}
              style={styles.flatList}
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={styles.flatListContent}
              bounces={false}
              ListHeaderComponent={
                <MessageBar
                  text={newMessage}
                  setText={setNewMessage}
                  onSend={sendMessage}
                />
              }
            />
          </AnimatePresence>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ResponsiveScreenWrapper>
  );
};
export default ConversationDetailsScreen;

const styles = StyleSheet.create({
  SAV: {flex: 1},
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {},
  messageItem: {
    marginBottom: SPACE.m12,
    marginHorizontal: SPACE.sidePadding,
  },
});

function getTitle(conversationWithName: ConversationWithContact) {
  const {conversationType, first_name, last_name} = conversationWithName;
  const typeString = conversationType === 'MAIL' ? 'Mails' : 'Messages';
  return `${typeString} with ${first_name ?? ''} ${last_name ?? ''}`;
}
