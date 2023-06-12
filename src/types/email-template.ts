import { ObjectType } from 'typescript';

export interface EmailTemplateListItem {
  id: string;
  name: string;
  date_modified: string;
}

export interface EmailTemplateEntity {
  id: string;
  name: string | null;
  description: string | null;
  assigned_user_id: string | null;
  assigned_user_name: string | null;
  subject: string | null;
  related_event: string;
  type: string | null;
  body: string | null;
  body_html: string;
  email_inspection: string | null;
  date_entered?: string;
  date_modified?: string;
  variable_module: string | null;
  variable_name: string | null;
  variable_text: string | null;
}

export interface EmailTemplateListEntity {
  id: string;
  name: string;
  subject: string;
  related_event: string;
  type: string;
  date_modified: string;
}

export interface EmailTemplateFilterEntity {
  query_search: string | null;
  related_event: string;
}

export interface EmailTemplateListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: EmailTemplateListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}

export interface EmailTemplateEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: EmailTemplateEntity;
  errorMessage: any;
}
