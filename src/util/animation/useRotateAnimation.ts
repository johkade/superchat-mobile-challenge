import {useAnimationState} from 'moti';
import {useEffect, useMemo} from 'react';
import getVariantsFromArray from './getVariantsFromArray';

export type RotationArray = string[];

const useRotateAnimation = (
  steps: RotationArray,
  to1AtInit: boolean = false,
) => {
  const variants = useMemo(
    () => getVariantsFromArray(steps, 'rotate'),
    [steps],
  );
  const state = useAnimationState(variants);

  const to = (index: number) => state.transitionTo(String(index));

  useEffect(() => {
    to1AtInit && to(1);
  }, []);

  return {state, to};
};

export default useRotateAnimation;
