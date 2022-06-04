import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {BORDER_RADIUS, SPACE} from '../../../../style/theme/misc';
import useTheme from '../../../../style/theme/hooks/useTheme';
import {Filter} from '../../conversationListScreen';
import CIcon from '../../../../components/cIcon';
import CText from '../../../../components/cText';
import {FC} from '../../../../style/theme/fontConfig';

type Props = {
  filter: Filter;
  activeFilter: Filter;
  setFilter: (filter: Filter) => void;
  style: ViewStyle;
};

const FilterButton = ({setFilter, style, filter, activeFilter}: Props) => {
  const theme = useTheme();
  const active = filter === activeFilter;
  const textColor = active ? theme.onCardActive : theme.fontStd;
  const dynamicStyle = [
    styles.container,
    {
      backgroundColor: active ? theme.cardActive : theme.card,
      borderColor: active ? textColor : 'transparent',
    },
    style,
  ];

  const onPress = () => setFilter(active ? 'NONE' : filter);
  return (
    <TouchableOpacity style={dynamicStyle} onPress={onPress}>
      <CIcon
        icon={filter === 'MAIL' ? 'mail-outline' : 'chatbubble-outline'}
        style={styles.icon}
        onPress={onPress}
        color={textColor}
      />
      <CText
        text={filter === 'SMS' ? 'sms' : 'email'}
        fontConfig={FC.textL}
        color={textColor}
      />
    </TouchableOpacity>
  );
};
export default FilterButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SPACE.s8,
    paddingRight: SPACE.m12,
    paddingVertical: SPACE.xxs2,
    borderRadius: BORDER_RADIUS.s,
    borderWidth: 1,
  },
  icon: {
    marginRight: SPACE.xxs2,
  },
});
