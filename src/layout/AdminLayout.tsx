import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  People,
  Notifications,
  AccountCircle,
  Logout,
  Checkroom,
  Receipt,
  Style,
  BarChart,
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const menuItems = [
    {
      text: 'Quản lý sản phẩm',
      icon: <Checkroom />,
      path: '/admin',
      color: '#d4af37'
    },
    {
      text: 'Danh mục sản phẩm',
      icon: <Style />,
      path: '/admin/categories',
      color: '#8b7355'
    },
    {
      text: 'Đơn hàng',
      icon: <Receipt />,
      path: '/admin/orders',
      color: '#c41e3a'
    },
    {
      text: 'Khách hàng',
      icon: <People />,
      path: '/admin/customers',
      color: '#1a1a1a'
    },
    {
      text: 'Thống kê',
      icon: <BarChart />,
      path: '/admin/statistics',
      color: '#d4af37'
    }
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      bgcolor: '#f8fafc',
      background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fb 100%)',
      borderRight: '1px solid rgba(15, 23, 42, 0.08)'
    }}>
      {/* Logo Header */}
      <Box sx={{ 
        p: 3, 
        textAlign: 'center',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Checkroom sx={{ fontSize: 36, color: '#d4af37', mr: 1.5 }} />
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            color: '#0f172a',
            letterSpacing: 2,
            fontFamily: '"Playfair Display", serif',
            textTransform: 'uppercase'
          }}>
            ELITE MEN
          </Typography>
        </Box>
        <Chip 
          label="ADMIN PANEL" 
          size="small" 
          sx={{ 
            bgcolor: '#d4af37', 
            color: '#1a1a1a',
            fontWeight: 'bold',
            fontSize: '0.7rem',
            letterSpacing: 1,
            border: '1px solid rgba(212, 175, 55, 0.5)'
          }} 
        />
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                borderRadius: 1,
                bgcolor: (location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/products'))
                  ? 'rgba(212, 175, 55, 0.15)' 
                  : 'transparent',
                borderLeft: (location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/products'))
                  ? '3px solid #d4af37' 
                  : '3px solid transparent',
                borderRight: 'none',
                borderTop: 'none',
                borderBottom: 'none',
                py: 1.5,
                '&:hover': {
                  bgcolor: 'rgba(15, 23, 42, 0.04)',
                  borderLeft: '3px solid rgba(212, 175, 55, 0.5)',
                  transform: 'translateX(3px)',
                  transition: 'all 0.2s ease'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ListItemIcon sx={{ 
                color: (location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/products')) ? '#d4af37' : '#64748b',
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiTypography-root': { 
                    color: (location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/products')) ? '#0f172a' : '#334155',
                    fontWeight: (location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/products')) ? 600 : 400,
                    fontSize: '0.95rem',
                    letterSpacing: 0.5
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        p: 2,
        borderTop: '1px solid rgba(15, 23, 42, 0.08)',
        textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(248, 250, 252, 0.9) 100%)'
      }}>
        <Typography variant="caption" sx={{ 
          color: '#64748b',
          fontSize: '0.75rem',
          letterSpacing: 0.5
        }}>
          © 2024 ELITE MEN Admin
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: '#ffffff',
          color: '#1a1a1a',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          borderBottom: '2px solid rgba(212, 175, 55, 0.15)',
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.95) 100%)'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 }, minHeight: { xs: 56, sm: 64 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { md: 'none' },
              color: '#1a1a1a'
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 600,
              color: '#1a1a1a',
              letterSpacing: 0.5,
              fontSize: '1.1rem',
              textTransform: 'uppercase'
            }}
          >
            {menuItems.find(item => item.path === location.pathname || (item.path === '/admin' && location.pathname === '/admin/products'))?.text || 'Quản lý sản phẩm'}
          </Typography>

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton 
              color="inherit" 
              size="large"
              sx={{ 
                color: '#1a1a1a',
                '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' }
              }}
            >
              <Badge badgeContent={3} sx={{ 
                '& .MuiBadge-badge': { 
                  bgcolor: '#c41e3a',
                  color: 'white'
                } 
              }}>
                <Notifications />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <IconButton
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              sx={{ 
                color: '#1a1a1a',
                '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' }
              }}
            >
              <Avatar sx={{ 
                width: 36, 
                height: 36, 
                bgcolor: '#d4af37',
                border: '2px solid rgba(212, 175, 55, 0.3)'
              }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Box>
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
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: 1,
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }
        }}
      >
        <MenuItem 
          onClick={() => navigate('/admin/profile')}
          sx={{
            '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' }
          }}
        >
          <AccountCircle sx={{ mr: 2, color: '#1a1a1a' }} />
          Hồ sơ
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={handleLogout} 
          sx={{ 
            color: '#c41e3a',
            '&:hover': { bgcolor: 'rgba(196, 30, 58, 0.1)' }
          }}
        >
          <Logout sx={{ mr: 2 }} />
          Đăng xuất
        </MenuItem>
      </Menu>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: '#f8fafc',
              background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fb 100%)',
              borderRight: '1px solid rgba(15, 23, 42, 0.08)'
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: '#f8fafc',
              background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fb 100%)',
              borderRight: '1px solid rgba(15, 23, 42, 0.08)'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#fafafa',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #fafafa 100%)'
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }} /> {/* Spacer for AppBar */}
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
