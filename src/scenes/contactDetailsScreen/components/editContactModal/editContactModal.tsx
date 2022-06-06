import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import CText from '../../../../components/cText';
import useTheme from '../../../../style/theme/hooks/useTheme';
import {FC} from '../../../../style/theme/fontConfig';
import CModal from '../../../../components/cModal';
import {
  BORDER_RADIUS,
  BOX_SHADOW_STYLE,
  SPACE,
} from '../../../../style/theme/misc';
import {useKeyboard} from '@react-native-community/hooks';
import CTextInput from '../../../../components/cTextInput';
import Contact from '../../../../model/types/contact';
import CButton from '../../../../components/cButton';
import {useMutation} from 'react-query';
import putContact from '../../../../service/api/requests/putContact';
import AppearMoti from '../../../../components/appearMoti';

type Props = {
  contact: Contact;
  visible: boolean;
  onPressOutside: (event: GestureResponderEvent | undefined) => void;
};

const EditContactModal = ({visible, onPressOutside, contact}: Props) => {
  const {last_name, first_name, phone, email, id} = contact;
  const theme = useTheme();
  const {keyboardHeight} = useKeyboard();
  const [newFirstName, setNewFirstName] = useState(first_name ?? '');
  const [newLastName, setNewLastName] = useState(last_name ?? '');
  const [newPhone, setNewPhone] = useState(phone);
  const [newEmail, setNewEmail] = useState(email);
  const [focusIterator, setFocusIterator] = useState(0);
  const [blurIterator, setBlurIterator] = useState(0);
  const {height} = useWindowDimensions();

  useEffect(() => {
    if (visible) {
      setFocusIterator(prev => prev + 1);
      setBlurIterator(0);
    } else {
      setBlurIterator(prev => prev + 1);
      setFocusIterator(0);
    }
  }, [visible]);

  const {mutate: editContact} = useMutation(putContact);

  const onSubmit = () => {
    editContact({
      email: newEmail,
      phone: newPhone,
      first_name: newFirstName,
      last_name: newLastName,
      id,
    });
    onPressOutside(undefined);
  };
  const dynamicMotiStyle = [
    styles.contentContainer,
    {
      backgroundColor: theme.background,
      marginBottom: Platform.select({
        android: 0,
        ios: keyboardHeight,
        web: height > 800 ? height * 0.2 : height * 0.1,
      }),
    },
  ];

  return (
    <CModal
      visible={visible}
      onPressOutside={onPressOutside}
      containerStyle={styles.container}>
      <AppearMoti
        delay={200}
        duration={200}
        translateX={0}
        style={dynamicMotiStyle}>
        <CText text={'Edit Contact'} fontConfig={FC.h3} />
        <CTextInput
          value={newFirstName}
          onValueChange={t => setNewFirstName(t)}
          label={'Given name'}
          inputType={'username'}
          focusIterator={focusIterator}
          blurIterator={blurIterator}
          withoutErrorMsg
        />
        <CTextInput
          value={newLastName}
          onValueChange={t => setNewLastName(t)}
          label={'Family name'}
          inputType={'username'}
          withoutErrorMsg
          style={styles.withTopMargin}
        />
        <CTextInput
          value={newEmail}
          onValueChange={t => setNewEmail(t)}
          label={'Email'}
          inputType={'email'}
          withoutErrorMsg
          style={styles.withTopMargin}
        />
        <CTextInput
          value={newPhone}
          onValueChange={t => setNewPhone(t)}
          label={'Phone number'}
          inputType={'phone'}
          withoutErrorMsg
          style={styles.withTopMargin}
        />
        <CButton
          text={'Submit'}
          disabled={!newLastName && !newFirstName}
          onPress={onSubmit}
          style={styles.button}
        />
      </AppearMoti>
    </CModal>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-end'},
  contentContainer: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    minHeight: 200,
    minWidth: 200,
    padding: SPACE.sidePadding,
    borderRadius: BORDER_RADIUS.m,
    ...BOX_SHADOW_STYLE,
  },
  withTopMargin: {marginTop: SPACE.xs4},
  button: {marginTop: SPACE.s8},
});
export default EditContactModal;
