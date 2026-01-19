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
  DashboardOutlined,
  Inventory2Outlined,
  ReceiptLongOutlined,
  GroupOutlined,
  Notifications,
  AccountCircle,
  Logout,
  AutoAwesomeOutlined,
  CategoryOutlined,
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

  const palette = {
    wine900: '#1a0f14',
    wine800: '#241018',
    wine700: '#341420',
    cream: '#fbf6f0',
    paper: '#ffffff',
    ink: '#24161a',
    muted: '#6b5a61',
    gold: '#c7a24a',
    rose: '#c3576a',
    border: 'rgba(255,255,255,0.12)',
  } as const;

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
      text: 'Tổng quan',
      icon: <DashboardOutlined />,
      path: '/admin',
      color: palette.gold
    },
    {
      text: 'Quản lý sản phẩm',
      icon: <Inventory2Outlined />,
      path: '/admin/products',
      color: palette.rose
    },
    {
      text: 'Danh mục sản phẩm',
      icon: <CategoryOutlined />,
      path: '/admin/categories',
      color: palette.gold
    },
    {
      text: 'Đơn hàng',
      icon: <ReceiptLongOutlined />,
      path: '/admin/orders',
      color: palette.rose
    },
    {
      text: 'Khách hàng',
      icon: <GroupOutlined />,
      path: '/admin/customers',
      color: palette.gold
    }
  ];

  const drawer = (
    <Box
      sx={{
        height: '100%',
        bgcolor: palette.wine900,
        background: `radial-gradient(1200px 800px at 10% 10%, ${palette.wine700} 0%, ${palette.wine900} 55%, ${palette.wine900} 100%)`,
      }}
    >
      {/* Logo Header */}
      <Box sx={{ 
        p: 3, 
        textAlign: 'center',
        borderBottom: `1px solid ${palette.border}`,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <AutoAwesomeOutlined sx={{ fontSize: 32, color: palette.gold, mr: 1 }} />
          <Typography variant="h5" sx={{ 
            fontWeight: 900, 
            color: 'white',
            letterSpacing: 1
          }}>
            LALUA
          </Typography>
        </Box>
        <Chip 
          label="LALUA ADMIN" 
          size="small" 
          sx={{ 
            bgcolor: 'rgba(199, 162, 74, 0.18)',
            color: palette.gold,
            border: `1px solid rgba(199, 162, 74, 0.28)`,
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
                bgcolor: location.pathname === item.path ? 'rgba(199, 162, 74, 0.12)' : 'transparent',
                border: location.pathname === item.path ? '1px solid rgba(199, 162, 74, 0.22)' : '1px solid transparent',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.08)',
                  transform: 'translateX(5px)',
                  transition: 'all 0.3s ease'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? palette.gold : item.color,
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiTypography-root': { 
                    color: location.pathname === item.path ? palette.gold : 'rgba(255,255,255,0.92)',
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
        borderTop: `1px solid ${palette.border}`,
        textAlign: 'center'
      }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          © 2026 LALUA Admin
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
          bgcolor: 'rgba(255,255,255,0.92)',
          color: palette.ink,
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(26, 15, 20, 0.06)',
          boxShadow: '0 10px 30px rgba(26, 15, 20, 0.08)'
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
            {menuItems.find(item => item.path === location.pathname)?.text || 'Tổng quan'}
          </Typography>

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton color="inherit" size="large" sx={{ bgcolor: 'rgba(26,15,20,0.03)' }}>
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
              <Avatar sx={{ width: 32, height: 32, bgcolor: palette.wine800 }}>
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
              bgcolor: palette.wine900
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
              bgcolor: palette.wine900
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
          bgcolor: palette.cream,
          background: `radial-gradient(1200px 500px at 20% 0%, rgba(199,162,74,0.10) 0%, rgba(199,162,74,0) 55%), radial-gradient(900px 420px at 80% 12%, rgba(195,87,106,0.10) 0%, rgba(195,87,106,0) 60%), ${palette.cream}`,
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
