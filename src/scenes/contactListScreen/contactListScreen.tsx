import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {SPACE} from '../../style/theme/misc';
import {useQuery} from 'react-query';
import getContacts from '../../service/api/requests/getContacts';
import ROUTE from '../../nav/routes';
import Contact from '../../model/types/contact';
import ContactDisplay from '../../components/contactDisplay';
import ResponsiveScreenWrapper from '../../components/responsiveScreenWrapper/responsiveScreenWrapper';

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
        key={item.id}
      />
    );
  };

  return (
    <ResponsiveScreenWrapper style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactDisplay}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
    </ResponsiveScreenWrapper>
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
