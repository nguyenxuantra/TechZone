import { AppBar, Toolbar, Typography, IconButton, Badge, Box, InputBase, Stack, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useTheme, useMediaQuery } from '@mui/material';
import { ShoppingCart, Search, Computer, Person, Store, Menu as MenuIcon, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import SearchResults from './SearchResults';
import type { Product } from '../data/products';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
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

  // Handle search
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchTerm]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      // Có thể chuyển hướng đến trang tìm kiếm hoặc xử lý tìm kiếm
      console.log('Searching for:', searchTerm);
    }
  };

  const mobileMenuItems = [
    { text: 'Trang chủ', icon: <HomeIcon />, path: '/' },
    { text: 'Sản phẩm', icon: <Store />, path: '/products' },
    { text: 'Giỏ hàng', icon: <ShoppingCart />, path: '/cart' },
    { text: 'Thông tin cá nhân', icon: <Person />, path: '/profile' },
    { text: 'Đăng nhập', icon: <Person />, path: '/login' },
  ];

  return (
    <>
      {/* Top Promo Bar - Ẩn trên mobile */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%)',
        color: 'white',
        py: 0.5,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: 500,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        width: '100%',
        display: { xs: 'none', sm: 'block' }
      }}>
        🚀 Flash Sale - Giảm đến 50% cho tất cả sản phẩm công nghệ! Hạn đến hết ngày 31/12
      </Box>

      <AppBar
        position="fixed"
        elevation={isScrolled ? 8 : 0}
        sx={{
          background: isScrolled
            ? 'rgba(26, 26, 58, 0.95)'
            : 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.3s ease',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
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
              background: 'linear-gradient(45deg, #fff 30%, #667eea 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <Computer sx={{ fontSize: { xs: 24, md: 32 }, color: '#667eea' }} />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              TECH BIT
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              TECH
            </Box>
          </Typography>

          {/* Search Bar - Ẩn trên mobile nhỏ */}
          <Box
            ref={searchRef}
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
              mr: { xs: 1, md: 3 },
              width: { xs: '120px', sm: '200px', md: '300px', lg: '400px' },
              transition: 'all 0.3s ease',
              mx: { xs: 1, sm: 2, md: 3 },
              display: { xs: 'none', sm: 'block' }
            }}
          >
            <Box sx={{ position: 'absolute', p: 2, color: 'rgba(255,255,255,0.7)' }}>
              <Search />
            </Box>
            <form onSubmit={handleSearchSubmit}>
              <InputBase
                placeholder={isMobile ? "Tìm kiếm..." : "Tìm kiếm sản phẩm công nghệ..."}
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  color: 'white',
                  width: '100%',
                  pl: 6,
                  pr: 2,
                  py: 1.5,
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  '&::placeholder': {
                    color: 'rgba(255,255,255,0.6)',
                    opacity: 1
                  }
                }}
              />
            </form>
            
            {/* Search Results */}
            <SearchResults
              results={searchResults}
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              searchTerm={searchTerm}
            />
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
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <HomeIcon />
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
                <Store />
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
              <Avatar sx={{ width: { xs: 28, md: 32 }, height: { xs: 28, md: 32 }, bgcolor: '#667eea' }}>
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
            background: 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%)',
            color: 'white',
            borderRight: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
              Menu
            </Typography>
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
                      fontWeight: 500
                    } 
                  }} 
                />
              </ListItem>
              {index < mobileMenuItems.length - 1 && (
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
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
          Thông tin cá nhân
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
