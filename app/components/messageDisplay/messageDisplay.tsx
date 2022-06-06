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
  const {payload, source, timestamp} = message;
  const fromMe = source === 'USER';

  const date = useMemo(
    () => timestamp?.split('T')[1].substring(0, 5) ?? '',
    [timestamp],
  );
  const dynamicStyle: ViewStyle[] = [
    styles.container,
    {
      borderTopRightRadius: fromMe ? 0 : BORDER_RADIUS.m,
      borderTopLeftRadius: fromMe ? BORDER_RADIUS.m : 0,
      alignSelf: fromMe ? 'flex-end' : 'flex-start',
      backgroundColor: fromMe ? theme.cardActive : theme.cardActiveAlt,
      flexDirection: fromMe ? 'row' : 'row-reverse',
    },
    style,
  ];
  const dynamicTimeStyle = [
    styles.time,
    {
      marginLeft: fromMe ? SPACE.m12 : 0,
      marginRight: fromMe ? 0 : SPACE.m12,
    },
  ];

  return (
    <View style={dynamicStyle}>
      <CText text={payload} fontConfig={FC.h3} color={theme.onCardActive} />
      <CText
        text={date}
        fontConfig={FC.textS}
        color={theme.onCardActive}
        style={dynamicTimeStyle}
      />
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

  time: {
    alignSelf: 'flex-end',
  },
});
export default MessageDisplay;
