export const opportunity_status_c = (value: any) => {
  let result = ``;

  if (value.length === 0) return ``;

  for (const el of value) {
    result += `&filter[opportunity_status_c][]=${el.value}`;
  }

  return result;
};
