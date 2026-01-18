import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Stack,
  Button,
  ButtonGroup,
  TextField,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  ShoppingBag,
  AttachMoney,
  Inventory,
  CalendarToday,
  Refresh
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import statisticsApi, { type OverviewKPI, type TimeStatistic } from '../../api/admin/statisticsApi';

const Statistics = () => {
  // Overview KPI State
  const [kpiData, setKpiData] = useState<OverviewKPI | null>(null);
  const [kpiLoading, setKpiLoading] = useState(true);
  
  // Time Statistics State
  const [timeData, setTimeData] = useState<TimeStatistic[]>([]);
  const [timeLoading, setTimeLoading] = useState(true);
  const [groupBy, setGroupBy] = useState<'DAY' | 'MONTH' | 'YEAR'>('DAY');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  // Load Overview KPI
  useEffect(() => {
    loadOverviewKPI();
  }, []);

  // Load Time Statistics
  useEffect(() => {
    loadTimeStatistics();
  }, [groupBy, fromDate, toDate]);

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const handleRefresh = () => {
    loadOverviewKPI();
    loadTimeStatistics();
  };

  const handleQuickFilter = (days: number) => {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - days);
    
    setFromDate(from.toISOString().split('T')[0]);
    setToDate(today.toISOString().split('T')[0]);
  };

  // KPI Cards Data
  const kpiCards = kpiData ? [
    {
      title: 'Tổng người dùng',
      value: formatNumber(kpiData.totalUsers),
      change: `+${kpiData.newUsersToday} hôm nay`,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#d4af37',
      bgColor: 'rgba(212, 175, 55, 0.1)',
      isPositive: true
    },
    {
      title: 'Tổng đơn hàng',
      value: formatNumber(kpiData.totalOrders),
      change: `+${kpiData.ordersToday} hôm nay`,
      icon: <ShoppingBag sx={{ fontSize: 40 }} />,
      color: '#c41e3a',
      bgColor: 'rgba(196, 30, 58, 0.1)',
      isPositive: true
    },
    {
      title: 'Tổng doanh thu',
      value: formatCurrency(kpiData.totalRevenue),
      change: kpiData.revenueToday > 0 ? `+${formatCurrency(kpiData.revenueToday)} hôm nay` : 'Chưa có doanh thu hôm nay',
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: '#8b7355',
      bgColor: 'rgba(139, 115, 85, 0.1)',
      isPositive: kpiData.revenueToday > 0
    },
    {
      title: 'Tổng sản phẩm',
      value: formatNumber(kpiData.totalProducts),
      change: 'Đang kinh doanh',
      icon: <Inventory sx={{ fontSize: 40 }} />,
      color: '#0f172a',
      bgColor: 'rgba(15, 23, 42, 0.05)',
      isPositive: true
    }
  ] : [];

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
            Thống kê & Báo cáo
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Tổng quan về hiệu suất kinh doanh và xu hướng doanh thu
          </Typography>
        </Box>
        <Button
          startIcon={<Refresh />}
          onClick={handleRefresh}
          sx={{
            bgcolor: '#d4af37',
            color: '#1a1a1a',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#c41e3a',
              color: 'white'
            }
          }}
        >
          Làm mới
        </Button>
      </Box>

      {/* KPI Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiLoading ? (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#d4af37' }} />
            </Box>
          </Grid>
        ) : (
          kpiCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: 'white',
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    borderColor: card.color
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 1, fontWeight: 500 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                      {card.value}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      {card.isPositive ? (
                        <TrendingUp sx={{ fontSize: 16, color: card.color }} />
                      ) : (
                        <TrendingDown sx={{ fontSize: 16, color: '#94a3b8' }} />
                      )}
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: card.isPositive ? card.color : '#94a3b8',
                          fontWeight: 600
                        }}
                      >
                        {card.change}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: 2,
                      bgcolor: card.bgColor,
                      color: card.color
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Chart Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          background: 'white',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Chart Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', mb: 3 }}>
            Biểu đồ doanh thu theo thời gian
          </Typography>
          
          {/* Filters */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} sx={{ mb: 3 }}>
            {/* Quick Filter Buttons */}
            <ButtonGroup variant="outlined" size="small">
              <Button
                onClick={() => handleQuickFilter(7)}
                sx={{
                  borderColor: '#d4af37',
                  color: '#d4af37',
                  '&:hover': {
                    borderColor: '#c41e3a',
                    bgcolor: 'rgba(212, 175, 55, 0.05)'
                  }
                }}
              >
                7 ngày
              </Button>
              <Button
                onClick={() => handleQuickFilter(30)}
                sx={{
                  borderColor: '#d4af37',
                  color: '#d4af37',
                  '&:hover': {
                    borderColor: '#c41e3a',
                    bgcolor: 'rgba(212, 175, 55, 0.05)'
                  }
                }}
              >
                30 ngày
              </Button>
              <Button
                onClick={() => handleQuickFilter(90)}
                sx={{
                  borderColor: '#d4af37',
                  color: '#d4af37',
                  '&:hover': {
                    borderColor: '#c41e3a',
                    bgcolor: 'rgba(212, 175, 55, 0.05)'
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
                    borderColor: '#d4af37'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d4af37'
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
                    borderColor: '#d4af37'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d4af37'
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
                    bgcolor: groupBy === type ? '#d4af37' : 'transparent',
                    color: groupBy === type ? '#1a1a1a' : '#64748b',
                    borderColor: '#d4af37',
                    fontWeight: groupBy === type ? 700 : 500,
                    '&:hover': {
                      bgcolor: groupBy === type ? '#c41e3a' : 'rgba(212, 175, 55, 0.05)',
                      color: groupBy === type ? 'white' : '#d4af37',
                      borderColor: '#d4af37'
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
            <CircularProgress sx={{ color: '#d4af37' }} />
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
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', mb: 3 }}>
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
                    formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
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
                    stroke="#d4af37" 
                    strokeWidth={3}
                    dot={{ fill: '#d4af37', r: 5 }}
                    activeDot={{ r: 7, fill: '#c41e3a' }}
                    name="Doanh thu"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* Bar Chart */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a', mb: 3 }}>
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
                    formatter={(value: number) => [formatCurrency(value), 'Doanh thu']}
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
                    fill="#d4af37"
                    radius={[8, 8, 0, 0]}
                    name="Doanh thu"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Statistics;
