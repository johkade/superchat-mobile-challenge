import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import useTheme from '../../style/theme/hooks/useTheme';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ICON_SIZE, SPACE} from '../../style/theme/misc';

export type AvailableIcon = 'mail-outline' | 'chatbubble-outline';

type Props = {
  icon: AvailableIcon;
  size?: number;
  color?: string;
  style?: ViewStyle;
  withBgColor?: string;
};

const CIcon = ({
  icon,
  size = ICON_SIZE.l24,
  color,
  withBgColor,
  style,
}: Props) => {
  const theme = useTheme();

  const dynamicStyle = [
    styles.container,
    style,
    {backgroundColor: withBgColor},
  ];
  return (
    <View style={dynamicStyle}>
      {/*@ts-ignore --> TODO: fix this later (warning)*/}
      <Ionicons name={icon} size={size} color={color ?? theme.fontStd} />
    </View>
  );
};

export default CIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    aspectRatio: 1,
    padding: SPACE.xxs2,
  },
});
