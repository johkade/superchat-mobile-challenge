import React from 'react';
import {StatusBar} from 'expo-status-bar';
import useThemeId from '../../style/theme/hooks/useThemeId';

const ThemedStatusBar = ({}) => {
  const themeId = useThemeId();
  return <StatusBar style={themeId === 'light' ? 'dark' : 'light'} />;
};
export default ThemedStatusBar;
