import {useAnimationState} from 'moti';
import {SPACE} from '../../../../../style/theme/misc';
import {Filter} from '../../../conversationListScreen';

const emailOffset = SPACE.filterButtonWidth + SPACE.m12;
type Variant = {opacity: number; translateX?: number};
type VariantMapping = Record<Filter, Variant>;
const variants: VariantMapping = {
  NONE: {opacity: 0},
  MAIL: {opacity: 1, translateX: emailOffset},
  SMS: {opacity: 1, translateX: 0},
};

const useFilterButtonAnimation = () => {
  const state = useAnimationState(variants);

  const to = (filter: Filter) => state.transitionTo(filter);

  return {state, to};
};

export default useFilterButtonAnimation;
