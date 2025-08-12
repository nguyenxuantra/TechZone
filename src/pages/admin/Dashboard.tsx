import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Stack,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  People,
  Inventory,
  AttachMoney,
  MoreVert,
  LocalShipping,
  CheckCircle,
  Schedule,
  Cancel
} from '@mui/icons-material';

const Dashboard = () => {
  // Sample data
  const stats = [
    {
      title: 'Doanh thu tháng',
      value: '125.5M',
      change: '+12.5%',
      isPositive: true,
      icon: <AttachMoney sx={{ fontSize: 40, color: '#4CAF50' }} />,
      color: '#4CAF50'
    },
    {
      title: 'Đơn hàng mới',
      value: '1,234',
      change: '+8.2%',
      isPositive: false,
      icon: <ShoppingCart sx={{ fontSize: 40, color: '#2196F3' }} />,
      color: '#2196F3'
    },
    {
      title: 'Khách hàng mới',
      value: '567',
      change: '+15.3%',
      isPositive: true,
      icon: <People sx={{ fontSize: 40, color: '#9C27B0' }} />,
      color: '#9C27B0'
    },
    {
      title: 'Sản phẩm bán ra',
      value: '2,890',
      change: '-2.1%',
      isPositive: false,
      icon: <Inventory sx={{ fontSize: 40, color: '#FF9800' }} />,
      color: '#FF9800'
    }
  ];

  const recentOrders = [
    {
      id: '#ORD001',
      customer: 'Nguyễn Văn A',
      product: 'Laptop Gaming MSI',
      amount: '19.990.000₫',
      status: 'Đang giao',
      date: '2 giờ trước'
    },
    {
      id: '#ORD002',
      customer: 'Trần Thị B',
      product: 'iPhone 15 Pro Max',
      amount: '27.990.000₫',
      status: 'Đã giao',
      date: '4 giờ trước'
    },
    {
      id: '#ORD003',
      customer: 'Lê Văn C',
      product: 'Tai nghe Sony',
      amount: '6.990.000₫',
      status: 'Chờ xử lý',
      date: '6 giờ trước'
    },
    {
      id: '#ORD004',
      customer: 'Phạm Thị D',
      product: 'PC Gaming RTX 4070',
      amount: '35.990.000₫',
      status: 'Đã hủy',
      date: '8 giờ trước'
    }
  ];

  const topProducts = [
    {
      name: 'Laptop Gaming MSI GF63',
      sales: 45,
      revenue: '899.550.000₫',
      growth: '+12%',
      image: 'https://via.placeholder.com/50x50'
    },
    {
      name: 'iPhone 15 Pro Max',
      sales: 38,
      revenue: '1.063.620.000₫',
      growth: '+8%',
      image: 'https://via.placeholder.com/50x50'
    },
    {
      name: 'Tai nghe Sony WH-1000XM5',
      sales: 32,
      revenue: '223.680.000₫',
      growth: '+15%',
      image: 'https://via.placeholder.com/50x50'
    }
  ];

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

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#2c3e50', mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Chào mừng bạn trở lại! Đây là tổng quan về hoạt động kinh doanh của TECH ZONE.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
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
        ))}
      </Grid>

      {/* Charts and Tables Row */}
      <Grid container spacing={3}>
        {/* Recent Orders */}
        <Grid size={{xs:12, lg:8}}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              height: 'fit-content'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                Đơn hàng gần đây
              </Typography>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>

            <List sx={{ p: 0 }}>
              {recentOrders.map((order, index) => (
                <Box key={order.id}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: getStatusColor(order.status), width: 32, height: 32 }}>
                        {getStatusIcon(order.status)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {order.id}
                          </Typography>
                          <Chip
                            label={order.status}
                            size="small"
                            sx={{
                              bgcolor: `${getStatusColor(order.status)}15`,
                              color: getStatusColor(order.status),
                              fontWeight: 600
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {order.customer} • {order.product}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                              {order.amount}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {order.date}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentOrders.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Top Products */}
        <Grid size={{xs:12, lg:4}}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              height: 'fit-content'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
              Sản phẩm bán chạy
            </Typography>

            <Stack spacing={3}>
              {topProducts.map((product, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar
                      src={product.image}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.sales} sản phẩm đã bán
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                      {product.revenue}
                    </Typography>
                    <Chip
                      label={product.growth}
                      size="small"
                      sx={{
                        bgcolor: product.growth.includes('+') ? '#4CAF5015' : '#F4433615',
                        color: product.growth.includes('+') ? '#4CAF50' : '#F44336',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  
                  <LinearProgress
                    variant="determinate"
                    value={(product.sales / 50) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        bgcolor: '#667eea'
                      }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Additional Stats Row */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{xs:12, md:66}}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
              Tổng quan vận chuyển
            </Typography>
            
            <Grid container spacing={2}>
              <Grid size={{xs:6}}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#E3F2FD', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#2196F3', mb: 1 }}>
                    89
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đang giao
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{xs:6}}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#E8F5E8', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#4CAF50', mb: 1 }}>
                    156
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đã giao
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}>
              Hiệu suất bán hàng
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Mục tiêu tháng</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  75%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: '#4CAF50'
                  }
                }}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Tăng trưởng</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                  +12.5%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={65}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: '#2196F3'
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
