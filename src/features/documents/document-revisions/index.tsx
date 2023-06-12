import React, { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import { Link, useParams } from 'react-router-dom';
import initialRevisionList from 'state/document/initial-revision-list';
import {
  DocumentRevisionListItem,
  DocumentRevisionlListType
} from 'types/documents-types';
import documentRevisionService from 'services/document-revision-service';
import useRouteName from 'pages/route-outlet-context';
import DataGrid from 'components/data-grid';
import { GridSortModel } from '@mui/x-data-grid';
import defaultSort from 'assets/list/document-revision/default-sort';
import documentRevisionColumns from 'assets/list/document-revision/columns';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';

const DocumentRevisions = ({ routeTag }: { routeTag: string }) => {
  const { routeName, setRouteName } = useRouteName();

  const { document_id } = useParams<ObjectType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [revisions, setRevisions] =
    useState<DocumentRevisionListItem[]>(initialRevisionList);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [rowCountState, setRowCountState] = React.useState(0);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0
  });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const loadRevisions = async (document_id: string) => {
    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: { document_id }
    });

    setIsLoading(true);
    const result: DocumentRevisionlListType =
      await documentRevisionService.getDocumentsRevisions(queryString);
    setIsLoading(false);
    setRevisions(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    if (document_id) {
      loadRevisions(document_id);
      setInitialLoad(true);
    }
  }, []);

  useEffect(() => {
    setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  useEffect(() => {
    if (!initialLoad) return;

    loadRevisions(document_id);
  }, [paginationModel.page]);

  useEffect(() => {
    if (!initialLoad) return;

    if (paginationModel.page === 0) {
      loadRevisions(document_id);
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }
  }, [paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadRevisions(document_id);
  }, [JSON.stringify(sortModel)]);

  return (
    <React.Fragment>
      <DataGrid
        rows={revisions}
        columns={documentRevisionColumns}
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

export default DocumentRevisions;
