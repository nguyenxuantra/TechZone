import { AppBar, Toolbar, Typography, IconButton, Badge, Box, InputBase, Stack, Avatar, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, Search, Computer, Person, Favorite, Notifications, Store } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Add scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <>
      {/* Top Promo Bar */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%)',
        color: 'white',
        py: 0.5,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 500,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        width: '100%'
      }}>
        🚀 Flash Sale - Giảm đến 50% cho tất cả sản phẩm công nghệ! Hạn đến hết ngày 31/12
      </Box>

      <AppBar
        position="sticky"
        elevation={isScrolled ? 8 : 0}
        sx={{
          background: isScrolled
            ? 'rgba(26, 26, 58, 0.95)'
            : 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
          width: '100%'
        }}
      >
        {/* Main Header */}
        <Toolbar sx={{ py: 2, px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
          {/* Logo */}
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{
              flexGrow: 0,
              textDecoration: 'none',
              color: 'white',
              fontWeight: 900,
              letterSpacing: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              background: 'linear-gradient(45deg, #fff 30%, #667eea 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <Computer sx={{ fontSize: 32, color: '#667eea' }} />
            TECH ZONE
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)',
                borderColor: 'rgba(255,255,255,0.3)',
                transform: 'scale(1.02)'
              },
              mr: 3,
              width: { xs: '200px', sm: '300px', md: '400px' },
              transition: 'all 0.3s ease',
              mx: { xs: 2, sm: 3 }
            }}
          >
            <Box sx={{ position: 'absolute', p: 2, color: 'rgba(255,255,255,0.7)' }}>
              <Search />
            </Box>
            <InputBase
              placeholder="Tìm kiếm sản phẩm công nghệ..."
              sx={{
                color: 'white',
                width: '100%',
                pl: 6,
                pr: 2,
                py: 1.5,
                '&::placeholder': {
                  color: 'rgba(255,255,255,0.6)',
                  opacity: 1
                }
              }}
            />
          </Box>

          {/* Right Side Actions */}
          <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/products"
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
                <Store />
            </IconButton>

            <IconButton
              color="inherit"
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >

              <Favorite />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <Badge badgeContent={2} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#667eea' }}>
                <Person />
              </Avatar>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            borderRadius: 2
          }
        }}
      >
        <MenuItem component={Link} to="/profile">
          <Person sx={{ mr: 2 }} />
          Thông tin cá nhân
        </MenuItem>
        <MenuItem component={Link} to="/login">
          <Person sx={{ mr: 2 }} />
          Đăng nhập
        </MenuItem>
      </Menu>

      {/* Navigation Bar */}

    </>
  );
};

export default Header;
