import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  Button,
  ButtonGroup,
  TextField,
  CircularProgress
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  AttachMoney,
  Refresh,
  CalendarToday,
  AutoAwesomeOutlined,
  LocalFloristOutlined,
  TipsAndUpdatesOutlined,
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
import statisticsApi, { type OverviewKPI, type TimeStatistic, type OrdersStatistics, type TopProduct } from '../../api/admin/statisticsApi';

const Dashboard = () => {
  const palette = {
    wine900: '#1a0f14',
    ink: '#24161a',
    muted: '#6b5a61',
    gold: '#c7a24a',
    rose: '#c3576a',
    cream: '#fbf6f0',
    border: 'rgba(26,15,20,0.08)',
  } as const;

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
  const [, setOrdersData] = useState<OrdersStatistics | null>(null);
  const [, setOrdersLoading] = useState(true);

  // Top Products State
  const [, setTopProductsData] = useState<TopProduct[]>([]);
  const [, setTopProductsLoading] = useState(true);

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
    return value !=undefined ?  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value) : null;
  };

  const formatNumber = (value: number) => {
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
      icon: <AttachMoney sx={{ fontSize: 40, color: palette.gold }} />,
      color: palette.gold
    },
    {
      title: 'Tổng đơn hàng',
      value: formatNumber(kpiData.totalOrders),
      change: `+${kpiData.ordersToday} hôm nay`,
      isPositive: kpiData.ordersToday > 0,
      icon: <AutoAwesomeOutlined sx={{ fontSize: 40, color: palette.rose }} />,
      color: palette.rose
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
      icon: <LocalFloristOutlined sx={{ fontSize: 40, color: palette.wine900 }} />,
      color: palette.wine900
    }
  ] : [];



  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: palette.ink, mb: 1 }}>
            Tổng quan Lalua
          </Typography>
          <Typography variant="body1" sx={{ color: palette.muted }}>
            Chào mừng bạn trở lại! Đây là tổng quan vận hành cửa hàng nước hoa Lalua.
          </Typography>
        </Box>
        <Button
          startIcon={<Refresh />}
          onClick={handleRefresh}
          sx={{
            bgcolor: palette.wine900,
            color: 'rgba(255,255,255,0.92)',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#120a0e'
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
              <CircularProgress sx={{ color: palette.wine900 }} />
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
                background: 'linear-gradient(135deg, #ffffff 0%, #fffdfb 100%)',
                border: `1px solid ${palette.border}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 18px 40px rgba(26, 15, 20, 0.10)'
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
                      <TrendingUp sx={{ fontSize: 16, color: palette.gold }} />
                    ) : (
                      <TrendingDown sx={{ fontSize: 16, color: '#F44336' }} />
                    )}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: stat.isPositive ? palette.muted : '#F44336',
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
          background: 'linear-gradient(135deg, #ffffff 0%, #fffdfb 100%)',
          border: `1px solid ${palette.border}`,
          mb: 4
        }}
      >
        {/* Chart Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: palette.ink, mb: 0.5 }}>
            Doanh thu theo thời gian
          </Typography>
          <Typography variant="body2" sx={{ color: palette.muted, mb: 3 }}>
            Theo dõi xu hướng để tối ưu tồn kho, chương trình quà tặng và chiến dịch mùi hương.
          </Typography>
          
          {/* Filters */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} sx={{ mb: 3 }}>
            {/* Quick Filter Buttons */}
            <ButtonGroup variant="outlined" size="small">
              <Button
                onClick={() => handleQuickFilter(7)}
                sx={{
                  borderColor: 'rgba(26,15,20,0.25)',
                  color: palette.ink,
                  '&:hover': {
                    borderColor: 'rgba(26,15,20,0.35)',
                    bgcolor: 'rgba(26,15,20,0.03)'
                  }
                }}
              >
                7 ngày
              </Button>
              <Button
                onClick={() => handleQuickFilter(30)}
                sx={{
                  borderColor: 'rgba(26,15,20,0.25)',
                  color: palette.ink,
                  '&:hover': {
                    borderColor: 'rgba(26,15,20,0.35)',
                    bgcolor: 'rgba(26,15,20,0.03)'
                  }
                }}
              >
                30 ngày
              </Button>
              <Button
                onClick={() => handleQuickFilter(90)}
                sx={{
                  borderColor: 'rgba(26,15,20,0.25)',
                  color: palette.ink,
                  '&:hover': {
                    borderColor: 'rgba(26,15,20,0.35)',
                    bgcolor: 'rgba(26,15,20,0.03)'
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
                    borderColor: 'rgba(26,15,20,0.35)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: palette.wine900
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
                    borderColor: 'rgba(26,15,20,0.35)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: palette.wine900
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
                    bgcolor: groupBy === type ? palette.wine900 : 'transparent',
                    color: groupBy === type ? 'rgba(255,255,255,0.92)' : palette.muted,
                    borderColor: 'rgba(26,15,20,0.25)',
                    fontWeight: groupBy === type ? 700 : 500,
                    '&:hover': {
                      bgcolor: groupBy === type ? '#120a0e' : 'rgba(26,15,20,0.03)',
                      color: groupBy === type ? 'rgba(255,255,255,0.92)' : palette.ink,
                      borderColor: 'rgba(26,15,20,0.35)'
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
            <CircularProgress sx={{ color: palette.wine900 }} />
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
              <Typography variant="h6" sx={{ fontWeight: 800, color: palette.ink, mb: 3 }}>
                Xu hướng doanh thu
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
                    stroke={palette.wine900}
                    strokeWidth={3}
                    dot={{ fill: palette.wine900, r: 5 }}
                    activeDot={{ r: 7, fill: palette.gold }}
                    name="Doanh thu"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* Bar Chart */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: palette.ink, mb: 3 }}>
                So sánh doanh thu
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
                    fill={palette.wine900}
                    radius={[8, 8, 0, 0]}
                    name="Doanh thu"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </Paper>

      {/* Notes / Guidance */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #fffdfb 100%)',
              border: `1px solid ${palette.border}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <TipsAndUpdatesOutlined sx={{ color: palette.gold }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: palette.ink }}>
                Gợi ý vận hành hôm nay
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: palette.muted, mb: 3 }}>
              Một vài checklist nhanh để đội ngũ vận hành mượt hơn (UI tham khảo, không phụ thuộc dữ liệu API).
            </Typography>

            <Stack spacing={1.5}>
              {[
                'Kiểm tra tồn kho các mùi bán chạy và set lịch nhập hàng.',
                'Rà soát ảnh sản phẩm (ánh sáng, nền, góc chụp) để tăng chuyển đổi.',
                'Cập nhật mô tả “tầng hương” và độ lưu hương cho các sản phẩm mới.',
              ].map((text) => (
                <Box
                  key={text}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${palette.border}`,
                    bgcolor: 'rgba(26,15,20,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: palette.rose,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: palette.ink, fontWeight: 600 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background: `radial-gradient(900px 400px at 20% 0%, rgba(199,162,74,0.10) 0%, rgba(199,162,74,0) 60%), linear-gradient(135deg, #ffffff 0%, #fffdfb 100%)`,
              border: `1px solid ${palette.border}`,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <AutoAwesomeOutlined sx={{ color: palette.wine900 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: palette.ink }}>
                Theme Lalua
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: palette.muted, mb: 3 }}>
              Admin được tinh chỉnh theo phong cách nước hoa: wine / gold / cream, tối giản và sang.
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="Wine" size="small" sx={{ bgcolor: 'rgba(26,15,20,0.08)', color: palette.ink, fontWeight: 700 }} />
              <Chip label="Gold" size="small" sx={{ bgcolor: 'rgba(199,162,74,0.14)', color: palette.gold, fontWeight: 700, border: '1px solid rgba(199,162,74,0.25)' }} />
              <Chip label="Cream" size="small" sx={{ bgcolor: palette.cream, color: palette.muted, fontWeight: 700, border: `1px solid ${palette.border}` }} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
