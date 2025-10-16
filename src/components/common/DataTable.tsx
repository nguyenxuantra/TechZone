import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import type { TableColumn, PaginationOptions } from "../../types/untils";
interface DataTableProps {
  data: any[];
  columns: TableColumn[];
  pagination: PaginationOptions;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  loading?: boolean;
  emptyMessage?: string;
}

const  DataTable =({
  data,
  columns,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  loading = false,
  emptyMessage = "Không có dữ liệu",
}: DataTableProps)=> {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  if (loading) {
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography>Đang tải...</Typography>
      </Paper>
    );
  }

  if (data.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8f9fa" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.dataIndex}
                  align={column.align}
                  style={{ fontWeight: 700 }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => {
                  const value  = column.dataIndex ? row[column.dataIndex] : undefined;
                  return (
                    <TableCell
                      key={column.dataIndex}
                      align={column.align}
                    >{column.render ? column.render(value, row, column.dataIndex) : value as React.ReactNode}</TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={pagination.totalCount}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
        labelDisplayedRows={({
          from,
          to,
          count,
        }: {
          from: number;
          to: number;
          count: number;
        }) => `${from}-${to} của ${count !== -1 ? count : `hơn ${to}`}`}
      />
    </Paper>
  );
};

export default DataTable;
