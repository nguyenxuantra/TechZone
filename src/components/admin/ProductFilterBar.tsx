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
  FilterList,
  Refresh,
  Add,
} from '@mui/icons-material';

interface ProductFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
  onAddProduct: () => void;
  categories: string[];
  filteredCount: number;
  totalCount: number;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
  onAddProduct,
  categories
}) => {
  return (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Search */}
        <TextField
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
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
                <Search sx={{ mr: 1, fontSize: 20, color: '#666' }} />
              </InputAdornment>
            ),
          }}
        />
        
        {/* Category Filter */}
        <FormControl size="small" sx={{ minWidth: 180, height: 40 }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Danh mục</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            label="Danh mục"
            sx={{ height: 40, fontSize: '0.875rem' }}
          >
            <MenuItem value="" sx={{ fontSize: '0.875rem' }}>Tất cả danh mục</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category} sx={{ fontSize: '0.875rem' }}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Filter Button */}
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          size="small"
          sx={{ height: 40, fontSize: '0.875rem' }}
        >
          Lọc
        </Button>

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
                label={`Danh mục: ${selectedCategory}`}
                onDelete={() => onCategoryChange('')}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        </Box>
      )}

      {/* Results Count */}
      
    </Paper>
  );
};

export default ProductFilterBar;
