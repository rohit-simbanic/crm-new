import { ObjectType } from 'types';
export const close_date_c = (value: any, _: any, filter: ObjectType) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  if (filter.close_date_c_range === 'date-range') {
    result += `&filter[close_date_c][from]=${value}`;
  } else {
    result += `&filter[close_date_c]=${value}`;
  }

  return result;
};
