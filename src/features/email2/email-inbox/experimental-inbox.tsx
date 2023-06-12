import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import defaultSort from 'assets/list/email-inbox/default-sort';
import { threadEmailColumns } from 'assets/list/email-inbox/thread-email-column';
import DataGrid from 'components/data-grid';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MailService from 'services/mail-service';
import initialInbox from 'state/email/initial-inbox';
import initialInboxFilter from 'state/email/initial-inbox-filter';
import { ObjectType } from 'types';
import { EmailListItem, EmailListType } from 'types/email-types';

import Filter from './filter';

const EmailInbox = () => {
  let { opportunity_id } = useParams<ObjectType>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<EmailListItem[]>(initialInbox);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [filter, setFilter] = useState<ObjectType>({
    ...initialInboxFilter,
    opportunity_id: opportunity_id
  });
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [rowCountState, setRowCountState] = React.useState(0);

  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      pageSize: 10,
      page: 0
    });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const updateFilter = (e: any) => {
    if (e.target) {
      setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
    } else {
      setFilter(Object.assign({}, filter, e));
    }
  };

  const loadEmails = async () => {
    setIsFilterChanged(false);

    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: { name: filter.name, opportunity_id: filter.opportunity_id }
    });

    setIsLoading(true);

    const result: EmailListType = await MailService.getEmailLatestThred(
      queryString
    );

    setIsLoading(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setEmails(result.data.data);

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
      <Filter
        filter={filter}
        updateFilter={updateFilter}
        setIsFilterChanged={setIsFilterChanged}
        setFilter={setFilter}
        isLoading={isLoading}
      />

      <DataGrid
        rows={emails}
        columns={threadEmailColumns}
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

export default EmailInbox;
