export const street_name = (value: any) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  result += `&filter[street_name]=${value}`;

  return result;
};
