import { ObjectType } from 'types';
export const close_date_c_range = (value: any, _: any, filter: ObjectType) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  if (filter.close_date_c && filter.close_date_c.length !== 0) {
    result += `&filter[close_date_c][operator]=${value}`;
  }

  return result;
};
