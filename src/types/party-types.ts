import { ObjectType } from 'typescript';

export interface PartyListItem {
  id: string;
  name: string;
  date_entered: string;
}

export interface PartyEntity {
  id: string;
  email: string | null;
  name: string | null;
  type: string;
  name_2: string | null;
  sub_type: string;
  company: string | null;
  mobile: string | null;
  address: string | null;
  license: string | null;
  brokerage_license: string | null;
  description: string | null;
  assigned_user_id: string | null;
  assigned_user_name: string;
  is_empty_subtype: boolean
}

export interface PartyListEntity {
  id: string;
  name: string | null;
  email: string | null;
  type: string | null;
  sub_type: string | null;
}

export interface PartyFilterEntity {
  name: string | null;
  type: string;
  email: string | null;
  company: string | null;
  license_basic: string | null;
}

export interface PartyListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
  | {
    data: PartyListItem[];
    total: number;
  }
  | ObjectType;
  errorMessage: any;
}

export interface PartyEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: PartyEntity;
  errorMessage: any;
}
