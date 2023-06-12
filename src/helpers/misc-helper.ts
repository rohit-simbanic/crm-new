import { ObjectType } from 'types';

export const isEmpty = (val: any) => {
  return val == undefined || val == null || String(val).trim() == '';
};

export const isValueChanged = (
  obj1: ObjectType,
  obj2: ObjectType,
  field: string
) => {
  return obj1?.[field] != obj2?.[field];
};

export const convertNumber = (val: any) => {
  if (isEmpty(val) || isNaN(val)) {
    return 0;
  }
  return parseFloat(val);
};

export const valueToLabel = (label: string) => {
  return label
    .split('_')
    .map((x) => x.substring(0, 1).toUpperCase() + x.substring(1))
    .join(' ');
};

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const mobileUnmask = (val?: any) => {
  if (!isEmpty(val)) {
    return val
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '');
  } else {
    return val;
  }
};

export const replaceStringCharacters = (
  str: string,
  search: string,
  replacement: string
) => {
  return str?.trim().replaceAll(search, replacement);
};
