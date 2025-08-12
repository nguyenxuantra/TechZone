import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
  Grid,
  Stack,
  Tooltip,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import {
  Search,
  Edit,
  Visibility,
  Phone,
  Email,
  LocationOn,
  ShoppingCart,
  AttachMoney,
  CalendarToday,
  FilterList,
  Sort,
  Refresh,
  Add,
  Delete
} from '@mui/icons-material';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCustomerDetail, setOpenCustomerDetail] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Sample customers data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      joinDate: '2023-01-15',
      status: 'active',
      totalOrders: 15,
      totalSpent: 125000000,
      lastOrder: '2024-01-15',
      avatar: 'https://via.placeholder.com/50x50',
      orders: [
        {
          id: 'ORD001',
          date: '2024-01-15',
          total: 19990000,
          status: 'Đang giao'
        },
        {
          id: 'ORD002',
          date: '2024-01-10',
          total: 27990000,
          status: 'Đã giao'
        }
      ]
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0987654321',
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      joinDate: '2023-03-20',
      status: 'active',
      totalOrders: 8,
      totalSpent: 89000000,
      lastOrder: '2024-01-14',
      avatar: 'https://via.placeholder.com/50x50',
      orders: [
        {
          id: 'ORD003',
          date: '2024-01-14',
          total: 34980000,
          status: 'Đã giao'
        }
      ]
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0555666777',
      address: '789 Đường DEF, Quận 7, TP.HCM',
      joinDate: '2023-06-10',
      status: 'active',
      totalOrders: 3,
      totalSpent: 45000000,
      lastOrder: '2024-01-16',
      avatar: 'https://via.placeholder.com/50x50',
      orders: [
        {
          id: 'ORD004',
          date: '2024-01-16',
          total: 35990000,
          status: 'Chờ xử lý'
        }
      ]
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '0333444555',
      address: '321 Đường GHI, Quận 2, TP.HCM',
      joinDate: '2023-08-05',
      status: 'inactive',
      totalOrders: 2,
      totalSpent: 25000000,
      lastOrder: '2023-12-20',
      avatar: 'https://via.placeholder.com/50x50',
      orders: [
        {
          id: 'ORD005',
          date: '2023-12-20',
          total: 25000000,
          status: 'Đã giao'
        }
      ]
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      phone: '0777888999',
      address: '654 Đường JKL, Quận 5, TP.HCM',
      joinDate: '2023-11-12',
      status: 'active',
      totalOrders: 12,
      totalSpent: 180000000,
      lastOrder: '2024-01-12',
      avatar: 'https://via.placeholder.com/50x50',
      orders: [
        {
          id: 'ORD006',
          date: '2024-01-12',
          total: 45990000,
          status: 'Đã giao'
        }
      ]
    }
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };



  const getCustomerLevel = (totalSpent: number) => {
    if (totalSpent >= 100000000) return { level: 'VIP', color: '#FFD700' };
    if (totalSpent >= 50000000) return { level: 'Gold', color: '#FFA500' };
    if (totalSpent >= 20000000) return { level: 'Silver', color: '#C0C0C0' };
    return { level: 'Bronze', color: '#CD7F32' };
  };

  const handleViewCustomerDetail = (customer: any) => {
    setSelectedCustomer(customer);
    setOpenCustomerDetail(true);
  };

  const handleDeleteCustomer = (customerId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      setCustomers(customers.filter(c => c.id !== customerId));
      setAlertMessage('Đã xóa khách hàng thành công!');
      setShowSuccessAlert(true);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedCustomers = filteredCustomers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const CustomerDetailDialog = () => (
    <Dialog 
      open={openCustomerDetail} 
      onClose={() => setOpenCustomerDetail(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        bgcolor: '#f8f9fa', 
        borderBottom: '1px solid #e0e0e0',
        fontWeight: 700
      }}>
        Chi tiết khách hàng
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        {selectedCustomer && (
          <Grid container spacing={3}>
            {/* Customer Info */}
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Thông tin cá nhân
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar 
                      src={selectedCustomer.avatar} 
                      sx={{ width: 60, height: 60 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {selectedCustomer.name}
                      </Typography>
                      <Chip 
                        label={getCustomerLevel(selectedCustomer.totalSpent).level}
                        size="small"
                        sx={{ 
                          bgcolor: getCustomerLevel(selectedCustomer.totalSpent).color,
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Email:</strong> {selectedCustomer.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>SĐT:</strong> {selectedCustomer.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Địa chỉ:</strong> {selectedCustomer.address}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Ngày tham gia:</strong> {formatDate(selectedCustomer.joinDate)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Statistics */}
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Thống kê mua hàng
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{xs:6}}>
                  <Card sx={{ bgcolor: '#E3F2FD' }}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <ShoppingCart sx={{ fontSize: 40, color: '#2196F3', mb: 1 }} />
                      <Typography variant="h4" sx={{ fontWeight: 800, color: '#2196F3' }}>
                        {selectedCustomer.totalOrders}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tổng đơn hàng
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{xs:6}}>
                  <Card sx={{ bgcolor: '#E8F5E8' }}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <AttachMoney sx={{ fontSize: 40, color: '#4CAF50', mb: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#4CAF50' }}>
                        {formatPrice(selectedCustomer.totalSpent)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tổng chi tiêu
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Recent Orders */}
            <Grid size={{xs:12}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Đơn hàng gần đây
              </Typography>
              <List sx={{ p: 0, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                {selectedCustomer.orders.map((order: any, index: number) => (
                  <Box key={order.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#667eea' }}>
                          <ShoppingCart />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={order.id}
                        secondary={`Ngày: ${formatDate(order.date)} | Trạng thái: ${order.status}`}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatPrice(order.total)}
                      </Typography>
                    </ListItem>
                    {index < selectedCustomer.orders.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: '#f8f9fa' }}>
        <Button onClick={() => setOpenCustomerDetail(false)}>
          Đóng
        </Button>
        <Button 
          variant="contained"
          sx={{
            bgcolor: '#667eea',
            '&:hover': { bgcolor: '#5a6fd8' }
          }}
        >
          Chỉnh sửa
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#2c3e50', mb: 1 }}>
          Quản lý khách hàng
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý danh sách khách hàng, thông tin chi tiết và lịch sử mua hàng
        </Typography>
      </Box>

      {/* Actions Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid size={{xs:12, md:3}}>
            <TextField
              size="small"
              placeholder="Tìm kiếm khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 40,
                  fontSize: '0.875rem'
                }
              }}
            />
          </Grid>

          <Grid size={{xs:12, md:2}}>
            <FormControl size="small" fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={selectedStatus}
                label="Trạng thái"
                onChange={(e) => setSelectedStatus(e.target.value)}
                sx={{
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="active">Hoạt động</MenuItem>
                <MenuItem value="inactive">Không hoạt động</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{xs:12, md:7}}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterList />}
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Bộ lọc
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Sort />}
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Sắp xếp
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Refresh />}
                sx={{ 
                  borderColor: '#667eea', 
                  color: '#667eea',
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Làm mới
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<Add />}
                sx={{
                  bgcolor: '#667eea',
                  '&:hover': { bgcolor: '#5a6fd8' },
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                Thêm khách hàng
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Customers Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                <TableCell sx={{ fontWeight: 700 }}>Khách hàng</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Liên hệ</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Cấp độ</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tổng đơn hàng</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tổng chi tiêu</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Đơn hàng cuối</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={customer.avatar}
                        sx={{ width: 50, height: 50 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {customer.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: #{customer.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {customer.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {customer.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Chip 
                      label={getCustomerLevel(customer.totalSpent).level} 
                      size="small"
                      sx={{ 
                        bgcolor: getCustomerLevel(customer.totalSpent).color,
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ShoppingCart sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {customer.totalOrders}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                      {formatPrice(customer.totalSpent)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Chip 
                      label={customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'} 
                      size="small"
                      color={customer.status === 'active' ? 'success' : 'default'}
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">
                      {customer.lastOrder ? formatDate(customer.lastOrder) : 'Chưa có'}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Xem chi tiết">
                        <IconButton 
                          size="small" 
                          sx={{ color: '#2196F3' }}
                          onClick={() => handleViewCustomerDetail(customer)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton 
                          size="small" 
                          sx={{ color: '#4CAF50' }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton 
                          size="small" 
                          sx={{ color: '#F44336' }}
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} của ${count !== -1 ? count : `hơn ${to}`}`
          }
        />
      </Paper>

      {/* Customer Detail Dialog */}
      <CustomerDetailDialog />

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
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerManagement;
