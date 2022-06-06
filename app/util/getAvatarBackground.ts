import UnwrappedTheme from '../style/theme/types/UnwrappedTheme';

export default function getAvatarBackground(theme: UnwrappedTheme, id: number) {
  return theme.avatarBackgrounds[id % theme.avatarBackgrounds.length];
}
