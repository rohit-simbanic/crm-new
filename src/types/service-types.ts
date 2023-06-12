import { ObjectType } from 'typescript';

export interface ServiceListItem {
  id: string;
  name: string;
}

export interface ServiceEntity {
  id: string;
  name: string;
  inspection_type: string;
  inspection_date: string;
  inspection_date_hours: string;
  inspection_date_minutes: string;
  inspection_date_meridiem: string;
  request_info: string | null;
  inspection_scheduled: string;
  requested_date: string;
  requested_by: string;
  requested_by_name: string;
  confirmation_date: string;
  confirmation_by: string;
  confirmation_by_name: string;
  closing_notes: string | null;
  inspection_notes: string | null;
  opportunity_id_1: string;
  opportunity: {
    id: string | null;
    name: string | null;
    due_diligence_end_c: string | null;
  } | null;
}

export interface ServiceListEntity {
  id: string;
  name: string | null;
}

export interface ServiceFilterEntity {
  inspection_type: string | null;
}

export interface ServiceListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: ServiceListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}

export interface ServiceEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: ServiceEntity;
  errorMessage: any;
}
