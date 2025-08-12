import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  CardMedia,
  Button,
  IconButton,
  Stack,
  Divider,
  TextField,
  Chip,
  Grid,
  Tooltip,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  Favorite,
  ShoppingCart,
  LocalShipping,
  Security,
  Update,
  KeyboardArrowRight,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Laptop Gaming MSI GF63 Thin 10SC-066VN',
      price: 19990000,
      originalPrice: 22990000,
      discount: 15,
      quantity: 1,
      image: 'https://via.placeholder.com/150x100',
      brand: 'MSI',
      category: 'Laptop Gaming',
      stock: 12,
      isWishlisted: false
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max 256GB',
      price: 27990000,
      originalPrice: 29990000,
      discount: 10,
      quantity: 2,
      image: 'https://via.placeholder.com/150x100',
      brand: 'Apple',
      category: 'Điện thoại',
      stock: 25,
      isWishlisted: true
    },
    {
      id: 3,
      name: 'Tai nghe Sony WH-1000XM5',
      price: 6990000,
      originalPrice: 8990000,
      discount: 20,
      quantity: 1,
      image: 'https://via.placeholder.com/150x100',
      brand: 'Sony',
      category: 'Âm thanh',
      stock: 8,
      isWishlisted: false
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [showCouponAlert, setShowCouponAlert] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleQuantityChange = (itemId: number, change: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, Math.min(item.quantity + change, item.stock));
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleToggleWishlist = (itemId: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, isWishlisted: !item.isWishlisted };
      }
      return item;
    }));
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'flashsale') {
      setCouponDiscount(500000); // 500k discount
      setShowCouponAlert(true);
    } else if (couponCode.toLowerCase() === 'newuser') {
      setCouponDiscount(200000); // 200k discount
      setShowCouponAlert(true);
    } else {
      setCouponDiscount(0);
      setShowCouponAlert(true);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalDiscount = () => {
    const itemDiscounts = cartItems.reduce((total, item) => {
      return total + ((item.originalPrice - item.price) * item.quantity);
    }, 0);
    return itemDiscounts + couponDiscount;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 2000000 ? 0 : 50000; // Free shipping for orders >= 2M
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() - couponDiscount;
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 8,
        width: '100%'
      }}>
        <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 8,
              borderRadius: 4,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              textAlign: 'center'
            }}
          >
            <ShoppingCart sx={{ fontSize: 80, color: 'grey.400', mb: 3 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              Giỏ hàng trống
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
              sx={{
                bgcolor: '#667eea',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 3,
                '&:hover': { bgcolor: '#5a6fd8' }
              }}
            >
              Mua sắm ngay
            </Button>
          </Paper>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 3,
      width: '100%'
    }}>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            Quay lại
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#2c3e50' }}>
            Giỏ hàng của bạn
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            {cartItems.length} sản phẩm trong giỏ hàng
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid size={{xs:12, lg:8}}>
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Sản phẩm ({cartItems.length})
                </Typography>
              </Box>
              
              {cartItems.map((item, index) => (
                <Box key={item.id}>
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      {/* Product Image */}
                      <Grid size={{xs:12, sm:3}}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ 
                            borderRadius: 2,
                            height: 100,
                            objectFit: 'cover'
                          }}
                        />
                      </Grid>

                      {/* Product Info */}
                      <Grid size={{xs:12, sm:4}}>
                        <Stack spacing={1}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Chip 
                              label={item.brand} 
                              size="small" 
                              sx={{ 
                                bgcolor: 'primary.main', 
                                color: 'white',
                                fontSize: '0.7rem'
                              }}
                            />
                            <Chip 
                              label={item.category} 
                              variant="outlined" 
                              size="small"
                              sx={{ 
                                borderColor: 'grey.400', 
                                color: 'grey.600',
                                fontSize: '0.7rem'
                              }}
                            />
                          </Stack>
                          <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Còn lại: {item.stock} sản phẩm
                          </Typography>
                        </Stack>
                      </Grid>

                      {/* Quantity Controls */}
                      <Grid size={{xs:12, sm:2}}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                            sx={{ 
                              border: '1px solid #ddd',
                              '&:hover': { borderColor: '#667eea' }
                            }}
                          >
                            <Remove />
                          </IconButton>
                          <Typography sx={{ minWidth: '40px', textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            disabled={item.quantity >= item.stock}
                            sx={{ 
                              border: '1px solid #ddd',
                              '&:hover': { borderColor: '#667eea' }
                            }}
                          >
                            <Add />
                          </IconButton>
                        </Stack>
                      </Grid>

                      {/* Price */}
                      <Grid size={{xs:12, sm:2}}>
                        <Stack spacing={1}>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                            {formatPrice(item.price)}
                          </Typography>
                          {item.originalPrice > item.price && (
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ textDecoration: 'line-through' }}
                            >
                              {formatPrice(item.originalPrice)}
                            </Typography>
                          )}
                          <Typography variant="body2" color="success.main" fontWeight="bold">
                            -{item.discount}%
                          </Typography>
                        </Stack>
                      </Grid>

                      {/* Actions */}
                      <Grid size={{xs:12, sm:1}}>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Thêm vào yêu thích">
                            <IconButton
                              size="small"
                              onClick={() => handleToggleWishlist(item.id)}
                              sx={{
                                color: item.isWishlisted ? '#e74c3c' : 'grey.600',
                                '&:hover': { color: '#e74c3c' }
                              }}
                            >
                              <Favorite />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa khỏi giỏ hàng">
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveItem(item.id)}
                              sx={{
                                color: '#e74c3c',
                                '&:hover': { bgcolor: 'rgba(231, 76, 60, 0.1)' }
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                  {index < cartItems.length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid size={{xs:12, lg:4}}>
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'sticky',
                top: 100
              }}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Tóm tắt đơn hàng
                </Typography>
              </Box>

              <Box sx={{ p: 3 }}>
                {/* Coupon Code */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Mã giảm giá
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      size="small"
                      placeholder="Nhập mã giảm giá"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleApplyCoupon}
                      sx={{ 
                        borderColor: '#667eea',
                        color: '#667eea',
                        '&:hover': { borderColor: '#5a6fd8' }
                      }}
                    >
                      Áp dụng
                    </Button>
                  </Stack>
                  {couponDiscount > 0 && (
                    <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                      ✓ Mã giảm giá đã được áp dụng: -{formatPrice(couponDiscount)}
                    </Typography>
                  )}
                </Box>

                {/* Price Breakdown */}
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Tạm tính:</Typography>
                    <Typography>{formatPrice(calculateSubtotal())}</Typography>
                  </Box>
                  
                  {calculateTotalDiscount() > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="success.main">Giảm giá:</Typography>
                      <Typography color="success.main">-{formatPrice(calculateTotalDiscount())}</Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Phí vận chuyển:</Typography>
                    <Typography>
                      {calculateShipping() === 0 ? (
                        <Chip label="Miễn phí" size="small" color="success" />
                      ) : (
                        formatPrice(calculateShipping())
                      )}
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Tổng cộng:
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                      {formatPrice(calculateTotal())}
                    </Typography>
                  </Box>
                </Stack>

                {/* Shipping Info */}
                <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <LocalShipping sx={{ color: '#4CAF50', fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight="bold">
                      Giao hàng miễn phí
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Cho đơn hàng từ 2 triệu đồng
                  </Typography>
                </Box>

                {/* Checkout Button */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  endIcon={<KeyboardArrowRight />}
                  sx={{
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
                  Tiến hành thanh toán
                </Button>

                {/* Security Info */}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Stack direction="row" justifyContent="center" spacing={2}>
                    <Stack alignItems="center" spacing={0.5}>
                      <Security sx={{ color: '#2196F3', fontSize: 20 }} />
                      <Typography variant="caption" color="text.secondary">
                        Bảo mật
                      </Typography>
                    </Stack>
                    <Stack alignItems="center" spacing={0.5}>
                      <Update sx={{ color: '#FF9800', fontSize: 20 }} />
                      <Typography variant="caption" color="text.secondary">
                        Đổi trả
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Coupon Alert */}
      <Snackbar
        open={showCouponAlert}
        autoHideDuration={3000}
        onClose={() => setShowCouponAlert(false)}
      >
        <Alert 
          onClose={() => setShowCouponAlert(false)} 
          severity={couponDiscount > 0 ? "success" : "error"}
          sx={{ width: '100%' }}
        >
          {couponDiscount > 0 
            ? `Mã giảm giá đã được áp dụng! Bạn được giảm ${formatPrice(couponDiscount)}`
            : 'Mã giảm giá không hợp lệ hoặc đã hết hạn'
          }
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
