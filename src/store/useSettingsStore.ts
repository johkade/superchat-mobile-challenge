import create from 'zustand';
import {persist} from 'zustand/middleware';
import {ColorSchemeName} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GlobalSettingsState {
  themeId: ColorSchemeName;
  setThemeId: (themeId: ColorSchemeName) => void;
  toggleTheme: () => void;
}

const useGlobalSettingsStore = create<GlobalSettingsState>()(
  persist(
    set => ({
      themeId: null,
      setThemeId: (themeId: ColorSchemeName) => set(() => ({themeId: themeId})),
      toggleTheme: () =>
        set(state => ({
          themeId: state.themeId === 'dark' ? 'light' : 'dark',
        })),
    }),
    {name: 'settings', getStorage: () => AsyncStorage},
  ),
);

export default useGlobalSettingsStore;
