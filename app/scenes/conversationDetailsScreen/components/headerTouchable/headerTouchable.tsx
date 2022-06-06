import React, {useState} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ACTIVE_OPACITY} from '../../../../style/theme/misc';
import CText from '../../../../components/cText';
import {FC} from '../../../../style/theme/fontConfig';
import useTheme from '../../../../style/theme/hooks/useTheme';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

const {width} = Dimensions.get('window');
const fc = FC.h3;

const HeaderTouchable = ({title, onPress}: Props) => {
  const theme = useTheme();
  const [measuredWidth, setMeasuredWidth] = useState<undefined | number>();

  const dynamicContainerStyle = [
    styles.container,
    {
      backgroundColor: theme.card,
      width: measuredWidth,
      right: measuredWidth
        ? (width - measuredWidth) / 2 - Platform.select({ios: 20, default: 0})
        : 0,
    },
  ];

  return (
    <View style={dynamicContainerStyle} pointerEvents={'box-none'}>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        onPress={onPress}
        onLayout={event => {
          setMeasuredWidth(event.nativeEvent.layout.width);
        }}>
        <CText text={title} fontConfig={fc} numberOfLines={1} />
      </TouchableOpacity>
    </View>
  );
};
export default HeaderTouchable;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
