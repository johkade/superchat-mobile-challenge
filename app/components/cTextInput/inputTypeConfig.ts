import {InputType, InputTypeConfig} from './types';

export type InputTypeConfigs = Record<InputType, InputTypeConfig>;

const defaultConfig: InputTypeConfig = {
  keyboardType: 'default',
  autoComplete: 'off',
  textContentType: 'none',
  selectTextOnFocus: false,
  autoCorrect: false,
  spellCheck: false,
  autoCapitalize: 'none',
};

const INPUT_TYPE_CONFIG: InputTypeConfigs = {
  any: {
    ...defaultConfig,
  },
  username: {
    ...defaultConfig,
    textContentType: 'username',
  },
  email: {
    ...defaultConfig,
    keyboardType: 'email-address',
    autoComplete: 'email',
    textContentType: 'emailAddress',
  },
  password: {
    ...defaultConfig,
    autoComplete: 'password',
    textContentType: 'password',
    selectTextOnFocus: true,
  },
  new_password: {
    ...defaultConfig,
    autoComplete: 'password-new',
    textContentType: 'newPassword',
    selectTextOnFocus: true,
  },
  phone: {
    ...defaultConfig,
    keyboardType: 'phone-pad',
    autoComplete: 'tel',
    textContentType: 'telephoneNumber',
  },
};
export default INPUT_TYPE_CONFIG;
