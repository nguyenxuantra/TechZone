import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Stack, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useTheme, useMediaQuery } from '@mui/material';
import { ShoppingCart, Checkroom, Person, Favorite, Menu as MenuIcon, Close, Home, LocalShipping } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { getCartItemCount } = useCart();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileMenuItems = [
    { text: 'Trang chủ', icon: <Home />, path: '/' },
    { text: 'Sản phẩm', icon: <Favorite />, path: '/products' },
    { text: 'Giỏ hàng', icon: <ShoppingCart />, path: '/cart' },
    { text: 'Thông tin cá nhân', icon: <Person />, path: '/profile' },
    { text: 'Đăng nhập', icon: <LocalShipping />, path: '/login' },
  ];

  return (
    <>
      {/* Top Promo Bar - Ẩn trên mobile */}
      <Box sx={{
        background: 'linear-gradient(135deg, #d4af37 0%, #c41e3a 100%)',
        color: '#1a1a1a',
        py: 0.7,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 600,
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        width: '100%',
        display: { xs: 'none', sm: 'block' },
        letterSpacing: 0.5
      }}>
        ✨ Chào mừng đến ELITE MEN - Nơi cung cấp công nghệ hàng đầu
      </Box>

      <AppBar
        position="fixed"
        elevation={isScrolled ? 4 : 0}
        sx={{
          background: isScrolled
            ? 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
          transition: 'all 0.3s ease',
          borderBottom: '2px solid rgba(212, 175, 55, 0.15)',
          width: '100%',
          boxShadow: isScrolled ? '0 2px 12px rgba(0,0,0,0.08)' : '0 2px 4px rgba(0,0,0,0.04)'
        }}
      >
        {/* Main Header */}
        <Toolbar sx={{ 
          py: { xs: 1, md: 1.5 }, 
          px: { xs: 1.5, sm: 2, md: 4, lg: 6, xl: 8 },
          minHeight: { xs: '64px', md: 'auto' }
        }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={toggleMobileMenu}
              sx={{
                mr: 1,
                color: '#1a1a1a',
                bgcolor: 'rgba(212, 175, 55, 0.1)',
                '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.2)' }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 0 }}>
            <Checkroom sx={{ fontSize: { xs: 28, md: 32 }, color: '#d4af37' }} />
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: '#0f172a',
                fontWeight: 900,
                letterSpacing: { xs: 1.5, md: 2 },
                display: 'flex',
                alignItems: 'center',
                fontFamily: '"Playfair Display", serif',
                textTransform: 'uppercase',
                '&:hover': {
                  color: '#d4af37',
                  transition: 'color 0.3s ease'
                }
              }}
            >
              {isMobile ? 'ELITE' : 'ELITE MEN'}
            </Typography>
          </Box>

          {/* Right Side Actions */}
          <Stack 
            direction="row" 
            spacing={{ xs: 0.5, md: 1 }} 
            sx={{ ml: 'auto' }}
          >
            {/* Ẩn các buttons trên mobile nhỏ, chỉ hiện cart và profile */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <IconButton
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  mr: 1,
                  color: '#1a1a1a',
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(212, 175, 55, 0.2)',
                    color: '#d4af37'
                  }
                }}
              >
                <Home />
              </IconButton>
              <IconButton
                color="inherit"
                component={Link}
                to="/products"
                sx={{
                  color: '#1a1a1a',
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(212, 175, 55, 0.2)',
                    color: '#d4af37'
                  }
                }}
              >
                <Favorite />
              </IconButton>
            </Box>
            
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{
                color: '#1a1a1a',
                bgcolor: 'rgba(212, 175, 55, 0.1)',
                '&:hover': { 
                  bgcolor: 'rgba(212, 175, 55, 0.2)',
                  color: '#d4af37'
                }
              }}
            >
              <Badge badgeContent={getCartItemCount()} color="error" sx={{ 
                '& .MuiBadge-badge': { 
                  bgcolor: '#c41e3a',
                  color: 'white',
                  fontWeight: 600
                } 
              }}>
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                color: '#1a1a1a',
                bgcolor: 'rgba(212, 175, 55, 0.1)',
                '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.2)' }
              }}
            >
              <Avatar sx={{ 
                width: { xs: 28, md: 32 }, 
                height: { xs: 28, md: 32 }, 
                bgcolor: '#d4af37',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                color: '#1a1a1a'
              }}>
                <Person />
              </Avatar>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fb 100%)',
            color: '#1a1a1a',
            borderRight: '1px solid rgba(212, 175, 55, 0.15)'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(212, 175, 55, 0.15)', bgcolor: 'rgba(212, 175, 55, 0.08)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Checkroom sx={{ fontSize: 28, color: '#d4af37' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
                ELITE MEN
              </Typography>
            </Box>
            <IconButton onClick={closeMobileMenu} sx={{ color: '#1a1a1a' }}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        
        <List sx={{ pt: 1 }}>
          {mobileMenuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem
                component={Link}
                to={item.path}
                onClick={closeMobileMenu}
                sx={{
                  py: 1.5,
                  cursor: 'pointer',
                  color: '#1a1a1a',
                  '&:hover': {
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    borderLeft: '3px solid #d4af37'
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#d4af37', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: '#1a1a1a'
                    } 
                  }} 
                />
              </ListItem>
              {index < mobileMenuItems.length - 1 && (
                <Divider sx={{ bgcolor: 'rgba(212, 175, 55, 0.15)' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

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
            minWidth: 220,
            boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
            borderRadius: 2,
            border: '1px solid rgba(212, 175, 55, 0.2)',
            '& .MuiMenuItem-root': {
              color: '#1a1a1a',
              '&:hover': {
                bgcolor: 'rgba(212, 175, 55, 0.1)'
              }
            }
          }
        }}
      >
        <MenuItem component={Link} to="/profile" sx={{ py: 1.5 }}>
          <Person sx={{ mr: 2, color: '#d4af37' }} />
          Thông tin cá nhân
        </MenuItem>
        <MenuItem component={Link} to="/login" sx={{ py: 1.5 }}>
          <LocalShipping sx={{ mr: 2, color: '#d4af37' }} />
          Đăng nhập
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
