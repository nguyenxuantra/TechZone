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
  Stepper,
  Step,
  StepLabel,
  CardMedia,
  Alert,
  Snackbar,
  Checkbox,
} from '@mui/material';
import {
  LocalShipping,
  Payment,
  CheckCircle,
  ArrowBack,
  KeyboardArrowRight,
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

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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

  const steps = ['Thông tin giao hàng', 'Phương thức thanh toán', 'Xác nhận đơn hàng'];

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

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Place order
      clearCart(); // Clear cart after successful order
      setShowSuccessAlert(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return shippingInfo.fullName && shippingInfo.phone && shippingInfo.address && shippingInfo.city;
      case 1:
        return paymentMethod && agreeToTerms;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderShippingStep = () => (
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
  );

  const renderPaymentStep = () => (
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

            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                border: paymentMethod === 'bank' ? '2px solid #667eea' : '1px solid #ddd',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { borderColor: '#667eea' },
                transition: 'all 0.3s ease'
              }}
              onClick={() => setPaymentMethod('bank')}
            >
              <FormControlLabel
                value="bank"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CreditCard sx={{ color: '#2196F3' }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                border: paymentMethod === 'momo' ? '2px solid #667eea' : '1px solid #ddd',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { borderColor: '#667eea' },
                transition: 'all 0.3s ease'
              }}
              onClick={() => setPaymentMethod('momo')}
            >
              <FormControlLabel
                value="momo"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <QrCode sx={{ color: '#E91E63' }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
  );

  const renderConfirmationStep = () => (
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
        <CheckCircle sx={{ mr: 1, verticalAlign: 'middle', color: '#4CAF50' }} />
        Xác nhận đơn hàng
      </Typography>

      <Grid container spacing={3}>
        {/* Order Summary */}
        <Grid size={{xs:12, md:66}}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Tóm tắt đơn hàng
          </Typography>
          <Stack spacing={2}>
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
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Số lượng: {item.quantity}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {formatPrice(parsePrice(item.product.price) * item.quantity)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>

        {/* Shipping & Payment Info */}
        <Grid size={{xs:12, md:66}}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Thông tin giao hàng
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {shippingInfo.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shippingInfo.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shippingInfo.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shippingInfo.city}, {shippingInfo.district}, {shippingInfo.ward}
            </Typography>
            {shippingInfo.note && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Ghi chú: {shippingInfo.note}
              </Typography>
            )}
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Phương thức thanh toán
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {paymentMethod === 'cod' && <AccountBalance sx={{ color: '#4CAF50' }} />}
            {paymentMethod === 'bank' && <CreditCard sx={{ color: '#2196F3' }} />}
            {paymentMethod === 'momo' && <QrCode sx={{ color: '#E91E63' }} />}
            <Typography>
              {paymentMethod === 'cod' && 'Thanh toán khi nhận hàng (COD)'}
              {paymentMethod === 'bank' && 'Chuyển khoản ngân hàng'}
              {paymentMethod === 'momo' && 'Ví MoMo'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Price Summary */}
      <Divider sx={{ my: 4 }} />
      <Box sx={{ maxWidth: 400, ml: 'auto' }}>
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
      </Box>
    </Paper>
  );

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderShippingStep();
      case 1:
        return renderPaymentStep();
      case 2:
        return renderConfirmationStep();
      default:
        return null;
    }
  };

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

        {/* Stepper */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3,
            mb: 4,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Step Content */}
        {renderStepContent(activeStep)}

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ px: 4, py: 2 }}
          >
            Quay lại
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid()}
            endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : <KeyboardArrowRight />}
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
            {activeStep === steps.length - 1 ? 'Đặt hàng' : 'Tiếp tục'}
          </Button>
        </Box>
      </Box>

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
    </Box>
  );
};

export default Checkout;
