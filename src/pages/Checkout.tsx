import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Stack,
  Divider,
  Chip,
  CardMedia,
  Alert,
  Checkbox,
  Container,
} from '@mui/material';
import {
  LocalShipping,
  Payment,
  CheckCircle,
  ArrowBack,
  CreditCard,
  AccountBalance,
  QrCode,
  LocalPhone,
  Email,
  LocationOn,
  Person,
  ShoppingBag
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import paymentApi from '../api/paymentApi';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const parsePrice = (priceStr: string) => parseFloat(priceStr.replace(/[^\d]/g, ''));
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (parsePrice(item.product.price) * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 2000000 ? 0 : 50000;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return shippingInfo.fullName && 
           shippingInfo.phone && 
           shippingInfo.address && 
           shippingInfo.city && 
           paymentMethod && 
           agreeToTerms;
  };

  const handlePlaceOrder = async () => {
  
    try {
      setLoading(true);
      setError(null);
      
      const totalAmount = calculateTotal();
      
      // Gọi API thanh toán VNPay
      const response = await paymentApi.createVnPayPayment(totalAmount, 'NCB');
      
      if (response.code === 200 && response.data?.paymentUrl) {
        // Redirect đến trang thanh toán VNPay
        window.location.href = response.data.paymentUrl;
      } else {
        setError('Không thể tạo liên kết thanh toán. Vui lòng thử lại!');
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại!');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
        <Container>
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
            <ShoppingBag sx={{ fontSize: 60, color: '#d4af37', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#0f172a' }}>
              Giỏ hàng trống
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/products')}
              sx={{
                bgcolor: '#d4af37',
                color: '#0f172a',
                fontWeight: 700,
                '&:hover': {
                  bgcolor: '#c41e3a',
                },
                px: 4,
                py: 1.5
              }}
            >
              Tiếp tục mua sắm
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      py: 4,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(196, 30, 58, 0.1) 0%, transparent 50%)
        `,
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/cart')}
            sx={{ 
              mb: 2, 
              color: '#d4af37',
              '&:hover': {
                bgcolor: 'rgba(212, 175, 55, 0.1)'
              }
            }}
          >
            Quay lại giỏ hàng
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#fff', mb: 1 }}>
            Thanh toán
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Hoàn tất đơn hàng của bạn
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Order Summary */}
          <Grid item xs={12} md={5}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                position: 'sticky',
                top: 100,
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShoppingBag sx={{ color: '#d4af37' }} />
                Đơn hàng của bạn
              </Typography>

              <Stack spacing={2} sx={{ mb: 3 }}>
                {cartItems.map((item) => (
                  <Box key={item.product.id} sx={{ display: 'flex', gap: 2, alignItems: 'center', pb: 2, borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
                    <CardMedia
                      component="img"
                      image={item.product.image}
                      alt={item.product.name}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: 2,
                        objectFit: 'cover',
                        border: '1px solid rgba(212, 175, 55, 0.2)'
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#0f172a', mb: 0.5 }}>
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Số lượng: {item.quantity}
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#d4af37', fontWeight: 700 }}>
                        {formatPrice(parsePrice(item.product.price) * item.quantity)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3, borderColor: 'rgba(212, 175, 55, 0.2)' }} />

              {/* Price Summary */}
              <Box>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      Tạm tính:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                      {formatPrice(calculateSubtotal())}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                      Phí vận chuyển:
                    </Typography>
                    {calculateShipping() === 0 ? (
                      <Chip label="Miễn phí" size="small" sx={{ bgcolor: '#d4af37', color: '#0f172a', fontWeight: 600 }} />
                    ) : (
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                        {formatPrice(calculateShipping())}
                      </Typography>
                    )}
                  </Box>
                  <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.2)' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                      Tổng cộng:
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#d4af37', fontWeight: 800 }}>
                      {formatPrice(calculateTotal())}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Shipping & Payment Form */}
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              {/* Shipping Information */}
    <Paper 
      elevation={0}
      sx={{ 
        p: 4,
        borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping sx={{ color: '#d4af37' }} />
        Thông tin giao hàng
      </Typography>

      <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Họ và tên"
            value={shippingInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: '#d4af37',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#d4af37',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#d4af37',
                        }
                      }}
            InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: '#d4af37', fontSize: 20 }} />
            }}
          />
        </Grid>
                  <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Số điện thoại"
            value={shippingInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: '#d4af37',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#d4af37',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#d4af37',
                        }
                      }}
            InputProps={{
                        startAdornment: <LocalPhone sx={{ mr: 1, color: '#d4af37', fontSize: 20 }} />
            }}
          />
        </Grid>
                  <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={shippingInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: '#d4af37',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#d4af37',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#d4af37',
                        }
                      }}
            InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: '#d4af37', fontSize: 20 }} />
            }}
          />
        </Grid>
                  <Grid item xs={12}>
          <TextField
            fullWidth
            label="Địa chỉ"
            value={shippingInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            required
            multiline
            rows={2}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: '#d4af37',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#d4af37',
                            borderWidth: 2,
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#d4af37',
                        }
                      }}
            InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: '#d4af37', fontSize: 20 }} />
            }}
          />
        </Grid>
                  <Grid item xs={12} sm={4}>
          {/* <FormControl fullWidth>
            <InputLabel>Tỉnh/Thành phố</InputLabel>
            <Select
              value={shippingInfo.city}
              label="Tỉnh/Thành phố"
              onChange={(e) => handleInputChange('city', e.target.value)}
              required
                        sx={{
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d4af37',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d4af37',
                            borderWidth: 2,
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#d4af37',
                          }
                        }}
            >
              <MenuItem value="hcm">TP. Hồ Chí Minh</MenuItem>
              <MenuItem value="hn">Hà Nội</MenuItem>
              <MenuItem value="dn">Đà Nẵng</MenuItem>
              <MenuItem value="ct">Cần Thơ</MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
                  <Grid item xs={12} sm={4}>
          {/* <FormControl fullWidth>
            <InputLabel>Quận/Huyện</InputLabel>
            <Select
              value={shippingInfo.district}
              label="Quận/Huyện"
              onChange={(e) => handleInputChange('district', e.target.value)}
                        sx={{
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d4af37',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d4af37',
                            borderWidth: 2,
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#d4af37',
                          }
                        }}
            >
              <MenuItem value="q1">Quận 1</MenuItem>
              <MenuItem value="q2">Quận 2</MenuItem>
              <MenuItem value="q3">Quận 3</MenuItem>
              <MenuItem value="q7">Quận 7</MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
                  <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Phường/Xã</InputLabel>
            {/* <Select
              value={shippingInfo.ward}
              label="Phường/Xã"
              onChange={(e) => handleInputChange('ward', e.target.value)}
                        sx={{
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d4af37',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#d4af37',
                            borderWidth: 2,
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#d4af37',
                          }
                        }}
            >
              <MenuItem value="p1">Phường 1</MenuItem>
              <MenuItem value="p2">Phường 2</MenuItem>
              <MenuItem value="p3">Phường 3</MenuItem>
            </Select> */}
          </FormControl>
        </Grid>
                  <Grid item xs={12}>
          
        </Grid>
      </Grid>
    </Paper>

              {/* Payment Method */}
    <Paper 
      elevation={0}
      sx={{ 
        p: 4,
        borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Payment sx={{ color: '#d4af37' }} />
        Phương thức thanh toán
      </Typography>

      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Stack spacing={2}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                          border: paymentMethod === 'cod' ? '2px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 2,
                cursor: 'pointer',
                          '&:hover': { borderColor: '#d4af37' },
                          transition: 'all 0.3s ease',
                          bgcolor: paymentMethod === 'cod' ? 'rgba(212, 175, 55, 0.05)' : 'transparent'
              }}
              onClick={() => setPaymentMethod('cod')}
            >
              <FormControlLabel
                value="cod"
                          control={<Radio sx={{ color: '#d4af37', '&.Mui-checked': { color: '#d4af37' } }} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <AccountBalance sx={{ color: '#d4af37', fontSize: 28 }} />
                    <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a' }}>
                        Thanh toán khi nhận hàng (COD)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Thanh toán bằng tiền mặt khi nhận hàng
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: '100%', margin: 0 }}
              />
            </Paper>

            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                          border: paymentMethod === 'bank' ? '2px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 2,
                cursor: 'pointer',
                          '&:hover': { borderColor: '#d4af37' },
                          transition: 'all 0.3s ease',
                          bgcolor: paymentMethod === 'bank' ? 'rgba(212, 175, 55, 0.05)' : 'transparent'
              }}
              onClick={() => setPaymentMethod('bank')}
            >
              <FormControlLabel
                value="bank"
                          control={<Radio sx={{ color: '#d4af37', '&.Mui-checked': { color: '#d4af37' } }} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <CreditCard sx={{ color: '#d4af37', fontSize: 28 }} />
                    <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a' }}>
                        Chuyển khoản ngân hàng
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Chuyển khoản qua tài khoản ngân hàng
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: '100%', margin: 0 }}
              />
            </Paper>

            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                          border: paymentMethod === 'momo' ? '2px solid #d4af37' : '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 2,
                cursor: 'pointer',
                          '&:hover': { borderColor: '#d4af37' },
                          transition: 'all 0.3s ease',
                          bgcolor: paymentMethod === 'momo' ? 'rgba(212, 175, 55, 0.05)' : 'transparent'
              }}
              onClick={() => setPaymentMethod('momo')}
            >
              <FormControlLabel
                value="momo"
                          control={<Radio sx={{ color: '#d4af37', '&.Mui-checked': { color: '#d4af37' } }} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <QrCode sx={{ color: '#d4af37', fontSize: 28 }} />
                    <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a' }}>
                        Ví MoMo
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Thanh toán qua ví điện tử MoMo
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: '100%', margin: 0 }}
              />
            </Paper>
          </Stack>
        </RadioGroup>
      </FormControl>

      <Box sx={{ mt: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
                        sx={{ 
                          color: '#d4af37',
                          '&.Mui-checked': {
                            color: '#d4af37',
                          }
                        }}
            />
          }
          label={
            <Typography variant="body2">
              Tôi đồng ý với{' '}
              <Typography
                component="span"
                          sx={{ color: '#d4af37', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
              >
                điều khoản sử dụng
              </Typography>
              {' '}và{' '}
              <Typography
                component="span"
                          sx={{ color: '#d4af37', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
              >
                chính sách bảo mật
              </Typography>
            </Typography>
          }
        />
      </Box>
    </Paper>

              {/* Error Message */}
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Place Order Button */}
              <Button
                variant="contained"
                onClick={handlePlaceOrder}
                disabled={loading}
                startIcon={loading ? null : <CheckCircle />}
                fullWidth
                sx={{
                  py: 2,
                  bgcolor: '#d4af37',
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#c41e3a',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(196, 30, 58, 0.4)'
                  },
                  '&:disabled': {
                    bgcolor: '#9e9e9e',
                    color: '#fff'
                  },
                  boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                  transition: 'all 0.3s ease',
                  textTransform: 'none'
                }}
              >
                {loading ? 'Đang xử lý...' : 'Tiến hành thanh toán'}
              </Button>
          </Stack>
        </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
