import { ObjectType } from 'types';
export const next_seller_contact_date_range = (
  value: any,
  _: any,
  filter: ObjectType
) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  if (
    filter.next_seller_contact_date &&
    filter.next_seller_contact_date.length !== 0
  ) {
    result += `&filter[next_seller_contact_date][operator]=${value}`;
  }

  return result;
};
