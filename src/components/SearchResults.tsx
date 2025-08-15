import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Rating,
  IconButton,
  Fade,
  Paper
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  Close
} from '@mui/icons-material';
import type { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';

interface SearchResultsProps {
  results: Product[];
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isOpen,
  onClose,
  searchTerm
}) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // Có thể thêm thông báo thành công ở đây
  };

  if (!isOpen || !searchTerm.trim()) return null;

  return (
    <Fade in={isOpen}>
      <Paper
        elevation={8}
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1000,
          width: '500px',
          maxHeight: '770vh',
          overflow: 'auto',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          mt: 1
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Search color="primary" />
            <Typography variant="h6" color="primary">
              Kết quả tìm kiếm: "{searchTerm}"
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* Results */}
        <Box sx={{ p: 2 }}>
          {results.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Search sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Không tìm thấy sản phẩm
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hãy thử từ khóa khác hoặc kiểm tra chính tả
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {results.map((product) => (
                <Card
                  key={product.id}
                  sx={{
                    
                    display: 'flex',
                    height: 'auto',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 120,
                      height: 120,
                      objectFit: 'cover'
                    }}
                    image={product.image}
                    alt={product.name}
                  />
                  
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" component="div" sx={{ 
                        fontSize: '1rem',
                        fontWeight: 600,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {product.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Rating value={product.rating} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          ({product.reviews} đánh giá)
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                          {product.price}
                        </Typography>
                        {product.originalPrice !== product.price && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ textDecoration: 'line-through' }}
                          >
                            {product.originalPrice}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {product.discount && (
                          <Chip
                            label={`-${product.discount}%`}
                            color="error"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                        
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<ShoppingCart />}
                          onClick={() => handleAddToCart(product)}
                          disabled={isInCart(product.id)}
                          sx={{
                            minWidth: 'auto',
                            px: 2,
                            background: isInCart(product.id) 
                              ? 'success.main' 
                              : 'primary.main',
                            '&:hover': {
                              background: isInCart(product.id) 
                                ? 'success.dark' 
                                : 'primary.dark'
                            }
                          }}
                        >
                          {isInCart(product.id) ? 'Đã thêm' : 'Thêm'}
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>

        {/* Footer */}
        {results.length > 0 && (
          <Box sx={{ 
            p: 2, 
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            background: 'rgba(0, 0, 0, 0.02)',
            textAlign: 'center'
          }}>
            <Typography variant="body2" color="text.secondary">
              Tìm thấy {results.length} sản phẩm
            </Typography>
          </Box>
        )}
      </Paper>
    </Fade>
  );
};

export default SearchResults;
