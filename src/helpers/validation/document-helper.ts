import fieldLabel from 'assets/constants/fieldLabel';
import { missingField } from 'assets/validation-template';
import { isEmpty } from 'helpers/misc-helper';
import { ObjectType } from 'types';

export const validateDocument = (data: ObjectType): ObjectType => {
  let validation: ObjectType = {
    status: true
  };

  if (isEmpty(data.document_name)) {
    validation = {
      ...validation,
      status: false,
      document_name: [missingField(fieldLabel.documentName)]
    };
  }

  if (isEmpty(data?.document_revision?.revision)) {
    validation = {
      ...validation,
      status: false,
      revision: [missingField(fieldLabel.revision)]
    };
  }

  return validation;
};


export const validateNormalDocumentUpload = (data: ObjectType, index: number): ObjectType => {
  let validation: ObjectType = {
    status: true
  };

  if (isEmpty(data?.document_type)) {
    validation = {
      ...validation,
      status: false,
      [`documents.${index}.document_type`]: [missingField(fieldLabel.documentType)]
    };
  }

  if (isEmpty(data?.document_status)) {
    validation = {
      ...validation,
      status: false,
      [`documents.${index}.document_status`]: [missingField(fieldLabel.documentStatus)]
    };
  }

  return validation;
};


export const validateDocumentRivision = (data: ObjectType, index: number): ObjectType => {
  let validation: ObjectType = {
    status: false
  };

  const typeList = [
    'proof_of_funds',
    'purchase_contract',
    'hoa_documents',
    'inspection_reports',
    'disclosures',
    'commission_instructions',
    'addendums',
    'amendments',
    'notice_to_terminate',
    'closing',
    'invoice',
    'sales',
    'misc'
  ];

  if (isEmpty(data?.category_id)) {
    validation = {
      ...validation,
      status: true,
      document_type: [missingField('Document Type')],
      [`documents.${index}.document_type`]: [missingField(fieldLabel.documentType)]

    };
  }

  if (
    !isEmpty(data?.category_id) &&
    typeList.includes(data?.category_id) &&
    isEmpty(data?.sub_type)
  ) {
    validation = {
      ...validation,
      status: true,
      [`documents.${index}.document_subtype`]: [missingField(fieldLabel.documentSubType)]
    };
  }

  if (isEmpty(data?.state)) {
    validation = {
      ...validation,
      status: true,
      [`documents.${index}.document_state`]: [missingField(fieldLabel.documentState)]
    };
  }

  if (isEmpty(data?.status)) {
    validation = {
      ...validation,
      status: true,
      [`documents.${index}.document_status`]: [missingField(fieldLabel.documentStatus)]
    };
  }

  return validation;
};
