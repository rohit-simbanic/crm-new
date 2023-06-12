import ErrorComponent from 'components/errors/error-component';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import documentRevisionService from 'services/document-revision-service';
import { ObjectType } from 'types';

const DocumentViewer = () => {
  const { document_revision_id } = useParams<ObjectType>();

  const [data, setData] = useState({
    url: '',
    file_name: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const loadPreSignUrl = async (id: string) => {
    const result = await documentRevisionService.getPresignUrl(id);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setData(result.data);
  };

  useEffect(() => {
    if (document_revision_id) loadPreSignUrl(document_revision_id);
  }, []);

  return (
    <>
      {errorMessage ? (
        <ErrorComponent message={errorMessage} />
      ) : (
        <iframe
          src={`${
            process.env.PUBLIC_URL
          }/pdfjs-dist/web/viewer.html?file=${encodeURIComponent(
            data.url
          )}&downloadFileName=${encodeURIComponent(data.file_name)}`}
          width="100%"
          height="100%"
        ></iframe>
      )}
    </>
  );
};

export default DocumentViewer;
