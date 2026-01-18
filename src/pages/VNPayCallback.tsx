import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Container
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Home
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import orderApi from '../api/orderApi';

const VNPayCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Lấy các tham số từ URL callback
        const responseCode = searchParams.get('vnp_ResponseCode');
        const transactionStatus = searchParams.get('vnp_TransactionStatus');

        // Kiểm tra thanh toán thành công
        if (responseCode === '00' && transactionStatus === '00') {
          // Lấy thông tin đơn hàng đã lưu từ sessionStorage
          const pendingOrderStr = sessionStorage.getItem('pendingOrder');
          
          if (pendingOrderStr) {
            // Tạo đơn hàng
            const orderResponse = await orderApi.createOrder({
              addressId: null,
              couponId: null
            });

            if (orderResponse.code === 200) {
              // Xóa thông tin đơn hàng tạm
              sessionStorage.removeItem('pendingOrder');
              
              // Xóa giỏ hàng
              clearCart();
              
              setStatus('success');
              setMessage('Thanh toán thành công! Đơn hàng của bạn đã được tạo.');
              
              // Tự động chuyển về trang chủ sau 5 giây
              setTimeout(() => {
                navigate('/');
              }, 5000);
            } else {
              throw new Error(orderResponse.message || 'Không thể tạo đơn hàng');
            }
          } else {
            throw new Error('Không tìm thấy thông tin đơn hàng');
          }
        } else {
          // Thanh toán thất bại
          setStatus('error');
          setMessage('Thanh toán thất bại. Vui lòng thử lại.');
        }
      } catch (error: any) {
        console.error('Error processing payment:', error);
        setStatus('error');
        setMessage(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi xử lý thanh toán');
      }
    };

    processPayment();
  }, [searchParams, clearCart, navigate]);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
              <CircularProgress sx={{ mb: 3, color: '#667eea' }} size={60} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50' }}>
                Đang xử lý thanh toán...
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Vui lòng đợi trong giây lát
              </Typography>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle sx={{ fontSize: 80, color: '#4CAF50', mb: 3 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#4CAF50' }}>
                Thanh toán thành công!
              </Typography>
              <Alert severity="success" sx={{ mb: 3 }}>
                {message}
              </Alert>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Bạn sẽ được chuyển về trang chủ trong vài giây...
              </Typography>
              <Button
                variant="contained"
                startIcon={<Home />}
                onClick={() => navigate('/')}
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
                Về trang chủ
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <Error sx={{ fontSize: 80, color: '#F44336', mb: 3 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#F44336' }}>
                Thanh toán thất bại
              </Typography>
              <Alert severity="error" sx={{ mb: 3 }}>
                {message}
              </Alert>
              <Button
                variant="contained"
                startIcon={<Home />}
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
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default VNPayCallback;
