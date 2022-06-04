import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ROUTES from './routes';

import useWrappedTheme from '../style/theme/hooks/useWrappedTheme';
import ConversationListScreen from '../scenes/conversationListScreen/conversationListScreen';

const RootStackNav = createNativeStackNavigator();
const navConfig = {headerShown: false};

const RootStack = () => {
  const wrappedTheme = useWrappedTheme();

  return (
    <NavigationContainer theme={wrappedTheme}>
      {/*@ts-ignore TODO: fix ts error (typing) */}
      <RootStackNav.Navigator screenOptions={navConfig}>
        <RootStackNav.Screen
          name={ROUTES.CONVERSATION_LIST}
          component={ConversationListScreen}
          options={{title: 'challengeBro'}}
        />
      </RootStackNav.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
