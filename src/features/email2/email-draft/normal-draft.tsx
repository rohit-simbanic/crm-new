import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ObjectType } from 'types';
import defaultSort from 'assets/list/account/default-sort';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import DataGrid from 'components/data-grid';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import MailService from 'services/mail-service';
import { emailDraftColumns } from 'assets/list/email-draft/column';

const Draft = () => {
  const { opportunity_id } = useParams<ObjectType>();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [emailDraft, setEmailDraft] = useState<[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState({ status: 'draft' });

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
    setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
  };

  const loadEmails = async () => {
    let filterInfo =
      opportunity_id === undefined ? filter : { ...filter, opportunity_id };

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filterInfo
    });

    setIsLoading(true);

    const result: ObjectType = await MailService.getDraft(queryString);

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setEmailDraft(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    if (!initialLoad) loadEmails();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadEmails();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadEmails();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadEmails();
  }, [isFilterChanged]);

  return (
    <React.Fragment>
      <DataGrid
        rows={emailDraft}
        columns={emailDraftColumns}
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

export default Draft;
