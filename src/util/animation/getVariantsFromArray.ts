import {Variants} from '@motify/core/lib/typescript/src/types';

const getVariantsFromArray = (
  array: Array<any> = [],
  propertyName = 'opacity',
) => {
  let variants: Variants<any> = {};
  if (propertyName === 'rotate') {
    array.map((val, index) => {
      variants[String(index)] = {
        transform: [{rotate: val}],
      };
    });
  } else {
    array.map((val, index) => {
      variants[String(index)] = {
        [propertyName]: val,
      };
    });
  }

  return variants;
};
export default getVariantsFromArray;
