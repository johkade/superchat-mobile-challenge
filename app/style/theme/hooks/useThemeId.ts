import useSettingsStore from '../../../store/useSettingsStore';
import {ColorSchemeName} from 'react-native';

const useThemeId = (): ColorSchemeName => {
  return useSettingsStore(state => state.themeId);
};

export default useThemeId;
