import { Box, Button, Container, TextField, Typography, Paper, Link as MuiLink, InputAdornment, IconButton, Alert, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, Email, Lock, Person, Checkroom } from '@mui/icons-material';
import { useState } from 'react';
import accountApi from '../api/global/accountApi';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Tên đăng nhập là bắt buộc';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await accountApi.register({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      setAlertMessage('Đăng ký tài khoản thành công! Đang chuyển đến trang đăng nhập...');
      setAlertSeverity('success');
      setShowAlert(true);

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error: any) {
      console.error('Register error:', error);
      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
      setAlertMessage(errorMessage);
      setAlertSeverity('error');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, md: 8 },
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
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <Paper 
          elevation={24}
          sx={{ 
            p: { xs: 3, md: 5 },
            width: '100%',
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Box 
            sx={{ 
              mb: 4, 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37 0%, #c41e3a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)'
              }}
            >
              <Checkroom sx={{ fontSize: 40, color: '#fff' }} />
            </Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 800,
                color: '#0f172a',
                mb: 1,
                fontFamily: '"Playfair Display", serif',
                letterSpacing: 1
              }}
            >
              Đăng ký tài khoản
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: '80%', fontSize: '0.95rem' }}
            >
              Tạo tài khoản để mua sắm dễ dàng hơn tại ELITE MEN
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              sx={{ 
                mb: 2,
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
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#d4af37', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ 
                mb: 2,
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
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#d4af37', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ 
                mb: 3,
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
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#d4af37', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: '#d4af37' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.8,
                bgcolor: '#d4af37',
                color: '#0f172a',
                fontWeight: 700,
                '&:hover': {
                  bgcolor: '#c41e3a',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(196, 30, 58, 0.4)'
                },
                '&:disabled': {
                  bgcolor: '#9e9e9e',
                  color: '#fff'
                },
                mb: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Đã có tài khoản?{' '}
                <MuiLink
                  component={Link}
                  to="/login"
                  sx={{ 
                    color: '#d4af37', 
                    fontWeight: 700,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#c41e3a'
                    }
                  }}
                >
                  Đăng nhập
                </MuiLink>
              </Typography>
            </Box>
          </Box>

          {/* Alert Snackbar */}
          <Snackbar
            open={showAlert}
            autoHideDuration={alertSeverity === 'success' ? 1500 : 3000}
            onClose={() => setShowAlert(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert 
              onClose={() => setShowAlert(false)} 
              severity={alertSeverity}
              sx={{ 
                width: '100%',
                '&.MuiAlert-success': {
                  bgcolor: '#d4af37',
                  color: '#0f172a',
                  fontWeight: 600
                },
                '&.MuiAlert-error': {
                  bgcolor: '#c41e3a',
                  color: '#fff',
                  fontWeight: 600
                }
              }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
