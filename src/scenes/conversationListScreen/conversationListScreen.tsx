import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import ConversationDisplay from '../../components/conversationDisplay';
import {SPACE} from '../../style/theme/misc';
import {useQuery} from 'react-query';
import getConversations from '../../service/api/requests/getConversations';
import getContacts from '../../service/api/requests/getContacts';
import ConversationWithName from '../../model/types/conversationWithName';
import {SafeAreaView} from 'react-native-safe-area-context';

type ScreenProps = {
  navigation: NavigationProp<any, any>;
};

type RenderItemParams = {
  item: ConversationWithName;
};

const ConversationListScreen = ({}: ScreenProps) => {
  const {data: conversations} = useQuery('conversations', getConversations);
  const {data: contacts} = useQuery('contacts', getContacts);

  const [conversationsWithNames, setConversationsWithNames] = useState<
    ConversationWithName[]
  >([]);

  useEffect(() => {
    const convosWithNames: ConversationWithName[] = [];

    if (conversations?.length && contacts?.length) {
      conversations?.forEach(conv => {
        const contact = contacts?.find(cont => cont.id === conv.contactId);
        if (contact && contact.first_name && contact.last_name) {
          const convoWithName: ConversationWithName = {
            ...conv,
            first_name: contact.first_name,
            last_name: contact.last_name,
          };
          convosWithNames.push(convoWithName);
        }
      });
    }
    setConversationsWithNames(convosWithNames);
  }, [conversations, contacts]);

  const renderConversationDisplay = ({item}: RenderItemParams) => {
    return (
      <ConversationDisplay
        conversationWithName={item}
        style={styles.conversationItem}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={conversationsWithNames}
        renderItem={renderConversationDisplay}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};
export default ConversationListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACE.sidePadding,
  },
  flatList: {
    flex: 1,
  },
  conversationItem: {
    marginBottom: SPACE.xs4,
  },
});
