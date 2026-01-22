import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import {
  CheckCircle,
  Error as ErrorIcon,
  ShoppingBag,
  Home,
} from '@mui/icons-material';
import orderApi, { type OrderResponse } from '../api/orderApi';
import { useCart } from '../contexts/CartContext';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const status = searchParams.get('status');
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<OrderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Ref để đảm bảo chỉ gọi API một lần
  const hasCreatedOrderRef = useRef(false);
  const statusRef = useRef<string | null>(null);

  useEffect(() => {
    // Chỉ gọi API khi thanh toán thành công và chưa gọi API lần nào
    if (status === 'success' && !hasCreatedOrderRef.current && statusRef.current !== status) {
      statusRef.current = status;
      hasCreatedOrderRef.current = true;
      
      const createOrder = async () => {
        try {
          setLoading(true);
          setError(null);

          // Gọi API tạo đơn hàng
          const response = await orderApi.createOrder({
            addressId: null,
            couponId: null,
          });

          if (response.code === 200 && response.result) {
            setOrderData(response.result);
            // Xóa giỏ hàng sau khi tạo đơn hàng thành công
            clearCart();
          } else {
            setError(response.message || 'Không thể tạo đơn hàng');
          }
        } catch (err: any) {
          console.error('Create order error:', err);
          setError(
            err.response?.data?.message ||
              'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!'
          );
        } finally {
          setLoading(false);
        }
      };

      createOrder();
    } else if (status !== 'success') {
      setLoading(false);
    }
  }, [status, clearCart]);

  const isSuccess = status === 'success';
  const isFailed = status === 'failed';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        position: 'relative',
        py: 4,
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
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            textAlign: 'center'
          }}
        >
          {loading ? (
            <Box sx={{ py: 4 }}>
              <CircularProgress sx={{ color: '#d4af37', mb: 3 }} size={60} />
              <Typography variant="h6" sx={{ color: '#0f172a', fontWeight: 600 }}>
                Đang xử lý đơn hàng...
              </Typography>
            </Box>
          ) : (
            <>
              {/* Success State */}
              {isSuccess && !error && orderData && (
                <>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #d4af37 0%, #4CAF50 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 60, color: '#fff' }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: '#0f172a',
                      mb: 2,
                      fontFamily: '"Playfair Display", serif'
                    }}
                  >
                    Thanh toán thành công!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Cảm ơn bạn đã mua sắm tại ELITE MEN
                  </Typography>

                  {/* Order Info */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 4,
                      borderRadius: 2,
                      bgcolor: 'rgba(212, 175, 55, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.2)'
                    }}
                  >
                    <Stack spacing={2} alignItems="flex-start">
                      <Box sx={{ width: '100%', textAlign: 'left' }}>
                        <Typography variant="body2" color="text.secondary">
                          Mã đơn hàng
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                          #{orderData.orderId}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '100%', textAlign: 'left' }}>
                        <Typography variant="body2" color="text.secondary">
                          Tổng tiền
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#d4af37' }}>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(orderData.totalAmount)}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '100%', textAlign: 'left' }}>
                        <Typography variant="body2" color="text.secondary">
                          Trạng thái
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                          {orderData.status}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      startIcon={<Home />}
                      onClick={() => navigate('/')}
                      sx={{
                        bgcolor: '#d4af37',
                        color: '#0f172a',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: '#c41e3a',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(196, 30, 58, 0.4)'
                        },
                        boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                        transition: 'all 0.3s ease',
                        textTransform: 'none'
                      }}
                    >
                      Về trang chủ
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<ShoppingBag />}
                      onClick={() => navigate('/products')}
                      sx={{
                        borderColor: '#d4af37',
                        color: '#d4af37',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#c41e3a',
                          color: '#c41e3a',
                          bgcolor: 'rgba(196, 30, 58, 0.05)'
                        },
                        textTransform: 'none'
                      }}
                    >
                      Tiếp tục mua sắm
                    </Button>
                  </Stack>
                </>
              )}

              {/* Failed State */}
              {isFailed && (
                <>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c41e3a 0%, #f44336 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 25px rgba(196, 30, 58, 0.4)'
                    }}
                  >
                    <ErrorIcon sx={{ fontSize: 60, color: '#fff' }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: '#0f172a',
                      mb: 2,
                      fontFamily: '"Playfair Display", serif'
                    }}
                  >
                    Thanh toán thất bại
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      onClick={() => navigate('/checkout')}
                      sx={{
                        bgcolor: '#d4af37',
                        color: '#0f172a',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: '#c41e3a',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(196, 30, 58, 0.4)'
                        },
                        boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                        transition: 'all 0.3s ease',
                        textTransform: 'none'
                      }}
                    >
                      Thử lại thanh toán
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/cart')}
                      sx={{
                        borderColor: '#d4af37',
                        color: '#d4af37',
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#c41e3a',
                          color: '#c41e3a',
                          bgcolor: 'rgba(196, 30, 58, 0.05)'
                        },
                        textTransform: 'none'
                      }}
                    >
                      Về giỏ hàng
                    </Button>
                  </Stack>
                </>
              )}

              {/* Error State (khi tạo đơn hàng thất bại) */}
              {isSuccess && error && (
                <>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ff9800 0%, #f44336 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 25px rgba(255, 152, 0, 0.4)'
                    }}
                  >
                    <ErrorIcon sx={{ fontSize: 60, color: '#fff' }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: '#0f172a',
                      mb: 2,
                      fontFamily: '"Playfair Display", serif'
                    }}
                  >
                    Thanh toán thành công nhưng tạo đơn hàng thất bại
                  </Typography>
                  <Alert severity="error" sx={{ mb: 4, textAlign: 'left' }}>
                    {error}
                  </Alert>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Vui lòng liên hệ với chúng tôi để được hỗ trợ.
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<Home />}
                    onClick={() => navigate('/')}
                    sx={{
                      bgcolor: '#d4af37',
                      color: '#0f172a',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: '#c41e3a',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px rgba(196, 30, 58, 0.4)'
                      },
                      boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                      transition: 'all 0.3s ease',
                      textTransform: 'none'
                    }}
                  >
                    Về trang chủ
                  </Button>
                </>
              )}

              {/* Unknown Status */}
              {!isSuccess && !isFailed && (
                <>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', mb: 2 }}>
                    Trạng thái không xác định
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/')}
                    sx={{
                      bgcolor: '#d4af37',
                      color: '#0f172a',
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: '#c41e3a'
                      },
                      textTransform: 'none'
                    }}
                  >
                    Về trang chủ
                  </Button>
                </>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentResult;
