import { ObjectType } from 'types';
export const offer_date_c = (value: any, _: any, filter: ObjectType) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  if (filter.offer_date_c_range === 'date-range') {
    result += `&filter[offer_date_c][from]=${value}`;
  } else {
    result += `&filter[offer_date_c]=${value}`;
  }

  return result;
};
