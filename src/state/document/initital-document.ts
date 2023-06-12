import DateUtility from 'helpers/date-helper';

const initialDocument = {
  id: '',
  date_entered: DateUtility.getTodayDateString(),
  date_modified: '',
  modified_user_id: '',
  created_by: '',
  description: '',
  deleted: '',
  assigned_user_id: '',
  document_name: '',
  doc_id: '',
  doc_type: '',
  doc_url: '',
  active_date: '',
  exp_date: '',
  category_id: '',
  subcategory_id: '',
  status_id: '',
  document_revision_id: '',
  related_doc_id: '',
  related_doc_rev_id: '',
  is_template: 0,
  template_type: '',
  opportunity_id: '',
  pdf_template_id: '',
  msa_id: '',
  account_id: '',
  document_subtype: '',
  document_state: '',
  document_revision: {
    id: '',
    change_log: '',
    filename: '',
    file_ext: '',
    revision: '1',
    status: '',
    state: '',
    document_id: ''
  }
};

export default initialDocument;
