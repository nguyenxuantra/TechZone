import React from 'react';
import {
  Button,
  Avatar,
  Chip,
  Box,
} from '@mui/material';
import {
  Edit,
  Delete,
  Star,
} from '@mui/icons-material';

import DataTable from '../common/DataTable';
import type { TableColumn, PaginationOptions } from '../../types/untils';
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
  const columns: TableColumn[] = [
    {
      dataIndex: 'id',
      title: 'ID',
      align: 'center',
      render: (value) => (
        <Box sx={{ fontWeight: 600, color: '#1976d2' }}>
          #{value}
        </Box>
      ),
    },
    {
      dataIndex: 'imageUrl',
      title: 'Ảnh',
      align: 'center',
      render: (imageUrl) => (
        <Avatar
          src={imageUrl}
          alt="Product"
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
      ),
    },
    {
      dataIndex: 'name',
      title: 'Tên sản phẩm',
      render: (value) => (
        <Box sx={{ fontWeight: 600, color: '#2c3e50' }}>
          {value}
        </Box>
      ),
    },
    // {
    //   dataIndex: 'description',
    //   title: 'Mô tả',
    //   render: (value) => (
    //     <Tooltip title={value} arrow>
    //       <Box
    //         sx={{
    //           maxWidth: 250,
    //           overflow: 'hidden',
    //           textOverflow: 'ellipsis',
    //           whiteSpace: 'nowrap',
    //           color: '#666',
    //           fontSize: '0.875rem',
    //           cursor: 'help',
    //           '&:hover': {
    //             color: '#1976d2',
    //           },
    //         }}
    //       >
    //         {value || 'Không có mô tả'}
    //       </Box>
    //     </Tooltip>
    //   ),
    // },
    {
      dataIndex: 'brand',
      title: 'Thương hiệu',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          variant="outlined"
          sx={{
            fontWeight: 500,
            borderColor: '#e0e0e0',
            color: '#666',
          }}
        />
      ),
    },
    {
      dataIndex: 'categoryName',
      title: 'Danh mục',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      ),
    },
    {
      dataIndex: 'price',
      title: 'Giá bán',
      align: 'right',
      render: (value) => (
        <Box sx={{ fontWeight: 600, color: '#2e7d32', fontSize: '0.875rem' }}>
          {value.toLocaleString('vi-VN')}₫
        </Box>
      ),
    },
    {
      dataIndex: 'stock',
      title: 'Tồn kho',
      align: 'center',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={value > 10 ? 'success' : value > 0 ? 'warning' : 'error'}
          variant="filled"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
    {
      dataIndex: 'discount',
      title: 'Giảm giá',
      align: 'center',
      render: (value) => (
        value > 0 ? (
          <Chip
            label={`-${value}%`}
            size="small"
            color="error"
            sx={{ fontWeight: 600 }}
          />
        ) : (
          <Box sx={{ color: '#999', fontSize: '0.75rem' }}>-</Box>
        )
      ),
    },
    {
      dataIndex: 'rating',
      title: 'Đánh giá',
      align: 'center',
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
          <Star sx={{ fontSize: 16, color: '#ffc107' }} />
          <Box sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
            {value.toFixed(1)}
          </Box>
        </Box>
      ),
    },
    {
      dataIndex: 'action',
      title: 'Thao tác',
      align: 'center',
      render: (_, record) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => onEditProduct?.(record)}
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
            onClick={() => onDeleteProduct?.(record)}
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
      ),
    },
  ];

  return (
    <Box
      sx={{
        '& .MuiTableContainer-root': {
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
        },
        '& .MuiTableHead-root': {
          backgroundColor: '#f8f9fa',
          '& .MuiTableCell-head': {
            fontWeight: 700,
            fontSize: '0.875rem',
            color: '#2c3e50',
            borderBottom: '2px solid #e0e0e0',
          },
        },
        '& .MuiTableBody-root': {
          '& .MuiTableRow-root': {
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
          },
        },
        '& .MuiTablePagination-root': {
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e0e0e0',
        },
      }}
    >
      <DataTable
        data={products}
        columns={columns}
        pagination={pagination}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        loading={loading}
      />
    </Box>
  );
};

export default ProductTable;
