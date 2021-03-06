import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import ConversationDisplay from '../../components/conversationDisplay';
import {SPACE} from '../../style/theme/misc';
import {useQuery} from 'react-query';
import getConversations from '../../service/api/requests/getConversations';
import getContacts from '../../service/api/requests/getContacts';
import ConversationWithContact from '../../model/types/conversationWithName';
import Header from './components/header';
import ROUTE from '../../nav/routes';
import ToContactsButton from './components/toContactsButton';
import ResponsiveScreenWrapper from '../../components/responsiveScreenWrapper/responsiveScreenWrapper';
import AppearMoti from '../../components/appearMoti';
import {AnimatePresence} from 'moti';

type ScreenProps = {
  navigation: NavigationProp<any, any>;
};

export type Filter = 'NONE' | 'MAIL' | 'SMS';

type RenderItemParams = {
  item: ConversationWithContact;
  index: number;
};

const ConversationListScreen = ({navigation}: ScreenProps) => {
  const {data: conversations} = useQuery('conversations', getConversations);
  const {data: contacts} = useQuery('contacts', getContacts);
  const [filter, setFilter] = useState<Filter>('NONE');

  const [conversationsWithNames, setConversationsWithNames] = useState<
    ConversationWithContact[]
  >([]);

  const renderConversationDisplay = ({item}: RenderItemParams) => {
    return (
      <AppearMoti translateX={0}>
        <ConversationDisplay
          conversationWithName={item}
          style={styles.conversationItem}
          onPress={() =>
            navigation.navigate(ROUTE.CONVERSATION_DETAILS, {
              conversationWithName: item,
            })
          }
        />
      </AppearMoti>
    );
  };

  useEffect(() => {
    const convosWithNames: ConversationWithContact[] = [];

    if (conversations?.length && contacts?.length) {
      conversations?.forEach(conv => {
        const contact = contacts?.find(cont => cont.id === conv.contactId);

        if (contact && (contact.first_name || contact.last_name)) {
          // @ts-ignore
          const contactWithoutId = {...contact, id: undefined};
          const convoWithName: ConversationWithContact = {
            ...contactWithoutId,
            ...conv,
          };
          convosWithNames.push(convoWithName);
        }
      });
    }
    setConversationsWithNames(
      convosWithNames.filter(
        c => c.conversationType === filter || filter === 'NONE',
      ),
    );
  }, [conversations, contacts, filter]);

  return (
    <>
      <ResponsiveScreenWrapper style={styles.container}>
        <AnimatePresence>
          <FlatList
            data={conversationsWithNames}
            renderItem={renderConversationDisplay}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
          />
        </AnimatePresence>
        <AppearMoti delay={800}>
          <ToContactsButton
            onPress={() => navigation.navigate(ROUTE.CONTACT_LIST)}
          />
        </AppearMoti>
      </ResponsiveScreenWrapper>
      <Header filter={filter} setFilter={setFilter} />
    </>
  );
};
export default ConversationListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: SPACE.sidePadding,
    paddingTop: SPACE.headerHeight + SPACE.s8,
  },
  conversationItem: {
    marginBottom: SPACE.xs4,
  },
});
