import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import CText from '../cText';
import {FC} from '../../style/theme/fontConfig';
import {SPACE} from '../../style/theme/misc';
import FontConfig from '../../style/theme/types/FontConfig';

type Props = {
  letter: string;
  style?: ViewStyle;
  bg: string;
  size?: number;
  fontConfig?: FontConfig;
};

const defaultFontConfig = FC.h3;
const defaultSize = defaultFontConfig.lineHeight + SPACE.xs4 * 2;

const Avatar = ({
  letter,
  style,
  bg,
  size = defaultSize,
  fontConfig = defaultFontConfig,
}: Props) => {
  return (
    <View
      style={[styles.container, {backgroundColor: bg, height: size}, style]}>
      <CText text={letter} fontConfig={fontConfig} style={styles.letter} />
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
