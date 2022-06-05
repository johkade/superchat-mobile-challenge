import React from 'react';
import useSetTheme from '../../style/theme/hooks/useSetTheme';
import CIcon from '../cIcon';
import {ICON_SIZE} from '../../style/theme/misc';
import hapticFeedback from '../../util/haptic/hapticFeedback';

const ThemeToggleButton = ({}) => {
  const {toggleTheme} = useSetTheme();
  return (
    <CIcon
      icon={'moon-outline'}
      size={ICON_SIZE.l24}
      onPress={() => {
        toggleTheme();
        hapticFeedback('heavy');
      }}
    />
  );
};

export default ThemeToggleButton;
