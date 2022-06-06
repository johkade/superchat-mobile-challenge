import {ColorSchemeName, useColorScheme} from 'react-native';
import useThemeId from './useThemeId';
import {DARK_THEME_WRAPPED, LIGHT_THEME_WRAPPED} from '../themes';
import ExtendedWrappedTheme from '../types/ExtendedWrappedTheme';

const useWrappedTheme = (): ExtendedWrappedTheme => {
  const systemThemeId = useColorScheme();
  const storedThemeId = useThemeId();

  const themeIdToUse: ColorSchemeName =
    storedThemeId ?? systemThemeId ?? 'dark';

  return themeIdToUse === 'dark' ? DARK_THEME_WRAPPED : LIGHT_THEME_WRAPPED;
};
export default useWrappedTheme;
