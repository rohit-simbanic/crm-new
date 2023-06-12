export interface ReportListItem {
  id: string;
  name: string;
  date_entered: string;
  report_type: string
}

export interface ReportEntity {
  name: string | null;
}

export interface ReportListEntity {
  id: string;
  name: string | null;
  date_entered: string;
  report_type: string
}

export interface ReportFilterEntity {
  name: string | null;
}

export interface ReportListTypeResponse {
  isSuccess: boolean;
  isError: boolean;
  data: {
    data: ReportListItem[];
    meta: { total: number };
  };
  errorMessage: any;
}

export interface ReportEntityResponse {
  isSuccess: boolean;
  isError: boolean;
  isValidationError?: any;
  data: ReportEntity;
  errorMessage: any;
}
