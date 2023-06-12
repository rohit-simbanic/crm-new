import { ObjectType } from 'types';
export const offer_date_c_range = (value: any, _: any, filter: ObjectType) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  if (filter.offer_date_c && filter.offer_date_c.length !== 0) {
    result += `&filter[offer_date_c][operator]=${value}`;
  }

  return result;
};
