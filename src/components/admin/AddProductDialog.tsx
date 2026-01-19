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
import { Close, AutoAwesomeOutlined } from '@mui/icons-material';
import type { Product } from '../../data/products';
import uploadApi from '../../api/uploadApi';

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
  const palette = {
    wine900: '#1a0f14',
    ink: '#24161a',
    muted: '#6b5a61',
    gold: '#c7a24a',
    border: 'rgba(26,15,20,0.08)',
  } as const;

  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    price: '', // Giá gốc
    discount: '', // Giá bán
    brand: '',
    category: '',
    stock: 0,
    rating: 0,
    image: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [uploading, setUploading] = React.useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm là bắt buộc';
    if (!formData.brand.trim()) newErrors.brand = 'Thương hiệu là bắt buộc';
    if (!formData.category) newErrors.category = 'Danh mục là bắt buộc';
    if (!formData.price.trim()) newErrors.price = 'Giá gốc là bắt buộc';
    if (!formData.image.trim()) newErrors.image = 'Hình ảnh là bắt buộc';
    if (formData.stock < 0) newErrors.stock = 'Số lượng không được âm';
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Đánh giá phải từ 0-5';

    // Validate price and discount
    const priceNum = parseInt(String(formData.price).replace(/[^\d]/g, ''), 10) || 0;
    const discountNum = formData.discount.trim() 
      ? parseInt(String(formData.discount).replace(/[^\d]/g, ''), 10) || 0
      : priceNum; // Nếu không nhập giá bán thì lấy giá gốc
    
    if (priceNum <= 0) {
      newErrors.price = 'Giá gốc phải lớn hơn 0';
    }
    
    if (discountNum > priceNum) {
      newErrors.discount = 'Giá bán không được lớn hơn giá gốc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const priceNum = parseInt(String(formData.price).replace(/[^\d]/g, ''), 10) || 0;
      // Nếu không nhập giá bán thì lấy giá gốc
      const discountNum = formData.discount.trim() 
        ? parseInt(String(formData.discount).replace(/[^\d]/g, ''), 10) || priceNum
        : priceNum;
      
      const newProduct = {
        ...formData,
        price: String(priceNum),
        originalPrice: String(priceNum),
        discount: discountNum,
        reviews: 0,
        isSale: discountNum < priceNum,
        image: formData.image, // secureUrl sau upload
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
      discount: '',
      brand: '',
      category: '',
      stock: 0,
      rating: 0,
      image: '',
    });
    setErrors({});
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await uploadApi.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: res.result.secureUrl }));
      setErrors((prev) => ({ ...prev, image: '' }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, image: 'Upload ảnh thất bại, thử lại!' }));
    } finally {
      setUploading(false);
    }
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
          borderRadius: 3,
          boxShadow: '0 18px 45px rgba(26,15,20,0.18)',
          border: `1px solid ${palette.border}`,
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <AutoAwesomeOutlined sx={{ color: palette.gold }} />
            <Typography variant="h6" sx={{ fontWeight: 900, color: palette.ink }}>
              Thêm sản phẩm mới
            </Typography>
          </Box>
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
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 900, color: palette.ink }}>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'rgba(26,15,20,0.28)' },
                  '&.Mui-focused fieldset': { borderColor: palette.wine900 },
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'rgba(26,15,20,0.28)' },
                  '&.Mui-focused fieldset': { borderColor: palette.wine900 },
                },
              }}
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
                sx={{
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(26,15,20,0.28)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: palette.wine900 },
                }}
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                component="label"
                disabled={uploading}
                sx={{
                  fontWeight: 800,
                  borderColor: 'rgba(26,15,20,0.22)',
                  color: palette.ink,
                  '&:hover': { borderColor: 'rgba(26,15,20,0.35)', bgcolor: 'rgba(26,15,20,0.03)' },
                }}
              >
                {uploading ? 'Đang upload...' : 'Chọn ảnh sản phẩm'}
                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
              </Button>
              {formData.image && (
                <Box
                  component="img"
                  src={formData.image}
                  alt="Preview"
                  sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 2, border: `1px solid ${palette.border}` }}
                />
              )}
            </Box>
            {errors.image && (
              <Typography variant="caption" color="error">
                {errors.image}
              </Typography>
            )}
          </Grid>

          {/* Thông tin giá và kho */}
          <Grid size={{xs: 12}}>
            <Typography variant="subtitle1" sx={{ mb: 2, mt: 2, fontWeight: 900, color: palette.ink }}>
              Thông tin giá và kho
            </Typography>
          </Grid>
          
          <Grid size={{xs: 12, md: 4}}>
            <TextField
              fullWidth
              label="Giá gốc"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              error={!!errors.price}
              helperText={errors.price}
              required
              variant="outlined"
              placeholder="Ví dụ: 2.000.000₫"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'rgba(26,15,20,0.28)' },
                  '&.Mui-focused fieldset': { borderColor: palette.wine900 },
                },
              }}
            />
          </Grid>
          
          <Grid size={{xs: 12, md: 4}}>
            <TextField
              fullWidth
              label="Giá bán"
              value={formData.discount}
              onChange={(e) => setFormData({...formData, discount: e.target.value})}
              error={!!errors.discount}
              helperText={errors.discount || 'Nếu không nhập, sẽ lấy giá gốc'}
              variant="outlined"
              placeholder="Ví dụ: 1.500.000₫"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'rgba(26,15,20,0.28)' },
                  '&.Mui-focused fieldset': { borderColor: palette.wine900 },
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'rgba(26,15,20,0.28)' },
                  '&.Mui-focused fieldset': { borderColor: palette.wine900 },
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'rgba(26,15,20,0.28)' },
                  '&.Mui-focused fieldset': { borderColor: palette.wine900 },
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: 'rgba(26,15,20,0.28)' },
                  '&.Mui-focused fieldset': { borderColor: palette.wine900 },
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <Divider />
      
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          sx={{
            minWidth: 100,
            fontWeight: 800,
            borderColor: 'rgba(26,15,20,0.22)',
            color: palette.ink,
            '&:hover': { borderColor: 'rgba(26,15,20,0.35)', bgcolor: 'rgba(26,15,20,0.03)' },
          }}
        >
          Hủy
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={uploading}
          sx={{
            minWidth: 120,
            fontWeight: 900,
            bgcolor: palette.wine900,
            color: 'rgba(255,255,255,0.92)',
            '&:hover': { bgcolor: '#120a0e' },
          }}
        >
          Thêm sản phẩm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
