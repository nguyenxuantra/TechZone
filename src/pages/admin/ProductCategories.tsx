import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import categoryApi, { type CategoryItem } from '../../api/admin/categoryApi';
import uploadApi from '../../api/uploadApi';

interface Category {
  id: number;
  name: string;
  imageUrl: string | null;
  createdAt: string;
}

const ProductCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
  });
  const [uploading, setUploading] = useState(false);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryApi.list({
        search: searchTerm || undefined,
        page_no: page + 1,
        page_size: rowsPerPage,
      });

      const content: CategoryItem[] = data.result.content;

      setCategories(
        content.map((item) => ({
          id: item.categoryId,
          name: item.name,
          imageUrl: item.imageUrl,
          createdAt: new Date(item.createdAt).toLocaleDateString("vi-VN"),
        }))
      );
      setTotalElements(data.result.totalElement);
    } catch (error) {
      console.error("Load categories error:", error);
      setAlertSeverity("error");
      setAlertMessage("Không tải được danh sách danh mục, vui lòng thử lại!");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, searchTerm]);

  const handleSearch = () => {
    setPage(0);
    setSearchTerm(searchInput.trim());
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      imageUrl: '',
    });
    setOpenDialog(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      imageUrl: category.imageUrl ?? '',
    });
    setOpenDialog(true);
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await categoryApi.delete(id);
      setAlertSeverity('success');
      setAlertMessage('Xóa danh mục thành công!');
      setShowAlert(true);
      // Reload list after delete
      loadCategories();
    } catch (error) {
      console.error('Delete category error:', error);
      setAlertSeverity('error');
      setAlertMessage('Xóa danh mục thất bại. Vui lòng thử lại!');
      setShowAlert(true);
    }
  };

  const handleSaveCategory = async () => {
    if (!formData.name.trim()) {
      setAlertSeverity('error');
      setAlertMessage('Vui lòng nhập tên danh mục!');
      setShowAlert(true);
      return;
    }

    if (!formData.imageUrl.trim()) {
      setAlertSeverity('error');
      setAlertMessage('Vui lòng nhập URL hình ảnh danh mục!');
      setShowAlert(true);
      return;
    }

    try {
      if (!editingCategory) {
        // Gọi API tạo mới danh mục
        await categoryApi.create({
          name: formData.name.trim(),
          imageUrl: formData.imageUrl.trim(),
        });

        setAlertSeverity('success');
        setAlertMessage('Tạo danh mục thành công!');
      } else if (editingCategory) {
        // Gọi API cập nhật danh mục
        await categoryApi.update(editingCategory.id, {
          name: formData.name.trim(),
          imageUrl: formData.imageUrl.trim(),
        });
        setAlertSeverity('success');
        setAlertMessage('Cập nhật danh mục thành công!');
      }

      // Reload list after create/update
      loadCategories();

      setShowAlert(true);
      setOpenDialog(false);
    } catch (error) {
      console.error('Create category error:', error);
      setAlertSeverity('error');
      setAlertMessage('Tạo danh mục thất bại. Vui lòng thử lại!');
      setShowAlert(true);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadApi.uploadImage(file);
      setFormData(prev => ({ ...prev, imageUrl: res.result.secureUrl }));
      setAlertSeverity('success');
      setAlertMessage('Upload ảnh thành công!');
      setShowAlert(true);
    } catch (error) {
      console.error('Upload image error:', error);
      setAlertSeverity('error');
      setAlertMessage('Upload ảnh thất bại. Vui lòng thử lại!');
      setShowAlert(true);
    } finally {
      setUploading(false);
    }
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
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
              startAdornment: (
                <IconButton size="small" onClick={handleSearch}>
                  <SearchIcon sx={{ mr: 1, fontSize: 20 }} />
                </IconButton>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            size="small"
            sx={{ height: 40, fontSize: '0.875rem' }}
            onClick={() => {
              setPage(0);
              setSearchInput('');
              setSearchTerm('');
            }}
          >
            Làm mới
          </Button>
        </Box>
      </Paper>

      {/* Categories Table */}
      <Paper>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
              p: 6,
            }}
          >
            <CircularProgress size={48} sx={{ mb: 2, color: '#1976d2' }} />
            <Typography variant="body1" color="text.secondary">
              Đang tải dữ liệu...
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Ảnh</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Tên danh mục</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Ngày tạo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          Không có dữ liệu
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{category.id}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>
                    {category.imageUrl ? (
                      <Box
                        component="img"
                        src={category.imageUrl}
                        alt={category.name}
                        sx={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 1 }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Không có ảnh
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', fontWeight: 'medium' }}>
                    {category.name}
                  </TableCell>
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
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
            />
          </>
        )}
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

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                component="label"
                disabled={uploading}
              >
                {uploading ? 'Đang upload...' : 'Chọn ảnh danh mục'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Button>

              {formData.imageUrl && (
                <Box
                  component="img"
                  src={formData.imageUrl}
                  alt="Preview"
                  sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 1 }}
                />
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveCategory} variant="contained" disabled={uploading}>
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
        <Alert onClose={() => setShowAlert(false)} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductCategories;
