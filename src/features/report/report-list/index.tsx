import { Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReportService from 'services/reports-service';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import defaultSort from 'assets/list/report/default-sort';
import listQueryString, { prepareSort } from 'helpers/query-string-helper';
import {
  ReportFilterEntity,
  ReportListEntity,
  ReportListTypeResponse
} from 'types/report';
import DataGrid from 'components/data-grid';
import reportColumn from 'assets/list/report/column';
import LinkExtenalOpenNewIcon from 'components/link/link-external-open-new-icon';
import { getAuthToken } from 'helpers/auth-helper';
import initialReportListFilter from 'state/report/initial-report-list-filter';
import Filters from './filters';
import fieldLabel from 'assets/constants/fieldLabel';
import envConfig from 'config/env';
import Title from 'components/typography/title';

const ReportList = () => {
  const [reports, setReports] = useState<ReportListEntity[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowCountState, setRowCountState] = React.useState(0);
  const [filter, setFilter] = useState<ReportFilterEntity>(
    initialReportListFilter
  );
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const token = getAuthToken();
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      pageSize: 25,
      page: 0
    });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    defaultSort
  ]);

  const updateFilter = (e: any) => {
    setFilter(Object.assign({}, filter, { [e.target.name]: e.target.value }));
  };
  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  const loadReport = async () => {
    let queryString = listQueryString({
      pagination: paginationModel,
      sort: prepareSort(sortModel, defaultSort),
      filter: filter
    });

    setIsLoading(true);

    let result: ReportListTypeResponse = await ReportService.getList(
      queryString
    );

    setIsLoading(false);
    setIsFilterChanged(false);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    setReports(result.data.data);
    setRowCountState(result.data.meta.total);
  };

  useEffect(() => {
    if (!initialLoad) loadReport();
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    if (!initialLoad) return;
    loadReport();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    if (!initialLoad) return;
    loadReport();
  }, [JSON.stringify(sortModel)]);

  useEffect(() => {
    if (!initialLoad) return;
    if (isFilterChanged) loadReport();
  }, [isFilterChanged]);

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Stack direction="row">
          <Title value={fieldLabel.myReports} />
          <LinkExtenalOpenNewIcon
            url={`${envConfig.REACT_APP_CRM_URL}/index.php?module=AOR_Reports&action=index&source=${token}`}
          />
        </Stack>

        <Filters
          filter={filter}
          updateFilter={updateFilter}
          setIsFilterChanged={setIsFilterChanged}
          setFilter={setFilter}
        />

        <DataGrid
          rows={reports}
          columns={reportColumn}
          rowCount={rowCountState}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          loading={isLoading}
          error={errorMessage}
        />
      </Paper>
    </>
  );
};

export default ReportList;
