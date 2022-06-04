import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ROUTES from './routes';

import useWrappedTheme from '../style/theme/hooks/useWrappedTheme';
import ConversationListScreen from '../scenes/conversationListScreen/conversationListScreen';
import ConversationDetailsScreen from '../scenes/conversationDetailsScreen/conversationDetailsScreen';
import {FC} from '../style/theme/fontConfig';

const RootStackNav = createNativeStackNavigator();
const navConfig = {headerShown: true};

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
        }}>
        <RootStackNav.Screen
          name={ROUTES.CONVERSATION_LIST}
          component={ConversationListScreen}
          options={{title: 'Conversations'}}
        />
        <RootStackNav.Screen
          name={ROUTES.CONVERSATION_DETAILS}
          component={ConversationDetailsScreen}
        />
      </RootStackNav.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
