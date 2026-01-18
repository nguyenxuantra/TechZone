import { Box, Button, Typography, Stack, Rating, Chip, Card, CardContent, CardMedia, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalShipping, Shield, Support, Laptop, Phone, Memory, Computer, KeyboardArrowRight, FlashOn } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import baner1 from '../assets/home-redmi-buds6.webp';
import productApi, { type ProductItem } from '../api/productApi';
import categoryApi, { type CategoryItem } from '../api/admin/categoryApi';
import ChatBot from '../components/ChatBot';

const Home = () => {
  const navigate = useNavigate();
  const [flashProducts, setFlashProducts] = useState<ProductItem[]>([]);
  const [flashLoading, setFlashLoading] = useState<boolean>(true);
  const [featuredProductsApi, setFeaturedProductsApi] = useState<ProductItem[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0
  });

  // Map category names to icons
  const categoryIconMap: Record<string, JSX.Element> = {
    'Laptop': <Laptop sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Điện thoại': <Phone sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Linh kiện PC': <Memory sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'PC Gaming': <Computer sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
  };

  // Default icon if category name not found
  const getCategoryIcon = (categoryName: string) => {
    return categoryIconMap[categoryName] || <Computer sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />;
  };

  // Flash sale display: 2 rows x 5 products (no slider)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch flash sale products from API
  useEffect(() => {
    const loadFlashSale = async () => {
      try {
        setFlashLoading(true);
        const data = await productApi.getProducts({
          flash_sale: true,
          page_no: 1,
          page_size: 10,
        });
        const content = data.result.content || [];
        setFlashProducts(content);
      } catch (error) {
        console.error('Error loading flash sale:', error);
        setFlashProducts([]);
      } finally {
        setFlashLoading(false);
      }
    };

    loadFlashSale();
  }, []);

  // Fetch featured products from API
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setFeaturedLoading(true);
        const data = await productApi.getProducts({
          page_no: 1,
          page_size: 10,
        });
        const content = data.result.content || [];
        setFeaturedProductsApi(content);
      } catch (error) {
        console.error('Error loading featured products:', error);
        setFeaturedProductsApi([]);
      } finally {
        setFeaturedLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const formatCurrency = (value: number) =>
    value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  type MappedProduct = {
    id: number;
    name: string;
    price: string;
    originalPrice: string;
    discount: number;
    image: string;
    remaining: number;
    rating: number;
    reviews: number;
    raw: ProductItem;
  };

  const mapFlashProduct = (product: ProductItem): MappedProduct => {
    // price = giá gốc, discount = giá bán
    const originalPrice = product.price ?? 0; // Giá gốc
    const salePrice = product.discount ?? 0; // Giá bán
    // Tính phần trăm giảm giá
    const discountPercent = originalPrice > 0 && salePrice < originalPrice
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : 0;

    return {
      id: product.productId,
      name: product.name,
      price: formatCurrency(salePrice), // Giá bán
      originalPrice: salePrice < originalPrice ? formatCurrency(originalPrice) : '', // Giá gốc
      discount: discountPercent,
      image: product.imageUrl || '',
      remaining: product.stock ?? 0,
      rating: product.rating ?? 0,
      reviews: 0,
      raw: product,
    };
  };

  const renderFlashProductCard = (product: MappedProduct) => (
    <Card
      onClick={() => handleProductClick(product.raw)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          '& .product-image': {
            transform: 'scale(1.1)'
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }} >
        <CardMedia
          className="product-image"
          component="img"
          height={undefined}
          image={product.image}
          alt={product.name}
          sx={{
            width:'100%',
            height:'auto',
            objectFit: 'cover',
            bgcolor: 'grey.100',
            transition: 'transform 0.4s ease'
          }}
        />
        {product.discount > 0 && (
          <Chip
            label={`-${product.discount}%`}
            color="error"
            sx={{
              position: 'absolute',
              top: { xs: 12, sm: 16 },
              left: { xs: 12, sm: 16 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              fontWeight: 'bold',
              height: { xs: '28px', sm: '32px' },
              bgcolor: '#ff4757',
              boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)'
            }}
          />
        )}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(26, 26, 46, 0.7) 100%)',
          color: 'white', py: 1.5, textAlign: 'center', backdropFilter: 'blur(4px)'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Còn lại: {product.remaining} sản phẩm
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minHeight: { xs: '44px', sm: '48px' }, fontSize: { xs: '0.95rem', sm: '1rem' }, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 1.5, lineHeight: 1.3 }}>
          {product.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Rating value={product.rating} precision={0.5} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' } }} />
          <Typography variant="body2" color="text.secondary">({product.reviews})</Typography>
        </Stack>
        <Stack direction="row" alignItems="baseline" spacing={1}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.2rem' }, color: '#ff6b35' }}>{product.price}</Typography>
          {product.originalPrice && (
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through', fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
              {product.originalPrice}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );

  // Load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await categoryApi.list({
          page_no: 1,
          page_size: 100,
        });
        setCategories(data.result.content || []);
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    navigate('/products', { state: { categoryId, categoryName } });
  };

  const handleProductClick = (product: ProductItem) => {
    navigate(`/products/${product.productId}`, { state: { product } });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 }, maxWidth: '1440px', mx: 'auto' }}>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
            gap={{ xs: 4, md: 6 }}
            alignItems="center"
            sx={{ py: { xs: 8, sm: 10, md: 15 } }}
          >
            <Box>
              <Chip
                label="🔥 Flash Sale - Giảm đến 50%"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  mb: 3,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              />
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 900,
                  mb: { xs: 2, md: 3 },
                  fontSize: {
                    xs: '2.5rem',
                    sm: '3rem',
                    md: '4rem'
                  },
                  lineHeight: { xs: 1.1, md: 1.2 },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Công Nghệ Đỉnh Cao<br />
                <Box component="span" sx={{
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Giá Cả Hợp Lý
                </Box>
              </Typography>
              <Typography
                sx={{
                  mb: { xs: 3, md: 4 },
                  opacity: 0.95,
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' },
                  lineHeight: 1.6,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}
              >
                Khám phá ngay các sản phẩm công nghệ chính hãng với ưu đãi lên đến 50%
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<KeyboardArrowRight />}
                  onClick={() => navigate('/products')}
                  sx={{
                    bgcolor: 'white',
                    color: '#0f0f23',
                    width: { xs: '100%', sm: 'auto' },
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1.5, sm: 2 },
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 700,
                    borderRadius: 3,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                      color: '#1a1a3a',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(0,0,0,0.2)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Khám phá ngay
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    width: { xs: '100%', sm: 'auto' },
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1.5, sm: 2 },
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 600,
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Xem video giới thiệu
                </Button>
              </Stack>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={baner1}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  position: 'relative',
                  zIndex: 2
                }}
              />
              {/* Floating elements */}
              <Box
                sx={{
                  width:'100px',
                  height:'40px',
                  position: 'absolute',
                  top: '80%',
                  right: '10%',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  color: '#0f0f23',
                  p: 2,
                  borderRadius: 3,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  zIndex: 3,
                  animation: 'float 3s ease-in-out infinite'
                }}
              >
                <Typography variant="h6" fontWeight="bold">50% OFF</Typography>
                <Typography variant="caption">Flash Sale</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Categories Section */}
      <Box sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        width: '100%'
      }}>
        <Box sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 }, maxWidth: '1440px', mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                background: 'linear-gradient(45deg, #1a1a3a 30%, #2d1b69 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Danh Mục Sản Phẩm
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Khám phá đa dạng các sản phẩm công nghệ theo từng danh mục
            </Typography>
          </Box>

          {categoriesLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : categories.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">Chưa có danh mục sản phẩm</Typography>
            </Box>
          ) : (
            <Box
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
              gap={4}
            >
              {categories.slice(0, 8).map((category) => (
                <Card
                  key={category.categoryId}
                  onClick={() => handleCategoryClick(category.categoryId, category.name)}
                  sx={{
                    p: { xs: 3, md: 4 },
                    textAlign: 'center',
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-12px) rotate(1deg)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      '& .category-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        color: '#1a1a3a'
                      }
                    }
                  }}
                >
                  <Box
                    className="category-icon"
                    sx={{
                      color: '#2c3e50',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {getCategoryIcon(category.name)}
                  </Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      color: '#2c3e50'
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      fontWeight: 500
                    }}
                  >
                    Xem sản phẩm
                  </Typography>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Flash Sale Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 50%, #4a2b8a 100%)',
        py: { xs: 6, sm: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(64, 224, 208, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
          zIndex: 1
        }
      }}>
        <Box sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 }, position: 'relative', zIndex: 2, maxWidth: '1440px', mx: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: { xs: 4, md: 6 },
              gap: { xs: 3, sm: 0 }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                color: 'white',
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 2 },
                borderRadius: 3,
                width: { xs: '100%', sm: 'auto' },
                justifyContent: { xs: 'center', sm: 'flex-start' },
                boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)'
              }}
            >
              <FlashOn sx={{
                fontSize: { xs: 36, sm: 40, md: 48 },
                animation: 'flash 1.5s infinite',
                '@keyframes flash': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.7, transform: 'scale(1.1)' }
                }
              }} />
              <Box>
                <Typography sx={{
                  fontWeight: 800,
                  typography: { xs: 'h5', sm: 'h4' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  Flash Sale
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Giảm giá sốc - Số lượng có hạn
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 1.5, sm: 2 },
                bgcolor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <Box sx={{ textAlign: 'center', minWidth: { xs: '50px', sm: '60px' } }}>
                <Typography sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 800,
                  color: '#ff6b35'
                }}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Giờ
                </Typography>
              </Box>
              <Typography sx={{
                color: '#ff6b35',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                fontWeight: 800,
                alignSelf: 'center'
              }}>:</Typography>
              <Box sx={{ textAlign: 'center', minWidth: { xs: '50px', sm: '60px' } }}>
                <Typography sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 800,
                  color: '#ff6b35'
                }}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Phút
                </Typography>
              </Box>
              <Typography sx={{
                color: '#ff6b35',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                fontWeight: 800,
                alignSelf: 'center'
              }}>:</Typography>
              <Box sx={{ textAlign: 'center', minWidth: { xs: '50px', sm: '60px' } }}>
                <Typography sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontWeight: 800,
                  color: '#ff6b35'
                }}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Giây
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Flash Sale Products - from API (10 items, 5 per row) */}
          {flashLoading ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 320,
                color: 'white',
              }}
            >
              <CircularProgress sx={{ color: 'white', mb: 2 }} />
              <Typography>Đang tải sản phẩm Flash Sale...</Typography>
            </Box>
          ) : flashProducts.length === 0 ? (
            <Box sx={{ textAlign: 'center', color: 'white', py: 4 }}>
              <Typography>Chưa có sản phẩm Flash Sale</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mb: 1 }}>
                {flashProducts.slice(0, 5).map((item) => {
                  const mapped = mapFlashProduct(item);
                  return (
                    <Grid key={mapped.id} size={{ xs: 6, sm: 4, md: 2.4 }}>
                      {renderFlashProductCard(mapped)}
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container spacing={3}>
                {flashProducts.slice(5, 10).map((item) => {
                  const mapped = mapFlashProduct(item);
                  return (
                    <Grid key={mapped.id} size={{ xs: 6, sm: 4, md: 2.4 }}>
                      {renderFlashProductCard(mapped)}
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </Box>
      </Box>

      {/* Featured Products */}
      <Box sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        width: '100%'
      }}>
        <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                background: 'linear-gradient(45deg, #1a1a3a 30%, #2d1b69 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Sản Phẩm Nổi Bật
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Các sản phẩm bán chạy và được đánh giá cao từ khách hàng
            </Typography>
          </Box>

          {featuredLoading ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 320,
              }}
            >
              <CircularProgress sx={{ mb: 2 }} />
              <Typography>Đang tải sản phẩm nổi bật...</Typography>
            </Box>
          ) : featuredProductsApi.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>Chưa có sản phẩm nổi bật</Typography>
            </Box>
          ) : (
            <>
              {/* Featured - Row 1 (Grid) */}
              <Grid container spacing={3} sx={{ mb: 1 }}>
                {featuredProductsApi.slice(0, 5).map((item) => {
                  const mapped = mapFlashProduct(item);
                  return (
                    <Grid key={mapped.id} size={{ xs: 6, sm: 4, md: 2.4 }}>
                      <Card
                        onClick={() => handleProductClick(mapped.raw)}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: 3,
                          overflow: 'hidden',
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                          border: '1px solid rgba(0,0,0,0.05)',
                          '&:hover': {
                            transform: 'translateY(-12px)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                            '& .product-image': {
                              transform: 'scale(1.05)'
                            }
                          }
                        }}
                      >
                        <Box sx={{ overflow: 'hidden' }}>
                          <CardMedia
                            className="product-image"
                            component="img"
                            height={undefined}
                            image={mapped.image}
                            alt={mapped.name}
                            sx={{
                              width: '100%',
                              height: 'auto',
                              objectFit: 'cover',
                              bgcolor: 'grey.100',
                              transition: 'transform 0.4s ease'
                            }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              fontSize: { xs: '1rem', sm: '1.1rem' },
                              lineHeight: 1.3,
                              minHeight: '2.6em'
                            }}
                          >
                            {mapped.name}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <Rating
                              value={mapped.rating}
                              precision={0.5}
                              readOnly
                              size="small"
                              sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' } }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({mapped.reviews})
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                                color: '#2c3e50'
                              }}
                            >
                              {mapped.price}
                            </Typography>
                            {mapped.originalPrice && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  textDecoration: 'line-through',
                                  fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                }}
                              >
                                {mapped.originalPrice}
                              </Typography>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              {/* Featured - Row 2 (Grid) */}
              <Grid container spacing={3} marginTop={4}>
                {featuredProductsApi.slice(5, 10).map((item) => {
                  const mapped = mapFlashProduct(item);
                  return (
                    <Grid key={mapped.id} size={{ xs: 6, sm: 4, md: 2.4 }}>
                      <Card
                        onClick={() => handleProductClick(mapped.raw)}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: 3,
                          overflow: 'hidden',
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                          border: '1px solid rgba(0,0,0,0.05)',
                          '&:hover': {
                            transform: 'translateY(-12px)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                            '& .product-image': {
                              transform: 'scale(1.05)'
                            }
                          }
                        }}
                      >
                        <Box sx={{ overflow: 'hidden' }}>
                          <CardMedia
                            className="product-image"
                            component="img"
                            height={undefined}
                            image={mapped.image}
                            alt={mapped.name}
                            sx={{
                              width:'100%',
                              height: 'auto' ,
                              objectFit: 'cover',
                              bgcolor: 'grey.100',
                              transition: 'transform 0.4s ease'
                            }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              fontSize: { xs: '1rem', sm: '1.1rem' },
                              lineHeight: 1.3,
                              minHeight: '2.6em'
                            }}
                          >
                            {mapped.name}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                            <Rating
                              value={mapped.rating}
                              precision={0.5}
                              readOnly
                              size="small"
                              sx={{ '& .MuiRating-iconFilled': { color: '#ffd700' } }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({mapped.reviews})
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '1.1rem', sm: '1.2rem' },
                                color: '#2c3e50'
                              }}
                            >
                              {mapped.price}
                            </Typography>
                            {mapped.originalPrice && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  textDecoration: 'line-through',
                                  fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                }}
                              >
                                {mapped.originalPrice}
                              </Typography>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<KeyboardArrowRight />}
              onClick={() => navigate('/products')}
              sx={{
                width: { xs: '100%', sm: 'auto' },
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 700,
                borderRadius: 3,
                bgcolor: '#1a1a3a',
                boxShadow: '0 8px 25px rgba(26, 26, 58, 0.3)',
                '&:hover': {
                  bgcolor: '#2d1b69',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(45, 27, 105, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Xem tất cả sản phẩm
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%)',
        color: 'white',
        width: '100%'
      }}>
        <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Tại Sao Chọn Chúng Tôi?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng
            </Typography>
          </Box>

          <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
            gap={6}
          >
            {[
              {
                icon: <LocalShipping sx={{ fontSize: { xs: 48, md: 64 } }} />,
                title: 'Miễn phí vận chuyển',
                description: 'Cho đơn hàng từ 2 triệu đồng trên toàn quốc',
                color: '#4CAF50'
              },
              {
                icon: <Shield sx={{ fontSize: { xs: 48, md: 64 } }} />,
                title: 'Bảo hành chính hãng',
                description: 'Từ 12 đến 24 tháng theo quy định nhà sản xuất',
                color: '#2196F3'
              },
              {
                icon: <Support sx={{ fontSize: { xs: 48, md: 64 } }} />,
                title: 'Hỗ trợ 24/7',
                description: 'Đội ngũ chuyên viên luôn sẵn sàng hỗ trợ bạn',
                color: '#FF9800'
              }
            ].map((feature, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: 'rgba(255,255,255,0.15)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <Box sx={{
                    color: feature.color,
                    mb: 3,
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      opacity: 0.9,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      {/* ChatBot Component */}
      <ChatBot />
    </Box>
  );
};

export default Home;