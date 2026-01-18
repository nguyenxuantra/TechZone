import { useState, useEffect } from 'react';
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
  Snackbar,
  CircularProgress
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  LocalShipping,
  Security,
  Update,
  KeyboardArrowRight,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, loadCartFromApi } = useCart();
  const [loading, setLoading] = useState(true);

  const [couponCode, setCouponCode] = useState('');
  const [showCouponAlert, setShowCouponAlert] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Load cart from API when component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        await loadCartFromApi();
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy một lần khi component mount

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleQuantityChange = async (productId: number, change: number) => {
    const current = cartItems.find(ci => ci.product.id === productId);
    if (!current) return;
    const newQty = Math.max(1, current.quantity + change);
    await updateQuantity(productId, newQty);
  };

  const handleRemoveItem = async (cartItemId: number) => {
    if (cartItemId) {
      await removeFromCart(cartItemId);
    }
  };

  // Wishlist toggle is not tracked in cart context; omitted for simplicity

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

  const parsePrice = (priceStr: string) => parseFloat(priceStr.replace(/[^\d]/g, '')) || 0;
  const calculateSubtotal = () => {
    // Tính tổng giá bán (price là giá bán)
    return cartItems.reduce((total, item) => total + (parsePrice(item.product.price) * item.quantity), 0);
  };

  const calculateProductDiscount = () => {
    // Tính tổng giảm giá sản phẩm: (giá gốc - giá bán) * số lượng
    // Chỉ để hiển thị thông tin, không dùng trong tính toán tổng
    return cartItems.reduce((total, item) => {
      const original = parsePrice(item.product.originalPrice || '0');
      const sale = parsePrice(item.product.price);
      if (original > sale) {
        return total + ((original - sale) * item.quantity);
      }
      return total;
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 2000000 ? 0 : 50000; // Free shipping for orders >= 2M
  };

  const calculateTotal = () => {
    // Tổng cộng = Tạm tính (giá bán đã giảm) + Phí vận chuyển - Mã giảm giá (nếu có)
    // KHÔNG trừ khuyến mãi sản phẩm vì giá bán đã là giá sau khi giảm rồi
    return calculateSubtotal() + calculateShipping() - couponDiscount;
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        py: 8,
        width: '100%'
      }}>
        <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 8,
              borderRadius: 2,
              background: 'white',
              border: '1px solid rgba(212, 175, 55, 0.1)',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <ShoppingCart sx={{ fontSize: 80, color: '#d4af37', mb: 3 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 2, color: '#0f172a' }}>
              Giỏ hàng trống
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: '#64748b' }}>
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
              sx={{
                bgcolor: '#d4af37',
                color: '#1a1a1a',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 2,
                '&:hover': { bgcolor: '#c41e3a', color: 'white' }
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
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      py: 3,
      width: '100%'
    }}>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2, color: '#64748b', '&:hover': { color: '#d4af37' } }}
          >
            Quay lại
          </Button>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Giỏ hàng của bạn
          </Typography>
          
        </Box>

        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid size={{xs:12, lg:8}}>
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 2,
                background: 'white',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Sản phẩm ({cartItems.length})
                </Typography>
              </Box>
              
              { cartItems.map((item, index) => {
                // Safety check - skip items without proper structure
                if (!item || !item.product) {
                  console.warn('Invalid cart item found:', item);
                  return null;
                }
                return (
                <Box key={item.product.id}>
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      {/* Product Image */}
                      <Grid size={{xs:12, sm:3}}>
                        <CardMedia
                          component="img"
                          image={item.product.image}
                          alt={item.product.name}
                          onClick={() => navigate(`/products/${item.product.id}`)}
                          sx={{ 
                            borderRadius: 2,
                            width:'50%',
                            height: 'auto',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                      </Grid>

                      {/* Product Info */}
                      <Grid size={{xs:12, sm:4}}>
                        <Stack spacing={1}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Chip 
                              label={item.product.brand} 
                              size="small" 
                              sx={{ 
                                bgcolor: '#d4af37', 
                                color: '#1a1a1a',
                                fontSize: '0.7rem',
                                fontWeight: 600
                              }}
                            />
                            <Chip 
                              label={item.product.category} 
                              variant="outlined" 
                              size="small"
                              sx={{ 
                                borderColor: 'grey.400', 
                                color: 'grey.600',
                                fontSize: '0.7rem'
                              }}
                            />
                          </Stack>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              lineHeight: 1.3,
                              cursor: 'pointer',
                              '&:hover': {
                                color: '#d4af37',
                                textDecoration: 'underline'
                              }
                            }}
                            onClick={() => navigate(`/products/${item.product.id}`)}
                          >
                            {item.product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Còn lại: {item.product.stock ?? 0} sản phẩm
                          </Typography>
                        </Stack>
                      </Grid>

                      {/* Quantity Controls */}
                      <Grid size={{xs:12, sm:2}}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.product.id, -1)}
                            disabled={item.quantity <= 1}
                            sx={{ 
                              border: '1px solid #e2e8f0',
                              '&:hover': { borderColor: '#d4af37', bgcolor: 'rgba(212, 175, 55, 0.05)' }
                            }}
                          >
                            <Remove />
                          </IconButton>
                          <Typography sx={{ minWidth: '40px', textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.product.id, 1)}
                            disabled={(item.product.stock ?? Infinity) !== Infinity && item.quantity >= (item.product.stock ?? 0)}
                            sx={{ 
                              border: '1px solid #e2e8f0',
                              '&:hover': { borderColor: '#d4af37', bgcolor: 'rgba(212, 175, 55, 0.05)' }
                            }}
                          >
                            <Add />
                          </IconButton>
                        </Stack>
                      </Grid>

                      {/* Price */}
                      <Grid size={{xs:12, sm:2}}>
                        <Stack spacing={1}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d4af37' }}>
                            {formatPrice(parsePrice(item.product.price))}
                          </Typography>
                          {item.product.originalPrice && parsePrice(item.product.originalPrice) > parsePrice(item.product.price) && (
                            <>
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ textDecoration: 'line-through' }}
                              >
                                {formatPrice(parsePrice(item.product.originalPrice))}
                              </Typography>
                              <Typography variant="body2" color="success.main" fontWeight="bold">
                                Tiết kiệm: {formatPrice((parsePrice(item.product.originalPrice) - parsePrice(item.product.price)) * item.quantity)}
                              </Typography>
                            </>
                          )}
                        </Stack>
                      </Grid>

                      {/* Actions */}
                      <Grid size={{xs:12, sm:1}}>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Xóa khỏi giỏ hàng">
                            <IconButton
                              size="small"
                              onClick={() => {
                                if (item.cartItemId) {
                                  handleRemoveItem(item.cartItemId);
                                }
                              }}
                              disabled={!item.cartItemId}
                              sx={{
                                color: '#c41e3a',
                                '&:hover': { bgcolor: 'rgba(196, 30, 58, 0.1)' },
                                '&:disabled': { opacity: 0.5 }
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
                );
              })}
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid size={{xs:12, lg:4}}>
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: 2,
                background: 'white',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                position: 'sticky',
                top: 100,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
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
                        borderColor: '#d4af37',
                        color: '#d4af37',
                        '&:hover': { borderColor: '#c41e3a', color: '#c41e3a', bgcolor: 'rgba(196, 30, 58, 0.05)' }
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
                    <Typography>Tạm tính (giá bán):</Typography>
                    <Typography>{formatPrice(calculateSubtotal())}</Typography>
                  </Box>
                  
                  {calculateProductDiscount() > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="text.secondary" variant="body2">Đã tiết kiệm:</Typography>
                      <Typography color="success.main" variant="body2" fontWeight="bold">
                        -{formatPrice(calculateProductDiscount())}
                      </Typography>
                    </Box>
                  )}
                  
                  {couponDiscount > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography color="success.main">Mã giảm giá:</Typography>
                      <Typography color="success.main">-{formatPrice(couponDiscount)}</Typography>
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
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#d4af37' }}>
                      {formatPrice(calculateTotal())}
                    </Typography>
                  </Box>
                </Stack>

                {/* Shipping Info */}
                <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <LocalShipping sx={{ color: '#d4af37', fontSize: 20 }} />
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#0f172a' }}>
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
