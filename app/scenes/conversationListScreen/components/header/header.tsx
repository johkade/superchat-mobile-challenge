import React, {useEffect} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {
  BORDER_RADIUS,
  BOX_SHADOW_STYLE,
  SPACE,
} from '../../../../style/theme/misc';
import useTheme from '../../../../style/theme/hooks/useTheme';
import {Filter} from '../../conversationListScreen';
import CIcon from '../../../../components/cIcon';
import COLORS from '../../../../style/theme/colors';
import FilterButton from '../filterButton';
import CText from '../../../../components/cText';
import {FC} from '../../../../style/theme/fontConfig';
import AppearMoti from '../../../../components/appearMoti';
import {AnimatePresence, MotiView} from 'moti';
import useFilterButtonAnimation from './util/useFilterButtonAnimation';
import hapticFeedback from '../../../../util/haptic/hapticFeedback';

type Props = {
  filter: Filter;
  setFilter: (type: Filter) => void;
};

const Header = ({filter, setFilter}: Props) => {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const paddingHorizontal = width > 800 ? width * 0.2 : SPACE.sidePadding;
  const {state, to} = useFilterButtonAnimation();

  useEffect(() => {
    to(filter);
  }, [filter, to]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.card, paddingHorizontal},
      ]}>
      <MotiView
        style={[
          styles.movingMoti,
          {left: paddingHorizontal, backgroundColor: theme.cardActive},
        ]}
        state={state}
        transition={{type: 'timing', duration: 300}}
      />

      <FilterButton
        filter={'SMS'}
        activeFilter={filter}
        setFilter={setFilter}
        style={styles.filterButton}
      />

      <FilterButton
        filter={'MAIL'}
        activeFilter={filter}
        setFilter={setFilter}
        style={styles.filterButton}
      />
      <AnimatePresence>
        {filter !== 'NONE' && (
          <AppearMoti duration={100} translateX={25}>
            <CIcon
              icon={'close-outline'}
              onPress={() => {
                hapticFeedback('warning');
                setFilter('NONE');
              }}
              withBgColor={theme.cardActive}
              color={COLORS.white}
            />
          </AppearMoti>
        )}
      </AnimatePresence>
      <CText
        text={'add a filter'}
        style={[styles.filterIcon, {right: paddingHorizontal + SPACE.m12}]}
        fontConfig={FC.textS}
        color={theme.fontLight}
      />
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height: SPACE.headerHeight,
    ...BOX_SHADOW_STYLE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    marginRight: SPACE.m12,
  },
  filterIcon: {
    position: 'absolute',
    top: SPACE.xs4,
  },
  movingMoti: {
    position: 'absolute',
    height: SPACE.headerHeight - SPACE.xs4 * 2,
    bottom: SPACE.xs4,
    width: SPACE.filterButtonWidth,
    borderRadius: BORDER_RADIUS.s,
  },
});
