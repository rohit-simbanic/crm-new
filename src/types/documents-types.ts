export interface DocumentsListItem {
  id: string;
  date_entered: string;
  document_name: string;
  doc_type: string;
  active_date: string;
  opportunity_id: string;
  opportunity_name: string;
  status_id: string;
  msa_id: string;
  msa_name: string;
  account_id: string;
  account_name: string;
  document_revisions: [
    {
      id: string;
      change_log: string | null;
      filename: string;
      file_ext: string;
      document_id: string;
    }
  ];
}

export interface DocumentEntity {
  id: string;
  date_entered: string;
  date_modified: string;
  modified_user_id: string;
  created_by: string;
  description: string;
  deleted: string;
  assigned_user_id: string;
  document_name: string;
  doc_id: string;
  doc_type: string;
  doc_url: string | null;
  active_date: string;
  exp_date: string;
  category_id: string;
  subcategory_id: string;
  status_id: string;
  document_revision_id: string;
  related_doc_id: string | null;
  related_doc_rev_id: string | null;
  is_template: number;
  template_type: string | null;
  opportunity_id: string;
  pdf_template_id: string;
  msa_id: string | null;
  account_id: string | null;
  document_subtype: string;
  document_state: string;
  document_revision: {
    id: string;
    change_log: string;
    filename: string;
    file_ext: string;
    revision: string;
    status: string;
    state: string | null;
    document_id: string;
  };
}

export interface DocumentslListType {
  isSuccess: boolean;
  isError: boolean;
  data: {
    data: DocumentsListItem[];
    meta: {
      total: number;
    };
  };
  errorMessage: any;
}

export interface DocumentEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: DocumentEntity;
  errorMessage: any;
}

export interface DocumentFilterEntity {
  document_name: string;
  document_type: string;
  account_name: string | null;
  account_id: string | null;
  msa_name: string | null;
  msa_id: string | null;
}

export interface DocumentRevisionListItem {
  id: string;
  document_id: string;
  date_entered: string;
  filename: string;
  revision: string;
  status: string;
  state: string;
  created_by: string;
  change_log: string;
}

export interface DocumentRevisionEntity {
  id: string;
  change_log: string;
  document_id: string;
  doc_id: string;
  doc_type: string;
  doc_url: string;
  date_entered: string;
  created_by: string;
  filename: string;
  file_ext: string;
  file_mime_type: string;
  revision: string;
  deleted: number;
  date_modified: string;
  document_scale_method: string;
  file_location: string;
  status: string;
  state: string;
}

export interface DocumentRevisionlListType {
  isSuccess: boolean;
  isError: boolean;
  data: {
    data: DocumentRevisionListItem[];
    meta: {
      total: number;
    };
  };
  errorMessage: any;
}

export interface DocumentRevisionEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: DocumentRevisionEntity;
  errorMessage: any;
}
