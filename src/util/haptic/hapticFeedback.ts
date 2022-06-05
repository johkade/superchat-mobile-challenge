import * as Haptics from 'expo-haptics';
import {Platform} from 'react-native';

type HapticFeedbackType =
  | 'success'
  | 'error'
  | 'warning'
  | 'selection'
  | 'light'
  | 'medium'
  | 'heavy';

const hapticFeedback = (type: HapticFeedbackType) => {
  if (Platform.OS !== 'ios') {
    return; // disabling haptics for android and web for now
  }
  switch (type) {
    case 'error':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
    case 'success':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case 'warning':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case 'light':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'medium':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'heavy':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case 'selection':
      Haptics.selectionAsync();
      break;
  }
};

export default hapticFeedback;
