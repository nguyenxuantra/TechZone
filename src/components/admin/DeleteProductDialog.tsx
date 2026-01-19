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
import { Close, Warning, AutoAwesomeOutlined } from '@mui/icons-material';
import type { Product as AdminProduct } from '../../types/products/product';

interface DeleteProductDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: (productId: number) => void;
  product: AdminProduct | null;
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  open,
  onClose,
  onDelete,
  product,
}) => {
  const palette = {
    wine900: '#1a0f14',
    ink: '#24161a',
    muted: '#6b5a61',
    gold: '#c7a24a',
    rose: '#c3576a',
    border: 'rgba(26,15,20,0.08)',
  } as const;

  const handleDelete = () => {
    if (product) {
      onDelete(product.product_id);
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
              Xác nhận xóa sản phẩm
            </Typography>
          </Box>
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
              color: palette.rose, 
              fontSize: 40, 
              mt: 1,
              flexShrink: 0
            }} 
          />
          <Box sx={{ flex: 1 }}>
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2, border: `1px solid rgba(195,87,106,0.25)` }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Cảnh báo: Hành động này không thể hoàn tác!
              </Typography>
            </Alert>
            
            <Typography variant="body1" sx={{ mb: 2, color: palette.ink, fontWeight: 700 }}>
              Bạn có chắc chắn muốn xóa sản phẩm sau không?
            </Typography>
            
            {product && (
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: 'rgba(26,15,20,0.02)', 
                  borderRadius: 2,
                  border: `1px solid ${palette.border}`,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 1, color: palette.ink }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" sx={{ color: palette.muted }}>
                  <strong>Thương hiệu:</strong> {product.brand}
                </Typography>
                <Typography variant="body2" sx={{ color: palette.muted }}>
                  <strong>Danh mục:</strong> {product.categoryName}
                </Typography>
                <Typography variant="body2" sx={{ color: palette.muted }}>
                  <strong>Giá:</strong> {product.price.toLocaleString('vi-VN')}₫
                </Typography>
                <Typography variant="body2" sx={{ color: palette.muted }}>
                  <strong>Tồn kho:</strong> {product.stock} sản phẩm
                </Typography>
              </Box>
            )}
            
            <Typography variant="body2" sx={{ mt: 2, color: palette.muted }}>
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
          onClick={handleDelete} 
          variant="contained"
          color="error"
          sx={{
            minWidth: 120,
            fontWeight: 900,
            bgcolor: palette.rose,
            '&:hover': { bgcolor: '#a94657' },
          }}
        >
          Xóa sản phẩm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductDialog;
