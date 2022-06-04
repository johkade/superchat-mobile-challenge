import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import CText from '../cText';
import {FC} from '../../style/theme/fontConfig';
import {BORDER_RADIUS, BOX_SHADOW_STYLE, SPACE} from '../../style/theme/misc';
import useTheme from '../../style/theme/hooks/useTheme';
import Message from '../../model/types/message';

type Props = {message: Message; style: ViewStyle};

const MessageDisplay = ({message, style}: Props) => {
  const theme = useTheme();
  const {payload} = message;
  const fromMe = useMemo(() => message.payload[0] > 'm', []);

  const dynamicStyle: ViewStyle[] = [
    styles.container,
    {
      borderTopRightRadius: fromMe ? 0 : BORDER_RADIUS.m,
      borderTopLeftRadius: fromMe ? BORDER_RADIUS.m : 0,
      alignSelf: fromMe ? 'flex-end' : 'flex-start',
      backgroundColor: fromMe ? theme.cardActive : theme.cardActiveAlt,
    },
    style,
  ];

  return (
    <View style={dynamicStyle}>
      <CText text={payload} fontConfig={FC.h3} color={theme.onCardActive} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACE.m12,
    paddingVertical: SPACE.s8,
    borderRadius: BORDER_RADIUS.m,
    ...BOX_SHADOW_STYLE,
  },
});
export default MessageDisplay;
