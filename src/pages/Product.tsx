import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Laptop Gaming MSI GF63 Thin 10SC-066VN',
      price: 19990000,
      originalPrice: 22990000,
      discount: 15,
      rating: 4.5,
      reviews: 128,
      sold: 45,
      stock: 12,
      brand: 'MSI',
      category: 'Laptop Gaming',
      image: 'https://via.placeholder.com/300x200',
      label: 'Best Seller',
      isNew: false,
      isSale: true
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max 256GB',
      price: 27990000,
      originalPrice: 29990000,
      discount: 10,
      rating: 5,
      reviews: 256,
      sold: 89,
      stock: 25,
      brand: 'Apple',
      category: 'Điện thoại',
      image: 'https://via.placeholder.com/300x200',
      label: 'New',
      isNew: true,
      isSale: true
    },
    {
      id: 3,
      name: 'Tai nghe Sony WH-1000XM5',
      price: 6990000,
      originalPrice: 8990000,
      discount: 20,
      rating: 4.8,
      reviews: 89,
      sold: 156,
      stock: 8,
      brand: 'Sony',
      category: 'Âm thanh',
      image: 'https://via.placeholder.com/300x200',
      label: 'Hot',
      isNew: false,
      isSale: true
    },
    {
      id: 4,
      name: 'PC Gaming RTX 4070 Intel i7',
      price: 35990000,
      originalPrice: 39990000,
      discount: 12,
      rating: 4.7,
      reviews: 64,
      sold: 23,
      stock: 5,
      brand: 'Custom',
      category: 'PC Gaming',
      image: 'https://via.placeholder.com/300x200',
      label: 'Premium',
      isNew: false,
      isSale: true
    },
    {
      id: 5,
      name: 'Samsung Galaxy S24 Ultra 512GB',
      price: 25990000,
      originalPrice: 31990000,
      discount: 30,
      rating: 4.9,
      reviews: 45,
      sold: 67,
      stock: 15,
      brand: 'Samsung',
      category: 'Điện thoại',
      image: 'https://via.placeholder.com/300x200',
      label: 'Flash Sale',
      isNew: false,
      isSale: true
    },
    {
      id: 6,
      name: 'MacBook Air M3 13-inch 256GB',
      price: 27990000,
      originalPrice: 32990000,
      discount: 25,
      rating: 4.8,
      reviews: 67,
      sold: 34,
      stock: 18,
      brand: 'Apple',
      category: 'Laptop',
      image: 'https://via.placeholder.com/300x200',
      label: 'New',
      isNew: true,
      isSale: true
    },
    {
      id: 7,
      name: 'iPad Pro M2 12.9-inch 128GB',
      price: 19990000,
      originalPrice: 24990000,
      discount: 28,
      rating: 4.7,
      reviews: 34,
      sold: 78,
      stock: 22,
      brand: 'Apple',
      category: 'Máy tính bảng',
      image: 'https://via.placeholder.com/300x200',
      label: 'Hot',
      isNew: false,
      isSale: true
    },
    {
      id: 8,
      name: 'Asus ROG Phone 7 256GB',
      price: 18990000,
      originalPrice: 23990000,
      discount: 35,
      rating: 4.6,
      reviews: 29,
      sold: 45,
      stock: 12,
      brand: 'Asus',
      category: 'Điện thoại',
      image: 'https://via.placeholder.com/300x200',
      label: 'Flash Sale',
      isNew: false,
      isSale: true
    }
  ];

  const categories = ['Laptop Gaming', 'Điện thoại', 'Âm thanh', 'PC Gaming', 'Laptop', 'Máy tính bảng'];
  const brands = ['MSI', 'Apple', 'Sony', 'Custom', 'Samsung', 'Asus'];

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
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
          <Typography color="text.primary">Sản phẩm</Typography>
        </Breadcrumbs>

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
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(45deg, #fff 30%, #667eea 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Khám Phá Sản Phẩm
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Hàng nghìn sản phẩm công nghệ chính hãng với giá tốt nhất thị trường
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
                  {products.length} sản phẩm
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
                  const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
                  return matchesSearch && matchesCategory && matchesBrand && matchesSale && matchesPrice;
                });

                const sorted = [...filteredProducts].sort((a, b) => {
                  switch (sortBy) {
                    case 'newest':
                      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
                    case 'price-low':
                      return a.price - b.price;
                    case 'price-high':
                      return b.price - a.price;
                    case 'rating':
                      return b.rating - a.rating;
                    case 'popular':
                    default:
                      return b.sold - a.sold;
                  }
                });

                const itemsPerPage = 9; // 3 cột x 3 hàng
                const start = (currentPage - 1) * itemsPerPage;
                const pageItems = sorted.slice(start, start + itemsPerPage);

                return pageItems.map((product) => (
                <Grid size={{xs:12, sm:6, md:4}} key={product.id}>
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
                        height={viewMode === 'grid' ? 200 : 150}
                        image={product.image}
                        alt={product.name}
                        sx={{ 
                          objectFit: 'cover',
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
                        <Tooltip title="Thêm vào giỏ hàng">
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.9)',
                              '&:hover': { bgcolor: 'white' },
                              color: 'grey.600'
                            }}
                          >
                            <ShoppingCart />
                          </IconButton>
                        </Tooltip>
                      </Stack>

                      {/* Stock Status */}
                      {product.stock <= 5 && (
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
                const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
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