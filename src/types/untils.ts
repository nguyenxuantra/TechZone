


export interface TableColumn {
  title: string;
  dataIndex: string;
  render?: (value: any, record: any, rowIndex: string) => React.ReactNode;
  align?: 'right' | 'left' | 'center';
  format?: (value: unknown) => string;
}


export interface PaginationOptions {
  page: number;
  rowsPerPage: number;
  totalCount: number;
}
