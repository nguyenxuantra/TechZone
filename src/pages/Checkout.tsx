import { useState } from 'react';
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
  Snackbar,
  Checkbox,
  CircularProgress,
  Container
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
  Person
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import paymentApi from '../api/paymentApi';
import orderApi from '../api/orderApi';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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

  const [paymentMethod, setPaymentMethod] = useState('vnpay');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const parsePrice = (priceStr: string) => parseFloat(priceStr.replace(/[^\d]/g, '')) || 0;
  
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
           agreeToTerms;
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin và đồng ý với điều khoản');
      setShowErrorAlert(true);
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Giỏ hàng của bạn đang trống');
      setShowErrorAlert(true);
      return;
    }

    try {
      setIsProcessing(true);

      if (paymentMethod === 'vnpay') {
        // Thanh toán VNPay
        const totalAmount = calculateTotal();
        const response = await paymentApi.createVNPayPayment({
          amount: totalAmount,
          bankCode: 'NCB'
        });

        if (response.code === 200 && response.data && response.data.paymentUrl) {
          // Lưu thông tin đơn hàng vào sessionStorage để xử lý sau khi thanh toán
          sessionStorage.setItem('pendingOrder', JSON.stringify({
            shippingInfo,
            paymentMethod,
            totalAmount
          }));
          
          // Redirect sang VNPay
          window.location.href = response.data.paymentUrl;
        } else {
          throw new Error(response.message || 'Không thể tạo link thanh toán');
        }
      } else {
        // COD - Tạo đơn hàng trực tiếp
        const orderResponse = await orderApi.createOrder({
          addressId: null,
          couponId: null
        });

        if (orderResponse.code === 200) {
          clearCart();
          setShowSuccessAlert(true);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          throw new Error(orderResponse.message || 'Không thể tạo đơn hàng');
        }
      }
    } catch (error: any) {
      console.error('Error placing order:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi đặt hàng');
      setShowErrorAlert(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 3,
      width: '100%'
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/cart')}
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            Quay lại giỏ hàng
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#2c3e50' }}>
            Thanh toán
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            Hoàn tất đơn hàng của bạn
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column - Shipping Info & Payment Method */}
          <Grid size={{xs:12, lg:8}}>
            <Stack spacing={3}>
              {/* Shipping Information */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                  <LocalShipping sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Thông tin giao hàng
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Họ và tên"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      required
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:6}}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      InputProps={{
                        startAdornment: <LocalPhone sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12}}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12}}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                      multiline
                      rows={2}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12, sm:4}}>
                    <FormControl fullWidth>
                      <InputLabel>Tỉnh/Thành phố</InputLabel>
                      <Select
                        value={shippingInfo.city}
                        label="Tỉnh/Thành phố"
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      >
                        <MenuItem value="hcm">TP. Hồ Chí Minh</MenuItem>
                        <MenuItem value="hn">Hà Nội</MenuItem>
                        <MenuItem value="dn">Đà Nẵng</MenuItem>
                        <MenuItem value="ct">Cần Thơ</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{xs:12, sm:4}}>
                    <FormControl fullWidth>
                      <InputLabel>Quận/Huyện</InputLabel>
                      <Select
                        value={shippingInfo.district}
                        label="Quận/Huyện"
                        onChange={(e) => handleInputChange('district', e.target.value)}
                      >
                        <MenuItem value="q1">Quận 1</MenuItem>
                        <MenuItem value="q2">Quận 2</MenuItem>
                        <MenuItem value="q3">Quận 3</MenuItem>
                        <MenuItem value="q7">Quận 7</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{xs:12, sm:4}}>
                    <FormControl fullWidth>
                      <InputLabel>Phường/Xã</InputLabel>
                      <Select
                        value={shippingInfo.ward}
                        label="Phường/Xã"
                        onChange={(e) => handleInputChange('ward', e.target.value)}
                      >
                        <MenuItem value="p1">Phường 1</MenuItem>
                        <MenuItem value="p2">Phường 2</MenuItem>
                        <MenuItem value="p3">Phường 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{xs:12}}>
                    <TextField
                      fullWidth
                      label="Ghi chú (tùy chọn)"
                      value={shippingInfo.note}
                      onChange={(e) => handleInputChange('note', e.target.value)}
                      multiline
                      rows={2}
                      placeholder="Hướng dẫn giao hàng, thời gian giao hàng..."
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* Payment Method */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                  <Payment sx={{ mr: 1, verticalAlign: 'middle' }} />
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
                          border: paymentMethod === 'vnpay' ? '2px solid #667eea' : '1px solid #ddd',
                          borderRadius: 2,
                          cursor: 'pointer',
                          '&:hover': { borderColor: '#667eea' },
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => setPaymentMethod('vnpay')}
                      >
                        <FormControlLabel
                          value="vnpay"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <CreditCard sx={{ color: '#667eea' }} />
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  Thanh toán qua VNPay
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Thanh toán an toàn qua cổng VNPay
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
                          border: paymentMethod === 'cod' ? '2px solid #667eea' : '1px solid #ddd',
                          borderRadius: 2,
                          cursor: 'pointer',
                          '&:hover': { borderColor: '#667eea' },
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        <FormControlLabel
                          value="cod"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <AccountBalance sx={{ color: '#4CAF50' }} />
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <Box sx={{ mt: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        Tôi đồng ý với{' '}
                        <Typography
                          component="span"
                          color="primary"
                          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          điều khoản sử dụng
                        </Typography>
                        {' '}và{' '}
                        <Typography
                          component="span"
                          color="primary"
                          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          chính sách bảo mật
                        </Typography>
                      </Typography>
                    }
                  />
                </Box>
              </Paper>
            </Stack>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid size={{xs:12, lg:4}}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'sticky',
                top: 100
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                <CheckCircle sx={{ mr: 1, verticalAlign: 'middle', color: '#4CAF50' }} />
                Tóm tắt đơn hàng
              </Typography>

              {/* Order Items */}
              <Stack spacing={2} sx={{ mb: 3, maxHeight: '400px', overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <Box key={item.product.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      image={item.product.image}
                      alt={item.product.name}
                      sx={{ 
                        width: 80, 
                        height: 60, 
                        borderRadius: 1,
                        objectFit: 'cover'
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Số lượng: {item.quantity}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                        {formatPrice(parsePrice(item.product.price) * item.quantity)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Price Summary */}
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Tạm tính:</Typography>
                  <Typography>{formatPrice(calculateSubtotal())}</Typography>
                </Box>
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

              {/* Place Order Button */}
              <Button
                variant="contained"
                fullWidth
                onClick={handlePlaceOrder}
                disabled={!isFormValid() || isProcessing || cartItems.length === 0}
                startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <CheckCircle />}
                sx={{
                  bgcolor: '#667eea',
                  mt: 3,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  '&:hover': { bgcolor: '#5a6fd8' },
                  '&:disabled': {
                    bgcolor: '#ccc',
                    color: '#666'
                  }
                }}
              >
                {isProcessing ? 'Đang xử lý...' : paymentMethod === 'vnpay' ? 'Thanh toán VNPay' : 'Đặt hàng'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Success Alert */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSuccessAlert(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại TECH BIT.
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar
        open={showErrorAlert}
        autoHideDuration={5000}
        onClose={() => setShowErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowErrorAlert(false)} 
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Checkout;
