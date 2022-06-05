import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import useThemeId from '../../style/theme/hooks/useThemeId';

type Props = {
  children: JSX.Element | JSX.Element[];
  style?: ViewStyle;
};

const imgSrc = {
  dark: require('../../../assets/pattern.png'),
  light: require('../../../assets/pattern_light.png'),
};

const ResponsiveScreenWrapper = ({children, style = {}}: Props) => {
  const {width} = useWindowDimensions();
  const themeId = useThemeId();
  const marginHorizontal = width > 800 ? width * 0.2 : 0;
  return (
    <>
      <ImageBackground
        source={imgSrc[themeId === 'light' ? 'light' : 'dark']}
        style={[styles.imgBg, {marginHorizontal}]}
        resizeMethod={'scale'}
      />
      <View style={[styles.container, style, {marginHorizontal}]}>
        {children}
      </View>
    </>
  );
};

export default ResponsiveScreenWrapper;

const styles = StyleSheet.create({
  container: {flex: 1},
  imgBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
});
