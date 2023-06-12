import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import documentState from 'assets/constants/document-state';
import documentStatus from 'assets/constants/document-status';
import documentType from 'assets/constants/document-type';
import fieldLabel from 'assets/constants/fieldLabel';
import ButtonAttachFile from 'components/form/button-attach-file';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitRead from 'components/form/unit-read';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import RouteLink from 'components/link/route-link';
import emptyFunction from 'helpers/empty-function-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { useLocation } from 'react-router-dom';
import { ObjectType } from 'types';
import { DocumentEntity } from 'types/documents-types';
import { OptionType } from 'types/option-type';

interface recordViewType {
  document: DocumentEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  documentName?: ObjectType;
  setDocument?: (e: any) => any;
  subTypetOptions?: OptionType[];
  browseFiles?: (e: any) => any;
  fileInput?: any;
  document_id?: string;
}

const RecordView = ({
  document,
  validation,
  onChange,
  readOnly = false,
  documentName,
  setDocument,
  subTypetOptions,
  fileInput,
  browseFiles,
  document_id
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};
  const location = useLocation();
  const isView = location.pathname.includes('view');

  return (
    <FormContainer>
      {readOnly === true ? (
        <UnitRead
          label={fieldLabel.fileName}
          value={
            <>
              <RouteLink
                url={`/documents/${document.document_revision_id}/viewer`}
                name={`${document.document_revision.filename}`}
                target={true}
              />
              <RouteLink
                url={`/documents/${document.document_revision_id}/viewer`}
                name={
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                }
                target={true}
              />
            </>
          }
          grid={{ xs: 12, sm: 12 }}
        />
      ) : (
        <UnitRead
          label={fieldLabel.fileName}
          value={
            <>
              <RouteLink
                url={`/documents/${document.document_revision_id}/viewer`}
                name={`${document.document_revision.filename}`}
                target={true}
              />
            </>
          }
          grid={{ xs: 12, sm: 12 }}
        />
      )}

      {!document_id && (
        <ButtonAttachFile
          multiple={true}
          fileInput={fileInput}
          onChange={browseFiles}
          grid={{ xs: 12, sm: 2 }}
        />
      )}
      <UnitText
        label={fieldLabel.documentName}
        name="document_name"
        value={document.document_name}
        onChange={handleChange}
        error={valMessages['document_name'] ?? ''}
        required
        readOnly={readOnly}
      />
      <UnitText
        label={fieldLabel.revision}
        name="revision"
        value={document.document_revision.revision ?? ''}
        onChange={(e: any) => {
          if (setDocument !== undefined) {
            setDocument((preDoc: DocumentEntity) => ({
              ...preDoc,
              document_revision: {
                ...preDoc.document_revision,
                revision: e.target.value
              }
            }));
          }
        }}
        error={valMessages['revision'] ?? ''}
        required
        readOnly={readOnly}
        disabled={document_id ? true : false}
      />
      <UnitSelect
        name="category_id"
        label={fieldLabel.type}
        records={getObjectEntriesAsArray(documentType)}
        value={document?.category_id ?? ''}
        onChange={(e: any) => {
          if (setDocument !== undefined) {
            setDocument((preDoc: DocumentEntity) => ({
              ...preDoc,
              category_id: e.target.value,
              document_subtype: ''
            }));
          }
        }}
        error={
          !document_id
            ? valMessages['documents.0.document_type'] || ''
            : valMessages['document_type'] || ''
        }
        readOnly={readOnly}
      />
      <UnitSelect
        name="status_id"
        label={fieldLabel.status}
        records={getObjectEntriesAsArray(documentStatus)}
        value={document.status_id ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
        error={
          !document_id
            ? valMessages['documents.0.document_status'] || ''
            : valMessages['document_status'] || ''
        }
      />
      {document?.category_id === 'misc' ? (
        <UnitText
          label={fieldLabel.subType}
          name="document_subtype"
          value={document.document_subtype ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          error={
            !document_id
              ? valMessages['documents.0.document_subtype'] || ''
              : valMessages['document_subtype'] || ''
          }
        />
      ) : (
        <UnitSelect
          name="document_subtype"
          label={fieldLabel.subType}
          records={subTypetOptions}
          value={document.document_subtype ?? ''}
          onChange={handleChange}
          readOnly={readOnly}
          error={
            !document_id
              ? valMessages['documents.0.document_subtype'] || ''
              : valMessages['document_subtype'] || ''
          }
        />
      )}
      <UnitSelect
        name="document_state"
        label={fieldLabel.documentState}
        records={getObjectEntriesAsArray(documentState)}
        value={document.document_state ?? ''}
        onChange={handleChange}
        readOnly={readOnly}
        error={
          !document_id
            ? valMessages['documents.0.document_state'] || ''
            : valMessages['document_state'] || ''
        }
      />
      <UnitDate
        label={fieldLabel.createdDate}
        name="date_entered"
        value={document.date_entered ?? ''}
        onChange={(e: any) =>
          handleChange({
            target: { name: 'date_entered', value: e }
          })
        }
        readOnly={readOnly}
        disabled={true}
      />
    </FormContainer>
  );
};

export default RecordView;
