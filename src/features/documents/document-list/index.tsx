import { GridSortModel } from '@mui/x-data-grid';
import defaultSort from 'assets/list/document/default-sort';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DocumentService from 'services/document-service';
import {
  DocumentFilterEntity,
  DocumentsListItem,
  DocumentslListType
} from 'types/documents-types';
import documentColumns from 'assets/list/document/column';
import Filters from './filter';
import initialDocumentList from 'state/document/initial-document-list';
import initialListFilter from 'state/document/initial-document-list-filter';
import DataGrid from 'components/data-grid';
import { ObjectType } from 'types';
import eventBus from 'helpers/event-bus-helper';
import useRouteName from 'pages/route-outlet-context';
import { isEmpty } from 'helpers/misc-helper';

const DocumentList = ({ routeTag, id }: { routeTag?: string; id?: string }) => {
  const { market_preference_id, opportunity_id } = useParams<ObjectType>();

  const outletContext = useRouteName();

  const [filter, setFilter] = useState<DocumentFilterEntity>(initialListFilter);
  const [refresh, setRefresh] = useState(0);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [documents, setDocuments] =
    useState<DocumentsListItem[]>(initialDocumentList);

  const [rowCountState, setRowCountState] = React.useState(0);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0
  });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  const updateFilter = (e: any) => {
    if (e.target) {
      setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
    } else {
      setFilter(Object.assign({}, filter, e));
    }
  };

  const updateRefresh = () => setRefresh((prevRefresh) => prevRefresh + 1);

  const loadDocuments = async () => {
    let filterInfo;
    if (market_preference_id !== undefined) {
      filterInfo = { ...filter, market_preference_id };
    } else if (opportunity_id !== undefined) {
      filterInfo = { ...filter, opportunity_id };
    } else {
      filterInfo = filter;
    }

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: DocumentslListType = await DocumentService.getDocuments(
      queryString
    );

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setDocuments(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    loadDocuments();
    setInitialLoad(true);
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

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadDocuments();
  }, [isFilterChanged]);

  useEffect(() => {
    if (!initialLoad) return;
    loadDocuments();
  }, [refresh]);

  useEffect(() => {
    eventBus.on('document_refresh', () => {
      updateRefresh();
    });
  }, []);

  useEffect(() => {
    if (!isEmpty(outletContext) && !isEmpty(routeTag))
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <React.Fragment>
      <Filters
        filter={filter}
        updateFilter={updateFilter}
        setIsFilterChanged={setIsFilterChanged}
        setFilter={setFilter}
      />

      <DataGrid
        rows={documents}
        columns={documentColumns}
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

export default DocumentList;
