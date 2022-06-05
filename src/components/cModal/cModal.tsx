import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {BlurView} from 'expo-blur';
import AppearMoti from '../appearMoti';

type Props = {
  visible: boolean;
  onPressOutside: (event: GestureResponderEvent) => void;
  children: JSX.Element | JSX.Element[];
  containerStyle?: ViewStyle;
};

const intensity = Platform.select({android: 50, default: 8});

const CModal = ({visible, onPressOutside, children, containerStyle}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      style={[styles.container]}
      animated={true}
      animationType={'fade'}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressOutside}
        style={styles.touchableWrapper}>
        <BlurView
          intensity={intensity}
          style={[styles.blurView, containerStyle]}>
          <TouchableOpacity // for pressOutside behavior
            activeOpacity={1}
            onPress={() => {}}
            style={styles.childrenWrapper}>
            {children}
          </TouchableOpacity>
        </BlurView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  touchableWrapper: {
    flex: 1,
  },
  blurView: {
    flex: 1,
    alignItems: 'center',
  },
  childrenWrapper: {},
});
export default CModal;
