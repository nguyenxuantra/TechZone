import React from 'react';
import {
  Button,
  Avatar,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Skeleton,
} from '@mui/material';
import {
  Edit,
  Delete,
  Star,
} from '@mui/icons-material';

import type { PaginationOptions } from '../../types/untils';
import type { Product } from '../../types/products/product';


interface ProductTableProps {
  products: Product[];
  pagination: PaginationOptions;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (product: Product) => void;
  loading?: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  onEditProduct,
  onDeleteProduct,
  loading = false,
}) => {
  // Generate skeleton rows for loading state
  const skeletonRows = Array.from({ length: pagination.rowsPerPage }, (_, i) => i);
  return (
    <Paper
      sx={{
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                Ảnh
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                Tên sản phẩm
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                Thương hiệu
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                Danh mục
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                Giá gốc
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                Tồn kho
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                Giá bán
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                Đánh giá
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: '#2c3e50',
                  borderBottom: '2px solid #e0e0e0',
                }}
              >
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              skeletonRows.map((_, index) => (
                <TableRow
                  key={`skeleton-${index}`}
                  sx={{
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid #f0f0f0',
                      padding: '12px 16px',
                      fontSize: '0.875rem',
                    },
                  }}
                >
                  <TableCell align="center">
                    <Skeleton width={40} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rectangular" width={60} height={60} sx={{ borderRadius: 1 }} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="80%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="60%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton width="70%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton width="60%" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton width="40%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton width="60%" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton width="40%" />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Skeleton width={60} height={32} />
                      <Skeleton width={60} height={32} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              products.map((product) => (
                <TableRow
                  key={product.product_id}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                      transition: 'background-color 0.2s ease',
                    },
                    '&:nth-of-type(even)': {
                      backgroundColor: '#fafafa',
                    },
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid #f0f0f0',
                      padding: '12px 16px',
                      fontSize: '0.875rem',
                    },
                  }}
                >
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#1976d2' }}>
                    #{product.product_id}
                  </TableCell>
                  <TableCell align="center">
                    <Avatar
                      src={product.imageUrl}
                      alt={product.name}
                      variant="rounded"
                      sx={{
                        width: 60,
                        height: 60,
                        border: '2px solid #e0e0e0',
                        '&:hover': {
                          border: '2px solid #1976d2',
                          transform: 'scale(1.05)',
                          transition: 'all 0.2s ease-in-out',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#2c3e50' }}>
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.brand}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontWeight: 500,
                        borderColor: '#e0e0e0',
                        color: '#666',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.categoryName}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#2e7d32', fontSize: '0.875rem' }}>
                    {product.price.toLocaleString('vi-VN')}₫
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={product.stock}
                      size="small"
                      color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                      variant="filled"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#2e7d32', fontSize: '0.875rem' }}>
                    {product.discount.toLocaleString('vi-VN')}₫
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      <Star sx={{ fontSize: 16, color: '#ffc107' }} />
                      <Box sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                        {product.rating.toFixed(1)}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => onEditProduct?.(product)}
                        sx={{
                          minWidth: 60,
                          height: 32,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          borderColor: '#1976d2',
                          color: '#1976d2',
                          '&:hover': {
                            borderColor: '#1565c0',
                            backgroundColor: '#e3f2fd',
                          },
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Delete />}
                        onClick={() => onDeleteProduct?.(product)}
                        sx={{
                          minWidth: 60,
                          height: 32,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          borderColor: '#f44336',
                          color: '#f44336',
                          '&:hover': {
                            borderColor: '#d32f2f',
                            backgroundColor: '#ffebee',
                          },
                        }}
                      >
                        Xóa
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={pagination.totalCount}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
        sx={{
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e0e0e0',
        }}
      />
    </Paper>
  );
};

export default ProductTable;
