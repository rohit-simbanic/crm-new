export const mls_c = (value: any) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  result += `&filter[mls_c]=${value}`;

  return result;
};
