export const property_address_c = (value: any) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  result += `&filter[property_address_c]=${value}`;

  return result;
};
