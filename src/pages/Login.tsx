import { Box, Button, Container, TextField, Typography, Paper, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Login } from '../store/Account/accountStore';

import { useRootStore } from '../contexts/RootStoreContext';

const Login = () => {
  const [showPassword,] = useState(false);
  const {register, handleSubmit, formState:{errors}} = useForm<Login>();
  const {accountStore} = useRootStore();
  const {loading, fetchLogin, token} = accountStore;
  const onSubmit = async(data:Login)=>{
    await fetchLogin(data)
  } 
  console.log("day la token", token)
  return (
    <Box
      sx={{
        minHeight: '65vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        py: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper 
          elevation={24}
          sx={{ 
            p: { xs: 3, md: 4 },
            width: '100%',
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
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
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: '#1a237e',
                mb: 1
              }}
            >
              Đăng nhập
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: '80%' }}
            >
              Chào mừng bạn quay trở lại với TECH BIT
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}  noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("username",{required:"vui long nhập username"})}
              id="username"
              label="User name"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1a237e',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a237e',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1a237e',
                }
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
              {...register("password",{required:"vui long nhập password"})}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#1a237e',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1a237e',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1a237e',
                }
              }}
              
            />

            <Button
              type="submit"
              fullWidth
              // component={Link}
              // to="/"
              loading={loading}
              variant="contained"
              sx={{
                py: 1.5,
                bgcolor: '#1a237e',
                '&:hover': {
                  bgcolor: '#2832a8',
                },
                mb: 2,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1.1rem'
              }}
            >
              Đăng nhập
            </Button>

            <Box sx={{ 
              textAlign: 'center',
              '& a': {
                textDecoration: 'none',
                color: '#1a237e',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }
            }}>
              <MuiLink
                component={Link}
                to="/forgot-password"
                variant="body2"
                sx={{ color: 'text.secondary' }}
              >
                Quên mật khẩu?
              </MuiLink>
            </Box>

            <Box sx={{ 
              mt: 4, 
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
                  bgcolor: 'divider'
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
                    color: '#1a237e', 
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
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
};

export default Login;
