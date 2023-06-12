export const msa_id = (value: any) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  for (const el of value) {
    result += `&filter[msa_id][]=${el.value}`;
  }

  return result;
};
