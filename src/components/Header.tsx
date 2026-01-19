import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Stack, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useTheme, useMediaQuery, Chip } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon, Close, AutoAwesomeOutlined, LocalFloristOutlined, Person, HomeRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const palette = {
    wine900: '#1a0f14',
    wine800: '#241018',
    wine700: '#341420',
    cream: '#fbf6f0',
    ink: '#24161a',
    gold: '#c7a24a',
    border: 'rgba(255,255,255,0.14)',
  } as const;

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileMenuItems = [
    { text: 'Trang chủ', icon: <HomeRounded />, path: '/' },
    { text: 'Bộ sưu tập', icon: <LocalFloristOutlined />, path: '/products' },
    { text: 'Giỏ hàng', icon: <ShoppingCart />, path: '/cart' },
    { text: 'Tài khoản', icon: <Person />, path: '/profile' },
    { text: 'Đăng nhập', icon: <Person />, path: '/login' },
  ];

  return (
    <>
      {/* Top Promo Bar - Ẩn trên mobile */}
      <Box sx={{
        background: `linear-gradient(135deg, ${palette.wine900} 0%, ${palette.wine700} 100%)`,
        color: 'white',
        py: 0.5,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 500,
        borderBottom: `1px solid ${palette.border}`,
        width: '100%',
        display: { xs: 'none', sm: 'block' }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <AutoAwesomeOutlined sx={{ fontSize: 16, color: palette.gold }} />
          <Box>
            Ưu đãi hương thơm hôm nay — Freeship đơn từ 499K • Quà tặng theo bộ sưu tập
          </Box>
        </Box>
      </Box>

      <AppBar
        position="fixed"
        elevation={isScrolled ? 8 : 0}
        sx={{
          background: isScrolled
            ? 'rgba(26, 15, 20, 0.9)'
            : `radial-gradient(1200px 600px at 10% 0%, ${palette.wine700} 0%, ${palette.wine900} 55%, ${palette.wine900} 100%)`,
          backdropFilter: isScrolled ? 'blur(18px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: isScrolled ? `1px solid ${palette.border}` : 'none',
          width: '100%',
          height: isScrolled ? '85px' : 'none'
        }}
      >
        {/* Main Header */}
        <Toolbar sx={{ 
          py: { xs: 1.5, md: 2 }, 
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
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant={isMobile ? "h6" : "h4"}
            component={Link}
            to="/"
            sx={{
              flexGrow: 0,
              textDecoration: 'none',
              color: 'white',
              fontWeight: 900,
              letterSpacing: { xs: 1, md: 2 },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, md: 1.5 },
              background: `linear-gradient(45deg, #fff 30%, ${palette.gold} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <AutoAwesomeOutlined sx={{ fontSize: { xs: 24, md: 30 }, color: palette.gold }} />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              LUALAB
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              LUA
            </Box>
          </Typography>

          {/* Search removed as requested */}

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
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <AutoAwesomeOutlined />
              </IconButton>
              <IconButton
                color="inherit"
                component={Link}
                to="/products"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <LocalFloristOutlined />
              </IconButton>
            </Box>
            
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <Badge badgeContent={getCartItemCount()} color="error">
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
              <Avatar sx={{ width: { xs: 28, md: 32 }, height: { xs: 28, md: 32 }, bgcolor: palette.wine800 }}>
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
            background: `radial-gradient(900px 600px at 10% 0%, ${palette.wine700} 0%, ${palette.wine900} 60%)`,
            color: 'white',
            borderRight: `1px solid ${palette.border}`
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${palette.border}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <AutoAwesomeOutlined sx={{ color: palette.gold }} />
              <Typography variant="h6" sx={{ fontWeight: 900, color: 'white' }}>
                LUALAB
              </Typography>
              <Chip
                label="MENU"
                size="small"
                sx={{
                  ml: 0.5,
                  bgcolor: 'rgba(199,162,74,0.16)',
                  color: palette.gold,
                  border: '1px solid rgba(199,162,74,0.24)',
                  fontWeight: 900,
                  height: 22,
                }}
              />
            </Box>
            <IconButton onClick={closeMobileMenu} sx={{ color: 'white' }}>
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
                  py: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontSize: '1rem',
                      fontWeight: 700
                    } 
                  }} 
                />
              </ListItem>
              {index < mobileMenuItems.length - 1 && (
                <Divider sx={{ bgcolor: palette.border }} />
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
            minWidth: 200,
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            borderRadius: 2
          }
        }}
      >
        <MenuItem component={Link} to="/profile">
          <Person sx={{ mr: 2 }} />
          Tài khoản
        </MenuItem>
        <MenuItem component={Link} to="/login">
          <Person sx={{ mr: 2 }} />
          Đăng nhập
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
