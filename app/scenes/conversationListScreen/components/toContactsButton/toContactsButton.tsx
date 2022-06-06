import React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import FloatingActionButton from '../../../../components/floatingActionButton';
import {SPACE} from '../../../../style/theme/misc';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

const ToContactsButton = ({onPress}: Props) => {
  return (
    <FloatingActionButton
      onPress={onPress}
      icon={'person-outline'}
      style={styles.button}
    />
  );
};
export default ToContactsButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 64,
    right: SPACE.sidePadding,
  },
});
