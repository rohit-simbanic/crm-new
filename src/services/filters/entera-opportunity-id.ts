export const entera_opportunity_id = (value: any) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  result += `&filter[entera_opportunity_id]=${value}`;

  return result;
};
