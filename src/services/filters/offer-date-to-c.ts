import { ObjectType } from 'types';
export const offer_date_to_c = (value: any, _: any, filter: ObjectType) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  if (filter.offer_date_c_range === 'date-range') {
    result += `&filter[offer_date_c][to]=${value}`;
  }

  return result;
};
