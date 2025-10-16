import React from 'react';
import {

  Button,
} from '@mui/material';

import DataTable from '../common/DataTable';
import type { TableColumn, PaginationOptions } from '../../types/untils';
import type { Product } from '../../types/products/product';


interface ProductTableProps {
  products: Product[];
  pagination: PaginationOptions;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  loading?: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  loading = false,
}) => {
  const columns: TableColumn[] = [
    {
      dataIndex: 'productId',
      title: 'ID',
    },
    {
      dataIndex: 'name',
      title: 'Sản phẩm',
    },
    {
      dataIndex: 'description',
      title: 'Mô tả',
    },
    {
      dataIndex: 'price',
      title: 'Giá',
      align: 'right',
    },
    {
      dataIndex: 'stock',
      title: 'Tồn kho',
      align: 'center',
    },
    {
      dataIndex: 'imageUrl',
      title: 'Ảnh sản phẩm',
      align: 'center',
    },
    {
      dataIndex: 'rating',
      title: 'Đánh giá',
      align: 'center',
    },
    {
      dataIndex: 'brand',
      title: 'Thương hiêu'
    },
    {
      dataIndex: 'categoryName',
      title: 'Danh mục'
    },{
      dataIndex:'discount',
      title:'Giảm giá'
    },
    {
      dataIndex:'action',
      title: 'action',
      render:()=>{
        return (
          <>
          <Button>sửa</Button>
          <Button>xóa</Button>
          </>
        )
      }
    }
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      pagination={pagination}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      loading={loading}
    />
  );
};

export default ProductTable;
