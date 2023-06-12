import React, { useState, useEffect } from 'react';
import DocumentService from 'services/document-service';
import { DocumentsListItem, DocumentslListType } from 'types/documents-types';
import initialDocumentList from 'state/document/initial-document-list';
import emailAttachmentColumns from 'assets/list/document/email-attachment-columns';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid/models';
import defaultSort from 'assets/list/document/default-sort';
import DataGrid from 'components/data-grid';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';

interface PropTypes {
  opportunity_id?: string;
}

const Documents = ({ opportunity_id }: PropTypes) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documents, setDocuments] =
    useState<DocumentsListItem[]>(initialDocumentList);

  const [rowCountState, setRowCountState] = React.useState(0);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      pageSize: 25,
      page: 0
    });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const loadDocuments = async () => {
    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: { opportunity_id }
    });

    setIsLoading(true);
    const result: DocumentslListType = await DocumentService.getDocuments(
      queryString
    );
    setIsLoading(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setDocuments(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    loadDocuments();
  }, [opportunity_id]);

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    if (!initialLoad) loadDocuments();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadDocuments();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadDocuments();
  }, [JSON.stringify(sortModel)]);

  return (
    <React.Fragment>
      <DataGrid
        rows={documents}
        columns={emailAttachmentColumns}
        rowCount={rowCountState}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        loading={isLoading}
        error={errorMessage}
      />
    </React.Fragment>
  );
};

export default Documents;
