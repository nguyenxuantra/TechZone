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
  CircularProgress,
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
  const palette = {
    ink: "#24161a",
    muted: "#6b5a61",
    wine900: "#1a0f14",
    border: "rgba(26,15,20,0.08)",
  } as const;

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
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          border: `1px solid ${palette.border}`,
          overflow: "hidden",
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress size={48} sx={{ mb: 2, color: palette.wine900 }} />
        <Typography variant="body1" color="text.secondary">
          Đang tải dữ liệu...
        </Typography>
      </Paper>
    );
  }

  if (data.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 3,
          background: "linear-gradient(135deg, #ffffff 0%, #fffdfb 100%)",
          border: `1px solid ${palette.border}`,
        }}
      >
        <Typography sx={{ color: palette.muted, fontWeight: 600 }}>
          {emptyMessage}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        border: `1px solid ${palette.border}`,
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "rgba(26,15,20,0.02)" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.dataIndex}
                  align={column.align}
                  style={{ fontWeight: 800, color: palette.ink }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  "&:hover": { backgroundColor: "rgba(26,15,20,0.02)" },
                }}
              >
                {columns.map((column) => {
                  const value  = column.dataIndex ? row[column.dataIndex] : undefined;
                  return (
                    <TableCell
                      key={column.dataIndex}
                      align={column.align}
                      sx={{
                        borderBottom: `1px solid ${palette.border}`,
                        color: palette.ink,
                        fontSize: "0.875rem",
                      }}
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
        sx={{
          borderTop: `1px solid ${palette.border}`,
          bgcolor: "rgba(26,15,20,0.02)",
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: palette.muted,
            fontWeight: 600,
          },
        }}
      />
    </Paper>
  );
};

export default DataTable;
