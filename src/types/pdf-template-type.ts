import { ObjectType } from 'typescript';

export interface PdfTemplateListItem {
  id: string;
  name: string;
  state_c: string;
  date_entered: string;
}

export interface PdfTemplateEntity {
  id: string;
  name: string | null;
  template_order_c: string | null;
  state_c: string | null;
  document_state: string | null;
  category_id: string;
  document_subtype: string;
  type: string | null;
  active: number;
  expire_version: number;
  margin_bottom: string | null;
  margin_footer: string | null;
  margin_header: string | null;
  margin_left: string | null;
  margin_right: string | null;
  margin_top: string | null;
  description: string;
  pdffooter: string;
  pdfheader: string;
  homeowner_association: string | null;
  offer_package: string | null;
  contract_type: string | null;
}

export interface PdfTemplateListEntity {
  id: string;
  name: string | null;
  state_c: string | null;
  category_id: string | null;
  document_subtype: string | null;
  document_state: string | null;
  expire_version: number;
  type: string | null;
  created_by: string | null;
  date_modified: string | null;
}

export interface PdfTemplateFilterEntity {
  name: string | null;
  state_c: string | null;
}

export interface PdfTemplateListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data:
    | {
        data: PdfTemplateListItem[];
        total: number;
      }
    | ObjectType;
  errorMessage: any;
}

export interface PdfTemplateEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: PdfTemplateEntity;
  errorMessage: any;
}
