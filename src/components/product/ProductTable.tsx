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
  const palette = {
    wine900: '#1a0f14',
    ink: '#24161a',
    muted: '#6b5a61',
    gold: '#c7a24a',
    rose: '#c3576a',
    border: 'rgba(26,15,20,0.08)',
  } as const;

  const columns: TableColumn[] = [
    {
      dataIndex: 'id',
      title: 'ID',
      align: 'center',
      render: (value) => (
        <Box sx={{ fontWeight: 800, color: palette.wine900 }}>
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
            border: `1px solid ${palette.border}`,
            '&:hover': {
              border: `1px solid rgba(199,162,74,0.55)`,
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
        <Box sx={{ fontWeight: 800, color: palette.ink }}>
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
            fontWeight: 800,
            borderColor: 'rgba(26,15,20,0.18)',
            color: palette.ink,
            bgcolor: 'rgba(26,15,20,0.02)',
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
          variant="outlined"
          sx={{
            fontWeight: 800,
            borderColor: 'rgba(199,162,74,0.35)',
            color: palette.gold,
          }}
        />
      ),
    },
    {
      dataIndex: 'price',
      title: 'Giá gốc',
      align: 'right',
      render: (value) => (
        <Box sx={{ fontWeight: 800, color: palette.muted, fontSize: '0.875rem' }}>
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
          sx={{ fontWeight: 900 }}
        />
      ),
    },
    {
      dataIndex: 'discount',
      title: 'giá bán',
      align: 'center',
      render: (value) => (
        <Box sx={{ fontWeight: 900, color: palette.wine900, fontSize: '0.875rem' }}>
          {value.toLocaleString('vi-VN')}₫
        </Box>
      ),
    },
    {
      dataIndex: 'rating',
      title: 'Đánh giá',
      align: 'center',
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
          <Star sx={{ fontSize: 16, color: palette.gold }} />
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
              fontWeight: 800,
              borderColor: 'rgba(26,15,20,0.22)',
              color: palette.ink,
              '&:hover': {
                borderColor: 'rgba(26,15,20,0.35)',
                backgroundColor: 'rgba(26,15,20,0.03)',
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
              fontWeight: 800,
              borderColor: 'rgba(195,87,106,0.35)',
              color: palette.rose,
              '&:hover': {
                borderColor: 'rgba(195,87,106,0.55)',
                backgroundColor: 'rgba(195,87,106,0.08)',
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
          boxShadow: '0 12px 30px rgba(26, 15, 20, 0.08)',
          border: `1px solid ${palette.border}`,
        },
        '& .MuiTableHead-root': {
          backgroundColor: 'rgba(26,15,20,0.02)',
          '& .MuiTableCell-head': {
            fontWeight: 900,
            fontSize: '0.875rem',
            color: palette.ink,
            borderBottom: `1px solid ${palette.border}`,
          },
        },
        '& .MuiTableBody-root': {
          '& .MuiTableRow-root': {
            '&:hover': {
              backgroundColor: 'rgba(26,15,20,0.02)',
              transition: 'background-color 0.2s ease',
            },
            '&:nth-of-type(even)': {
              backgroundColor: 'rgba(26,15,20,0.01)',
            },
            '& .MuiTableCell-root': {
              borderBottom: `1px solid ${palette.border}`,
              padding: '12px 16px',
              fontSize: '0.875rem',
            },
          },
        },
        '& .MuiTablePagination-root': {
          backgroundColor: 'rgba(26,15,20,0.02)',
          borderTop: `1px solid ${palette.border}`,
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
