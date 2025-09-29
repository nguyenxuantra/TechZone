import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Stack,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Save,
  Notifications,
  Security,
  Store,
  Payment,
  LocalShipping,
  PhotoCamera
} from '@mui/icons-material';

const Settings = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);

  // Store settings
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'TECH BIT',
    storeDescription: 'Cửa hàng công nghệ hàng đầu Việt Nam',
    storeEmail: 'contact@techzone.vn',
    storePhone: '1900-1234',
    storeAddress: '123 Đường ABC, Quận 1, TP.HCM',
    storeLogo: 'https://via.placeholder.com/100x100',
    currency: 'VND',
    timezone: 'Asia/Ho_Chi_Minh',
    language: 'vi'
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    inventoryNotifications: true,
    customerNotifications: true,
    marketingNotifications: false
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5
  });

  // Shipping settings
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 500000,
    defaultShippingCost: 30000,
    expressShippingCost: 50000,
    allowInternationalShipping: false
  });

  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCash: true,
    acceptBankTransfer: true,
    acceptCreditCard: true,
    acceptMoMo: true,
    acceptZaloPay: false,
    autoConfirmOrders: false
  });

  const handleSaveSettings = () => {
    setShowSuccessAlert(true);
    // Here you would typically save to backend
  };

  const handleNotificationChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: event.target.checked
    });
  };

  const handleSecurityChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: event.target.checked
    });
  };

  const handlePaymentChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentSettings({
      ...paymentSettings,
      [setting]: event.target.checked
    });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#2c3e50', mb: 1 }}>
          Cài đặt hệ thống
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý cài đặt cửa hàng, thông báo, bảo mật và các tùy chọn khác
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Store Information */}
        <Grid size={{xs:12, lg:8}}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              mb: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Store sx={{ fontSize: 28, color: '#667eea' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                Thông tin cửa hàng
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Tên cửa hàng"
                  value={storeSettings.storeName}
                  onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Email liên hệ"
                  value={storeSettings.storeEmail}
                  onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={storeSettings.storePhone}
                  onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Tiền tệ</InputLabel>
                  <Select
                    value={storeSettings.currency}
                    label="Tiền tệ"
                    onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
                  >
                    <MenuItem value="VND">VND (₫)</MenuItem>
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  label="Địa chỉ cửa hàng"
                  value={storeSettings.storeAddress}
                  onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  label="Mô tả cửa hàng"
                  multiline
                  rows={3}
                  value={storeSettings.storeDescription}
                  onChange={(e) => setStoreSettings({...storeSettings, storeDescription: e.target.value})}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Notification Settings */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              mb: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Notifications sx={{ fontSize: 28, color: '#667eea' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                Cài đặt thông báo
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{xs:12, md:6}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange('emailNotifications')}
                      color="primary"
                    />
                  }
                  label="Thông báo qua email"
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationChange('smsNotifications')}
                      color="primary"
                    />
                  }
                  label="Thông báo qua SMS"
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.orderNotifications}
                      onChange={handleNotificationChange('orderNotifications')}
                      color="primary"
                    />
                  }
                  label="Thông báo đơn hàng mới"
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.inventoryNotifications}
                      onChange={handleNotificationChange('inventoryNotifications')}
                      color="primary"
                    />
                  }
                  label="Thông báo tồn kho thấp"
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Security Settings */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              mb: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Security sx={{ fontSize: 28, color: '#667eea' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                Cài đặt bảo mật
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{xs:12, md:6}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onChange={handleSecurityChange('twoFactorAuth')}
                      color="primary"
                    />
                  }
                  label="Xác thực 2 yếu tố"
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Thời gian timeout phiên (phút)"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Sidebar Settings */}
        <Grid size={{xs:12, lg:4}}>
          {/* Store Logo */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              mb: 3
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', mb: 2 }}>
              Logo cửa hàng
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={storeSettings.storeLogo}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    bgcolor: 'white',
                    boxShadow: 2,
                    '&:hover': { bgcolor: 'white' }
                  }}
                  onClick={() => setOpenAvatarDialog(true)}
                >
                  <PhotoCamera />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Nhấn để thay đổi logo
              </Typography>
            </Box>
          </Paper>

          {/* Shipping Settings */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              mb: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <LocalShipping sx={{ fontSize: 24, color: '#667eea' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                Cài đặt vận chuyển
              </Typography>
            </Box>

            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Ngưỡng miễn phí vận chuyển (₫)"
                type="number"
                value={shippingSettings.freeShippingThreshold}
                onChange={(e) => setShippingSettings({...shippingSettings, freeShippingThreshold: parseInt(e.target.value)})}
              />
              <TextField
                fullWidth
                label="Phí vận chuyển mặc định (₫)"
                type="number"
                value={shippingSettings.defaultShippingCost}
                onChange={(e) => setShippingSettings({...shippingSettings, defaultShippingCost: parseInt(e.target.value)})}
              />
              <TextField
                fullWidth
                label="Phí vận chuyển nhanh (₫)"
                type="number"
                value={shippingSettings.expressShippingCost}
                onChange={(e) => setShippingSettings({...shippingSettings, expressShippingCost: parseInt(e.target.value)})}
              />
            </Stack>
          </Paper>

          {/* Payment Settings */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Payment sx={{ fontSize: 24, color: '#667eea' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                Phương thức thanh toán
              </Typography>
            </Box>

            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={paymentSettings.acceptCash}
                    onChange={handlePaymentChange('acceptCash')}
                    color="primary"
                  />
                }
                label="Tiền mặt"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={paymentSettings.acceptBankTransfer}
                    onChange={handlePaymentChange('acceptBankTransfer')}
                    color="primary"
                  />
                }
                label="Chuyển khoản"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={paymentSettings.acceptCreditCard}
                    onChange={handlePaymentChange('acceptCreditCard')}
                    color="primary"
                  />
                }
                label="Thẻ tín dụng"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={paymentSettings.acceptMoMo}
                    onChange={handlePaymentChange('acceptMoMo')}
                    color="primary"
                  />
                }
                label="MoMo"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={paymentSettings.acceptZaloPay}
                    onChange={handlePaymentChange('acceptZaloPay')}
                    color="primary"
                  />
                }
                label="ZaloPay"
              />
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Save />}
          onClick={handleSaveSettings}
          sx={{
            bgcolor: '#667eea',
            '&:hover': { bgcolor: '#5a6fd8' },
            px: 4,
            py: 1.5
          }}
        >
          Lưu cài đặt
        </Button>
      </Box>

      {/* Avatar Upload Dialog */}
      <Dialog open={openAvatarDialog} onClose={() => setOpenAvatarDialog(false)}>
        <DialogTitle>Thay đổi logo cửa hàng</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="URL logo"
            value={storeSettings.storeLogo}
            onChange={(e) => setStoreSettings({...storeSettings, storeLogo: e.target.value})}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAvatarDialog(false)}>Hủy</Button>
          <Button onClick={() => setOpenAvatarDialog(false)} variant="contained">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Alert */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
      >
        <Alert 
          onClose={() => setShowSuccessAlert(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Đã lưu cài đặt thành công!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
