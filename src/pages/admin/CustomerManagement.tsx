import React, { useEffect, useState } from 'react';
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
  Avatar,
  Grid,
  Stack,
  Tooltip,
  Alert,
  Snackbar,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search,
  Visibility,
  Email,
  ShoppingCart,
  AttachMoney,
  CalendarToday,
  Refresh,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import accountApi, { type AccountItem } from '../../api/admin/accountApi';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openCustomerDetail, setOpenCustomerDetail] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<AccountItem | null>(null);
  const [customers, setCustomers] = useState<AccountItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string>('userId');
  const [sortDir, setSortDir] = useState<string>('desc');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateNumber: number | string) => {
    const d = typeof dateNumber === 'number' ? new Date(dateNumber) : new Date(dateNumber);
    return d.toLocaleDateString('vi-VN');
  };



  const handleViewCustomerDetail = async (customerId: number) => {
    try {
      const data = await accountApi.detail(customerId);
      setSelectedCustomer(data.result);
      setOpenCustomerDetail(true);
    } catch (error) {
      setAlertMessage('Không tải được chi tiết khách hàng, vui lòng thử lại!');
      setShowSuccessAlert(true);
    }
  };

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await accountApi.list({
        search: searchTerm || undefined,
        page_no: page + 1,
        page_size: rowsPerPage,
        sort_by: sortBy,
        sort_dir: sortDir,
      });
      setCustomers(data.result.content);
      setTotalCount(data.result.totalElement);
    } catch (error) {
      setAlertMessage('Không tải được danh sách khách hàng, vui lòng thử lại!');
      setShowSuccessAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, searchTerm, sortBy, sortDir]);

  const handleSearchSubmit = () => {
    setPage(0);
    setSearchTerm(searchInput.trim());
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                      src={undefined} 
                      sx={{ width: 60, height: 60, bgcolor: '#667eea' }}
                    >
                      {selectedCustomer.username?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {selectedCustomer.username}
                      </Typography>
    
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Email:</strong> {selectedCustomer.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Ngày tạo:</strong> {formatDate(selectedCustomer.createdAt)}
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
                        {selectedCustomer.totalOrder}
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
                        {formatPrice(selectedCustomer.totalSpending)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tổng chi tiêu
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* No recent orders info in API response */}
          </Grid>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: '#f8f9fa' }}>
        <Button onClick={() => setOpenCustomerDetail(false)}>
          Đóng
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
          Quản lý danh sách khách hàng (dữ liệu từ API)
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton size="small" onClick={handleSearchSubmit}>
                      <Search sx={{ fontSize: 20 }} />
                    </IconButton>
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

          <Grid size={{xs:12, md:9}}>
            <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Sắp xếp theo</InputLabel>
                <Select
                  value={sortBy}
                  label="Sắp xếp theo"
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(0);
                  }}
                  sx={{
                    height: 40,
                    fontSize: '0.875rem'
                  }}
                >
                  <MenuItem value="userId">ID khách hàng</MenuItem>
                  <MenuItem value="username">Tên đăng nhập</MenuItem>
                  <MenuItem value="createdAt">Ngày tạo</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Thứ tự</InputLabel>
                <Select
                  value={sortDir}
                  label="Thứ tự"
                  onChange={(e) => {
                    setSortDir(e.target.value);
                    setPage(0);
                  }}
                  sx={{
                    height: 40,
                    fontSize: '0.875rem'
                  }}
                >
                  <MenuItem value="asc">Tăng dần</MenuItem>
                  <MenuItem value="desc">Giảm dần</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Refresh />}
                onClick={() => {
                  setPage(0);
                  setSearchTerm('');
                  setSearchInput('');
                  setSortBy('userId');
                  setSortDir('desc');
                }}
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
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 400,
              p: 6,
            }}
          >
            <CircularProgress size={48} sx={{ mb: 2, color: '#1976d2' }} />
            <Typography variant="body1" color="text.secondary">
              Đang tải dữ liệu...
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                    <TableCell sx={{ fontWeight: 700 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        Khách hàng
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (sortBy === 'userId') {
                              setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortBy('userId');
                              setSortDir('desc');
                            }
                            setPage(0);
                          }}
                          sx={{ 
                            p: 0.5,
                            color: sortBy === 'userId' ? '#667eea' : 'inherit'
                          }}
                        >
                          {sortBy === 'userId' && sortDir === 'asc' ? (
                            <ArrowUpward sx={{ fontSize: 16 }} />
                          ) : (
                            <ArrowDownward sx={{ fontSize: 16 }} />
                          )}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        Liên hệ
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (sortBy === 'username') {
                              setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortBy('username');
                              setSortDir('desc');
                            }
                            setPage(0);
                          }}
                          sx={{ 
                            p: 0.5,
                            color: sortBy === 'username' ? '#667eea' : 'inherit'
                          }}
                        >
                          {sortBy === 'username' && sortDir === 'asc' ? (
                            <ArrowUpward sx={{ fontSize: 16 }} />
                          ) : (
                            <ArrowDownward sx={{ fontSize: 16 }} />
                          )}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Tổng đơn hàng</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Tổng chi tiêu</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        Ngày tạo
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (sortBy === 'createdAt') {
                              setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortBy('createdAt');
                              setSortDir('desc');
                            }
                            setPage(0);
                          }}
                          sx={{ 
                            p: 0.5,
                            color: sortBy === 'createdAt' ? '#667eea' : 'inherit'
                          }}
                        >
                          {sortBy === 'createdAt' && sortDir === 'asc' ? (
                            <ArrowUpward sx={{ fontSize: 16 }} />
                          ) : (
                            <ArrowDownward sx={{ fontSize: 16 }} />
                          )}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          Không có dữ liệu
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    customers.map((customer) => (
                <TableRow key={customer.userId} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={undefined}
                        sx={{ width: 50, height: 50 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {customer.username}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: #{customer.userId}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {customer.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {customer.totalOrder}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                      {formatPrice(customer.totalSpending)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(customer.createdAt)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Xem chi tiết">
                        <IconButton 
                          size="small" 
                          sx={{ color: '#2196F3' }}
                          onClick={() => handleViewCustomerDetail(customer.userId)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} của ${count !== -1 ? count : `hơn ${to}`}`
          }
            />
          </>
        )}
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
