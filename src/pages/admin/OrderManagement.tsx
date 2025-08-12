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
  Divider
} from '@mui/material';
import {
  Search,
  Edit,
  Visibility,
  LocalShipping,
  CheckCircle,
  Schedule,
  Cancel,
  FilterList,
  Sort,
  Refresh,
  Receipt,
  Person,
  Phone,
  LocationOn,
  Payment
} from '@mui/icons-material';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage,] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Sample orders data
  const [orders,] = useState([
    {
      id: 'ORD001',
      customer: {
        name: 'Nguyễn Văn A',
        phone: '0123456789',
        email: 'nguyenvana@email.com',
        address: '123 Đường ABC, Quận 1, TP.HCM'
      },
      products: [
        {
          name: 'Laptop Gaming MSI GF63',
          price: 19990000,
          quantity: 1,
          image: 'https://via.placeholder.com/50x50'
        }
      ],
      total: 19990000,
      status: 'Đang giao',
      paymentMethod: 'Thanh toán khi nhận hàng',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-18',
      shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
      notes: 'Giao hàng vào buổi chiều'
    },
    {
      id: 'ORD002',
      customer: {
        name: 'Trần Thị B',
        phone: '0987654321',
        email: 'tranthib@email.com',
        address: '456 Đường XYZ, Quận 3, TP.HCM'
      },
      products: [
        {
          name: 'iPhone 15 Pro Max 256GB',
          price: 27990000,
          quantity: 1,
          image: 'https://via.placeholder.com/50x50'
        },
        {
          name: 'Tai nghe Sony WH-1000XM5',
          price: 6990000,
          quantity: 1,
          image: 'https://via.placeholder.com/50x50'
        }
      ],
      total: 34980000,
      status: 'Đã giao',
      paymentMethod: 'Chuyển khoản ngân hàng',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-16',
      shippingAddress: '456 Đường XYZ, Quận 3, TP.HCM',
      notes: ''
    },
    {
      id: 'ORD003',
      customer: {
        name: 'Lê Văn C',
        phone: '0555666777',
        email: 'levanc@email.com',
        address: '789 Đường DEF, Quận 7, TP.HCM'
      },
      products: [
        {
          name: 'PC Gaming RTX 4070',
          price: 35990000,
          quantity: 1,
          image: 'https://via.placeholder.com/50x50'
        }
      ],
      total: 35990000,
      status: 'Chờ xử lý',
      paymentMethod: 'Thanh toán khi nhận hàng',
      orderDate: '2024-01-16',
      deliveryDate: null,
      shippingAddress: '789 Đường DEF, Quận 7, TP.HCM',
      notes: 'Cần kiểm tra kỹ trước khi giao'
    },
    {
      id: 'ORD004',
      customer: {
        name: 'Phạm Thị D',
        phone: '0333444555',
        email: 'phamthid@email.com',
        address: '321 Đường GHI, Quận 2, TP.HCM'
      },
      products: [
        {
          name: 'MacBook Pro M3 14 inch',
          price: 45990000,
          quantity: 1,
          image: 'https://via.placeholder.com/50x50'
        }
      ],
      total: 45990000,
      status: 'Đã hủy',
      paymentMethod: 'Chuyển khoản ngân hàng',
      orderDate: '2024-01-13',
      deliveryDate: null,
      shippingAddress: '321 Đường GHI, Quận 2, TP.HCM',
      notes: 'Khách hàng yêu cầu hủy đơn'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã giao':
        return '#4CAF50';
      case 'Đang giao':
        return '#2196F3';
      case 'Chờ xử lý':
        return '#FF9800';
      case 'Đã hủy':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Đã giao':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'Đang giao':
        return <LocalShipping sx={{ fontSize: 16 }} />;
      case 'Chờ xử lý':
        return <Schedule sx={{ fontSize: 16 }} />;
      case 'Đã hủy':
        return <Cancel sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  const handleViewOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setOpenOrderDetail(true);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const OrderDetailDialog = () => (
    <Dialog 
      open={openOrderDetail} 
      onClose={() => setOpenOrderDetail(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        bgcolor: '#f8f9fa', 
        borderBottom: '1px solid #e0e0e0',
        fontWeight: 700
      }}>
        Chi tiết đơn hàng {selectedOrder?.id}
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        {selectedOrder && (
          <Grid container spacing={3}>
            {/* Customer Info */}
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Thông tin khách hàng
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Tên:</strong> {selectedOrder.customer.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>SĐT:</strong> {selectedOrder.customer.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Email:</strong> {selectedOrder.customer.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Địa chỉ:</strong> {selectedOrder.shippingAddress}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Order Info */}
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Thông tin đơn hàng
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Receipt sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Mã đơn:</strong> {selectedOrder.id}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Ngày đặt:</strong> {formatDate(selectedOrder.orderDate)}
                    </Typography>
                  </Box>
                  {selectedOrder.deliveryDate && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">
                        <strong>Ngày giao:</strong> {formatDate(selectedOrder.deliveryDate)}
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Payment sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Thanh toán:</strong> {selectedOrder.paymentMethod}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">
                      <strong>Ghi chú:</strong> {selectedOrder.notes || 'Không có'}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Products */}
            <Grid size={{xs:12}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Sản phẩm đã đặt
              </Typography>
              <List sx={{ p: 0, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                {selectedOrder.products.map((product: any, index: number) => (
                  <Box key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={product.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.name}
                        secondary={`Số lượng: ${product.quantity} | Giá: ${formatPrice(product.price)}`}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatPrice(product.price * product.quantity)}
                      </Typography>
                    </ListItem>
                    {index < selectedOrder.products.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Grid>

            {/* Total */}
            <Grid size={{xs:12}}>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#667eea', 
                color: 'white', 
                borderRadius: 2,
                textAlign: 'right'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Tổng cộng: {formatPrice(selectedOrder.total)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: '#f8f9fa' }}>
        <Button onClick={() => setOpenOrderDetail(false)}>
          Đóng
        </Button>
        <Button 
          variant="contained"
          sx={{
            bgcolor: '#667eea',
            '&:hover': { bgcolor: '#5a6fd8' }
          }}
        >
          Cập nhật trạng thái
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#2c3e50', mb: 1 }}>
          Quản lý đơn hàng
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý danh sách đơn hàng, cập nhật trạng thái và theo dõi vận chuyển
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
              placeholder="Tìm kiếm đơn hàng..."
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
                <MenuItem value="Chờ xử lý">Chờ xử lý</MenuItem>
                <MenuItem value="Đang giao">Đang giao</MenuItem>
                <MenuItem value="Đã giao">Đã giao</MenuItem>
                <MenuItem value="Đã hủy">Đã hủy</MenuItem>
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
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Orders Table */}
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
                <TableCell sx={{ fontWeight: 700 }}>Mã đơn</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Khách hàng</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Sản phẩm</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tổng tiền</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Ngày đặt</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {order.id}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {order.customer.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.customer.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {order.products.length} sản phẩm
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.products[0]?.name}
                        {order.products.length > 1 && ` +${order.products.length - 1} sản phẩm khác`}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                      {formatPrice(order.total)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      size="small"
                      icon={getStatusIcon(order.status) || undefined}
                      sx={{ 
                        bgcolor: `${getStatusColor(order.status)}15`,
                        color: getStatusColor(order.status),
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(order.orderDate)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Xem chi tiết">
                        <IconButton 
                          size="small" 
                          sx={{ color: '#2196F3' }}
                          onClick={() => handleViewOrderDetail(order)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cập nhật trạng thái">
                        <IconButton 
                          size="small" 
                          sx={{ color: '#4CAF50' }}
                        >
                          <Edit />
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
          count={filteredOrders.length}
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

      {/* Order Detail Dialog */}
      <OrderDetailDialog />

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

export default OrderManagement;
