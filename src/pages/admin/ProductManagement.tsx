import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Stack,
  Tooltip,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
  TablePagination,
} from '@mui/material';
import {
  Add,
  Search,
  Edit,
  Delete,
  Visibility,
  Inventory,
  Star,
  FilterList,
  Sort,
  Refresh
} from '@mui/icons-material';

const ProductManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sample products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Laptop Gaming MSI GF63 Thin 10SC-066VN',
      category: 'Laptop Gaming',
      brand: 'MSI',
      price: 19990000,
      originalPrice: 22990000,
      stock: 12,
      status: 'active',
      rating: 4.5,
      image: 'https://via.placeholder.com/60x60',
      description: 'Laptop gaming hiệu năng cao với GPU RTX 3050'
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max 256GB',
      category: 'Điện thoại',
      brand: 'Apple',
      price: 27990000,
      originalPrice: 29990000,
      stock: 25,
      status: 'active',
      rating: 4.8,
      image: 'https://via.placeholder.com/60x60',
      description: 'iPhone mới nhất với chip A17 Pro'
    },
    {
      id: 3,
      name: 'Tai nghe Sony WH-1000XM5',
      category: 'Âm thanh',
      brand: 'Sony',
      price: 6990000,
      originalPrice: 8990000,
      stock: 8,
      status: 'active',
      rating: 4.6,
      image: 'https://via.placeholder.com/60x60',
      description: 'Tai nghe chống ồn hàng đầu thế giới'
    },
    {
      id: 4,
      name: 'PC Gaming RTX 4070',
      category: 'PC Gaming',
      brand: 'Custom',
      price: 35990000,
      originalPrice: 39990000,
      stock: 3,
      status: 'inactive',
      rating: 4.7,
      image: 'https://via.placeholder.com/60x60',
      description: 'PC gaming cấu hình cao với RTX 4070'
    },
    {
      id: 5,
      name: 'MacBook Pro M3 14 inch',
      category: 'Laptop Gaming',
      brand: 'Apple',
      price: 45990000,
      originalPrice: 49990000,
      stock: 7,
      status: 'active',
      rating: 4.9,
      image: 'https://via.placeholder.com/60x60',
      description: 'MacBook Pro với chip M3 mạnh mẽ'
    },
    {
      id: 6,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Điện thoại',
      brand: 'Samsung',
      price: 31990000,
      originalPrice: 34990000,
      stock: 15,
      status: 'active',
      rating: 4.7,
      image: 'https://via.placeholder.com/60x60',
      description: 'Flagship Android với AI tích hợp'
    },
    {
      id: 7,
      name: 'AirPods Pro 2nd Gen',
      category: 'Âm thanh',
      brand: 'Apple',
      price: 5990000,
      originalPrice: 6990000,
      stock: 20,
      status: 'active',
      rating: 4.8,
      image: 'https://via.placeholder.com/60x60',
      description: 'Tai nghe không dây với chống ồn chủ động'
    },
    {
      id: 8,
      name: 'Asus ROG Strix G15',
      category: 'Laptop Gaming',
      brand: 'Asus',
      price: 25990000,
      originalPrice: 28990000,
      stock: 5,
      status: 'active',
      rating: 4.6,
      image: 'https://via.placeholder.com/60x60',
      description: 'Laptop gaming ROG với thiết kế gaming'
    }
  ]);

  const categories = [
    'Laptop Gaming',
    'Điện thoại',
    'Âm thanh',
    'PC Gaming',
    'Linh kiện PC',
    'Phụ kiện'
  ];

  const brands = [
    'MSI',
    'Apple',
    'Sony',
    'Custom',
    'Asus',
    'Lenovo',
    'Dell',
    'Samsung'
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setOpenDialog(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== productId));
      setAlertMessage('Đã xóa sản phẩm thành công!');
      setShowSuccessAlert(true);
    }
  };

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
      setAlertMessage('Đã cập nhật sản phẩm thành công!');
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1,
        rating: 0
      };
      setProducts([...products, newProduct]);
      setAlertMessage('Đã thêm sản phẩm mới thành công!');
    }
    setShowSuccessAlert(true);
    setOpenDialog(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const ProductDialog = () => (
    <Dialog 
      open={openDialog} 
      onClose={() => setOpenDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        bgcolor: '#f8f9fa', 
        borderBottom: '1px solid #e0e0e0',
        fontWeight: 700
      }}>
        {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Tên sản phẩm"
              defaultValue={editingProduct?.name || ''}
              required
            />
          </Grid>
          
          <Grid size={{xs:12, md:6}}>
            <FormControl fullWidth required>
              <InputLabel>Danh mục</InputLabel>
              <Select
                defaultValue={editingProduct?.category || ''}
                label="Danh mục"
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <FormControl fullWidth required>
              <InputLabel>Thương hiệu</InputLabel>
              <Select
                defaultValue={editingProduct?.brand || ''}
                label="Thương hiệu"
              >
                {brands.map(brand => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Giá bán"
              type="number"
              defaultValue={editingProduct?.price || ''}
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">₫</InputAdornment>,
              }}
            />
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Giá gốc"
              type="number"
              defaultValue={editingProduct?.originalPrice || ''}
              InputProps={{
                startAdornment: <InputAdornment position="start">₫</InputAdornment>,
              }}
            />
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <TextField
              fullWidth
              label="Số lượng tồn kho"
              type="number"
              defaultValue={editingProduct?.stock || ''}
              required
            />
          </Grid>

          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="Mô tả sản phẩm"
              multiline
              rows={3}
              defaultValue={editingProduct?.description || ''}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              label="URL hình ảnh"
              defaultValue={editingProduct?.image || ''}
            />
          </Grid>

          <Grid size={{xs:12}}>
            <FormControlLabel
              control={
                <Switch 
                  defaultChecked={editingProduct?.status === 'active'} 
                  color="primary"
                />
              }
              label="Sản phẩm hoạt động"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: '#f8f9fa' }}>
        <Button onClick={() => setOpenDialog(false)}>
          Hủy
        </Button>
        <Button 
          variant="contained" 
          onClick={() => handleSaveProduct({})}
          sx={{
            bgcolor: '#667eea',
            '&:hover': { bgcolor: '#5a6fd8' }
          }}
        >
          {editingProduct ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </DialogActions>
    </Dialog>
  );

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

      {/* Actions Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid size={{xs:12, md:3}}>
            <TextField
              size="small"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  fontSize: '0.875rem'
                }
              }}
            />
          </Grid>

          <Grid size={{xs:12, md:2}}>
            <FormControl size="small" fullWidth>
              <InputLabel>Danh mục</InputLabel>
              <Select
                value={selectedCategory}
                label="Danh mục"
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12, md:7}}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterList />}
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Bộ lọc
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Sort />}
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Sắp xếp
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Refresh />}
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Làm mới
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<Add />}
                onClick={handleAddProduct}
                sx={{
                  bgcolor: '#667eea',
                  '&:hover': { bgcolor: '#5a6fd8' },
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Thêm sản phẩm
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Products Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 700 }}>Sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Danh mục</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Thương hiệu</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Giá</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tồn kho</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Đánh giá</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={product.image}
                        sx={{ width: 50, height: 50 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: #{product.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Chip 
                      label={product.category} 
                      size="small"
                      sx={{ 
                        bgcolor: '#E3F2FD',
                        color: '#1976D2',
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {product.brand}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                        {formatPrice(product.price)}
                      </Typography>
                      {product.originalPrice > product.price && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          {formatPrice(product.originalPrice)}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Inventory sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {product.stock}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Chip 
                      label={product.status === 'active' ? 'Hoạt động' : 'Không hoạt động'} 
                      size="small"
                      color={product.status === 'active' ? 'success' : 'default'}
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Star sx={{ fontSize: 16, color: '#FF9800' }} />
                      <Typography variant="body2">
                        {product.rating}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Xem chi tiết">
                        <IconButton size="small" sx={{ color: '#2196F3' }}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton 
                          size="small" 
                          sx={{ color: '#4CAF50' }}
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton 
                          size="small" 
                          sx={{ color: '#F44336' }}
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }: { from: number, to: number, count: number }) =>
            `${from}-${to} của ${count !== -1 ? count : `hơn ${to}`}`
          }
        />
      </Paper>

      {/* Product Dialog */}
      <ProductDialog />

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
};

export default ProductManagement;
