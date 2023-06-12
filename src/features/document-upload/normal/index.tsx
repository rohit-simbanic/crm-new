import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled
} from '@mui/material';
import documentStatus from 'assets/constants/document-status';
import documentType from 'assets/constants/document-type';
import EVENTS from 'assets/constants/events';
import fieldLabel from 'assets/constants/fieldLabel';
import ValidationError from 'components/errors/validation-error';
import ButtonAttachFile from 'components/form/button-attach-file';
import UploadButton from 'components/form/button-upload';
import FormContainer from 'components/form/container';
import UnitHeading from 'components/form/unit-heading';
import UnitItem from 'components/form/unit-item';
import UnitLabel from 'components/form/unit-label';
import UnitSelect from 'components/form/unit-select';
import eventBus from 'helpers/event-bus-helper';
import { isEmpty } from 'helpers/misc-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { validateNormalDocumentUpload } from 'helpers/validation/document-helper';
import useRouteName from 'pages/route-outlet-context';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import documentService from 'services/document-service';
import { ObjectType } from 'types';

const StyledListItem = styled(ListItem)(() => {
  return {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }
  };
});

const UploadDocuments = ({
  routeTag,
  document_type,
  closeActionModal,
  action,
  onClose,
  setActiveTab
}: {
  routeTag: string;
  document_type?: string;
  closeActionModal?: () => void;
  action?: string;
  onClose?: any;
  setActiveTab: any;
}) => {
  let { opportunity_id } = useParams<ObjectType>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const outletContext = useRouteName();
  const [documents, setDocuments] = useState<any[]>([]);
  const [error, showError] = useState(false);
  const [validation, setValidation] = useState<ObjectType>([]);

  let fileInput = useRef<HTMLInputElement>(null);

  const isFileExist = (name: string) => {
    return documents.filter((x) => x.file.name == name).length > 0
      ? true
      : false;
  };

  function selectFiles(e: any) {
    const files: any = fileInput.current?.files;

    if (files.length > 6) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        isError: true,
        message: 'Maximum 6 files upload'
      });
      return;
    }

    for (let file of files) {
      if (isFileExist(file.name)) {
        continue;
      }
      if (documents.length == 6) {
        break;
      }

      setDocuments((preDocuments) => [
        ...preDocuments,
        {
          file: file,
          document_type: document_type || '',
          document_status: ''
        }
      ]);
    }
    e.target.value = '';
  }

  function removeFile(index: number) {
    setDocuments((preDocuments) =>
      [...preDocuments].filter((x, i) => i !== index)
    );

    setValidation((preValdation) => {
      for (const key in preValdation) {
        if (key.includes(`documents.${index}`)) {
          delete preValdation[key];
        }
      }
      return preValdation;
    });
  }

  const updateDocuments = (index: number, newDoc: ObjectType) => {
    setDocuments((preDocs) =>
      [...preDocs].map((doc, i) => (i === index ? newDoc : doc))
    );
  };

  const DocumentItem = ({ doc, index }: any) => {
    const { file, document_type, document_status } = doc;

    return (
      <>
        <StyledListItem
          secondaryAction={
            <IconButton onClick={() => removeFile(index)}>
              <DeleteIcon />
            </IconButton>
          }
          dense={true}
          disableGutters={true}
          divider={true}
        >
          <FormContainer>
            <UnitItem grid={{ xs: 12, sm: 5 }}>
              <ListItemText
                primary={`${index + 1} . ${file.name}`}
                sx={{
                  wordWrap: 'break-word'
                }}
              />
            </UnitItem>

            <UnitSelect
              label={fieldLabel.documentType}
              name="document_type"
              value={document_type}
              onChange={(e) => {
                updateDocuments(index, {
                  file: file,
                  document_type: e.target.value,
                  document_status: document_status
                });
              }}
              records={getObjectEntriesAsArray(documentType)}
              grid={{ xs: 12, sm: 3 }}
              error={validation?.[`documents.${index}.document_type`] ?? ''}
            />

            <UnitSelect
              label={fieldLabel.documentStatus}
              name="document_status"
              value={document_status}
              onChange={(e) => {
                updateDocuments(index, {
                  file: file,
                  document_type: document_type,
                  document_status: e.target.value
                });
              }}
              records={getObjectEntriesAsArray(documentStatus)}
              grid={{ xs: 12, sm: 3 }}
              error={validation?.[`documents.${index}.document_status`] ?? ''}
            />
          </FormContainer>
        </StyledListItem>
      </>
    );
  };

  const uploadDocuments = async () => {
    if (documents.length == 0) {
      showError(true);
      return;
    }
    setValidation([]);

    let errorCount = 0;
    let index = 0;

    for (const document of documents) {
      const { status, ...errors } = validateNormalDocumentUpload(
        document,
        index
      );

      setValidation((preValdation) => ({ ...preValdation, ...errors }));

      if (status == false) {
        errorCount++;
      }
      index++;
    }

    if (errorCount > 0) return;

    showError(false);

    const reqBody = new FormData();

    reqBody.append('opportunity_id', opportunity_id);

    for (let index = 0; index < documents.length; index++) {
      const document = documents[index];

      reqBody.append(`documents[${index}][file]`, document.file);
      reqBody.append(
        `documents[${index}][document_type]`,
        document.document_type
      );
      reqBody.append(
        `documents[${index}][document_status]`,
        document.document_status
      );
      reqBody.append(`documents[${index}][revision]`, '1');
    }
    setIsLoading(true);
    const result: ObjectType = await documentService.postDocuments(reqBody);
    setIsLoading(false);

    if (result.isValidationError) {
      setValidation(result.errorMessage);
      return;
    }

    if (result.isError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        message: result.errorMessage,
        isError: true
      });
      return;
    }

    if (result.isSuccess) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        isError: false,
        message: 'Document Uploaded'
      });
      setDocuments([]);

      if (action === 'lease_agreement_document') {
        onClose(1);
      }
    }

    if (action === 'accept-offer') {
      setActiveTab(0);
    }
  };

  useEffect(() => {
    if (!isEmpty(useContext) && !isEmpty(routeTag))
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <FormContainer>
      <UnitItem grid={{ xs: 12, sm: 12 }}>
        <Box>
          <UnitHeading title={`Selected Files: ${documents.length}`} />
          <UnitLabel label="(Maximum 6 files upload)" />

          <ButtonAttachFile
            multiple={true}
            fileInput={fileInput}
            onChange={selectFiles}
            grid={{ xs: 12, sm: 12 }}
            icon={false}
          />

          {error && <ValidationError data={['Please Select File']} />}
          <Box
            sx={{
              maxHeight: 450,
              overflowY: 'auto',
              margin: '10px'
            }}
          >
            <List>
              {documents.map((document: File, index: number) => (
                <DocumentItem key={index} doc={document} index={index} />
              ))}
            </List>
          </Box>
          <UploadButton onClick={uploadDocuments} disabled={isLoading} />
        </Box>
      </UnitItem>
    </FormContainer>
  );
};

export default UploadDocuments;
