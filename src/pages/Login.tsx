import { Box, Button, Container, TextField, Typography, Paper, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { LoginRequest } from '../store/Account/accountStore';

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

  // Palette (nước hoa)
  const wine900 = '#1a0f14';
  const wine700 = '#341420';
  const cream = '#fbf6f0';
  const gold = '#c7a24a';

  return (
    <Box
      sx={{
        minHeight: '65vh',
        display: 'flex',
        background: `radial-gradient(800px 400px at 10% 10%, ${cream} 0%, #f3e9e6 60%)`,
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
            background: 'rgba(251,246,240,0.98)',
            backdropFilter: 'blur(8px)'
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
                color: wine700,
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
              Khám phá mùi hương đẳng cấp — đăng nhập để tiếp tục mua sắm
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}  noValidate>
            {error && (
              <Typography color="error" variant="body2">{error}</Typography>
            )}
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
                    borderColor: gold,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: gold,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: gold,
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
                    borderColor: gold,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: gold,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: gold,
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              sx={{
                py: 1.5,
                bgcolor: wine900,
                '&:hover': {
                  bgcolor: wine700,
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
                color: wine700,
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
                    color: wine700,
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
});

export default Login;