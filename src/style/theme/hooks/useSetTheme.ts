import useSettingsStore from '../../../store/useSettingsStore';

const useSetTheme = () => {
  const setThemeId = useSettingsStore(data => data.setThemeId);
  const toggleTheme = useSettingsStore(data => data.toggleTheme);
  return {
    setThemeId,
    toggleTheme,
  };
};
export default useSetTheme;
