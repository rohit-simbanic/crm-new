import documentSubType from 'assets/constants/document-sub-type';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { validateDocument } from 'helpers/validation/document-helper';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import documentService from 'services/document-service';
import initialDocument from 'state/document/initital-document';
import { ObjectType } from 'types';
import { DocumentEntity, DocumentEntityResponse } from 'types/documents-types';
import { OptionType } from 'types/option-type';
import RecordView from '../record-view';

const DocumentCreate = ({ routeTag }: { routeTag: string }) => {
  const { document_id, opportunity_id, market_preference_id } =
    useParams<ObjectType>();

  const navigate = useNavigate();
  const location = useLocation();

  const { routeName, setRouteName } = useRouteName();

  let fileInput = useRef<HTMLInputElement>(null);
  const documentName = useRef<string>('');
  const [subTypetOptions, setSubtypeOption] = useState<OptionType[]>([]);
  const [document, setDocument] = useState<DocumentEntity>(initialDocument);
  const [validation, setValidation] = useState<{ [key: string]: any }>({});

  const [selectedFile, setSelectedFile] = useState<any>(null);

  const browseFiles = (e: any) => {
    const files: any = fileInput.current?.files;

    setDocument((preDoc) => ({ ...preDoc, document_name: files[0].name }));
    setSelectedFile(files[0]);
    documentName.current = files[0].name;
  };

  const handleChange = (e: any) => {
    setDocument(
      Object.assign({}, document, { [e.target.name]: e.target.value })
    );
  };

  const saveDocument = async () => {
    const { status, ...errors } = validateDocument(document);

    setValidation(errors);

    if (!status) return;

    if (document_id) {
      const reqBody = {
        document_status: document.status_id,
        document_state: document.document_state,
        document_subtype: document.document_subtype,
        document_type: document.category_id,
        revision: document.document_revision.revision,
        document_name: document.document_name
      };

      const result: DocumentEntityResponse =
        await documentService.updateDocument(document_id, reqBody);

      if (result.isValidationError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        window.history.back();
      }
    } else {
      let reqBody = new FormData();

      reqBody.append(`documents[0][file]`, selectedFile);
      reqBody.append(`documents[0][document_type]`, document.category_id);
      reqBody.append(
        `documents[0][document_subtype]`,
        document.document_subtype
      );
      reqBody.append(`documents[0][document_status]`, document.status_id);
      reqBody.append(`documents[0][document_state]`, document.document_state);
      reqBody.append(
        `documents[0][revision]`,
        document.document_revision.revision
      );
      if (market_preference_id) {
        reqBody.append(`market_preference_id`, market_preference_id);
      }

      const result: ObjectType = await documentService.postDocuments(reqBody);

      if (result.isValidationError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        window.history.back();
      }
    }
  };

  const loadAccount = async (document_id: string) => {
    let document: DocumentEntityResponse = await documentService.getDocument(
      document_id
    );
    setDocument(document.data);

    documentName.current = document.data.document_name;
  };

  useEffect(() => {
    setSubtypeOption(documentSubType[document.category_id] || []);
  }, [document.category_id]);

  useEffect(() => {
    if (document_id) loadAccount(document_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          document={document}
          documentName={documentName}
          setDocument={setDocument}
          subTypetOptions={subTypetOptions}
          validation={validation}
          onChange={handleChange}
          fileInput={fileInput}
          browseFiles={browseFiles}
          document_id={document_id}
        />
        <StackRowWithDivider>
          <SaveButton onClick={() => saveDocument()} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default DocumentCreate;
