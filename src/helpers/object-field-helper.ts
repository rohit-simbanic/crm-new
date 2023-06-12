import { ObjectType } from 'types';
import { OptionType } from 'types/option-type';
import { isEmpty } from './misc-helper';

const getObjectKeyValue = (
  listObject: ObjectType,
  value: string | number | undefined | null
) => {
  if (value === undefined || value === null) return '';

  if (value !== undefined && value !== null && listObject[value]) {
    return listObject[value];
  }
  return value;
};

const getObjectEntriesAsArray = (listObject: ObjectType, selected?: any) => {
  let itemList: OptionType[] = [];

  for (const [key, value] of Object.entries(listObject)) {
    itemList.push({ label: value, value: key });
  }

  if (!isEmpty(selected)) {
    let exist = itemList.find((item: OptionType) => item.value === selected);
    if (!exist) {
      itemList.push({ label: selected, value: selected });
    }
  }

  return itemList;
};

export default getObjectEntriesAsArray;
export { getObjectKeyValue };
