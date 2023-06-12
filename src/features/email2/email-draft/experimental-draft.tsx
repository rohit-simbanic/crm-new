import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { threadEmailColumns } from 'assets/list/email-draft/thread-email-column';
import defaultSort from 'assets/list/email-inbox/default-sort';
import DataGrid from 'components/data-grid';
import { isEmpty } from 'helpers/misc-helper';
import listQueryString, {
  correctSort,
  prepareSort
} from 'helpers/query-string-helper';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MailService from 'services/mail-service';
import initialInbox from 'state/email/initial-inbox';
import { ObjectType } from 'types';
import { EmailListItem, EmailListType } from 'types/email-types';

import Filter from '../email-inbox/filter';

const EmailDraft = ({ routeTag }: { routeTag?: string }) => {
  let { opportunity_id } = useParams<ObjectType>();
  const outletContext = useRouteName();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<EmailListItem[]>(initialInbox);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState<ObjectType>({
    status: 'draft',
    opportunity_id: opportunity_id || '',
    name: ''
  });

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

  useEffect(() => {
    if (
      outletContext !== undefined &&
      !isEmpty(outletContext) &&
      !isEmpty(routeTag)
    )
      outletContext.setRouteName(routeTag !== undefined ? routeTag : '');
  }, []);

  return (
    <React.Fragment>
      <Filter
        filter={filter}
        updateFilter={updateFilter}
        setIsFilterChanged={setIsFilterChanged}
        setFilter={setFilter}
      />

      <DataGrid
        rows={emails}
        columns={threadEmailColumns}
        rowCount={rowCountState}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={(val) => {
          setSortModel(correctSort(val, sortModel));
        }}
        loading={isLoading}
        error={errorMessage}
      />
    </React.Fragment>
  );
};

export default EmailDraft;
