import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  Divider,
  Alert,
} from '@mui/material';
import { Close, Warning } from '@mui/icons-material';
import type { Product } from '../../data/products';

interface DeleteProductDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: (productId: number) => void;
  product: Product | null;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  open,
  onClose,
  onDelete,
  product,
}) => {
  const handleDelete = () => {
    if (product) {
      onDelete(product.id);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
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
            Xác nhận xóa sản phẩm
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Warning 
            sx={{ 
              color: '#f44336', 
              fontSize: 40, 
              mt: 1,
              flexShrink: 0
            }} 
          />
          <Box sx={{ flex: 1 }}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Cảnh báo: Hành động này không thể hoàn tác!
              </Typography>
            </Alert>
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              Bạn có chắc chắn muốn xóa sản phẩm sau không?
            </Typography>
            
            {product && (
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: '#f5f5f5', 
                  borderRadius: 1,
                  border: '1px solid #e0e0e0'
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Thương hiệu:</strong> {product.brand}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Danh mục:</strong> {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Giá:</strong> {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Tồn kho:</strong> {product.stock} sản phẩm
                </Typography>
              </Box>
            )}
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Tất cả dữ liệu liên quan đến sản phẩm này sẽ bị xóa vĩnh viễn.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      
      <Divider />
      
      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          Hủy
        </Button>
        <Button 
          onClick={handleDelete} 
          variant="contained"
          color="error"
          sx={{ minWidth: 120 }}
        >
          Xóa sản phẩm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductDialog;
