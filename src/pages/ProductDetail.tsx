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
// import asusRog from '../assets/asusRog.webp'
// import asusrogswift from '../assets/asusrogswift.webp';
// import dell from '../assets/dell.webp'
// import ipad from '../assets/ipad-air-11-wifi-1.webp';

const ProductDetail = () => {
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

  // Related products (you can implement this based on category or other criteria)
  // const relatedProducts = [
  //   {
  //     id: 1,
  //     name: 'Laptop Gaming Asus ROG Strix G15',
  //     price: '24.990.000₫',
  //     image: asusRog,
  //     rating: 4.6
  //   },
  //   {
  //     id: 2,
  //     name: 'Laptop Gaming Lenovo Legion 5',
  //     price: '21.990.000₫',
  //     image: asusrogswift,
  //     rating: 4.4
  //   },
  //   {
  //     id: 3,
  //     name: 'Laptop Gaming Dell G15',
  //     price: '23.990.000₫',
  //     image: dell,
  //     rating: 4.5
  //   },
  //   {
  //     id: 4,
  //     name: 'iPad Pro 1212',
  //     price: '19.990.000000',
  //     image: ipad,
  //     rating: 4.5
  //   }
  // ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      py: 2,
      width: '100%'
    }}>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link 
            color="inherit" 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            sx={{ cursor: 'pointer', '&:hover': { color: '#d4af37' }, color: '#64748b' }}
          >
            Trang chủ
          </Link>
          <Link 
            color="inherit" 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/products'); }}
            sx={{ cursor: 'pointer', '&:hover': { color: '#d4af37' }, color: '#64748b' }}
          >
            Sản phẩm
          </Link>
          <Typography sx={{ color: '#0f172a', fontWeight: 600 }}>{productCategory}</Typography>
        </Breadcrumbs>

        {/* Main Product Section */}
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            background: 'white',
            border: '1px solid rgba(212, 175, 55, 0.1)',
            mb: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
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
                      bgcolor: '#c41e3a',
                      color: 'white',
                      boxShadow: '0 4px 15px rgba(196, 30, 58, 0.4)'
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
                      objectFit: 'contain',
                      borderRadius: 2,
                      cursor: 'pointer',
                      opacity: selectedImage === index ? 1 : 0.6,
                      border: selectedImage === index ? '3px solid #d4af37' : '2px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        opacity: 1, 
                        transform: 'scale(1.05)',
                        borderColor: '#d4af37'
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
                    sx={{ fontWeight: 'bold', bgcolor: '#d4af37', color: '#1a1a1a' }}
                  />
                )}
                {productCategory && (
                  <Chip 
                    label={productCategory} 
                    variant="outlined" 
                    size="small"
                    sx={{ borderColor: '#d4af37', color: '#d4af37' }}
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
                  value={ratingValue} 
                  precision={0.5} 
                  readOnly 
                  size="large"
                  sx={{ '& .MuiRating-iconFilled': { color: '#d4af37' } }}
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
                    sx={{ bgcolor: '#e8f5e8', color: '#2e7d32' }}
                  />
                )}
              </Stack>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '2rem', sm: '2.5rem' },
                    color: '#d4af37'
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
                        sx={{ fontWeight: 'bold', bgcolor: '#c41e3a', color: 'white' }}
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
                    <Typography variant="h6" sx={{ color: '#d4af37', fontWeight: 'bold' }}>
                      {product.stock}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      Còn hàng
                    </Typography>
                  </Box>
                )}
                {product.warranty && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#d4af37', fontWeight: 'bold' }}>
                      {product.warranty}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      Bảo hành
                    </Typography>
                  </Box>
                )}
                {product.returnPolicy && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#d4af37', fontWeight: 'bold' }}>
                      {product.returnPolicy}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
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
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#d4af37', bgcolor: 'rgba(212, 175, 55, 0.05)' }
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
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#d4af37', bgcolor: 'rgba(212, 175, 55, 0.05)' }
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
                    bgcolor: '#d4af37',
                    color: '#1a1a1a',
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                    '&:hover': {
                      bgcolor: '#c41e3a',
                      color: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(196, 30, 58, 0.4)'
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
                    borderColor: '#d4af37',
                    color: '#d4af37',
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#c41e3a',
                      color: '#c41e3a',
                      bgcolor: 'rgba(196, 30, 58, 0.05)',
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
                  <LocalShipping sx={{ color: '#d4af37', fontSize: 32 }} />
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: 500, color: '#0f172a' }}>
                    Giao hàng miễn phí
                  </Typography>
                </Stack>
                <Stack alignItems="center" spacing={1}>
                  <Security sx={{ color: '#d4af37', fontSize: 32 }} />
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: 500, color: '#0f172a' }}>
                    Bảo hành chính hãng
                  </Typography>
                </Stack>
                <Stack alignItems="center" spacing={1}>
                  <Update sx={{ color: '#d4af37', fontSize: 32 }} />
                  <Typography variant="body2" textAlign="center" sx={{ fontWeight: 500, color: '#0f172a' }}>
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
            borderRadius: 2,
            background: 'white',
            border: '1px solid rgba(212, 175, 55, 0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
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
                      minHeight: 60,
                      color: '#64748b',
                      '&.Mui-selected': {
                        color: '#d4af37'
                      }
                    },
                    '& .MuiTabs-indicator': {
                      bgcolor: '#d4af37'
                    }
                  }}
                >
                  <Tab label="Mô tả sản phẩm" value="1" />
                  <Tab label="Thông số kỹ thuật" value="2" />
                  <Tab label={`Đánh giá (${reviewsCount})`} value="3" />
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

      </Box>
    </Box>
  );
};

export default ProductDetail;
