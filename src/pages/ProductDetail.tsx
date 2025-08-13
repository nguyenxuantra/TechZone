import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Rating,
  Chip,
  Divider,
  Tab,
  Stack,
  TextField,
  Breadcrumbs,
  Link,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  ShoppingCart,
  LocalShipping,
  Security,
  Update,
  Add,
  Remove,
  Favorite,
  Share,
  Compare,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import type { Product } from '../data/products';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const productId = parseInt(id);
      const foundProduct = getProductById(productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Redirect to products page if product not found
        navigate('/products');
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant="h5">Đang tải...</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant="h5">Không tìm thấy sản phẩm</Typography>
      </Box>
    );
  }

  // Use product images if available, otherwise use placeholder
  const productImages = product.images || [
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/600x400'
  ];

  // Related products (you can implement this based on category or other criteria)
  const relatedProducts = [
    {
      id: 1,
      name: 'Laptop Gaming Asus ROG Strix G15',
      price: '24.990.000₫',
      image: 'https://via.placeholder.com/200x150',
      rating: 4.6
    },
    {
      id: 2,
      name: 'Laptop Gaming Lenovo Legion 5',
      price: '21.990.000₫',
      image: 'https://via.placeholder.com/200x150',
      rating: 4.4
    },
    {
      id: 3,
      name: 'Laptop Gaming Dell G15',
      price: '23.990.000₫',
      image: 'https://via.placeholder.com/200x150',
      rating: 4.5
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 2,
      width: '100%'
    }}>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
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
          <Typography color="text.primary">{product.category}</Typography>
        </Breadcrumbs>

        {/* Main Product Section */}
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            mb: 4
          }}
        >
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={0}>
            {/* Product Images */}
            <Box sx={{ p: 4, bgcolor: 'grey.50' }}>
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Box
                  component="img"
                  src={productImages[selectedImage]}
                  alt="Product"
                  sx={{
                    width: '100%',
                    height: { xs: 300, sm: 400, md: 400 },
                    objectFit: 'cover',
                    borderRadius: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}
                />
                {product.discount && (
                  <Chip 
                    label={`-${product.discount}%`}
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      height: '32px',
                      bgcolor: '#ff4757',
                      boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)'
                    }}
                  />
                )}
                <Stack 
                  direction="row" 
                  spacing={1} 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16 
                  }}
                >
                  <Tooltip title="Thêm vào yêu thích">
                    <IconButton
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' },
                        color: isWishlisted ? '#e74c3c' : 'grey.600'
                      }}
                    >
                      <Favorite />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chia sẻ">
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' }
                      }}
                    >
                      <Share />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="So sánh">
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.9)',
                        '&:hover': { bgcolor: 'white' }
                      }}
                    >
                      <Compare />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
              
              {/* Thumbnail Images */}
              <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
                {productImages.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: '100%',
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 2,
                      cursor: 'pointer',
                      opacity: selectedImage === index ? 1 : 0.6,
                      border: selectedImage === index ? '3px solid #667eea' : '2px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        opacity: 1, 
                        transform: 'scale(1.05)',
                        borderColor: '#667eea'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Product Info */}
            <Box sx={{ p: 4 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                {product.brand && (
                  <Chip 
                    label={product.brand} 
                    color="primary" 
                    size="small" 
                    sx={{ fontWeight: 'bold' }}
                  />
                )}
                {product.category && (
                  <Chip 
                    label={product.category} 
                    variant="outlined" 
                    size="small"
                    sx={{ borderColor: '#667eea', color: '#667eea' }}
                  />
                )}
              </Stack>

              <Typography 
                variant="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  lineHeight: 1.2,
                  color: '#2c3e50',
                  mb: 3
                }}
              >
                {product.name}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Rating 
                  value={product.rating} 
                  precision={0.5} 
                  readOnly 
                  size="large"
                  sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' } }}
                />
                <Typography variant="h6" color="text.secondary">
                  {product.rating}/5
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ({product.reviews} đánh giá)
                </Typography>
                {product.sold && (
                  <Chip 
                    label={`Đã bán ${product.sold}`} 
                    size="small" 
                    sx={{ bgcolor: '#e8f5e8', color: '#2e7d32' }}
                  />
                )}
              </Stack>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  color="primary"
                  fontWeight="bold"
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '2rem', sm: '2.5rem' },
                    color: '#ff6b35'
                  }}
                >
                  {product.price}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{ 
                      textDecoration: 'line-through',
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}
                  >
                    {product.originalPrice}
                  </Typography>
                  {product.discount && (
                    <Chip 
                      label={`Tiết kiệm ${product.discount}%`} 
                      color="success" 
                      size="medium"
                      sx={{ fontWeight: 'bold' }}
                    />
                  )}
                </Stack>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Stock & Warranty Info */}
              <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                {product.stock !== undefined && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="success.main" fontWeight="bold">
                      {product.stock}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Còn hàng
                    </Typography>
                  </Box>
                )}
                {product.warranty && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      {product.warranty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bảo hành
                    </Typography>
                  </Box>
                )}
                {product.returnPolicy && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="info.main" fontWeight="bold">
                      {product.returnPolicy}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Đổi trả
                    </Typography>
                  </Box>
                )}
              </Stack>

              {/* Quantity */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Số lượng
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={() => handleQuantityChange(-1)}
                    sx={{ 
                      minWidth: '48px', 
                      height: '48px',
                      borderRadius: 2,
                      borderColor: '#ddd',
                      '&:hover': { borderColor: '#667eea' }
                    }}
                  >
                    <Remove />
                  </Button>
                  <TextField
                    value={quantity}
                    inputProps={{ 
                      style: { 
                        textAlign: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                      } 
                    }}
                    sx={{ 
                      width: '100px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        height: '48px'
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => handleQuantityChange(1)}
                    sx={{ 
                      minWidth: '48px', 
                      height: '48px',
                      borderRadius: 2,
                      borderColor: '#ddd',
                      '&:hover': { borderColor: '#667eea' }
                    }}
                  >
                    <Add />
                  </Button>
                </Stack>
              </Box>

              {/* Action Buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  sx={{
                    flex: 1,
                    bgcolor: '#667eea',
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      bgcolor: '#5a6fd8',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    flex: 1,
                    borderColor: '#667eea',
                    color: '#667eea',
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#5a6fd8',
                      bgcolor: 'rgba(102, 126, 234, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Mua ngay
                </Button>
              </Stack>

              {/* Features */}
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                <Stack alignItems="center" spacing={1}>
                  <LocalShipping sx={{ color: '#4CAF50', fontSize: 32 }} />
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: 500 }}>
                    Giao hàng miễn phí
                  </Typography>
                </Stack>
                <Stack alignItems="center" spacing={1}>
                  <Security sx={{ color: '#2196F3', fontSize: 32 }} />
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: 500 }}>
                    Bảo hành chính hãng
                  </Typography>
                </Stack>
                <Stack alignItems="center" spacing={1}>
                  <Update sx={{ color: '#FF9800', fontSize: 32 }} />
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: 500 }}>
                    7 ngày đổi trả
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Product Details Tabs */}
        <Paper 
          elevation={0}
          sx={{ 
            mb: 4,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <Box sx={{ p: 4 }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <TabList 
                  onChange={handleTabChange}
                  sx={{
                    '& .MuiTab-root': {
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      minHeight: 60
                    }
                  }}
                >
                  <Tab label="Mô tả sản phẩm" value="1" />
                  <Tab label="Thông số kỹ thuật" value="2" />
                  <Tab label={`Đánh giá (${product.reviews})`} value="3" />
                </TabList>
              </Box>
              
              <TabPanel value="1" sx={{ p: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                  {product.description || 'Không có mô tả cho sản phẩm này.'}
                </Typography>
              </TabPanel>
              
              <TabPanel value="2" sx={{ p: 0 }}>
                {product.specifications && product.specifications.length > 0 ? (
                  <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }} gap={3}>
                    {product.specifications.map((spec, index) => (
                      <Box 
                        key={index}
                        sx={{ 
                          p: 3, 
                          borderRadius: 2, 
                          bgcolor: 'grey.50',
                          border: '1px solid rgba(0,0,0,0.05)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'white',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                          <Typography variant="h4">{spec.icon}</Typography>
                          <Typography variant="subtitle1" fontWeight="bold" color="primary">
                            {spec.label}
                          </Typography>
                        </Stack>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {spec.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Không có thông số kỹ thuật cho sản phẩm này.
                  </Typography>
                )}
              </TabPanel>
              
              <TabPanel value="3" sx={{ p: 0 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                    Đánh giá từ khách hàng
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên đánh giá!
                  </Typography>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Paper>

        {/* Related Products */}
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, mb: 4 }}>
              Sản phẩm liên quan
            </Typography>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={3}>
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  onClick={() => navigate(`/products/${relatedProduct.id}`)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderRadius: 3,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height={150}
                    image={relatedProduct.image}
                    alt={relatedProduct.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                      {relatedProduct.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                      <Rating value={relatedProduct.rating} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        ({relatedProduct.rating})
                      </Typography>
                    </Stack>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      {relatedProduct.price}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProductDetail;
