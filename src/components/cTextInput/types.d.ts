import {KeyboardType} from 'react-native';

export type InputType =
  | 'email'
  | 'password'
  | 'new_password'
  | 'username'
  | 'any'
  | 'phone';
export type InputTypeConfig = {
  keyboardType: KeyboardType;
  autoComplete:
    | 'off'
    | 'email'
    | 'password'
    | 'name'
    | 'password-new'
    | 'name-family'
    | 'name-given'
    | 'tel';
  textContentType:
    | 'emailAddress'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'givenName'
    | 'familyName'
    | 'telephoneNumber'
    | 'none';
  selectTextOnFocus: boolean;
  autoCapitalize: 'sentences' | 'none' | 'words';
  spellCheck: boolean;
  autoCorrect: boolean;
};
export type InputState = 'error' | 'none' | 'loading';
