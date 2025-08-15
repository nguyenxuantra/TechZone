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
import { products } from '../data/products';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-apply category filter from navigation state
  useEffect(() => {
    if (location.state?.category) {
      const categoryFromState = location.state.category;
      setSelectedCategories([categoryFromState]);
      setCurrentPage(1); // Reset to first page when filtering
    }
  }, [location.state]);

  // Extract unique categories and brands from products
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));

  // Helper function to convert price string to number for filtering
  const parsePrice = (priceString: string): number => {
    return parseInt(priceString.replace(/[^\d]/g, ''), 10);
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

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearchTerm('');
    setPriceRange([0, 100000000]);
    setShowOnlySale(false);
    setCurrentPage(1);
    navigate('/products', { replace: true, state: {} });
  };

  const formatPrice = (price: string) => {
    return price; // Price is already formatted in the imported data
  };


  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
            background: 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%)',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 900,
              fontSize: { xs: '1rem', md: '2rem' },
              background: 'linear-gradient(45deg, #fff 30%, #667eea 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            {location.state?.category ? `${location.state.category}` : 'Khám Phá Sản Phẩm'}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9,
              fontSize: { xs: '0.7rem', md: '1rem' },
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            {location.state?.category 
              ? `Khám phá các sản phẩm ${location.state.category} với giá tốt nhất`
              : 'Hàng nghìn sản phẩm công nghệ chính hãng với giá tốt nhất thị trường'
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
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                height: 'fit-content',
                position: 'sticky',
                top: 100
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                Bộ lọc
              </Typography>

              {/* Search */}
              <TextField
                fullWidth
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              {/* Categories */}
              <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Danh mục
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category}
                        control={
                          <Switch
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            size="small"
                          />
                        }
                        label={category}
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.9rem' } }}
                      />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Brands */}
              <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Thương hiệu
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    {brands.map((brand) => (
                      <FormControlLabel
                        key={brand}
                        control={
                          <Switch
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                            size="small"
                          />
                        }
                        label={brand}
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.9rem' } }}
                      />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Price Range */}
              <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle1" fontWeight={600}>
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
                      valueLabelFormat={(value) => formatPrice(value.toString())}
                      sx={{ mb: 2 }}
                    />
                    <Stack direction="row" spacing={2}>
                      <TextField
                        label="Từ"
                        value={formatPrice(priceRange[0].toString())}
                        size="small"
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        label="Đến"
                        value={formatPrice(priceRange[1].toString())}
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

              {/* Clear All Filters Button */}
              {(selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm || showOnlySale || (priceRange[0] !== 0 || priceRange[1] !== 100000000)) && (
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={clearAllFilters}
                  sx={{ 
                    mt: 3,
                    py: 1,
                    fontSize: '0.9rem',
                    borderColor: 'grey.400',
                    color: 'grey.600',
                    '&:hover': {
                      borderColor: 'grey.600',
                      color: 'grey.800',
                      bgcolor: 'grey.50'
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
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {(() => {
                    const totalFiltered = products.filter((p) => {
                      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
                      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
                      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
                      const matchesSale = !showOnlySale || p.isSale;
                      const matchesPrice = parsePrice(p.price) >= priceRange[0] && parsePrice(p.price) <= priceRange[1];
                      return matchesSearch && matchesCategory && matchesBrand && matchesSale && matchesPrice;
                    }).length;
                    return `${totalFiltered} sản phẩm`;
                  })()}
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
                      value={sortBy}
                      label="Sắp xếp theo"
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <MenuItem value="popular">Phổ biến nhất</MenuItem>
                      <MenuItem value="newest">Mới nhất</MenuItem>
                      <MenuItem value="price-low">Giá thấp đến cao</MenuItem>
                      <MenuItem value="price-high">Giá cao đến thấp</MenuItem>
                      <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                    </Select>
                  </FormControl>

                  {/* View Mode */}
                  <Box sx={{ display: 'flex', border: '1px solid #ddd', borderRadius: 1 }}>
                    <IconButton
                      onClick={() => setViewMode('grid')}
                      sx={{ 
                        bgcolor: viewMode === 'grid' ? 'primary.main' : 'transparent',
                        color: viewMode === 'grid' ? 'white' : 'text.primary',
                        borderRadius: 0,
                        '&:first-of-type': { borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
                        '&:hover': { bgcolor: viewMode === 'grid' ? 'primary.dark' : 'grey.100' }
                      }}
                    >
                      <ViewModule />
                    </IconButton>
                    <IconButton
                      onClick={() => setViewMode('list')}
                      sx={{ 
                        bgcolor: viewMode === 'list' ? 'primary.main' : 'transparent',
                        color: viewMode === 'list' ? 'white' : 'text.primary',
                        borderRadius: 0,
                        '&:last-of-type': { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
                        '&:hover': { bgcolor: viewMode === 'list' ? 'primary.dark' : 'grey.100' }
                      }}
                    >
                      <ViewList />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Products Grid */}
            <Grid container spacing={3}>
              {(() => {
                const filteredProducts = products.filter((p) => {
                  const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
       
                    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
                    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
                  
                 
                  const matchesSale = !showOnlySale || p.isSale;
                  const matchesPrice = parsePrice(p.price) >= priceRange[0] && parsePrice(p.price) <= priceRange[1];
                  return matchesSearch && matchesCategory && matchesBrand && matchesSale && matchesPrice;
                });

                const sorted = [...filteredProducts].sort((a, b) => {
                  switch (sortBy) {
                    case 'newest':
                      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
                    case 'price-low':
                      return parsePrice(a.price) - parsePrice(b.price);
                    case 'price-high':
                      return parsePrice(b.price) - parsePrice(a.price) ;
                    case 'rating':
                      return b.rating - a.rating;
                    case 'popular':
                    default:
                      return Number(b.sold) - Number(a.sold);
                  }
                });

                const itemsPerPage = 9; // 3 cột x 3 hàng
                const start = (currentPage - 1) * itemsPerPage;
                const pageItems = sorted.slice(start, start + itemsPerPage);

                return pageItems.map((product) => (
                <Grid size={{xs:6, sm:6, md:3}} key={product.id}>
                  <Card
                    onClick={() => handleProductClick(product.id)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: 3,
                      overflow: 'hidden',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
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
                        image={product.image}
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
                        {product.isNew && (
                          <Chip
                            label="NEW"
                            size="small"
                            sx={{ 
                              bgcolor: '#2ecc71', 
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '0.7rem'
                            }}
                          />
                        )}
                        {product.isSale && (
                          <Chip
                            label={`-${product.discount}%`}
                            size="small"
                            sx={{ 
                              bgcolor: '#ff4757', 
                              color: 'white',
                              fontWeight: 'bold',
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
                            bgcolor: 'primary.main', 
                            color: 'white',
                            fontSize: '0.7rem',
                            height: '20px'
                          }}
                        />
                        <Chip 
                          label={product.category} 
                          variant="outlined" 
                          size="small"
                          sx={{ 
                            borderColor: 'grey.400', 
                            color: 'grey.600',
                            fontSize: '0.7rem',
                            height: '20px'
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
                          value={product.rating} 
                          precision={0.5} 
                          readOnly 
                          size="small"
                          sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' } }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          ({product.reviews})
                        </Typography>
                        <Chip 
                          label={`Đã bán ${product.sold}`} 
                          size="small" 
                          sx={{ 
                            bgcolor: '#e8f5e8', 
                            color: '#2e7d32',
                            fontSize: '0.7rem',
                            height: '20px'
                          }}
                        />
                      </Stack>

                      {/* Price */}
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Typography 
                          variant="h6" 
                          color="primary" 
                          sx={{ 
                            fontWeight: 'bold',
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            color: '#ff6b35'
                          }}
                        >
                          {formatPrice(product.price)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ 
                            textDecoration: 'line-through',
                            fontSize: { xs: '0.8rem', sm: '0.9rem' }
                          }}
                        >
                          {formatPrice(product.originalPrice)}
                        </Typography>
                      </Stack>

                      {/* Action Button */}
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCart />}
                        
                        
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart logic
                        
                          navigate('/cart')
                        }}
                        sx={{
                          bgcolor: '#667eea',
                          '&:hover': { bgcolor: '#5a6fd8' },
                          borderRadius: 2,
                          py: 1,
                          fontSize: '0.9rem',
                          fontWeight: 600
                        }}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                ));
              })()}
            </Grid>

            {/* Pagination */}
            {(() => {
              const totalFiltered = products.filter((p) => {
                const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
                const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
                const matchesSale = !showOnlySale || p.isSale;
                const matchesPrice = parsePrice(p.price) >= priceRange[0] && parsePrice(p.price) <= priceRange[1];
                return matchesSearch && matchesCategory && matchesBrand && matchesSale && matchesPrice;
              }).length;
              const itemsPerPage = 9;
              const totalPages = Math.max(1, Math.ceil(totalFiltered / itemsPerPage));
              const safePage = Math.min(currentPage, totalPages);
              if (safePage !== currentPage) setCurrentPage(safePage);
              return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                    color="primary"
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
    </Box>
  );
};

export default Products;