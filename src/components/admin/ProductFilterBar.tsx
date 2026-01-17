import React from 'react';
import {
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  InputAdornment,
  Typography,
} from '@mui/material';
import {
  Search,
  Refresh,
  Add,
} from '@mui/icons-material';
import type { CategoryItem } from '../../api/admin/categoryApi';

interface ProductFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortDir: string;
  onSortDirChange: (value: string) => void;
  onClearFilters: () => void;
  onAddProduct: () => void;
  categoryOptions: CategoryItem[];
  filteredCount: number;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortByChange,
  sortDir,
  onSortDirChange,
  onClearFilters,
  onAddProduct,
  categoryOptions,
  filteredCount,
}) => {
  const [searchInput, setSearchInput] = React.useState(searchTerm);

  React.useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = () => {
    onSearchChange(searchInput.trim());
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        background: '#ffffff',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, gap: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 800, color: '#1f2937', fontSize: '1.1rem' }}>
            Tìm kiếm & Lọc
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#6b7280', mt: 0.5 }}>
            Khám phá các sản phẩm của bạn
          </Typography>
        </Box>
        <Chip
          label={`${filteredCount.toLocaleString('vi-VN')} sản phẩm`}
          size="small"
          sx={{
            bgcolor: '#f0fdf4',
            color: '#15803d',
            fontWeight: 700,
            border: '1px solid #bbf7d0',
            fontSize: '0.85rem',
            padding: '0.5rem',
          }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 2, alignItems: 'flex-end' }}>
        {/* Search */}
        <TextField
          placeholder="Tìm kiếm..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          size="small"
          sx={{ 
            '& .MuiInputBase-root': {
              height: 42,
              fontSize: '0.875rem',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#d1d5db',
                backgroundColor: '#ffffff',
              },
              '&.Mui-focused': {
                borderColor: '#3b82f6',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 18, color: '#9ca3af', mr: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        
        {/* Category Filter */}
        <FormControl size="small" sx={{ width: '100%' }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Danh mục</InputLabel>
          <Select
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
            label="Danh mục"
            sx={{ 
              height: 42,
              fontSize: '0.875rem',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#d1d5db',
                backgroundColor: '#ffffff',
              },
              '&.Mui-focused': {
                borderColor: '#3b82f6',
                backgroundColor: '#ffffff',
              }
            }}
          >
            <MenuItem value="" sx={{ fontSize: '0.875rem' }}>Tất cả danh mục</MenuItem>
            {categoryOptions.map((category) => (
              <MenuItem key={category.categoryId} value={category.categoryId} sx={{ fontSize: '0.875rem' }}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort By */}
        <FormControl size="small" sx={{ width: '100%' }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Sắp xếp</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            label="Sắp xếp"
            sx={{ 
              height: 42,
              fontSize: '0.875rem',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#d1d5db',
                backgroundColor: '#ffffff',
              },
              '&.Mui-focused': {
                borderColor: '#3b82f6',
                backgroundColor: '#ffffff',
              }
            }}
          >
            <MenuItem value="productId" sx={{ fontSize: '0.875rem' }}>ID sản phẩm</MenuItem>
            <MenuItem value="price" sx={{ fontSize: '0.875rem' }}>Giá</MenuItem>
            <MenuItem value="createdAt" sx={{ fontSize: '0.875rem' }}>Ngày tạo</MenuItem>
          </Select>
        </FormControl>

        {/* Sort Direction */}
        <FormControl size="small" sx={{ width: '100%' }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Thứ tự</InputLabel>
          <Select
            value={sortDir}
            onChange={(e) => onSortDirChange(e.target.value)}
            label="Thứ tự"
            sx={{ 
              height: 42,
              fontSize: '0.875rem',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#d1d5db',
                backgroundColor: '#ffffff',
              },
              '&.Mui-focused': {
                borderColor: '#3b82f6',
                backgroundColor: '#ffffff',
              }
            }}
          >
            <MenuItem value="asc" sx={{ fontSize: '0.875rem' }}>Tăng dần</MenuItem>
            <MenuItem value="desc" sx={{ fontSize: '0.875rem' }}>Giảm dần</MenuItem>
          </Select>
        </FormControl>

        {/* Clear Filters Button */}
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          size="small"
          onClick={onClearFilters}
          sx={{ 
            height: 42, 
            fontSize: '0.875rem',
            borderColor: '#e5e7eb',
            color: '#6b7280',
            fontWeight: 600,
            borderRadius: '0.5rem',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: '#9ca3af',
              backgroundColor: '#f9fafb',
              color: '#374151',
            }
          }}
        >
          Xóa lọc
        </Button>
      </Box>

      {/* Add Product Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, pt: 2.5, borderTop: '1px solid #e5e7eb' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAddProduct}
          sx={{ 
            height: 42, 
            fontSize: '0.9rem',
            fontWeight: 700,
            backgroundColor: '#3b82f6',
            borderRadius: '0.5rem',
            textTransform: 'none',
            boxShadow: '0 4px 6px rgba(59, 130, 246, 0.25)',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: '#2563eb',
              boxShadow: '0 6px 12px rgba(59, 130, 246, 0.35)',
              transform: 'translateY(-2px)',
            }
          }}
        >
          Thêm sản phẩm
        </Button>
      </Box>

      {/* Filter Tags */}
      {(searchTerm || selectedCategory) && (
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Bộ lọc đang áp dụng:
            </Typography>
            
            {searchTerm && (
              <Chip
                label={`Tìm kiếm: "${searchTerm}"`}
                onDelete={() => onSearchChange('')}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            
            {selectedCategory && (
              <Chip
                label={`Danh mục: ${categoryOptions.find(c => c.categoryId === selectedCategory)?.name || ''}`}
                onDelete={() => onCategoryChange(null)}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            
            <Chip
              label={`Sắp xếp: ${sortBy === 'productId' ? 'ID' : sortBy === 'price' ? 'Giá' : 'Ngày tạo'} (${sortDir === 'asc' ? 'Tăng dần' : 'Giảm dần'})`}
              onDelete={() => {
                onSortByChange('productId');
                onSortDirChange('desc');
              }}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>
      )}

      {/* Results Count */}
      
    </Paper>
  );
};

export default ProductFilterBar;
