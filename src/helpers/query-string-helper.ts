import { GridSortModel } from '@mui/x-data-grid';
import { ObjectType } from 'types';

interface listQueryStringType {
  sort: {
    field: string;
    sort: string;
  };
  filter: ObjectType;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const listQueryString = ({
  sort,
  filter,
  pagination
}: listQueryStringType): string => {
  let qStrings = [];

  qStrings.push(`page=${pagination.page + 1}`);
  qStrings.push(`per_page=${pagination.pageSize}`);

  qStrings.push(`sort[field]=${sort.field}`);
  qStrings.push(`sort[direction]=${sort.sort}`);

  for (const [key, value] of Object.entries(filter)) {
    if (value?.length > 0) qStrings.push(`filter[${key}]=${value}`);
  }

  return qStrings.length > 0 ? `?${qStrings.join('&')}` : '';
};

const prepareSort = (sortModel: ObjectType[], defaultSort: ObjectType) => {
  return {
    field:
      sortModel.length > 0
        ? sortModel[0].field ?? defaultSort.field
        : defaultSort.field,
    sort:
      sortModel.length > 0
        ? sortModel[0].sort ?? defaultSort.sort
        : defaultSort.sort
  };
};

const correctSort = (value: any, sortModel: GridSortModel): GridSortModel => {
  if (value[0]) {
    return value;
  }

  return [
    {
      field: sortModel[0].field,
      sort: sortModel[0].sort == 'asc' ? 'desc' : 'asc'
    }
  ];
};

export default listQueryString;
export { prepareSort, correctSort };
