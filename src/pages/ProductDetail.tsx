import { useState, useEffect, type ReactNode } from 'react';
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
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { useCart } from '../contexts/CartContext';
import productApi, { type ProductItem } from '../api/admin/productApi';

const ProductDetail = () => {
  const palette = {
    wine900: '#1a0f14',
    wine800: '#241018',
    wine700: '#341420',
    cream: '#fbf6f0',
    ink: '#24161a',
    muted: '#6b5a61',
    gold: '#c7a24a',
  } as const;

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [value, setValue] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  type ProductDetailModel = ProductItem & {
    reviews?: number;
    sold?: number;
    warranty?: string;
    returnPolicy?: string;
    specifications?: Array<{
      icon?: ReactNode;
      label: string;
      value: string;
    }>;
  };
  const locationState = location.state as { product?: ProductDetailModel } | null;
  const [product, setProduct] = useState<ProductDetailModel | null>(locationState?.product ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    // Nếu đã có dữ liệu sản phẩm từ Home (location.state) thì không cần gọi API nữa
    if (locationState?.product) {
      setProduct(locationState.product);
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      if (!id) return;
      const productId = parseInt(id, 10);
      try {
        setLoading(true);
        setError(null);
        const response = await productApi.getById(productId);
        setProduct(response.result);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, locationState]);

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

  const formatCurrency = (value: number) =>
    value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

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
        <Typography variant="h5">{error ?? 'Không tìm thấy sản phẩm'}</Typography>
      </Box>
    );
  }

  const productImages = product.imageUrl
    ? [product.imageUrl]
    : [
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400',
        'https://via.placeholder.com/600x400'
      ];

  const ratingValue = product.rating ?? 0;
  const reviewsCount = product.reviews ?? 0;
  // price là giá gốc, discount là giá bán
  const originalPrice = product.price ?? 0;
  const salePrice = product.discount ?? originalPrice; // Nếu không có discount thì lấy giá gốc
  const isSale = salePrice < originalPrice;
  const productCategory = product.categoryName ?? 'Sản phẩm';

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `radial-gradient(1000px 450px at 20% 0%, rgba(199,162,74,0.10) 0%, rgba(199,162,74,0) 60%), ${palette.cream}`,
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
          <Typography color="text.primary">{productCategory}</Typography>
        </Breadcrumbs>

        {/* Main Product Section */}
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.6)',
            mb: 4
          }}
        >
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={0}>
            {/* Product Images */}
            <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.9)' }}>
              <Box sx={{ position: 'relative', mb: 3 }}>
                <Box
                  component="img"
                  src={productImages[selectedImage]}
                  alt="Product"
                  sx={{
                    width: '100%',
                    height: { xs: 300, sm: 400, md: 400 },
                    objectFit: 'contain',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}
                />
                {isSale && (
                  <Chip 
                    label="Giảm giá"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      height: '32px',
                      bgcolor: 'rgba(195,87,106,0.95)',
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(195,87,106,0.5)',
                      borderRadius: 999,
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
                        bgcolor: 'rgba(255,255,255,0.96)',
                        '&:hover': { bgcolor: 'white' },
                        color: isWishlisted ? '#e74c3c' : palette.muted
                      }}
                    >
                      <Favorite />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chia sẻ">
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.96)',
                        '&:hover': { bgcolor: 'white' }
                      }}
                    >
                      <Share />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="So sánh">
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.96)',
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
                      objectFit: 'contain',
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
                    size="small" 
                    sx={{ 
                      fontWeight: 700,
                      bgcolor: palette.wine900,
                      color: 'white',
                      borderRadius: 999,
                    }}
                  />
                )}
                {productCategory && (
                  <Chip 
                    label={productCategory} 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      borderColor: palette.gold, 
                      color: palette.gold,
                      borderRadius: 999,
                    }}
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
                  color: palette.ink,
                  mb: 3
                }}
              >
                {product.name}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Rating 
                  value={ratingValue} 
                  precision={0.5} 
                  readOnly 
                  size="large"
                  sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' } }}
                />
                <Typography variant="h6" color="text.secondary">
                  {ratingValue}/5
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ({reviewsCount} đánh giá)
                </Typography>
                {product.sold && (
                  <Chip 
                    label={`Đã bán ${product.sold}`} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(199,162,74,0.14)', 
                      color: palette.gold,
                      borderRadius: 999,
                      fontWeight: 700,
                    }}
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
                    color: palette.wine900
                  }}
                >
                  {formatCurrency(salePrice)}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {isSale && (
                    <>
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ 
                          textDecoration: 'line-through',
                          fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}
                      >
                        {formatCurrency(originalPrice)}
                      </Typography>
                      <Chip 
                        label={`Tiết kiệm ${formatCurrency(originalPrice - salePrice)}`} 
                        size="medium"
                        sx={{ 
                          fontWeight: 'bold',
                          bgcolor: 'rgba(195,87,106,0.08)',
                          color: palette.rose,
                          borderRadius: 999,
                        }}
                      />
                    </>
                  )}
                </Stack>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Stock & Warranty Info */}
              <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                {product.stock !== undefined && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: palette.wine900, fontWeight: 700 }}>
                      {product.stock}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Còn hàng
                    </Typography>
                  </Box>
                )}
                {product.warranty && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: palette.gold, fontWeight: 700 }}>
                      {product.warranty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bảo hành
                    </Typography>
                  </Box>
                )}
                {product.returnPolicy && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: palette.rose, fontWeight: 700 }}>
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
                      borderColor: 'rgba(26,15,20,0.12)',
                      '&:hover': { borderColor: palette.wine900 }
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
                        height: '48px',
                        '& fieldset': { borderColor: 'rgba(26,15,20,0.12)' },
                        '&:hover fieldset': { borderColor: palette.wine900 },
                        '&.Mui-focused fieldset': { borderColor: palette.wine900 },
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => handleQuantityChange(1)}
                    sx={{ 
                      minWidth: '48px', 
                      height: '48px',
                      borderRadius: 2,
                      borderColor: 'rgba(26,15,20,0.12)',
                      '&:hover': { borderColor: palette.wine900 }
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
                  onClick={async () => {
                    if (product) {
                      try {
                        await addToCart(product, quantity);
                        setShowAdded(true);
                      } catch (error) {
                        console.error('Error adding to cart:', error);
                        // Vẫn hiển thị thông báo thành công vì đã có optimistic update
                        setShowAdded(true);
                      }
                    }
                  }}
                  sx={{
                    
                    flex: 1,
                    bgcolor: palette.wine900,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    boxShadow: '0 8px 25px rgba(26, 15, 20, 0.3)',
                    '&:hover': {
                      bgcolor: '#120a0e',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(26, 15, 20, 0.35)'
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
                    borderColor: palette.wine900,
                    color: palette.wine900,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: palette.wine900,
                      bgcolor: 'rgba(26, 15, 20, 0.04)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => navigate(`/checkout`)}
                >
                  Mua ngay
                </Button>
              </Stack>

              <Snackbar 
                open={showAdded} 
                autoHideDuration={2500} 
                onClose={() => setShowAdded(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Alert onClose={() => setShowAdded(false)} severity="success" sx={{ width: '100%' }}>
                  Thêm sản phẩm thành công
                </Alert>
              </Snackbar>

              {/* Features */}
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                <Stack alignItems="center" spacing={1}>
                  <LocalShipping sx={{ color: palette.gold, fontSize: 32 }} />
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: 500 }}>
                    Giao hàng miễn phí
                  </Typography>
                </Stack>
                <Stack alignItems="center" spacing={1}>
                  <Security sx={{ color: palette.wine900, fontSize: 32 }} />
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: 500 }}>
                    Bảo hành chính hãng
                  </Typography>
                </Stack>
                <Stack alignItems="center" spacing={1}>
                  <Update sx={{ color: palette.rose, fontSize: 32 }} />
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
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.6)'
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
                  <Tab label={`Đánh giá (${reviewsCount})`} value="3" />
                </TabList>
              </Box>
              
              <TabPanel value="1" sx={{ p: 0 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.05rem', color: palette.ink }}>
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
                          bgcolor: 'rgba(251,246,240,0.7)',
                          border: `1px solid ${palette.borderSoft ?? 'rgba(26,15,20,0.08)'}`,
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
      </Box>
    </Box>
  );
};

export default ProductDetail;
