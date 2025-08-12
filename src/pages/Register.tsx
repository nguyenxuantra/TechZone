import { Box, Button, Container, TextField, Typography, Paper, Link as MuiLink, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff, Email, Lock, Person, Phone } from '@mui/icons-material';
import { useState } from 'react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  return (
    <Box
      sx={{
        minHeight: '80vh',
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
              Đăng ký tài khoản
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ maxWidth: '80%' }}
            >
              Tạo tài khoản để mua sắm dễ dàng hơn
            </Typography>
          </Box>

          <Box component="form" noValidate>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="Họ"
                name="firstName"
                autoComplete="given-name"
                sx={{ 
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
                      <Person sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                fullWidth
                id="lastName"
                label="Tên"
                name="lastName"
                autoComplete="family-name"
                sx={{ 
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
                      <Person sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
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
              id="phone"
              label="Số điện thoại"
              name="phone"
              autoComplete="tel"
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
                    <Phone sx={{ color: 'text.secondary' }} />
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

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
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
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              Đăng ký
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Đã có tài khoản?{' '}
                <MuiLink
                  component={Link}
                  to="/login"
                  sx={{ 
                    color: '#1a237e', 
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Đăng nhập
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
