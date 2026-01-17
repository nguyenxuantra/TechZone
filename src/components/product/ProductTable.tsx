import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Box,
  Typography,
  TablePagination,
  Skeleton,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Edit,
  Delete,
  Star,
} from '@mui/icons-material';

import type { PaginationOptions } from '../../types/untils';
import type { Product } from '../../types/products/product';


interface ProductTableProps {
  products: Product[];
  pagination: PaginationOptions;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEditProduct?: (product: Product) => void;
  onDeleteProduct?: (product: Product) => void;
  loading?: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  onEditProduct,
  onDeleteProduct,
  loading = false,
}) => {
  // Render product card
  const renderProductCard = (product: Product, index: number) => {
    if (loading) {
      return (
        <Card
          key={`skeleton-${index}`}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Skeleton variant="rectangular" height={200} />
          <CardContent sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={16} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={16} width="60%" />
          </CardContent>
        </Card>
      );
    }

    return (
      <Card
        key={product.product_id}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            borderColor: '#3b82f6',
          },
        }}
      >
        {/* Product Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden', height: 200, backgroundColor: '#f9fafb' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.imageUrl}
            alt={product.name}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
          {/* Stock Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor:
                product.stock > 10
                  ? '#dcfce7'
                  : product.stock > 0
                    ? '#fef08a'
                    : '#fee2e2',
              color:
                product.stock > 10
                  ? '#166534'
                  : product.stock > 0
                    ? '#854d0e'
                    : '#991b1b',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {product.stock} cái
          </Box>

          {/* Discount Badge */}
          {product.discount > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              -{Math.round(((product.price - product.discount) / product.price) * 100)}%
            </Box>
          )}
        </Box>

        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* Brand */}
          <Chip
            label={product.brand}
            size="small"
            sx={{
              width: 'fit-content',
              height: 20,
              fontSize: '0.7rem',
              fontWeight: 600,
              backgroundColor: '#f0f9ff',
              color: '#0369a1',
              border: '1px solid #bae6fd',
            }}
          />

          {/* Product Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#1f2937',
              lineHeight: 1.4,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              minHeight: '2.8rem',
            }}
          >
            {product.name}
          </Typography>

          {/* Category */}
          <Chip
            label={product.categoryName}
            size="small"
            variant="outlined"
            sx={{
              width: 'fit-content',
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 600,
              borderColor: '#e5e7eb',
              color: '#6b7280',
            }}
          />

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Star sx={{ fontSize: 16, color: '#fbbf24' }} />
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
              {product.rating.toFixed(1)}
            </Typography>
          </Box>

          {/* Pricing */}
          <Box sx={{ pt: 1, borderTop: '1px solid #e5e7eb' }}>
            {product.discount > 0 ? (
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    textDecoration: 'line-through',
                    mb: 0.5,
                  }}
                >
                  {product.price.toLocaleString('vi-VN')}₫
                </Typography>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444' }}>
                  {product.discount.toLocaleString('vi-VN')}₫
                </Typography>
              </Box>
            ) : (
              <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>
                {product.price.toLocaleString('vi-VN')}₫
              </Typography>
            )}
          </Box>
        </CardContent>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            padding: '1rem',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#fafafa',
          }}
        >
          <Tooltip title="Chỉnh sửa sản phẩm">
            <span style={{ flex: 1 }}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => onEditProduct?.(product)}
                sx={{
                  height: 36,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderColor: '#3b82f6',
                  color: '#3b82f6',
                  textTransform: 'none',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#2563eb',
                    backgroundColor: '#eff6ff',
                  },
                }}
              >
                Sửa
              </Button>
            </span>
          </Tooltip>
          <Tooltip title="Xóa sản phẩm">
            <span style={{ flex: 1 }}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                startIcon={<Delete />}
                onClick={() => onDeleteProduct?.(product)}
                sx={{
                  height: 36,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderColor: '#ef4444',
                  color: '#ef4444',
                  textTransform: 'none',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#dc2626',
                    backgroundColor: '#fef2f2',
                  },
                }}
              >
                Xóa
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Card>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Products Grid */}
      <Box sx={{ p: 3 }}>
        {products.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 2,
            }}
          >
            {products.map((product, index) => (
              <Box key={`product-${product.product_id || index}`}>
                {renderProductCard(product, index)}
              </Box>
            ))}
          </Box>
        ) : !loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 300,
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: '#9ca3af', fontWeight: 600 }}>
              Không có sản phẩm nào
            </Typography>
            <Typography variant="body2" sx={{ color: '#d1d5db' }}>
              Hãy thêm sản phẩm mới bằng cách nhấn nút "Thêm sản phẩm"
            </Typography>
          </Box>
        ) : null}

        {/* Loading State */}
        {loading && products.length === 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 2,
            }}
          >
            {[...Array(8)].map((_, i) => (
              <Box key={`skeleton-${i}`}>
                {renderProductCard({} as Product, i)}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={pagination.totalCount}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
        sx={{
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#fafafa',
          '& .MuiTablePagination-selectLabel': {
            fontSize: '0.875rem',
            color: '#6b7280',
          },
          '& .MuiTablePagination-displayedRows': {
            fontSize: '0.875rem',
            color: '#6b7280',
          },
          '& .MuiSelect-root': {
            fontSize: '0.875rem',
          },
        }}
      />
    </Paper>
  );
};

export default ProductTable;
