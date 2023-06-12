export const seller_offer_response = (value: any, action: string) => {
  let result = ``;

  if (!value || value.length === 0) return ``;

  if (action === 'dashboard') {
    result += `&filter[seller_offer_response]=${value.value}`;
  } else if (action === 'properties') {
    for (const el of value) {
      result += `&filter[seller_offer_response][]=${el.value}`;
    }
  }

  return result;
};
