import React from 'react';
import {GestureResponderEvent} from 'react-native';
import FloatingActionButton from '../../../../components/floatingActionButton';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

const ToContactsButton = ({onPress}: Props) => {
  return <FloatingActionButton onPress={onPress} icon={'person-outline'} />;
};
export default ToContactsButton;
