import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import useTheme from '../../style/theme/hooks/useTheme';
import {BORDER_RADIUS, SPACE} from '../../style/theme/misc';
import {InputType} from './types';
import {InputState} from './types';
import CText from '../cText';
import {FC} from '../../style/theme/fontConfig';
import useThemeId from '../../style/theme/hooks/useThemeId';
import INPUT_TYPE_CONFIG from './inputTypeConfig';
import FontConfig from '../../style/theme/types/FontConfig';
import CIcon from '../cIcon';

type Props = {
  value: string;
  onValueChange: (text: string) => void;
  label: string;
  placeholder?: string;
  width?: number;
  focusIterator?: number;
  blurIterator?: number;
  inputType?: InputType;
  inputState?: InputState;
  style?: TextStyle;
  onFocusChanged?: (isFocused: boolean) => void;
  numberOfLines?: number;
  maxLength?: number;
  fontConfig?: FontConfig;
  errorMessage?: string;
  withoutErrorMsg?: boolean;
};

const paddingVertical = SPACE.xs4;

const CTextInput = ({
  inputType = 'any',
  inputState = 'none',
  label,
  placeholder,
  width = SPACE.inputWidth,
  value,
  onValueChange,
  onFocusChanged = () => {},
  focusIterator,
  blurIterator,
  numberOfLines = 1,
  maxLength,
  style,
  fontConfig = FC.textL,
  errorMessage,
  withoutErrorMsg,
}: Props) => {
  const theme = useTheme();
  const themeId = useThemeId();
  const ref = useRef<TextInput>(null);
  const isAPasswordType = isPasswordType(inputType);
  const clearTextToggleVisible = isAPasswordType && value?.length;
  const [showClearText, setShowClearText] = useState(isAPasswordType);
  const backgroundColor = theme.card;
  const [caretHidden, setCaretHidden] = useState(false);

  // on android the caret wouldn't show up for email-address type unless we set it after mounting the textInput 🤯
  useEffect(() => {
    if (Platform.OS === 'android' && inputType === 'email') {
      setCaretHidden(true);
      setTimeout(() => setCaretHidden(false), 300);
    }
  }, [inputType]);

  const inputTypeProps = INPUT_TYPE_CONFIG[inputType];

  useEffect(() => {
    if (focusIterator && ref?.current) {
      Platform.OS !== 'android' && ref.current.focus();
      Platform.OS === 'android' && setTimeout(() => ref.current?.focus(), 500); // we need this for android :-/
    }
  }, [focusIterator]);
  useEffect(() => {
    if (blurIterator && ref?.current) {
      Platform.OS !== 'android' && ref.current.blur();
      Platform.OS === 'android' && setTimeout(() => ref.current?.blur(), 50); // we need this for android :-/
    }
  }, [blurIterator]);

  const dynamicContainerStyle = [styles.container, {width}, style];
  const dynamicInputRowStyle = [
    styles.inputRow,
    {
      backgroundColor,
      borderColor: inputState === 'error' ? theme.error : backgroundColor,
    },
  ];
  const dynamicInputStyle = [
    styles.input,
    {
      backgroundColor,
      color: theme.fontStd,
      ...fontConfig,
      minHeight: fontConfig.lineHeight + 3 * paddingVertical,
      ...(Platform.OS === 'web' ? {outline: 'none'} : {}),
    },
  ];
  return (
    <View style={dynamicContainerStyle}>
      <CText
        text={label}
        fontConfig={FC.textS}
        style={styles.label}
        color={theme.fontLight}
      />
      <View style={dynamicInputRowStyle}>
        <TextInput
          ref={ref}
          placeholder={placeholder ?? label}
          value={value}
          secureTextEntry={showClearText}
          maxLength={maxLength}
          caretHidden={caretHidden} // this is explicitly needed for android
          // inputType-props
          {...inputTypeProps}
          // multiline-props
          multiline={numberOfLines > 1}
          numberOfLines={numberOfLines}
          textAlignVertical={numberOfLines > 0 ? 'top' : undefined}
          // style
          style={dynamicInputStyle}
          hitSlop={{top: 4, left: 4, bottom: 4, right: 4}}
          maxFontSizeMultiplier={1.2}
          keyboardAppearance={themeId ?? 'light'}
          placeholderTextColor={theme.fontLight}
          // handlers
          onFocus={() => onFocusChanged(true)}
          onBlur={() => onFocusChanged(false)}
          onChangeText={onValueChange}
        />
        {inputState === 'loading' && (
          <ActivityIndicator size={'small'} animating />
        )}

        {inputState === 'error' && (
          <CIcon
            icon={'alert-circle-outline'}
            color={theme.error}
            size={fontConfig.lineHeight}
          />
        )}

        {!!clearTextToggleVisible && (
          <CIcon
            icon={showClearText ? 'eye-outline' : 'eye-off-outline'}
            size={fontConfig.lineHeight}
            onPress={() => setShowClearText(prev => !prev)}
            color={theme.fontLight}
            style={styles.clearTextToggle}
          />
        )}
      </View>
      {!withoutErrorMsg && (
        <CText
          color={theme.error}
          text={errorMessage ?? ' '}
          fontConfig={FC.textS}
          numberOfLines={3}
        />
      )}
    </View>
  );
};
export default CTextInput;

const styles = StyleSheet.create({
  container: {},
  label: {marginBottom: SPACE.xs4},
  inputRow: {
    borderWidth: 1,
    flexDirection: 'row',
    paddingRight: SPACE.s8,
    borderRadius: BORDER_RADIUS.xs,
    marginBottom: SPACE.xs4,
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: SPACE.m12,
    paddingVertical,
  },
  clearTextToggle: {
    marginLeft: SPACE.m12,
  },
});

function isPasswordType(inputType: InputType): boolean {
  return inputType === 'password' || inputType === 'new_password';
}
