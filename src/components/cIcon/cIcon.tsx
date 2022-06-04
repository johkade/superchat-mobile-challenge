import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import useTheme from '../../style/theme/hooks/useTheme';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ACTIVE_OPACITY, ICON_SIZE} from '../../style/theme/misc';

export type AvailableIcon =
  | 'mail-outline'
  | 'chatbubble-outline'
  | 'close-outline'
  | 'filter-outline'
  | 'send-outline'
  | 'person-outline'
  | 'moon-outline';

type Props = {
  icon: AvailableIcon;
  size?: number;
  color?: string;
  style?: ViewStyle;
  withBgColor?: string;
  disabledBgColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  padding?: number;
  disabled?: boolean;
};

const CIcon = ({
  icon,
  size = ICON_SIZE.l24,
  color,
  withBgColor,
  disabledBgColor,
  style,
  onPress,
  padding,
  disabled,
}: Props) => {
  const theme = useTheme();

  const dynamicStyle = [
    styles.container,
    style,
    {
      backgroundColor: withBgColor
        ? disabled
          ? disabledBgColor
          : withBgColor
        : undefined,
      width: size + 2 * (padding ?? size * 0.25),
    },
  ];
  const viewProps = {style: dynamicStyle};
  const touchableProps = {
    activeOpacity: ACTIVE_OPACITY,
    disabled,
    onPress,
    ...viewProps,
  };
  const iconProps = {
    name: icon,
    size,
    color: color ?? theme.fontStd,
    style: styles.icon,
  };

  return onPress ? (
    <TouchableOpacity {...touchableProps}>
      {/*@ts-ignore --> TODO: fix this later (warning)*/}
      <Ionicons {...iconProps} />
    </TouchableOpacity>
  ) : (
    <View {...touchableProps}>
      {/*@ts-ignore --> TODO: fix this later (warning)*/}
      <Ionicons {...iconProps} />
    </View>
  );
};

export default CIcon;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
});
