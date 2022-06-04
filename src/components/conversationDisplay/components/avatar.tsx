import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import CText from '../../cText';
import {FC} from '../../../style/theme/fontConfig';
import {BORDER_RADIUS, SPACE} from '../../../style/theme/misc';

type Props = {letter: string; style?: ViewStyle; bg: string};

const fc = FC.h3;
const size = fc.lineHeight + SPACE.xs4 * 2;
const Avatar = ({letter, style, bg}: Props) => {
  return (
    <View
      style={[styles.container, {backgroundColor: bg, height: size}, style]}>
      <CText text={letter} fontConfig={fc} style={styles.letter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    borderRadius: 1000,
  },
  letter: {padding: SPACE.xs4},
});
export default Avatar;
