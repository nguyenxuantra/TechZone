import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  IconButton,
  Badge,
  Stack
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Edit,
  Save,
  Cancel,
  ShoppingBag,
  Settings,
  Security,
  Notifications,
  VpnKey,
  Home,
  Business,
  LocalShipping,
  Payment,
  History
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // User data
  const [userData,] = useState({
    firstName: 'Nguyễn Văn',
    lastName: 'An',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    avatar: 'https://via.placeholder.com/150',
    addresses: [
      {
        id: 1,
        type: 'Nhà riêng',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        isDefault: true
      },
      {
        id: 2,
        type: 'Công ty',
        address: '456 Đường XYZ, Quận 3, TP.HCM',
        isDefault: false
      }
    ]
  });

  // Settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false
  });

  // Sample orders
  const [orders] = useState([
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Đã giao',
      total: 19990000,
      items: [
        { name: 'Laptop Gaming MSI GF63', quantity: 1, price: 19990000 }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'Đang giao',
      total: 34980000,
      items: [
        { name: 'iPhone 15 Pro Max 256GB', quantity: 1, price: 27990000 },
        { name: 'Tai nghe Sony WH-1000XM5', quantity: 1, price: 6990000 }
      ]
    }
  ]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    setIsEditing(false);
    setAlertMessage('Cập nhật thông tin thành công!');
    setShowAlert(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSettingChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [setting]: event.target.checked
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã giao': return 'success';
      case 'Đang giao': return 'warning';
      case 'Chờ xử lý': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Đã giao': return <LocalShipping />;
      case 'Đang giao': return <LocalShipping />;
      case 'Chờ xử lý': return <Payment />;
      default: return <History />;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 3
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              color: '#2c3e50', 
              mb: 2,
              background: 'linear-gradient(45deg, #2c3e50 30%, #667eea 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Thông tin cá nhân
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            Quản lý thông tin cá nhân, địa chỉ giao hàng và cài đặt tài khoản
          </Typography>
        </Box>

        {/* Profile Overview */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, md: 4 }, 
            mb: 4, 
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' }, 
            gap: 4, 
            mb: 3 
          }}>
            <Box sx={{ position: 'relative' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: '#667eea',
                      color: 'white',
                      '&:hover': { bgcolor: '#5a6fd8' }
                    }}
                  >
                    <Edit sx={{ fontSize: 16 }} />
                  </IconButton>
                }
              >
                <Avatar
                  src={userData.avatar}
                  sx={{ 
                    width: { xs: 120, md: 150 }, 
                    height: { xs: 120, md: 150 }, 
                    border: '4px solid #667eea',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                  }}
                />
              </Badge>
            </Box>
            
            <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  color: '#2c3e50',
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
                }}
              >
                {userData.firstName} {userData.lastName}
              </Typography>
              
              <Stack spacing={2} sx={{ mb: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Email sx={{ color: '#667eea', fontSize: 20 }} />
                  <Typography variant="body1" color="text.secondary">
                    {userData.email}
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <Phone sx={{ color: '#667eea', fontSize: 20 }} />
                  <Typography variant="body1" color="text.secondary">
                    {userData.phone}
                  </Typography>
                </Box>
              </Stack>

              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2}
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
              >
                <Button
                  variant="contained"
                  startIcon={isEditing ? <Save /> : <Edit />}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  sx={{ 
                    bgcolor: '#667eea',
                    '&:hover': { bgcolor: '#5a6fd8' },
                    borderRadius: 3,
                    px: 3,
                    py: 1.5
                  }}
                >
                  {isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa'}
                </Button>
                {isEditing && (
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    sx={{ 
                      borderColor: '#e74c3c', 
                      color: '#e74c3c',
                      '&:hover': { 
                        borderColor: '#c0392b', 
                        bgcolor: 'rgba(231, 76, 60, 0.04)' 
                      },
                      borderRadius: 3,
                      px: 3,
                      py: 1.5
                    }}
                  >
                    Hủy
                  </Button>
                )}
              </Stack>
            </Box>
          </Box>
        </Paper>

        {/* Tabs */}
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 4,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="profile tabs"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minHeight: 64,
                  px: 3
                }
              }}
            >
              <Tab label="Thông tin cá nhân" icon={<Person />} iconPosition="start" />
              <Tab label="Địa chỉ giao hàng" icon={<LocationOn />} iconPosition="start" />
              <Tab label="Lịch sử đơn hàng" icon={<ShoppingBag />} iconPosition="start" />
              <Tab label="Cài đặt" icon={<Settings />} iconPosition="start" />
            </Tabs>
          </Box>

          {/* Personal Information Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#2c3e50' }}>
                Thông tin cơ bản
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{xs:12, md:6}}>
                  <TextField
                    label="Họ"
                    value={userData.firstName}
                    fullWidth
                    disabled={!isEditing}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: '#667eea' }} />
                    }}
                  />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                  <TextField
                    label="Tên"
                    value={userData.lastName}
                    fullWidth
                    disabled={!isEditing}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: '#667eea' }} />
                    }}
                  />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                  <TextField
                    label="Email"
                    value={userData.email}
                    fullWidth
                    disabled={!isEditing}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: '#667eea' }} />
                    }}
                  />
                </Grid>
                <Grid size={{xs:12, md:6}}>
                  <TextField
                    label="Số điện thoại"
                    value={userData.phone}
                    fullWidth
                    disabled={!isEditing}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: '#667eea' }} />
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Addresses Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 4 
              }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                  Địa chỉ giao hàng
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  sx={{ 
                    bgcolor: '#667eea', 
                    '&:hover': { bgcolor: '#5a6fd8' },
                    borderRadius: 3,
                    px: 3,
                    py: 1.5
                  }}
                >
                  Thêm địa chỉ mới
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {userData.addresses.map((address) => (
                  <Grid size={{xs:12, md:6}} key={address.id}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'flex-start', 
                          mb: 2 
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {address.type === 'Nhà riêng' ? (
                              <Home sx={{ color: '#667eea', fontSize: 20 }} />
                            ) : (
                              <Business sx={{ color: '#667eea', fontSize: 20 }} />
                            )}
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {address.type}
                            </Typography>
                          </Box>
                          {address.isDefault && (
                            <Chip 
                              label="Mặc định" 
                              size="small" 
                              color="primary" 
                              sx={{ fontWeight: 600 }}
                            />
                          )}
                        </Box>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ mb: 3, lineHeight: 1.6 }}
                        >
                          {address.address}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              borderColor: '#667eea', 
                              color: '#667eea',
                              '&:hover': { 
                                borderColor: '#5a6fd8', 
                                bgcolor: 'rgba(102, 126, 234, 0.04)' 
                              }
                            }}
                          >
                            Chỉnh sửa
                          </Button>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="error"
                            sx={{ 
                              '&:hover': { 
                                bgcolor: 'rgba(231, 76, 60, 0.04)' 
                              }
                            }}
                          >
                            Xóa
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>

          {/* Order History Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: '#2c3e50' }}>
                Lịch sử đơn hàng
              </Typography>
              <List sx={{ bgcolor: 'transparent' }}>
                {orders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.7)',
                        borderRadius: 3,
                        mb: 2,
                        p: 3,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.9)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#667eea' }}>
                          {getStatusIcon(order.status)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mb: 1
                          }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                              Đơn hàng {order.id}
                            </Typography>
                            <Chip
                              label={order.status}
                              color={getStatusColor(order.status) as any}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Ngày đặt: {formatDate(order.date)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {order.items.length} sản phẩm
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                              Tổng tiền: {formatPrice(order.total)}
                            </Typography>
                          </Box>
                        }
                      />
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                          borderColor: '#667eea', 
                          color: '#667eea',
                          '&:hover': { 
                            borderColor: '#5a6fd8', 
                            bgcolor: 'rgba(102, 126, 234, 0.04)' 
                          }
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </ListItem>
                    {index < orders.length - 1 && (
                      <Divider variant="inset" component="li" sx={{ my: 2 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </TabPanel>

          {/* Settings Tab */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: '#2c3e50' }}>
                Cài đặt tài khoản
              </Typography>
              <Grid container spacing={4}>
                <Grid size={{xs:12, md:6}}>
                  <Card sx={{ 
                    p: 3, 
                    height: '100%',
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Notifications sx={{ color: '#667eea', fontSize: 28 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                        Thông báo
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.emailNotifications}
                            onChange={handleSettingChange('emailNotifications')}
                            color="primary"
                          />
                        }
                        label="Thông báo qua email"
                        sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500 } }}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.smsNotifications}
                            onChange={handleSettingChange('smsNotifications')}
                            color="primary"
                          />
                        }
                        label="Thông báo qua SMS"
                        sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500 } }}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.marketingEmails}
                            onChange={handleSettingChange('marketingEmails')}
                            color="primary"
                          />
                        }
                        label="Email marketing"
                        sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500 } }}
                      />
                    </Box>
                  </Card>
                </Grid>
                
                <Grid size={{xs:12, md:6}}>
                  <Card sx={{ 
                    p: 3, 
                    height: '100%',
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Security sx={{ color: '#667eea', fontSize: 28 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                        Bảo mật
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={settings.twoFactorAuth}
                            onChange={handleSettingChange('twoFactorAuth')}
                            color="primary"
                          />
                        }
                        label="Xác thực 2 yếu tố"
                        sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500 } }}
                      />
                      <Button
                        variant="outlined"
                        startIcon={<VpnKey />}
                        sx={{ 
                          alignSelf: 'flex-start',
                          borderColor: '#667eea',
                          color: '#667eea',
                          '&:hover': { 
                            borderColor: '#5a6fd8', 
                            bgcolor: 'rgba(102, 126, 234, 0.04)' 
                          },
                          borderRadius: 3,
                          px: 3,
                          py: 1.5
                        }}
                      >
                        Đổi mật khẩu
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Paper>

        {/* Alert */}
        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={() => setShowAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setShowAlert(false)} 
            severity="success"
            sx={{ 
              borderRadius: 3,
              '& .MuiAlert-icon': { fontSize: 28 }
            }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Profile;
