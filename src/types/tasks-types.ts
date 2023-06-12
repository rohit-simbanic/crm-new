import { ObjectType } from 'typescript';

export interface TasksListItem {
  id: string;
  name: string | null;
  status: string | null;
  date_due: string | null;
  time_due: string | null;
  assign_user_first_name: string | null;
  assign_user_last_name: string | null;
  opportunity: { name: string | null };
  date_entered: string | null;
}

export interface TasksListEntity {
  id: string;
  name: string | null;
  status: string | null;
  date_due: string | null;
  time_due: string | null;
  assign_user_first_name: string | null;
  assign_user_last_name: string | null;
  opportunity: { name: string | null };
  date_entered: string | null;
}

export interface TasksEntity {
  id: string;
  name: string | null;
  status: string | null;
  date_due: string | null;
  time_due: string | null;
  assign_user_first_name: string | null;
  assign_user_last_name: string | null;
  opportunity: { name: string | null };
  date_entered: string | null;
}

export interface TasksFilterEntity {
  subject_name: string | null;
}

export interface TasksListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: TasksListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}

export interface TasksEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: TasksEntity;
  errorMessage: any;
}
