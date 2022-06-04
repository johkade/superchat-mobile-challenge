import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {SPACE} from '../../style/theme/misc';
import {useQuery} from 'react-query';
import getContacts from '../../service/api/requests/getContacts';
import ROUTE from '../../nav/routes';
import Contact from '../../model/types/contact';
import ContactDisplay from '../../components/contactDisplay';

type ScreenProps = {
  navigation: NavigationProp<any, any>;
};

type RenderItemParams = {
  item: Contact;
};

const ContactListScreen = ({navigation}: ScreenProps) => {
  const {data: contacts} = useQuery('contacts', getContacts);

  const renderContactDisplay = ({item}: RenderItemParams) => {
    return (
      <ContactDisplay
        contact={item}
        style={styles.contactItem}
        onPress={() =>
          navigation.navigate(ROUTE.CONTACT_DETAILS, {
            contact: item,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactDisplay}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};
export default ContactListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: SPACE.sidePadding,
    paddingTop: SPACE.s8,
  },
  contactItem: {
    marginBottom: SPACE.xs4,
  },
});
