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
import AppearMoti from '../../components/appearMoti';

type ScreenProps = {
  navigation: NavigationProp<any, any>;
};

type RenderItemParams = {
  item: Contact;
  index: number;
};

const ContactListScreen = ({navigation}: ScreenProps) => {
  const {data: contacts} = useQuery('contactsList', getContacts);

  const renderContactDisplay = ({item, index}: RenderItemParams) => {
    return (
      <AppearMoti delay={index * 100} translateX={index * 10} duration={400}>
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
      </AppearMoti>
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
