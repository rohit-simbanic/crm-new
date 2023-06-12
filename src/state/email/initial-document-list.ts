import { DocumentsListItem } from 'types/documents-types';

const initialDocumentList: DocumentsListItem[] = [
  {
    id: '',
    date_entered: '',
    document_name: '',
    doc_type: '',
    active_date: '',
    opportunity_id: '',
    status_id: '',
    msa_id: '',
    account_id: '',
    account_name: '',
    msa_name: '',
    opportunity_name: '',
    document_revisions: [
      {
        id: '',
        change_log: '',
        filename: '',
        file_ext: '',
        document_id: ''
      }
    ]
  }
];

export default initialDocumentList;
