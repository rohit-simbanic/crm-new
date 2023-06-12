import { ObjectType } from 'types';

export interface AdminConfigListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: AdminConfigListItem[];
      }
    | ObjectType;
  errorMessage: any;
}

export interface AdminConfigListItem {
  category: string;
  name: string | null;
  value: string | null;
}
