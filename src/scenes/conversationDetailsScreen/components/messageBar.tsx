import React from 'react';
import {GestureResponderEvent, StyleSheet, TextInput, View} from 'react-native';
import CIcon from '../../../components/cIcon';
import useTheme from '../../../style/theme/hooks/useTheme';
import {ICON_SIZE, SPACE} from '../../../style/theme/misc';
import {FC} from '../../../style/theme/fontConfig';

type Props = {
  onSend: (event: GestureResponderEvent) => void;
  text: string;
  setText: (text: string) => void;
};

const MessageBar = ({onSend, setText, text}: Props) => {
  const theme = useTheme();

  const height = SPACE.messageBarHeight;
  return (
    <View style={[styles.container, {backgroundColor: theme.card, height}]}>
      <View style={[styles.innerContainer, {height: SPACE.messageBarHeight}]}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={[styles.input, {color: theme.fontStd}]}
          placeholder={'Jot something down...'}
          placeholderTextColor={theme.fontLight}
        />
        <CIcon
          icon={'send-outline'}
          withBgColor={theme.primary}
          size={ICON_SIZE.m16}
          onPress={onSend}
          padding={SPACE.m12}
          disabled={!text.length}
          disabledBgColor={`${theme.primary}99`}
        />
      </View>
    </View>
  );
};
export default MessageBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACE.sidePadding,
  },
  input: {
    flex: 1,
    minWidth: 200,
    marginRight: SPACE.s8,
    alignSelf: 'stretch',
    ...FC.textL,
  },
});
