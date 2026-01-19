import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Pagination,
  Breadcrumbs,
  Link,
  Paper,

  IconButton,
  Tooltip,

  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Search,
  FilterList,
  ViewList,
  ViewModule,
  Favorite,
  ShoppingCart,
  ExpandMore,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import { useCart } from '../contexts/CartContext';
import productApi, { type ProductItem } from '../api/productApi';
import categoryApi, { type CategoryItem } from '../api/admin/categoryApi';
import { Refresh } from '@mui/icons-material';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('price');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState(''); // Input value (not trigger search)
  const [searchValue, setSearchValue] = useState(''); // Actual search value for API
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);
  const [addedMessage, setAddedMessage] = useState('');
  
  // API state
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [categoryMap, setCategoryMap] = useState<Map<string, number>>(new Map()); // Map category name to categoryId

  // Auto-apply category filter from navigation state
  useEffect(() => {
    if (location.state?.category) {
      const categoryFromState = location.state.category;
      setSelectedCategories([categoryFromState]);
      setCurrentPage(1); // Reset to first page when filtering
    }
  }, [location.state]);

  // Load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryApi.list({
          page_no: 1,
          page_size: 100,
        });
        const categoriesList = data.result.content || [];
        setCategories(categoriesList);
        
        // Create map from category name to categoryId
        const map = new Map<string, number>();
        categoriesList.forEach(cat => {
          map.set(cat.name, cat.categoryId);
        });
        setCategoryMap(map);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        // Priority: location.state.categoryId > selectedCategories categoryId
        let categoryId: number | undefined = undefined;
        
        if (location.state?.categoryId) {
          // Use categoryId from navigation state (from Home page)
          categoryId = location.state.categoryId;
        } else if (selectedCategories.length > 0) {
          // Map selected categories (names) to categoryIds
          const categoryIds = selectedCategories
            .map(name => categoryMap.get(name))
            .filter((id): id is number => id !== undefined);
          categoryId = categoryIds.length === 1 ? categoryIds[0] : undefined;
        }
        
        const params: any = {
          search: searchValue || undefined,
          sort_by: sortBy,
          sort_dir: sortDir,
          page_no: currentPage,
          page_size: 10,
          min_price: priceRange[0] > 0 ? priceRange[0] : undefined,
          max_price: priceRange[1] < 100000000 ? priceRange[1] : undefined,
          flash_sale: showOnlySale ? true : undefined,
          category_id: categoryId,
        };
        
        const data = await productApi.getProducts(params);
        const content = data.result.content || [];
        setProducts(content);
        setTotalElements(data.result.totalElement || 0);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentPage, searchValue, sortBy, sortDir, priceRange, showOnlySale, selectedCategories, categoryMap, location.state]);

  // Helper function to format price
  const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
    
    // Update navigation state when category changes
    if (selectedCategories.includes(category)) {
      // Removing category
      const newCategories = selectedCategories.filter(c => c !== category);
      if (newCategories.length === 0) {
        navigate('/products', { replace: true, state: {} });
      } else {
        navigate('/products', { replace: true, state: { category: newCategories[0] } });
      }
    } else {
      // Adding category
      navigate('/products', { replace: true, state: { category } });
    }
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    // Map UI sort to API sort
    if (newSortBy === 'price-low') {
      setSortBy('price');
      setSortDir('asc');
    } else if (newSortBy === 'price-high') {
      setSortBy('price');
      setSortDir('desc');
    } else {
      setSortBy(newSortBy);
      setSortDir('desc'); // default
    }
  };

  const handleSearch = () => {
    setSearchValue(searchInput);
    setCurrentPage(1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleRefresh = () => {
    setSelectedCategories([]);
    setSearchInput('');
    setSearchValue('');
    setPriceRange([0, 100000000]);
    setShowOnlySale(false);
    setCurrentPage(1);
    setSortBy('price');
    setSortDir('asc');
    navigate('/products', { replace: true, state: {} });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchInput('');
    setSearchValue('');
    setPriceRange([0, 100000000]);
    setShowOnlySale(false);
    setCurrentPage(1);
    setSortBy('price');
    setSortDir('asc');
    navigate('/products', { replace: true, state: {} });
  };

  const formatPrice = (price: number) => {
    return formatCurrency(price);
  };


  const palette = {
    wine900: '#1a0f14',
    wine800: '#241018',
    wine700: '#341420',
    cream: '#fbf6f0',
    ink: '#24161a',
    muted: '#6b5a61',
    gold: '#c7a24a',
    rose: '#c3576a',
    borderSoft: 'rgba(26,15,20,0.08)',
  } as const;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `radial-gradient(1000px 450px at 20% 0%, rgba(199,162,74,0.10) 0%, rgba(199,162,74,0) 60%), ${palette.cream}`,
      py: 3
    }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3, color: 'text.secondary' }}>
          <Link 
            color="inherit" 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
          >
            Trang chủ
          </Link>
          <Link 
            color="inherit" 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/products'); }}
            sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
          >
            Sản phẩm
          </Link>
          {location.state?.category && (
            <Typography color="text.primary">{location.state.category}</Typography>
          )}
        </Breadcrumbs>

        {/* Auto-applied Category Filter Indicator */}
        {location.state?.category && (
          <Box sx={{ mb: 3 }}>
            <Chip
              label={`Đang lọc theo danh mục: ${location.state.category}`}
              color="primary"
              variant="outlined"
              onDelete={() => {
                setSelectedCategories([]);
                navigate('/products', { replace: true, state: {} });
              }}
              deleteIcon={<FilterList />}
              sx={{
                fontSize: '0.9rem',
                '& .MuiChip-deleteIcon': {
                  color: 'primary.main',
                  '&:hover': { color: 'primary.dark' }
                }
              }}
            />
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 1, fontSize: '0.85rem' }}
            >
              Bạn có thể thay đổi hoặc xóa bộ lọc này bằng cách sử dụng các tùy chọn bên trái
            </Typography>
          </Box>
        )}

        {/* Header Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 4,
            borderRadius: 4,
            background: `radial-gradient(1200px 700px at 10% 0%, ${palette.wine700} 0%, ${palette.wine900} 55%, ${palette.wine900} 100%)`,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 900,
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              background: `linear-gradient(45deg, #fff 30%, ${palette.gold} 95%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            {location.state?.category ? `${location.state.category}` : 'Khám Phá Bộ Sưu Tập'}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.95,
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              maxWidth: '600px',
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            {location.state?.category 
              ? `Khám phá các sản phẩm ${location.state.category} với giá tốt nhất`
              : 'Khám phá bộ sưu tập mùi hương lualab — tinh tế, sang trọng và dễ chọn theo gu.'
            }
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          <Grid size={{xs:12, md:3}}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: 4,
                background: 'linear-gradient(135deg, #ffffff 0%, #fffdfb 100%)',
                border: `1px solid ${palette.borderSoft}`,
                height: 'fit-content',
                position: 'sticky',
                top: 100
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 900, mb: 3, color: palette.ink }}>
                <FilterList sx={{ mr: 1, verticalAlign: 'middle', color: palette.gold }} />
                Bộ lọc
              </Typography>

              {/* Search */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleSearch}
                          edge="end"
                          sx={{ color: palette.wine900 }}
                        >
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Categories */}
              <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: palette.gold }} />}>
                  <Typography variant="subtitle1" fontWeight={900} sx={{ color: palette.ink }}>
                    Danh mục
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category.categoryId}
                        control={
                          <Switch
                            checked={selectedCategories.includes(category.name)}
                            onChange={() => handleCategoryChange(category.name)}
                            size="small"
                          />
                        }
                        label={category.name}
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.9rem' } }}
                      />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>


              {/* Price Range */}
              <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: palette.gold }} />}>
                  <Typography variant="subtitle1" fontWeight={900} sx={{ color: palette.ink }}>
                    Khoảng giá
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ px: 1 }}>
                    <Slider
                      value={priceRange}
                      onChange={(_, newValue) => setPriceRange(newValue as number[])}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100000000}
                      step={1000000}
                      valueLabelFormat={(value) => formatPrice(value)}
                      sx={{ mb: 2 }}
                    />
                    <Stack direction="row" spacing={2}>
                      <TextField
                        label="Từ"
                        value={formatPrice(priceRange[0])}
                        size="small"
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Đến"
                        value={formatPrice(priceRange[1])}
                        size="small"
                        sx={{ flex: 1 }}
                      />
                    </Stack>
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Sale Only */}
              <FormControlLabel
                control={
                  <Switch
                    checked={showOnlySale}
                    onChange={(e) => setShowOnlySale(e.target.checked)}
                  />
                }
                label="Chỉ hiển thị sản phẩm giảm giá"
                sx={{ mt: 2 }}
              />

              {/* Refresh Button */}
              <Button
                variant="contained"
                fullWidth
                startIcon={<Refresh />}
                onClick={handleRefresh}
                sx={{ 
                  mt: 3,
                  py: 1,
                  fontSize: '0.9rem',
                  bgcolor: palette.wine900,
                  fontWeight: 900,
                  borderRadius: 3,
                  '&:hover': { bgcolor: '#120a0e' }
                }}
              >
                Làm mới
              </Button>

              {/* Clear All Filters Button */}
              {(selectedCategories.length > 0 || searchValue || showOnlySale || (priceRange[0] !== 0 || priceRange[1] !== 100000000)) && (
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={clearAllFilters}
                  sx={{ 
                    mt: 2,
                    py: 1,
                    fontSize: '0.9rem',
                    borderColor: 'rgba(26,15,20,0.22)',
                    color: palette.ink,
                    fontWeight: 800,
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: 'rgba(26,15,20,0.35)',
                      bgcolor: 'rgba(26,15,20,0.03)'
                    }
                  }}
                >
                  Xóa tất cả bộ lọc
                </Button>
              )}
            </Paper>
          </Grid>

          {/* Products Grid */}
          <Grid size={{xs:12, md:9}}>
            {/* Toolbar */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                mb: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #ffffff 0%, #fffdfb 100%)',
                border: `1px solid ${palette.borderSoft}`
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2
              }}>
                <Typography variant="h6" sx={{ fontWeight: 900, color: palette.ink }}>
                  {totalElements} sản phẩm
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  flexWrap: 'wrap'
                }}>
                  {/* Sort */}
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Sắp xếp theo</InputLabel>
                    <Select
                      value={sortBy === 'price' && sortDir === 'asc' ? 'price-low' : sortBy === 'price' && sortDir === 'desc' ? 'price-high' : sortBy}
                      label="Sắp xếp theo"
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <MenuItem value="price-low">Giá thấp đến cao</MenuItem>
                      <MenuItem value="price-high">Giá cao đến thấp</MenuItem>
                    </Select>
                  </FormControl>

                  {/* View Mode */}
                  <Box sx={{ display: 'flex', border: `1px solid ${palette.borderSoft}`, borderRadius: 999 }}>
                    <IconButton
                      onClick={() => setViewMode('grid')}
                      sx={{ 
                        bgcolor: viewMode === 'grid' ? palette.wine900 : 'transparent',
                        color: viewMode === 'grid' ? 'white' : palette.ink,
                        borderRadius: 0,
                        '&:first-of-type': { borderTopLeftRadius: 999, borderBottomLeftRadius: 999 },
                        '&:hover': { bgcolor: viewMode === 'grid' ? '#120a0e' : 'rgba(26,15,20,0.03)' }
                      }}
                    >
                      <ViewModule />
                    </IconButton>
                    <IconButton
                      onClick={() => setViewMode('list')}
                      sx={{ 
                        bgcolor: viewMode === 'list' ? palette.wine900 : 'transparent',
                        color: viewMode === 'list' ? 'white' : palette.ink,
                        borderRadius: 0,
                        '&:last-of-type': { borderTopRightRadius: 999, borderBottomRightRadius: 999 },
                        '&:hover': { bgcolor: viewMode === 'list' ? '#120a0e' : 'rgba(26,15,20,0.03)' }
                      }}
                    >
                      <ViewList />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Products Grid */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {(() => {
                  // Products are already filtered by API based on category_id
                  // If multiple categories selected, we may need client-side filter
                  // But API only accepts single category_id, so if multiple selected, filter client-side
                  let filteredProducts = products;
                  if (selectedCategories.length > 1) {
                    filteredProducts = products.filter((p) => 
                      selectedCategories.includes(p.categoryName)
                    );
                  }

                  return filteredProducts.map((product) => {
                    // price = giá gốc, discount = giá bán
                    const originalPrice = product.price ?? 0;
                    const salePrice = product.discount ?? 0;
                    const discountPercent = originalPrice > 0 && salePrice < originalPrice
                      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
                      : 0;
                    const isSale = salePrice < originalPrice;

                    return (
                <Grid size={{xs:6, sm:6, md:3}} key={product.productId}>
                  <Card
                    onClick={() => handleProductClick(product.productId)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: 3,
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #ffffff 0%, #fffdfb 100%)',
                      border: `1px solid ${palette.borderSoft}`,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 25px 55px rgba(26,15,20,0.14)',
                        '& .product-image': {
                          transform: 'scale(1.05)'
                        }
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        className="product-image"
                        component="img"
                        
                        height="200px"
                        image={product.imageUrl || ''}
                        alt={product.name}
                        sx={{ 
                          objectFit: 'contain',
                          transition: 'transform 0.4s ease'
                        }}
                      />
                      
                      {/* Labels */}
                      <Stack 
                        direction="row" 
                        spacing={1} 
                        sx={{ 
                          position: 'absolute', 
                          top: 12, 
                          left: 12 
                        }}
                      >
                        {isSale && (
                          <Chip
                            label={`-${discountPercent}%`}
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(195,87,106,0.92)', 
                              color: 'white',
                              fontWeight: 900,
                              fontSize: '0.7rem'
                            }}
                          />
                        )}
                      </Stack>

                      {/* Action Buttons */}
                      <Stack 
                        direction="row" 
                        spacing={1} 
                        sx={{ 
                          position: 'absolute', 
                          top: 12, 
                          right: 12 
                        }}
                      >
                        <Tooltip title="Thêm vào yêu thích">
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.9)',
                              '&:hover': { bgcolor: 'white' },
                              color: 'grey.600'
                            }}
                          >
                            <Favorite />
                          </IconButton>
                        </Tooltip>
                        
                      </Stack>

                      {/* Stock Status */}
                      {product.stock && product.stock <= 5 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(135deg, rgba(255, 71, 87, 0.9) 0%, rgba(255, 71, 87, 0.7) 100%)',
                            color: 'white',
                            py: 1,
                            textAlign: 'center',
                            backdropFilter: 'blur(4px)'
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            Chỉ còn {product.stock} sản phẩm!
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                      {/* Brand & Category */}
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                        <Chip 
                          label={product.brand} 
                          size="small" 
                          sx={{ 
                            bgcolor: palette.wine900, 
                            color: 'white',
                            fontSize: '0.7rem',
                            height: '20px',
                            fontWeight: 900
                          }}
                        />
                        <Chip 
                          label={product.categoryName} 
                          variant="outlined" 
                          size="small"
                          sx={{ 
                            borderColor: palette.gold, 
                            color: palette.gold,
                            fontSize: '0.7rem',
                            height: '20px',
                            fontWeight: 800
                          }}
                        />
                      </Stack>

                      {/* Product Name */}
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          lineHeight: 1.3,
                          minHeight: '2.6em',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {product.name}
                      </Typography>

                      {/* Rating & Reviews */}
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <Rating 
                          value={product.rating ?? 0} 
                          precision={0.5} 
                          readOnly 
                          size="small"
                          sx={{ '& .MuiRating-iconFilled': { color: palette.gold } }}
                        />
                      </Stack>

                      {/* Price */}
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Typography 
                          variant="h6" 
                          color="primary" 
                          sx={{ 
                            fontWeight: 900,
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            color: palette.wine900
                          }}
                        >
                          {formatPrice(salePrice)}
                        </Typography>
                        {isSale && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ 
                              textDecoration: 'line-through',
                              fontSize: { xs: '0.8rem', sm: '0.9rem' }
                            }}
                          >
                            {formatPrice(originalPrice)}
                          </Typography>
                        )}
                      </Stack>

                      {/* Action Button */}
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCart />}
                        
                        
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            await addToCart(product, 1);
                            setAddedMessage(`Đã thêm "${product.name}" vào giỏ hàng`);
                            setShowAdded(true);
                          } catch (error) {
                            console.error('Error adding to cart:', error);
                            setAddedMessage(`Đã thêm "${product.name}" vào giỏ hàng`);
                            setShowAdded(true);
                          }
                        }}
                        sx={{
                          bgcolor: palette.wine900,
                          '&:hover': { bgcolor: '#120a0e' },
                          borderRadius: 3,
                          py: 1,
                          fontSize: '0.9rem',
                          fontWeight: 900,
                          boxShadow: '0 8px 25px rgba(26, 15, 20, 0.25)',
                        }}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                  );
                  });
                })()}
              </Grid>
            )}

            {/* Pagination */}
            {(() => {
              const totalPages = Math.max(1, Math.ceil(totalElements / 10));
              return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: palette.ink,
                        '&.Mui-selected': {
                          bgcolor: palette.wine900,
                          color: 'white',
                          '&:hover': {
                            bgcolor: '#120a0e'
                          }
                        },
                        '&:hover': {
                          bgcolor: 'rgba(26,15,20,0.08)'
                        }
                      }
                    }}
                    size="large"
                    showFirstButton 
                    showLastButton
                  />
                </Box>
              );
            })()}
          </Grid>
        </Grid>
      </Container>

      <Snackbar 
        open={showAdded} 
        autoHideDuration={2500} 
        onClose={() => setShowAdded(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowAdded(false)} severity="success" sx={{ width: '100%' }}>
          {addedMessage || 'Thêm sản phẩm thành công'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products;