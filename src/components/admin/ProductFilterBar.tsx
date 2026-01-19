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
  RestartAltOutlined,
  Add,
  LocalFloristOutlined,
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
  const palette = {
    wine900: '#1a0f14',
    ink: '#24161a',
    muted: '#6b5a61',
    gold: '#c7a24a',
    rose: '#c3576a',
    border: 'rgba(26,15,20,0.08)',
  } as const;

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
        p: 2.5,
        mb: 3,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #fffdfb 100%)',
        border: `1px solid ${palette.border}`,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Search */}
        <TextField
          placeholder="Tìm theo tên / thương hiệu / mô tả..."
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
            },
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': { borderColor: 'rgba(26,15,20,0.28)' },
              '&.Mui-focused fieldset': { borderColor: palette.wine900 },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton size="small" onClick={handleSearchSubmit}>
                  <Search sx={{ fontSize: 20, color: palette.muted }} />
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
            sx={{
              height: 40,
              fontSize: '0.875rem',
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(26,15,20,0.28)' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: palette.wine900 },
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
        <FormControl size="small" sx={{ minWidth: 150, height: 40 }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Sắp xếp theo</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            label="Sắp xếp theo"
            sx={{
              height: 40,
              fontSize: '0.875rem',
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(26,15,20,0.28)' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: palette.wine900 },
            }}
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
            sx={{
              height: 40,
              fontSize: '0.875rem',
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(26,15,20,0.28)' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: palette.wine900 },
            }}
          >
            <MenuItem value="asc" sx={{ fontSize: '0.875rem' }}>Tăng dần</MenuItem>
            <MenuItem value="desc" sx={{ fontSize: '0.875rem' }}>Giảm dần</MenuItem>
          </Select>
        </FormControl>

        {/* Filter Button */}

        {/* Clear Filters */}
        <Button
          variant="outlined"
          startIcon={<RestartAltOutlined />}
          size="small"
          onClick={onClearFilters}
          sx={{
            height: 40,
            fontSize: '0.875rem',
            fontWeight: 700,
            borderColor: 'rgba(26,15,20,0.22)',
            color: palette.ink,
            '&:hover': { borderColor: 'rgba(26,15,20,0.35)', bgcolor: 'rgba(26,15,20,0.03)' },
          }}
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
            ml: 'auto',
            fontWeight: 800,
            bgcolor: palette.wine900,
            color: 'rgba(255,255,255,0.92)',
            '&:hover': { bgcolor: '#120a0e' },
          }}
        >
          Thêm sản phẩm
        </Button>
      </Box>

      {/* Filter Tags */}
      {(searchTerm || selectedCategory) && (
        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${palette.border}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ mr: 1, color: palette.muted, fontWeight: 700 }}>
              Bộ lọc đang áp dụng:
            </Typography>
            
            {searchTerm && (
              <Chip
                label={`Tìm kiếm: "${searchTerm}"`}
                onDelete={() => onSearchChange('')}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(195,87,106,0.35)',
                  color: palette.rose,
                  fontWeight: 700,
                }}
              />
            )}
            
            {selectedCategory && (
              <Chip
                label={`Danh mục: ${categoryOptions.find(c => c.categoryId === selectedCategory)?.name || ''}`}
                onDelete={() => onCategoryChange(null)}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(199,162,74,0.35)',
                  color: palette.gold,
                  fontWeight: 700,
                }}
              />
            )}
            
            <Chip
              label={`Sắp xếp: ${sortBy === 'productId' ? 'ID' : sortBy === 'price' ? 'Giá' : 'Ngày tạo'} (${sortDir === 'asc' ? 'Tăng dần' : 'Giảm dần'})`}
              onDelete={() => {
                onSortByChange('productId');
                onSortDirChange('desc');
              }}
              size="small"
              variant="outlined"
              icon={<LocalFloristOutlined />}
              sx={{
                borderColor: 'rgba(26,15,20,0.22)',
                color: palette.ink,
                fontWeight: 700,
                '& .MuiChip-icon': { color: palette.wine900 },
              }}
            />
          </Box>
        </Box>
      )}

      {/* Results Count */}
      
    </Paper>
  );
};

export default ProductFilterBar;
