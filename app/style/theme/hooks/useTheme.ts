import UnwrappedTheme from '../types/UnwrappedTheme';
import useWrappedTheme from './useWrappedTheme';

const useTheme = (): UnwrappedTheme => {
  const {colors} = useWrappedTheme();

  return colors;
};
export default useTheme;
