import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Container,
  Stack
} from '@mui/material';
import {
  CheckCircle,
  Error as ErrorIcon,
  Home,
  ShoppingCart
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import orderApi from '../api/orderApi';

const PaymentResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [message, setMessage] = useState('');
  const hasProcessed = useRef(false); // Flag để đảm bảo chỉ xử lý một lần

  useEffect(() => {
    // Chỉ xử lý một lần
    if (hasProcessed.current) {
      return;
    }

    const processPayment = async () => {
      try {
        // Đánh dấu đã bắt đầu xử lý ngay lập tức để tránh chạy lại
        hasProcessed.current = true;

        // Lấy status từ query param (chỉ đọc một lần)
        const paymentStatus = searchParams.get('status');

        if (paymentStatus === 'success') {
          // Thanh toán thành công - tạo đơn hàng
          try {
            setMessage('Đang tạo đơn hàng...');
            
            const orderResponse = await orderApi.createOrder({
              addressId: null,
              couponId: null
            });

            if (orderResponse.code === 200) {
              // Xóa giỏ hàng sau khi tạo đơn hàng thành công
              clearCart();
              
              setStatus('success');
              setMessage('Thanh toán thành công! Đơn hàng của bạn đã được tạo thành công.');
            } else {
              throw new Error(orderResponse.message || 'Không thể tạo đơn hàng');
            }
          } catch (error: any) {
            console.error('Error creating order:', error);
            setStatus('failed');
            const errorMessage = error.response?.data?.message || error.message || 'Thanh toán thành công nhưng không thể tạo đơn hàng. Vui lòng liên hệ hỗ trợ.';
            setMessage(errorMessage);
          }
        } else if (paymentStatus === 'failed') {
          // Thanh toán thất bại
          setStatus('failed');
          setMessage('Thanh toán thất bại. Vui lòng thử lại.');
        } else {
          // Không có status hoặc status không hợp lệ
          setStatus('failed');
          setMessage('Thông tin thanh toán không hợp lệ.');
        }
      } catch (error: any) {
        console.error('Error processing payment:', error);
        setStatus('failed');
        setMessage(error.message || 'Có lỗi xảy ra khi xử lý thanh toán');
      }
    };

    processPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy một lần khi component mount

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'radial-gradient(1000px 450px at 20% 0%, rgba(199,162,74,0.12) 0%, rgba(199,162,74,0) 60%), #fbf6f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Paper 
          elevation={0}
          sx={{ 
            p: 6,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            textAlign: 'center'
          }}
        >
          {status === 'loading' && (
            <>
              <CircularProgress sx={{ mb: 3, color: '#c7a24a' }} size={60} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#24161a' }}>
                Đang xử lý thanh toán...
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {message || 'Vui lòng đợi trong giây lát'}
              </Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle sx={{ fontSize: 80, color: '#c7a24a', mb: 3 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#c7a24a' }}>
                Thanh toán thành công!
              </Typography>
              <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
                {message}
              </Alert>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Cảm ơn bạn đã chọn LUALAB. Chúng tôi sẽ chuẩn bị đơn hương của bạn trong thời gian sớm nhất.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<Home />}
                  onClick={() => navigate('/')}
                  sx={{
                    bgcolor: '#1a0f14',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    '&:hover': { bgcolor: '#241018' }
                  }}
                >
                  Về trang chủ
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCart />}
                  onClick={() => navigate('/products')}
                  sx={{
                    borderColor: '#1a0f14',
                    color: '#1a0f14',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    '&:hover': { 
                      borderColor: '#241018',
                      bgcolor: 'rgba(26, 15, 20, 0.04)'
                    }
                  }}
                >
                  Tiếp tục mua sắm
                </Button>
              </Stack>
            </>
          )}

          {status === 'failed' && (
            <>
              <ErrorIcon sx={{ fontSize: 80, color: '#F44336', mb: 3 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#F44336' }}>
                Thanh toán thất bại
              </Typography>
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                {message}
              </Alert>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Vui lòng kiểm tra lại thông tin thanh toán hoặc thử lại sau.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={() => navigate('/cart')}
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
                  Quay lại giỏ hàng
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Home />}
                  onClick={() => navigate('/')}
                  sx={{
                    borderColor: '#667eea',
                    color: '#667eea',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    '&:hover': { 
                      borderColor: '#5a6fd8',
                      bgcolor: 'rgba(102, 126, 234, 0.05)'
                    }
                  }}
                >
                  Về trang chủ
                </Button>
              </Stack>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentResult;
