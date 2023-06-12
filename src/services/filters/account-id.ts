export const account_id = (value: any) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  for (const el of value) {
    result += `&filter[account_id][]=${el.value}`;
  }

  return result;
};
