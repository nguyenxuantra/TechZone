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
  IconButton,
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
  totalCount: number;
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
  categoryOptions
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
    <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Search */}
        <TextField
          placeholder="Tìm kiếm sản phẩm..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          size="small"
          sx={{ 
            minWidth: 280,
            height: 40,
            fontSize: '0.875rem',
            '& .MuiInputBase-root': {
              height: 40,
              fontSize: '0.875rem'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton size="small" onClick={handleSearchSubmit}>
                  <Search sx={{ fontSize: 20, color: '#666' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        {/* Category Filter */}
        <FormControl size="small" sx={{ minWidth: 180, height: 40 }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Danh mục</InputLabel>
          <Select
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
            label="Danh mục"
            sx={{ height: 40, fontSize: '0.875rem' }}
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
        <FormControl size="small" sx={{ minWidth: 150, height: 40 }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Sắp xếp theo</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            label="Sắp xếp theo"
            sx={{ height: 40, fontSize: '0.875rem' }}
          >
            <MenuItem value="productId" sx={{ fontSize: '0.875rem' }}>ID sản phẩm</MenuItem>
            <MenuItem value="price" sx={{ fontSize: '0.875rem' }}>Giá</MenuItem>
            <MenuItem value="createdAt" sx={{ fontSize: '0.875rem' }}>Ngày tạo</MenuItem>
          </Select>
        </FormControl>

        {/* Sort Direction */}
        <FormControl size="small" sx={{ minWidth: 120, height: 40 }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Thứ tự</InputLabel>
          <Select
            value={sortDir}
            onChange={(e) => onSortDirChange(e.target.value)}
            label="Thứ tự"
            sx={{ height: 40, fontSize: '0.875rem' }}
          >
            <MenuItem value="asc" sx={{ fontSize: '0.875rem' }}>Tăng dần</MenuItem>
            <MenuItem value="desc" sx={{ fontSize: '0.875rem' }}>Giảm dần</MenuItem>
          </Select>
        </FormControl>

        {/* Filter Button */}

        {/* Clear Filters */}
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          size="small"
          onClick={onClearFilters}
          sx={{ height: 40, fontSize: '0.875rem' }}
        >
          Xóa bộ lọc
        </Button>

        {/* Add Product */}
        <Button
          variant="contained"
          startIcon={<Add />}
          size="small"
          onClick={onAddProduct}
          sx={{ 
            height: 40, 
            fontSize: '0.875rem',
            ml: 'auto'
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
