import create from 'zustand';
import {persist} from 'zustand/middleware';
import {ColorSchemeName} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GlobalSettingsState {
  themeId: ColorSchemeName;
  setThemeId: (themeId: ColorSchemeName) => void;
}

const useGlobalSettingsStore = create<GlobalSettingsState>()(
  persist(
    set => ({
      themeId: null,
      setThemeId: (themeId: ColorSchemeName) => set(() => ({themeId: themeId})),
    }),
    {name: 'settings', getStorage: () => AsyncStorage},
  ),
);

export default useGlobalSettingsStore;
