import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import ConversationDisplay from '../../components/conversationDisplay';
import {
  sampleContact,
  sampleMailConversation,
  sampleSmsConversation,
} from '../../model/samples';
import {SPACE} from '../../style/theme/misc';

type ScreenProps = {
  navigation: NavigationProp<any, any>;
};

const ConversationListScreen = ({}: ScreenProps) => {
  return (
    <View style={styles.container}>
      <ConversationDisplay
        conversation={sampleSmsConversation}
        contact={sampleContact}
      />
    </View>
  );
};
export default ConversationListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACE.sidePadding,
  },
});
