import { Box, Button, Container, TextField, Typography, Paper, Link as MuiLink, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useState } from 'react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
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

          <Box component="form" noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'text.secondary' }} />
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
              autoComplete="current-password"
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
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
              component={Link}
              to="/"
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
