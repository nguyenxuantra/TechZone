import React, { useState, useEffect } from 'react';
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
  CircularProgress
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
import orderApi, { type Order } from '../../api/admin/orderApi';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage,] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const params: any = {
          pageNo: page,
          pageSize: rowsPerPage,
        };
        if (selectedStatus !== 'all') {
          params.status = selectedStatus;
        }
        const response = await orderApi.getOrders(params);
        if (response.result) {
          setOrders(response.result.content || []);
          setTotalElements(response.result.totalElement || 0);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setShowSuccessAlert(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, rowsPerPage, selectedStatus]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
      case 'DELIVERED':
        return '#4CAF50';
      case 'SHIPPING':
      case 'IN_TRANSIT':
        return '#2196F3';
      case 'PENDING':
      case 'PROCESSING':
        return '#FF9800';
      case 'CANCELLED':
      case 'CANCELED':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
      case 'DELIVERED':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'SHIPPING':
      case 'IN_TRANSIT':
        return <LocalShipping sx={{ fontSize: 16 }} />;
      case 'PENDING':
      case 'PROCESSING':
        return <Schedule sx={{ fontSize: 16 }} />;
      case 'CANCELLED':
      case 'CANCELED':
        return <Cancel sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'Chờ xử lý';
      case 'PROCESSING':
        return 'Đang xử lý';
      case 'SHIPPING':
      case 'IN_TRANSIT':
        return 'Đang giao';
      case 'DELIVERED':
      case 'COMPLETED':
        return 'Đã giao';
      case 'CANCELLED':
      case 'CANCELED':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const handleViewOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setOpenOrderDetail(true);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = () => {
    setPage(0);
    setSearchTerm('');
    setSelectedStatus('all');
  };

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
        Chi tiết đơn hàng #{selectedOrder?.orderId}
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        {selectedOrder && (
          <Grid container spacing={3}>
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
                      <strong>Mã đơn:</strong> #{selectedOrder.orderId}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>User ID:</strong> {selectedOrder.userId}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Ngày tạo:</strong> {formatDate(selectedOrder.createdAt)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Address ID:</strong> {selectedOrder.addressId || '-'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      <strong>Coupon ID:</strong> {selectedOrder.couponId || '-'}
                    </Typography>
                  </Box>
                  <Box>
                    <Chip 
                      label={getStatusLabel(selectedOrder.status)} 
                      size="small"
                      icon={getStatusIcon(selectedOrder.status) || undefined}
                      sx={{ 
                        bgcolor: `${getStatusColor(selectedOrder.status)}15`,
                        color: getStatusColor(selectedOrder.status),
                        fontWeight: 600
                      }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Total Amount */}
            <Grid size={{xs:12, md:6}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Tổng tiền
              </Typography>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#667eea', 
                color: 'white', 
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {formatPrice(selectedOrder.totalAmount)}
                </Typography>
              </Box>
            </Grid>

            {/* Products */}
            <Grid size={{xs:12}}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Sản phẩm đã đặt ({selectedOrder.items.length})
              </Typography>
              <List sx={{ p: 0, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                {selectedOrder.items.map((item, index) => (
                  <Box key={item.orderItemId}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar 
                          src={item.productImageUrl || undefined}
                          sx={{ bgcolor: 'primary.main' }}
                        >
                          {item.productName.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.productName}
                        secondary={`Số lượng: ${item.quantity} | Giá: ${formatPrice(item.price)}`}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatPrice(item.price * item.quantity)}
                      </Typography>
                    </ListItem>
                    {index < selectedOrder.items.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
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
                <MenuItem value="PENDING">Chờ xử lý</MenuItem>
                <MenuItem value="PROCESSING">Đang xử lý</MenuItem>
                <MenuItem value="SHIPPING">Đang giao</MenuItem>
                <MenuItem value="DELIVERED">Đã giao</MenuItem>
                <MenuItem value="CANCELLED">Đã hủy</MenuItem>
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
                onClick={handleRefresh}
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
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Mã đơn</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>User ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Tổng tiền</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Trạng thái</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Ngày tạo</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Address ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Coupon ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Không có đơn hàng nào
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.orderId} hover>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          #{order.orderId}
                        </Typography>
                      </TableCell>
                      
                      <TableCell>
                        <Typography variant="body2">
                          {order.userId}
                        </Typography>
                      </TableCell>
                      
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                          {formatPrice(order.totalAmount)}
                        </Typography>
                      </TableCell>
                      
                      <TableCell>
                        <Chip 
                          label={getStatusLabel(order.status)} 
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
                          {formatDate(order.createdAt)}
                        </Typography>
                      </TableCell>
                      
                      <TableCell>
                        <Typography variant="body2">
                          {order.addressId || '-'}
                        </Typography>
                      </TableCell>
                      
                      <TableCell>
                        <Typography variant="body2">
                          {order.couponId || '-'}
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
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalElements}
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
