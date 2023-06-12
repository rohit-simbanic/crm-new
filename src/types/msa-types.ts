import { ObjectType } from 'typescript';

export interface MsaListItem {
  id: string;
  name: string;
  date_entered: string;
}

export interface MsaEntity {
  id: string;
  name: string | null;
  entera_market_id: string | null;
  code: string | null;
  initial_commission: string | null;
  state: string | null;
  mls_code: string | null;
  has_municipal_inspections: number;
}

export interface MsaListEntity {
  id: string;
  name: string | null;
  code: string | null;
  state: string | null;
  entera_market_id: number;
  initial_commission: number;
}

export interface MsaFilterEntity {
  name: string | null;
  account_id?: string | null;
}

export interface MsaListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data: {
    data: MsaListItem[];
    total: number;
  };
  errorMessage: any;
}

export interface MsaEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: MsaEntity;
  errorMessage: any;
}
