import { isEmpty } from './misc-helper';

const capitalizeFirstLetter = (val: any) => {
  if (isEmpty(val)) return '';

  return val.charAt(0).toUpperCase() + val.slice(1);
};

export default capitalizeFirstLetter;
