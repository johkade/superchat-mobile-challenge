import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ROUTES from './routes';

import useWrappedTheme from '../style/theme/hooks/useWrappedTheme';
import ConversationListScreen from '../scenes/conversationListScreen/conversationListScreen';
import ConversationDetailsScreen from '../scenes/conversationDetailsScreen/conversationDetailsScreen';
import {FC} from '../style/theme/fontConfig';
import ContactListScreen from '../scenes/contactListScreen/contactListScreen';
import ContactDetailsScreen from '../scenes/contactDetailsScreen/contactDetailsScreen';
import ThemeToggleButton from '../components/themeToggleButton';

const RootStackNav = createNativeStackNavigator();

const RootStack = () => {
  const wrappedTheme = useWrappedTheme();

  return (
    <NavigationContainer theme={wrappedTheme}>
      {/*@ts-ignore TODO: fix ts error (typing) */}
      <RootStackNav.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleStyle: FC.h3,
          headerBackTitleStyle: FC.textL,
          headerTintColor: wrappedTheme.colors.text,
          headerBackTitle: 'Back',
          animation: 'slide_from_right',
        }}>
        <RootStackNav.Screen
          name={ROUTES.CONVERSATION_LIST}
          component={ConversationListScreen}
          options={{title: 'Conversations', headerRight: ThemeToggleButton}}
        />
        <RootStackNav.Screen
          name={ROUTES.CONVERSATION_DETAILS}
          component={ConversationDetailsScreen}
          options={{
            title: '',
          }} //set asynchronously inside screen
        />
        <RootStackNav.Screen
          name={ROUTES.CONTACT_LIST}
          component={ContactListScreen}
          options={{title: 'Contacts'}}
        />
        <RootStackNav.Screen
          name={ROUTES.CONTACT_DETAILS}
          component={ContactDetailsScreen}
          options={{title: ''}} //set asynchronously inside screen
        />
      </RootStackNav.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
