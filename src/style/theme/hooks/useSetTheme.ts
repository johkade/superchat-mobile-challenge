import useSettingsStore from '../../../store/useSettingsStore';
import useThemeId from './useThemeId';

const useSetTheme = () => {
  const themeId = useThemeId();
  const setThemeId = useSettingsStore(data => data.setThemeId);
  const toggleTheme = () => setThemeId(themeId === 'light' ? 'dark' : 'light');

  return {
    setThemeId,
    toggleTheme,
  };
};
export default useSetTheme;
