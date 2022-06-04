import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BOX_SHADOW_STYLE, SPACE} from '../../../../style/theme/misc';
import useTheme from '../../../../style/theme/hooks/useTheme';
import {Filter} from '../../conversationListScreen';
import CIcon from '../../../../components/cIcon';
import COLORS from '../../../../style/theme/colors';
import FilterButton from '../filterButton';
import CText from '../../../../components/cText';
import {FC} from '../../../../style/theme/fontConfig';

type Props = {
  filter: Filter;
  setFilter: (type: Filter) => void;
};

const Header = ({filter, setFilter}: Props) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.card}]}>
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

      {filter !== 'NONE' && (
        <CIcon
          icon={'close-outline'}
          onPress={() => setFilter('NONE')}
          withBgColor={theme.cardActive}
          color={COLORS.white}
        />
      )}
      <CText
        text={'add a filter'}
        style={styles.filterIcon}
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
    paddingHorizontal: SPACE.sidePadding,
  },
  filterButton: {
    marginRight: SPACE.m12,
  },
  filterIcon: {
    position: 'absolute',
    top: SPACE.xs4,
    right: SPACE.m12,
  },
});
