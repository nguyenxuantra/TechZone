import { Box, Button, Container, TextField, Typography, Paper, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { LoginRequest } from '../store/Account/accountStore';
import { Checkroom, Lock, Person } from '@mui/icons-material';
import { useRootStore } from '../contexts/RootStoreContext';
import { observer } from 'mobx-react-lite';


const Login = observer(() => {
  const [showPassword,] = useState(false);
  const {register, handleSubmit, formState:{errors}} = useForm<LoginRequest>();
  const {accountStore} = useRootStore();
  const navigate = useNavigate();
  const {loading, fetchLogin, error} = accountStore;
  const onSubmit = async(data:LoginRequest)=>{
    await fetchLogin(data)
    if(accountStore.currentUser?.role === 'admin'){
      navigate('/admin');
      return;
    }
    if(accountStore.currentUser?.role === 'user'){
      navigate('/');
      return;
    }
  } 
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
              Đăng nhập
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: '80%', fontSize: '0.95rem' }}
            >
              Chào mừng bạn quay trở lại với ELITE MEN
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}  noValidate>
            {error && (
              <Box sx={{ 
                mb: 2, 
                p: 1.5, 
                borderRadius: 2, 
                bgcolor: 'rgba(196, 30, 58, 0.1)',
                border: '1px solid rgba(196, 30, 58, 0.3)'
              }}>
                <Typography color="error" variant="body2" sx={{ fontWeight: 500 }}>
                  {error}
                </Typography>
              </Box>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("username",{required:"Vui lòng nhập tên đăng nhập"})}
              id="username"
              label="Tên đăng nhập"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username?.message}
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
                  <Person sx={{ mr: 1, color: '#d4af37', fontSize: 20 }} />
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              {...register("password",{required:"Vui lòng nhập mật khẩu"})}
              error={!!errors.password}
              helperText={errors.password?.message}
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
                  <Lock sx={{ mr: 1, color: '#d4af37', fontSize: 20 }} />
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
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
                mb: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                transition: 'all 0.3s ease',
                '&:disabled': {
                  bgcolor: '#9e9e9e',
                  color: '#fff'
                }
              }}
            >
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>

            <Box sx={{ 
              textAlign: 'center',
              mb: 3,
              '& a': {
                textDecoration: 'none',
                color: '#d4af37',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                  color: '#c41e3a'
                }
              }
            }}>
              <MuiLink
                component={Link}
                to="/forgot-password"
                variant="body2"
              >
                Quên mật khẩu?
              </MuiLink>
            </Box>

            <Box sx={{ 
              mt: 3, 
              textAlign: 'center',
              position: 'relative'
            }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  bgcolor: 'rgba(212, 175, 55, 0.3)'
                }}
              />
              <Typography
                variant="body2"
                component="span"
                sx={{
                  color: 'text.secondary',
                  bgcolor: 'background.paper',
                  px: 2,
                  position: 'relative'
                }}
              >
                Hoặc
              </Typography>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Chưa có tài khoản?{' '}
                <MuiLink
                  component={Link}
                  to="/register"
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
                  Đăng ký ngay
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
});

export default Login;
