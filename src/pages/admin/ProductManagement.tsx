import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import ProductTable from '../../components/product/ProductTable';

import type { PaginationOptions } from '../../types/untils';
import { useRootStore } from '../../contexts/RootStoreContext';
import { observer } from 'mobx-react-lite';

const ProductManagement = observer(() => {
  const [searchTerm, _] = useState<string>('');

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, ] = useState('');
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const {productStore} = useRootStore();
  const {product, loading, fetchProductGetAll} = productStore;

  useEffect(()=>{
    fetchProductGetAll({search:searchTerm, page_no:1, page_size:5})
  }, [searchTerm, page, rowsPerPage])



  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };


  const pagination: PaginationOptions = {
    page,
    rowsPerPage,
    totalCount: product.length,
  };


  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#2c3e50', mb: 1 }}>
          Quản lý sản phẩm
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý danh sách sản phẩm, thêm mới, chỉnh sửa và xóa sản phẩm
        </Typography>
      </Box>

      {/* Products Table */}
      <ProductTable
        products={product}
        pagination={pagination}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        loading={loading}
        />


      {/* Success Alert */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
      >
        <Alert 
          onClose={() => setShowSuccessAlert(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default ProductManagement;
