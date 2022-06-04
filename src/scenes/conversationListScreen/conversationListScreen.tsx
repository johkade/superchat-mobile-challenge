import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import CText from '../../components/cText/cText';
import {FC} from '../../style/theme/fontConfig';

type ScreenProps = {
  navigation: NavigationProp<any, any>;
};

const ConversationListScreen = ({}: ScreenProps) => {
  return (
    <View style={styles.container}>
      <CText text={'hi'} fontConfig={FC.textL} color={'#000'} />
    </View>
  );
};
export default ConversationListScreen;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
