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
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  Settings,
  Notifications,
  AccountCircle,
  Logout,
  Store,
  Category,
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
      text: 'Dashboard',
      icon: <Dashboard />,
      path: '/admin',
      color: '#667eea'
    },
    {
      text: 'Quản lý sản phẩm',
      icon: <Inventory />,
      path: '/admin/products',
      color: '#4CAF50'
    },
    {
      text: 'Danh mục sản phẩm',
      icon: <Category />,
      path: '/admin/categories',
      color: '#FF9800'
    },
    {
      text: 'Đơn hàng',
      icon: <ShoppingCart />,
      path: '/admin/orders',
      color: '#2196F3'
    },
    {
      text: 'Khách hàng',
      icon: <People />,
      path: '/admin/customers',
      color: '#9C27B0'
    },
    {
      text: 'Cài đặt',
      icon: <Settings />,
      path: '/admin/settings',
      color: '#757575'
    }
  ];

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#1a1a3a' }}>
      {/* Logo Header */}
      <Box sx={{ 
        p: 3, 
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Store sx={{ fontSize: 32, color: '#667eea', mr: 1 }} />
          <Typography variant="h5" sx={{ 
            fontWeight: 900, 
            color: 'white',
            letterSpacing: 1
          }}>
            TECH BIT
          </Typography>
        </Box>
        <Chip 
          label="ADMIN PANEL" 
          size="small" 
          sx={{ 
            bgcolor: '#667eea', 
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.7rem'
          }} 
        />
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                borderRadius: 2,
                bgcolor: location.pathname === item.path ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                border: location.pathname === item.path ? '1px solid rgba(102, 126, 234, 0.3)' : 'none',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateX(5px)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? '#667eea' : item.color,
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiTypography-root': { 
                    color: location.pathname === item.path ? '#667eea' : 'white',
                    fontWeight: location.pathname === item.path ? 600 : 400
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
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center'
      }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          © 2024 TECH BIT Admin
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
          bgcolor: 'white',
          color: '#2c3e50',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton color="inherit" size="large">
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <IconButton
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#667eea' }}>
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
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            borderRadius: 2
          }
        }}
      >
        <MenuItem onClick={() => navigate('/admin/profile')}>
          <AccountCircle sx={{ mr: 2 }} />
          Hồ sơ
        </MenuItem>
        <MenuItem onClick={() => navigate('/admin/settings')}>
          <Settings sx={{ mr: 2 }} />
          Cài đặt
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: '#e74c3c' }}>
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
              bgcolor: '#1a1a3a'
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
              bgcolor: '#1a1a3a'
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
          bgcolor: '#f5f7fa',
          minHeight: '100vh'
        }}
      >
        <Toolbar /> {/* Spacer for AppBar */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
