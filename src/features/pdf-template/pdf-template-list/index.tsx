import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import defaultSort from 'assets/list/pdf-template/default-sort';
import pdfTemplateColumn from 'assets/list/pdf-template/column';
import DataGrid from 'components/data-grid';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import pdfTemplatesService from 'services/pdf-template-service';
import initialPDFTemplateListFilter from 'state/contracts/initial-pdf-template-list-filter';
import { ObjectType } from 'types';
import {
  PdfTemplateFilterEntity,
  PdfTemplateListEntity
} from 'types/pdf-template-type';
import Filters from './filters';
import eventBus from 'helpers/event-bus-helper';
import useRouteName from 'pages/route-outlet-context';
import { OpportunityContext } from 'pages/opportunity/Context';
import { isEmpty } from 'helpers/misc-helper';

const PDFTemplatesList = ({ routeTag }: { routeTag: string }) => {
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const { routeName, setRouteName } = useRouteName();
  const [pdfTemplates, setPDFTemplates] = useState<PdfTemplateListEntity[]>([]);
  const [refresh, setRefresh] = useState<number>(0);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<PdfTemplateFilterEntity>(
    initialPDFTemplateListFilter
  );
  const { market_preference_id, opportunity_id } = useParams<ObjectType>();
  const { oppurtunity } = useContext(OpportunityContext);

  const [rowCountState, setRowCountState] = React.useState(0);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      pageSize: 25,
      page: 0
    });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  const updateFilter = (e: any) => {
    if (e.target) {
      setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
    } else {
      setFilter(Object.assign({}, filter, e));
    }
  };

  const location = useLocation();

  const loadPDFTemplates = async () => {
    let filterInfo;
    if (opportunity_id) {
      filterInfo = { market_preference_id: oppurtunity?.market_preference_id };
    } else if (!location.pathname.includes('selection-list')) {
      filterInfo =
        market_preference_id === undefined
          ? filter
          : { ...filter, market_preference_id };
    } else {
      filterInfo = filter;
    }

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await pdfTemplatesService.getList(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setPDFTemplates(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  const updateRefresh = () => setRefresh((prevRefresh) => prevRefresh + 1);

  useEffect(() => {
    if (!initialLoad) loadPDFTemplates();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadPDFTemplates();
  }, [paginationModel.page]);

  useEffect(() => {
    if (!initialLoad) return;

    if (paginationModel.page === 0) {
      loadPDFTemplates();
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }
  }, [paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    if (paginationModel.page === 0) {
      loadPDFTemplates();
    } else {
      setPaginationModel(Object.assign({}, paginationModel, { page: 0 }));
    }
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    loadPDFTemplates();
  }, [refresh]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadPDFTemplates();
  }, [isFilterChanged]);

  useEffect(() => {
    eventBus.on('pdf_template_refresh', () => updateRefresh());
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      {isEmpty(opportunity_id) && (
        <Filters
          filter={filter}
          updateFilter={updateFilter}
          setIsFilterChanged={setIsFilterChanged}
          setFilter={setFilter}
        />
      )}

      <DataGrid
        rows={pdfTemplates}
        columns={pdfTemplateColumn}
        rowCount={rowCountState}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        loading={isLoading}
        error={errorMessage}
      />
    </>
  );
};

export default PDFTemplatesList;
