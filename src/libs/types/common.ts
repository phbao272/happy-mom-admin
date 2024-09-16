export interface ReactChildren {
  children: React.ReactNode;
}

export interface IBaseMaster {
  id: number;
  name: string;
}

export interface IError {
  response: {
    data: {
      message: string | Record<string, unknown>;
      error: string;
      statusCode: number;
    };
  };
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface IMetaPagination {
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface DataPagination<T extends any[]> {
  data: T;
  meta: IMetaPagination;
}

export interface IOption {
  label: string;
  value: string;
}
