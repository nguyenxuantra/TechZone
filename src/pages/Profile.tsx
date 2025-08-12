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
  Snackbar
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

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#2c3e50', mb: 1 }}>
          Thông tin cá nhân
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý thông tin cá nhân, địa chỉ giao hàng và cài đặt tài khoản
        </Typography>
      </Box>

      {/* Profile Overview */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Avatar
            src={userData.avatar}
            sx={{ width: 100, height: 100, border: '4px solid #667eea' }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              <Email sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
              {userData.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <Phone sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
              {userData.phone}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={isEditing ? <Save /> : <Edit />}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            sx={{ borderColor: '#667eea', color: '#667eea' }}
          >
            {isEditing ? 'Lưu' : 'Chỉnh sửa'}
          </Button>
          {isEditing && (
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={handleCancel}
              sx={{ borderColor: '#e74c3c', color: '#e74c3c' }}
            >
              Hủy
            </Button>
          )}
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ borderRadius: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
            <Tab label="Thông tin cá nhân" icon={<Person />} iconPosition="start" />
            <Tab label="Địa chỉ giao hàng" icon={<LocationOn />} iconPosition="start" />
            <Tab label="Lịch sử đơn hàng" icon={<ShoppingBag />} iconPosition="start" />
            <Tab label="Cài đặt" icon={<Settings />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Personal Information Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid size={{xs:12, md:6}}>
              <TextField
                label="Họ"
                value={userData.firstName}
                fullWidth
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <TextField
                label="Tên"
                value={userData.lastName}
                fullWidth
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <TextField
                label="Email"
                value={userData.email}
                fullWidth
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12, md:6}}>
              <TextField
                label="Số điện thoại"
                value={userData.phone}
                fullWidth
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Addresses Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<Edit />}
              sx={{ bgcolor: '#667eea', '&:hover': { bgcolor: '#5a6fd8' } }}
            >
              Thêm địa chỉ mới
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {userData.addresses.map((address) => (
              <Grid size={{xs:12, md:6}} key={address.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {address.type}
                      </Typography>
                      {address.isDefault && (
                        <Chip label="Mặc định" size="small" color="primary" />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {address.address}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined">
                        Chỉnh sửa
                      </Button>
                      <Button size="small" variant="outlined" color="error">
                        Xóa
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Order History Tab */}
        <TabPanel value={tabValue} index={2}>
          <List>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#667eea' }}>
                      <ShoppingBag />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Đơn hàng {order.id}
                        </Typography>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status) as any}
                          size="small"
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
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                          Tổng tiền: {formatPrice(order.total)}
                        </Typography>
                      </Box>
                    }
                  />
                  <Button variant="outlined" size="small">
                    Xem chi tiết
                  </Button>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {/* Settings Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Thông báo
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={handleSettingChange('emailNotifications')}
                      color="primary"
                    />
                  }
                  label="Thông báo qua email"
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
                />
              </Box>
            </Grid>
            
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Bảo mật
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={handleSettingChange('twoFactorAuth')}
                      color="primary"
                    />
                  }
                  label="Xác thực 2 yếu tố"
                />
                <Button
                  variant="outlined"
                  startIcon={<Security />}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Đổi mật khẩu
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Alert */}
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
