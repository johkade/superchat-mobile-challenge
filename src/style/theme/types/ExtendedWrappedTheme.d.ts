import {Theme} from '@react-navigation/native';
import UnwrappedTheme from './UnwrappedTheme';

type ExtendedWrappedTheme = Theme & {colors: UnwrappedTheme};

export default ExtendedWrappedTheme;
