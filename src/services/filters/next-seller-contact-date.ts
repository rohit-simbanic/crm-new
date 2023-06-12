import { ObjectType } from 'types';
export const next_seller_contact_date = (
  value: any,
  _: any,
  filter: ObjectType
) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  if (filter.next_seller_contact_date_range === 'date-range') {
    result += `&filter[next_seller_contact_date][from]=${value}`;
  } else {
    result += `&filter[next_seller_contact_date]=${value}`;
  }

  return result;
};
