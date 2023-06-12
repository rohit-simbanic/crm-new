export const mls_status_c = (value: any, action: string) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  if (action === 'dashboard') {
    result += `&filter[mls_status_c]=${value.value}`;
  } else if (action === 'properties') {
    for (const el of value) {
      result += `&filter[mls_status_c][]=${el.value}`;
    }
  }

  return result;
};
