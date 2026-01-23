import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Button,
  ButtonGroup,
  TextField,
  CircularProgress
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  People,
  Inventory,
  Refresh,
  CalendarToday
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import statisticsApi, { type OverviewKPI, type TimeStatistic, type OrdersStatistics, type TopProduct } from '../../api/admin/statisticsApi';

const Dashboard = () => {
  // Overview KPI State
  const [kpiData, setKpiData] = useState<OverviewKPI | null>(null);
  const [kpiLoading, setKpiLoading] = useState(true);
  
  // Time Statistics State
  const [timeData, setTimeData] = useState<TimeStatistic[]>([]);
  const [timeLoading, setTimeLoading] = useState(true);
  const [groupBy, setGroupBy] = useState<'DAY' | 'MONTH' | 'YEAR'>('DAY');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  // Orders Statistics State
  const [ordersData, setOrdersData] = useState<OrdersStatistics | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Top Products State
  const [topProductsData, setTopProductsData] = useState<TopProduct[]>([]);
  const [topProductsLoading, setTopProductsLoading] = useState(true);

  // Load Overview KPI
  useEffect(() => {
    loadOverviewKPI();
  }, []);

  // Load Time Statistics
  useEffect(() => {
    loadTimeStatistics();
  }, [groupBy, fromDate, toDate]);

  // Load Orders Statistics
  useEffect(() => {
    loadOrdersStatistics();
  }, []);

  // Load Top Products
  useEffect(() => {
    loadTopProducts();
  }, []);

  const loadOverviewKPI = async () => {
    try {
      setKpiLoading(true);
      const response = await statisticsApi.getOverview();
      setKpiData(response.result);
    } catch (error) {
      console.error('Error loading overview KPI:', error);
    } finally {
      setKpiLoading(false);
    }
  };

  const loadTimeStatistics = async () => {
    try {
      setTimeLoading(true);
      const response = await statisticsApi.getTimeStatistics({
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
        groupBy
      });
      setTimeData(response.result || []);
    } catch (error) {
      console.error('Error loading time statistics:', error);
      setTimeData([]);
    } finally {
      setTimeLoading(false);
    }
  };

  const loadOrdersStatistics = async () => {
    try {
      setOrdersLoading(true);
      const response = await statisticsApi.getOrdersStatistics();
      setOrdersData(response.result);
    } catch (error) {
      console.error('Error loading orders statistics:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const loadTopProducts = async () => {
    try {
      setTopProductsLoading(true);
      const response = await statisticsApi.getTopProducts();
      setTopProductsData(response.result || []);
    } catch (error) {
      console.error('Error loading top products:', error);
      setTopProductsData([]);
    } finally {
      setTopProductsLoading(false);
    }
  };

  const formatCurrency = (value: number | undefined) => {
    if(value === undefined) return null;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const formatNumber = (value: number | undefined) => {
    if(value === undefined) return null;
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const handleRefresh = () => {
    loadOverviewKPI();
    loadTimeStatistics();
    loadOrdersStatistics();
    loadTopProducts();
  };

  const handleQuickFilter = (days: number) => {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - days);
    
    setFromDate(from.toISOString().split('T')[0]);
    setToDate(today.toISOString().split('T')[0]);
  };

  // KPI Cards Data from API
  const stats = kpiData ? [
    {
      title: 'Tổng doanh thu',
      value: formatCurrency(kpiData.totalRevenue),
      change: kpiData.revenueToday > 0 ? `+${formatCurrency(kpiData.revenueToday)} hôm nay` : 'Chưa có doanh thu hôm nay',
      isPositive: kpiData.revenueToday > 0,
      // icon: <AttachMoney sx={{ fontSize: 40, color: '#4CAF50' }} />,
      color: '#4CAF50'
    },
    {
      title: 'Tổng đơn hàng',
      value: formatNumber(kpiData.totalOrders),
      change: `+${kpiData.ordersToday} hôm nay`,
      isPositive: kpiData.ordersToday > 0,
      icon: <ShoppingCart sx={{ fontSize: 40, color: '#2196F3' }} />,
      color: '#2196F3'
    },
    {
      title: 'Tổng người dùng',
      value: formatNumber(kpiData.totalUsers),
      change: `+${kpiData.newUsersToday} hôm nay`,
      isPositive: true,
      icon: <People sx={{ fontSize: 40, color: '#9C27B0' }} />,
      color: '#9C27B0'
    },
    {
      title: 'Tổng sản phẩm',
      value: formatNumber(kpiData.totalProducts),
      change: 'Đang kinh doanh',
      isPositive: true,
      icon: <Inventory sx={{ fontSize: 40, color: '#FF9800' }} />,
      color: '#FF9800'
    }
  ] : [];

  // Prepare pie chart data for orders statistics
  const ordersPieData = ordersData ? [
    { name: 'Thành công', value: ordersData.success, color: '#4CAF50' },
    { name: 'Đã duyệt', value: ordersData.approved, color: '#2196F3' },
    { name: 'Chờ xử lý', value: ordersData.pending, color: '#FF9800' }
  ].filter(item => item.value > 0) : [];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#2c3e50', mb: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Chào mừng bạn trở lại! Đây là tổng quan về hoạt động kinh doanh của TECH BIT.
          </Typography>
        </Box>
        <Button
          startIcon={<Refresh />}
          onClick={handleRefresh}
          sx={{
            bgcolor: '#667eea',
            color: 'white',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#5a6fd8'
            }
          }}
        >
          Làm mới
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiLoading ? (
          <Grid size={{xs:12}}>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#667eea' }} />
            </Box>
          </Grid>
        ) : (
          stats.map((stat, index) => (
          <Grid size ={{xs:12, sm:6, md:3}} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {stat.title}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {stat.isPositive ? (
                      <TrendingUp sx={{ fontSize: 16, color: '#4CAF50' }} />
                    ) : (
                      <TrendingDown sx={{ fontSize: 16, color: '#F44336' }} />
                    )}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: stat.isPositive ? '#4CAF50' : '#F44336',
                        fontWeight: 600
                      }}
                    >
                      {stat.change}
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  bgcolor: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {stat.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))
        )}
      </Grid>

      {/* Chart Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0,0,0,0.05)',
          mb: 4
        }}
      >
        {/* Chart Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
            Biểu đồ doanh thu theo thời gian
          </Typography>
          
          {/* Filters */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} sx={{ mb: 3 }}>
            {/* Quick Filter Buttons */}
            <ButtonGroup variant="outlined" size="small">
              <Button
                onClick={() => handleQuickFilter(7)}
                sx={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5a6fd8',
                    bgcolor: 'rgba(102, 126, 234, 0.05)'
                  }
                }}
              >
                7 ngày
              </Button>
              <Button
                onClick={() => handleQuickFilter(30)}
                sx={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5a6fd8',
                    bgcolor: 'rgba(102, 126, 234, 0.05)'
                  }
                }}
              >
                30 ngày
              </Button>
              <Button
                onClick={() => handleQuickFilter(90)}
                sx={{
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5a6fd8',
                    bgcolor: 'rgba(102, 126, 234, 0.05)'
                  }
                }}
              >
                90 ngày
              </Button>
            </ButtonGroup>

            {/* Date Range */}
            <TextField
              label="Từ ngày"
              type="date"
              size="small"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#667eea'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea'
                  }
                }
              }}
            />
            <TextField
              label="Đến ngày"
              type="date"
              size="small"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#667eea'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#667eea'
                  }
                }
              }}
            />

            {/* Group By */}
            <ButtonGroup variant="outlined" size="small">
              {(['DAY', 'MONTH', 'YEAR'] as const).map((type) => (
                <Button
                  key={type}
                  onClick={() => setGroupBy(type)}
                  sx={{
                    bgcolor: groupBy === type ? '#667eea' : 'transparent',
                    color: groupBy === type ? 'white' : '#64748b',
                    borderColor: '#667eea',
                    fontWeight: groupBy === type ? 700 : 500,
                    '&:hover': {
                      bgcolor: groupBy === type ? '#5a6fd8' : 'rgba(102, 126, 234, 0.05)',
                      color: groupBy === type ? 'white' : '#667eea',
                      borderColor: '#667eea'
                    }
                  }}
                >
                  {type === 'DAY' ? 'Ngày' : type === 'MONTH' ? 'Tháng' : 'Năm'}
                </Button>
              ))}
            </ButtonGroup>
          </Stack>
        </Box>

        {/* Chart */}
        {timeLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#667eea' }} />
          </Box>
        ) : timeData.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CalendarToday sx={{ fontSize: 60, color: '#cbd5e1', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#64748b', mb: 1 }}>
              Không có dữ liệu thống kê
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Vui lòng chọn khoảng thời gian khác hoặc kiểm tra lại dữ liệu
            </Typography>
          </Box>
        ) : (
          <>
            {/* Line Chart */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 3 }}>
                Biểu đồ đường - Xu hướng doanh thu
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={timeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    style={{ fontSize: '0.85rem' }}
                  />
                  <YAxis 
                    stroke="#64748b"
                    style={{ fontSize: '0.85rem' }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip 
                    formatter={(value: number | undefined) => [formatCurrency(value), 'Doanh thu']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#667eea" 
                    strokeWidth={3}
                    dot={{ fill: '#667eea', r: 5 }}
                    activeDot={{ r: 7, fill: '#5a6fd8' }}
                    name="Doanh thu"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* Bar Chart */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 3 }}>
                Biểu đồ cột - So sánh doanh thu
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={timeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    style={{ fontSize: '0.85rem' }}
                  />
                  <YAxis 
                    stroke="#64748b"
                    style={{ fontSize: '0.85rem' }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip 
                    formatter={(value: number | undefined) => [formatCurrency(value), 'Doanh thu']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#667eea"
                    radius={[8, 8, 0, 0]}
                    name="Doanh thu"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </Paper>

      {/* Orders Statistics and Top Products Row */}
      <Grid container spacing={3}>
        {/* Orders Statistics Pie Chart */}
        <Grid size={{xs:12, md:6}}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              height: 'fit-content'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
              Thống kê đơn hàng
            </Typography>

            {ordersLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#667eea' }} />
              </Box>
            ) : ordersData ? (
              <>
                <Box sx={{ mb: 3 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ordersPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {ordersPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number | undefined) => [formatNumber(value), 'Số đơn']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                      Tổng số đơn hàng:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
                      {formatNumber(ordersData.total)}
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {/* <Grid size={{xs:4}}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#E8F5E8', borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#4CAF50', mb: 0.5 }}>
                          {formatNumber(ordersData.success)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Thành công
                        </Typography>
                      </Box>
                    </Grid> */}
                    <Grid size={{xs:4}}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#E3F2FD', borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#2196F3', mb: 0.5 }}>
                          {formatNumber(ordersData.approved)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Đã duyệt
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{xs:4}}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#FFF3E0', borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#FF9800', mb: 0.5 }}>
                          {formatNumber(ordersData.pending)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Chờ xử lý
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Stack>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <ShoppingCart sx={{ fontSize: 60, color: '#cbd5e1', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#64748b', mb: 1 }}>
                  Không có dữ liệu đơn hàng
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Top Products */}
        <Grid size={{xs:12, md:6}}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              height: 'fit-content'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
              Top sản phẩm bán chạy
            </Typography>

            {topProductsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#667eea' }} />
              </Box>
            ) : topProductsData.length > 0 ? (
              <Stack spacing={3}>
                {topProductsData.map((product, index) => {
                  const maxQuantity = Math.max(...topProductsData.map(p => p.quantity));
                  const percentage = maxQuantity > 0 ? (product.quantity / maxQuantity) * 100 : 0;
                  
                  return (
                    <Box key={product.productId}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, color: '#2c3e50' }}>
                            {product.name}
                          </Typography>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                              Đã bán: {formatNumber(product.quantity)}
                            </Typography>
                            <Chip
                              label={`#${index + 1}`}
                              size="small"
                              sx={{
                                bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.7rem'
                              }}
                            />
                          </Stack>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
                          {formatCurrency(product.revenue)}
                        </Typography>
                      </Box>
                      
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            bgcolor: '#667eea'
                          }
                        }}
                      />
                    </Box>
                  );
                })}
              </Stack>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Inventory sx={{ fontSize: 60, color: '#cbd5e1', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#64748b', mb: 1 }}>
                  Chưa có sản phẩm bán chạy
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Dữ liệu sẽ được cập nhật khi có đơn hàng
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
