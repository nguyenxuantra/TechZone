import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import type { Product } from '../../data/products';

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
  categories: string[];
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onClose,
  onAdd,
  categories,
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    brand: '',
    category: '',
    stock: 0,
    discount: 0,
    rating: 0,
    image: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm là bắt buộc';
    if (!formData.brand.trim()) newErrors.brand = 'Thương hiệu là bắt buộc';
    if (!formData.category) newErrors.category = 'Danh mục là bắt buộc';
    if (!formData.price.trim()) newErrors.price = 'Giá bán là bắt buộc';
    if (!formData.image.trim()) newErrors.image = 'URL hình ảnh là bắt buộc';
    if (formData.stock < 0) newErrors.stock = 'Số lượng không được âm';
    if (formData.discount < 0 || formData.discount > 100) newErrors.discount = 'Giảm giá phải từ 0-100%';
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Đánh giá phải từ 0-5';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newProduct = {
        ...formData,
        reviews: 0,
        isSale: formData.discount > 0,
      };
      onAdd(newProduct);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      brand: '',
      category: '',
      stock: 0,
      discount: 0,
      rating: 0,
      image: '',
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
            Thêm sản phẩm mới
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Thông tin cơ bản */}
          <Grid size={{xs: 12}}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#34495e' }}>
              Thông tin cơ bản
            </Typography>
          </Grid>
          
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Tên sản phẩm"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              error={!!errors.name}
              helperText={errors.name}
              required
              variant="outlined"
            />
          </Grid>
          
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Thương hiệu"
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              error={!!errors.brand}
              helperText={errors.brand}
              required
              variant="outlined"
            />
          </Grid>
          
          <Grid size={{xs: 12, md: 6}}>
            <FormControl fullWidth required error={!!errors.category}>
              <InputLabel>Danh mục</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                label="Danh mục"
                variant="outlined"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="URL hình ảnh"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              error={!!errors.image}
              helperText={errors.image}
              required
              variant="outlined"
            />
          </Grid>

          {/* Thông tin giá và kho */}
          <Grid size={{xs: 12}}>
            <Typography variant="subtitle1" sx={{ mb: 2, mt: 2, fontWeight: 600, color: '#34495e' }}>
              Thông tin giá và kho
            </Typography>
          </Grid>
          
          <Grid size={{xs: 12, md: 4}}>
            <TextField
              fullWidth
              label="Giá bán"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              error={!!errors.price}
              helperText={errors.price}
              required
              variant="outlined"
              placeholder="Ví dụ: 1.500.000₫"
            />
          </Grid>
          
          <Grid size={{xs: 12, md: 4}}>
            <TextField
              fullWidth
              label="Giá gốc"
              value={formData.originalPrice}
              onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
              variant="outlined"
              placeholder="Ví dụ: 2.000.000₫"
            />
          </Grid>
          
          <Grid size={{xs: 12, md: 4}}>
            <TextField
              fullWidth
              label="Số lượng"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
              error={!!errors.stock}
              helperText={errors.stock}
              required
              variant="outlined"
              inputProps={{ min: 0 }}
            />
          </Grid>
          
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Giảm giá (%)"
              type="number"
              value={formData.discount}
              onChange={(e) => setFormData({...formData, discount: parseInt(e.target.value) || 0})}
              error={!!errors.discount}
              helperText={errors.discount}
              variant="outlined"
              inputProps={{ min: 0, max: 100 }}
            />
          </Grid>
          
          <Grid size={{xs: 12, md: 6}}>
            <TextField
              fullWidth
              label="Đánh giá"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value) || 0})}
              error={!!errors.rating}
              helperText={errors.rating}
              variant="outlined"
            />
          </Grid>
          
          <Grid size={{xs: 12}}>
            <TextField
              fullWidth
              label="Mô tả sản phẩm"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              variant="outlined"
              placeholder="Nhập mô tả chi tiết về sản phẩm..."
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <Divider />
      
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          Hủy
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          sx={{ minWidth: 120 }}
        >
          Thêm sản phẩm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
