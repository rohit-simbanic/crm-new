import { Box, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import documentService from 'services/document-service';
import ValidationError from 'components/errors/validation-error';
import { useNavigate, useParams } from 'react-router-dom';
import { ObjectType } from 'types';
import DocumentItem from './document-item';
import {
  getTableHeadCell,
  Table,
  TableBody,
  TableHead,
  TableHeadRow
} from 'components/table/table-component';
import { tokens } from 'theme';
import EVENTS from 'assets/constants/events';
import FormContainer from 'components/form/container';
import UnitHeading from 'components/form/unit-heading';
import UnitLabel from 'components/form/unit-label';
import ButtonAttachFile from 'components/form/button-attach-file';
import UnitItem from 'components/form/unit-item';
import UploadButton from 'components/form/button-upload';
import eventBus from 'helpers/event-bus-helper';
import { validateDocumentRivision } from 'helpers/validation/document-helper';
import useRouteName from 'pages/route-outlet-context';
import { isEmpty, replaceStringCharacters } from 'helpers/misc-helper';
import { OpportunityContext } from 'pages/opportunity/Context';
import documentSubType from 'assets/constants/document-sub-type';
import DateUtility from 'helpers/date-helper';

const UploadDocuments = ({
  routeTag,
  opportunityId,
  action,
  onClose,
  setActiveTab
}: {
  routeTag: string;
  opportunityId: string;
  action: string;
  onClose: any;
  setActiveTab: any;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  let { opportunity_id } = useParams<ObjectType>();
  const outletContext = useRouteName();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, showError] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [validation, setValidation] = useState<ObjectType>({});

  const { oppurtunity } = useContext(OpportunityContext);
  let fileInput = useRef<HTMLInputElement>(null);

  const isFileExist = (name: string) => {
    return documents.filter((x) => x.file.name == name).length > 0
      ? true
      : false;
  };

  function selectFiles(e: any) {
    const files: any = fileInput.current?.files;
    let count = 1;

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
      if (documents.length + count > 6) {
        break;
      }
      setDocuments((preDocuments) => [
        ...preDocuments,
        {
          file: file,
          category_id: '',
          subType: '',
          status: 'published',
          revision: 1
        }
      ]);
      count++;
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

  const uploadDocuments = async () => {
    if (documents.length == 0) {
      showError(true);
      return;
    }

    setValidation([]);

    let errorCount = 0;
    let index = 0;

    for (const document of documents) {
      const { status, ...errors } = validateDocumentRivision(document, index);

      setValidation((preValdation) => ({ ...preValdation, ...errors }));

      if (status == true) {
        errorCount++;
      }
    }

    if (errorCount > 0) return;

    showError(false);

    let reqBody = new FormData();
    reqBody.append('opportunity_id', opportunity_id);

    let docs = [];

    for (let index = 0; index < documents.length; index++) {
      const document = documents[index];
      reqBody.append(
        `documents[${index}][document_name]`,
        DocumentName(document)
      );
      reqBody.append(`documents[${index}][file]`, document.file);

      reqBody.append(
        `documents[${index}][document_type]`,
        document.category_id
      );
      reqBody.append(
        `documents[${index}][document_subtype]`,
        document.sub_type
      );
      reqBody.append(`documents[${index}][document_status]`, document.status);

      reqBody.append(`documents[${index}][document_state]`, document.state);
    }

    setIsLoading(true);

    const result = await documentService.postDocumentsWithRevision(reqBody);
    setIsLoading(false);

    if (result.isValidationError) {
      setValidation(result.errorMessage);
      return;
    }

    if (result.isError) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        isError: true,
        message: result.errorMessage
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
      } else if (action === 'edit-view') {
        navigate(`/opportunities/${opportunity_id}/documents/list`);
      }
    }

    if (action === 'accept-offer') {
      setActiveTab(0);
    }

    setDocuments([]);
  };

  const updateDocuments = (index: number, newDoc: ObjectType) => {
    setDocuments((preDocs) =>
      [...preDocs].map((doc, i) => (i === index ? newDoc : doc))
    );
  };

  const isSameTypeDocumentSelected = (type: string, sub_type: string) => {
    return [...documents].filter(
      (x: any) => x.category_id == type && x.sub_type == sub_type
    ).length > 1
      ? true
      : false;
  };

  const DocumentName = (document: ObjectType) => {
    let extension = document.file.name.split('.')[1];

    let document_name = `${replaceStringCharacters(
      oppurtunity.name,
      ' ',
      '_'
    )}${
      !isEmpty(document.sub_type) &&
      document.category_id != 'misc' &&
      document.sub_type != 'client_name_pof_date_received'
        ? `_${replaceStringCharacters(
            documentSubType[document.category_id].find(
              (x: ObjectType) => x.value == document.sub_type
            )!?.label,
            ' ',
            '_'
          )}`
        : ``
    }${
      document.category_id === 'misc'
        ? `${document.sub_type ? '_' : ''}${
            replaceStringCharacters(document.sub_type, ' ', '_') ?? ''
          }`
        : ''
    }${
      document.category_id === 'amendments' &&
      ['coe_ext', 'dd_ext'].includes(document.sub_type)
        ? `_${document.revision}`
        : ''
    }${
      document.category_id === 'proof_of_funds' &&
      ['client_name_pof_date_received'].includes(document.sub_type)
        ? `_${replaceStringCharacters(
            oppurtunity.account.name,
            ' ',
            '_'
          )}_POF_${DateUtility.getTodayDateWithFormatString('DD-MM-YYYY')}`
        : ''
    }${
      !isEmpty(document.state) && document.state !== 'NA'
        ? `_${document.state}`
        : ''
    }.${extension} `;
    return document_name;
  };

  const TableHeadCell = getTableHeadCell(colors);

  useEffect(() => {
    if (!isEmpty(useContext) && !isEmpty(routeTag))
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <React.Fragment>
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
                maxHeight: 432,
                overflowY: 'scroll',
                margin: '10px'
              }}
            >
              <Table width={'100px'}>
                <TableHead>
                  <TableHeadRow sx={{ backgroundColor: colors.primary[400] }}>
                    <TableHeadCell>Document Name</TableHeadCell>
                    <TableHeadCell>Document Type</TableHeadCell>
                    <TableHeadCell>Document Sub Type</TableHeadCell>
                    <TableHeadCell>Document State</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell>Version</TableHeadCell>
                  </TableHeadRow>
                </TableHead>
                <TableBody>
                  {documents.map((document: any, index: number) => (
                    <DocumentItem
                      key={index}
                      document={document}
                      index={index}
                      updateDocuments={updateDocuments}
                      removeFile={removeFile}
                      isSameTypeDocumentSelected={isSameTypeDocumentSelected}
                      opportunityId={opportunity_id}
                      validation={validation}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
            <UploadButton onClick={uploadDocuments} disabled={isLoading} />
          </Box>
        </UnitItem>
      </FormContainer>
    </React.Fragment>
  );
};

export default UploadDocuments;
