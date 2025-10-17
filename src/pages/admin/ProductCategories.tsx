import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  TablePagination,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
  parentId: number | null;
  parentName: string | null;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

const ProductCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Điện thoại',
      description: 'Các loại điện thoại di động',
      slug: 'dien-thoai',
      parentId: null,
      parentName: null,
      productCount: 45,
      isActive: true,
      sortOrder: 1,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Laptop',
      description: 'Máy tính xách tay',
      slug: 'laptop',
      parentId: null,
      parentName: null,
      productCount: 32,
      isActive: true,
      sortOrder: 2,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 3,
      name: 'Máy tính bảng',
      description: 'iPad, Samsung Galaxy Tab',
      slug: 'may-tinh-bang',
      parentId: null,
      parentName: null,
      productCount: 18,
      isActive: true,
      sortOrder: 3,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 4,
      name: 'iPhone',
      description: 'Điện thoại iPhone',
      slug: 'iphone',
      parentId: 1,
      parentName: 'Điện thoại',
      productCount: 25,
      isActive: true,
      sortOrder: 1,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 5,
      name: 'Samsung',
      description: 'Điện thoại Samsung',
      slug: 'samsung',
      parentId: 1,
      parentName: 'Điện thoại',
      productCount: 20,
      isActive: true,
      sortOrder: 2,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 6,
      name: 'Phụ kiện',
      description: 'Phụ kiện điện tử',
      slug: 'phu-kien',
      parentId: null,
      parentName: null,
      productCount: 67,
      isActive: true,
      sortOrder: 4,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 7,
      name: 'Tai nghe',
      description: 'Tai nghe bluetooth, có dây',
      slug: 'tai-nghe',
      parentId: 6,
      parentName: 'Phụ kiện',
      productCount: 28,
      isActive: true,
      sortOrder: 1,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 8,
      name: 'Sạc dự phòng',
      description: 'Pin sạc dự phòng',
      slug: 'sac-du-phong',
      parentId: 6,
      parentName: 'Phụ kiện',
      productCount: 15,
      isActive: false,
      sortOrder: 2,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    parentId: '',
    isActive: true,
    sortOrder: 1
  });

  const parentCategories = categories.filter(cat => cat.parentId === null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && category.isActive) ||
                         (selectedStatus === 'inactive' && !category.isActive);
    return matchesSearch && matchesStatus;
  });

  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      slug: '',
      parentId: '',
      isActive: true,
      sortOrder: 1
    });
    setOpenDialog(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      slug: category.slug,
      parentId: category.parentId?.toString() || '',
      isActive: category.isActive,
      sortOrder: category.sortOrder
    });
    setOpenDialog(true);
  };

  const handleDeleteCategory = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter(cat => cat.id !== id));
      setAlertMessage('Xóa danh mục thành công!');
      setShowAlert(true);
    }
  };

  const handleSaveCategory = () => {
    if (!formData.name.trim()) {
      setAlertMessage('Vui lòng nhập tên danh mục!');
      setShowAlert(true);
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? {
              ...cat,
              name: formData.name,
              description: formData.description,
              slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
              parentId: formData.parentId ? parseInt(formData.parentId) : null,
              parentName: formData.parentId ? parentCategories.find(p => p.id === parseInt(formData.parentId))?.name || null : null,
              isActive: formData.isActive,
              sortOrder: formData.sortOrder,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : cat
      ));
      setAlertMessage('Cập nhật danh mục thành công!');
    } else {
      // Add new category
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        name: formData.name,
        description: formData.description,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        parentId: formData.parentId ? parseInt(formData.parentId) : null,
        parentName: formData.parentId ? parentCategories.find(p => p.id === parseInt(formData.parentId))?.name || null : null,
        productCount: 0,
        isActive: formData.isActive,
        sortOrder: formData.sortOrder,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setCategories([newCategory, ...categories]);
      setAlertMessage('Thêm danh mục thành công!');
    }
    
    setShowAlert(true);
    setOpenDialog(false);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'success' : 'error';
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Quản lý danh mục sản phẩm
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCategory}
          size="small"
          sx={{ height: 40, fontSize: '0.875rem' }}
        >
          Thêm danh mục
        </Button>
      </Box>

      {/* Search and Filter Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ 
              minWidth: 250,
              height: 40,
              fontSize: '0.875rem',
              '& .MuiInputBase-root': {
                height: 40,
                fontSize: '0.875rem'
              }
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, fontSize: 20 }} />
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 150, height: 40 }}>
            <InputLabel sx={{ fontSize: '0.875rem' }}>Trạng thái</InputLabel>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              label="Trạng thái"
              sx={{ height: 40, fontSize: '0.875rem' }}
            >
              <MenuItem value="all" sx={{ fontSize: '0.875rem' }}>Tất cả</MenuItem>
              <MenuItem value="active" sx={{ fontSize: '0.875rem' }}>Hoạt động</MenuItem>
              <MenuItem value="inactive" sx={{ fontSize: '0.875rem' }}>Không hoạt động</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            size="small"
            sx={{ height: 40, fontSize: '0.875rem' }}
          >
            Lọc
          </Button>

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            size="small"
            sx={{ height: 40, fontSize: '0.875rem' }}
            onClick={() => {
              setSearchTerm('');
              setSelectedStatus('all');
            }}
          >
            Làm mới
          </Button>
        </Box>
      </Paper>

      {/* Categories Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Tên danh mục</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Mô tả</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Danh mục cha</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Số sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Thứ tự</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Ngày tạo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{category.id}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'medium' }}>
                    {category.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>
                    {category.description}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>
                    {category.parentName || '-'}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>
                    <Chip 
                      label={category.productCount} 
                      size="small" 
                      color="primary"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(category.isActive)}
                      label={category.isActive ? 'Hoạt động' : 'Không hoạt động'}
                      color={getStatusColor(category.isActive)}
                      size="small"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{category.sortOrder}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{category.createdAt}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleEditCategory(category)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteCategory(category.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCategories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
        />
      </Paper>

      {/* Add/Edit Category Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Tên danh mục"
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              fullWidth
              required
            />
            
            <TextField
              label="Mô tả"
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
            
            <TextField
              label="Slug (URL)"
              value={formData.slug}
              onChange={(e) => handleFormChange('slug', e.target.value)}
              fullWidth
              helperText="Để trống để tự động tạo từ tên danh mục"
            />
            
            <FormControl fullWidth>
              <InputLabel>Danh mục cha</InputLabel>
              <Select
                value={formData.parentId}
                onChange={(e) => handleFormChange('parentId', e.target.value)}
                label="Danh mục cha"
              >
                <MenuItem value="">Không có</MenuItem>
                {parentCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Thứ tự"
                type="number"
                value={formData.sortOrder}
                onChange={(e) => handleFormChange('sortOrder', parseInt(e.target.value))}
                sx={{ width: '50%' }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => handleFormChange('isActive', e.target.checked)}
                  />
                }
                label="Hoạt động"
                sx={{ width: '50%' }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveCategory} variant="contained">
            {editingCategory ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductCategories;
