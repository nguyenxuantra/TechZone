import React from 'react';
import {
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Grid,
} from '@mui/material';
import {
  Search,
  FilterList,
  Sort,
  Refresh,
  Add,
} from '@mui/icons-material';


interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  onFilter?: () => void;
  onSort?: () => void;
  onRefresh?: () => void;
  onAdd?: () => void;
  showAddButton?: boolean;
  addButtonText?: string;
  additionalFilters?: React.ReactNode;
  searchPlaceholder?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onFilter,
  onSort,
  onRefresh,
  onAdd,
  showAddButton = true,
  addButtonText = 'Thêm mới',
  additionalFilters,
  searchPlaceholder = 'Tìm kiếm...',
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        border: '1px solid rgba(0,0,0,0.05)'
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid size={{xs:12, md:3}}>
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 40,
                fontSize: '0.875rem'
              }
            }}
          />
        </Grid>

        <Grid size={{xs:12, md:2}}>
          <FormControl size="small" fullWidth>
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={selectedCategory}
              label="Danh mục"
              onChange={(e) => onCategoryChange(e.target.value)}
              sx={{
                height: 40,
                fontSize: '0.875rem'
              }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {additionalFilters && (
          <Grid size={{xs:12, md:3}}>
            {additionalFilters}
          </Grid>
        )}

        <Grid size={{xs:12, md:showAddButton ? 4 : 7}}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {onFilter && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterList />}
                onClick={onFilter}
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Bộ lọc
              </Button>
            )}
            {onSort && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Sort />}
                onClick={onSort}
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Sắp xếp
              </Button>
            )}
            {onRefresh && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Refresh />}
                onClick={onRefresh}
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Làm mới
              </Button>
            )}
            {showAddButton && onAdd && (
              <Button
                variant="contained"
                size="small"
                startIcon={<Add />}
                onClick={onAdd}
                sx={{
                  bgcolor: '#667eea',
                  '&:hover': { bgcolor: '#5a6fd8' },
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                {addButtonText}
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterBar;
