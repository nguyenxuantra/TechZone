import { Box, Button, Typography, Stack, Rating, Chip, Card, CardContent, CardMedia, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalShipping, Shield, Support, Laptop, Phone, Memory, Computer, KeyboardArrowRight, FlashOn, Checkroom, Style, Diamond, Watch, LocalMall, WorkOutline, Person, LocalOffer } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import baner1 from '../assets/home-redmi-buds6.webp';
import productApi, { type ProductItem } from '../api/productApi';
import categoryApi, { type CategoryItem } from '../api/admin/categoryApi';

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

  // Map category names to icons - Updated for men's fashion
  const categoryIconMap: Record<string, JSX.Element> = {
    'Áo sơ mi': <Checkroom sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Quần âu': <WorkOutline sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Giày da': <Diamond sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Phụ kiện': <LocalOffer sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Đồng hồ': <Watch sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Túi xách': <LocalMall sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Đồ lót': <Style sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Combo': <Person sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    // Keep old tech categories as fallback
    'Laptop': <Laptop sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Điện thoại': <Phone sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'Linh kiện PC': <Memory sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
    'PC Gaming': <Computer sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />,
  };

  // Default icon if category name not found - Use fashion icon
  const getCategoryIcon = (categoryName: string) => {
    return categoryIconMap[categoryName] || <Checkroom sx={{ fontSize: { xs: 28, sm: 36, md: 40 } }} />;
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
        bgcolor: '#1e293b',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        borderRadius: 2,
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 20px 40px rgba(212, 175, 55, 0.4)',
          borderColor: '#d4af37',
          '& .product-image': {
            transform: 'scale(1.1)'
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#0f172a' }} >
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
            bgcolor: '#0f172a',
            transition: 'transform 0.4s ease'
          }}
        />
        {product.discount > 0 && (
          <Chip
            label={`-${product.discount}%`}
            sx={{
              position: 'absolute',
              top: { xs: 12, sm: 16 },
              right: { xs: 12, sm: 16 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              fontWeight: 'bold',
              height: { xs: '28px', sm: '32px' },
              bgcolor: '#c41e3a',
              color: 'white',
              boxShadow: '0 4px 15px rgba(196, 30, 58, 0.5)'
            }}
          />
        )}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.95) 100%)',
          color: 'white', py: 1.5, textAlign: 'center'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#d4af37' }}>
            Còn lại: {product.remaining} sản phẩm
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 }, bgcolor: '#1e293b' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minHeight: { xs: '44px', sm: '48px' }, fontSize: { xs: '0.95rem', sm: '1rem' }, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 1.5, lineHeight: 1.3, color: 'white' }}>
          {product.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Rating value={product.rating} precision={0.5} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#d4af37' } }} />
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>({product.reviews})</Typography>
        </Stack>
        <Stack direction="row" alignItems="baseline" spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.2rem' }, color: '#d4af37' }}>{product.price}</Typography>
          {product.originalPrice && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', fontSize: { xs: '0.85rem', sm: '0.9rem' }, color: 'rgba(255,255,255,0.5)' }}>
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
      {/* Hero Banner - New Design for Men's Fashion */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: '500px', md: '600px' },
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Animated background pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(196, 30, 58, 0.15) 0%, transparent 50%),
            linear-gradient(45deg, transparent 30%, rgba(139, 115, 85, 0.1) 50%, transparent 70%)
          `,
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.8 }
          }
        }} />
        
        <Box sx={{ 
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center',
          px: { xs: 2, sm: 4 },
          maxWidth: '1200px',
          mx: 'auto',
          py: { xs: 8, md: 12 }
        }}>
          <Chip
            label="✨ BỘ SƯU TẬP MỚI 2024"
            sx={{
              bgcolor: '#d4af37',
              color: '#1a1a1a',
              mb: 4,
              px: 2,
              py: 0.5,
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: 1,
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
            }}
          />
          
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 3,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
              lineHeight: 1.1,
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: { xs: 2, md: 4 },
              textShadow: '3px 3px 6px rgba(0,0,0,0.5)',
              mb: 2
            }}
          >
            ELITE MEN
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              fontWeight: 300,
              mb: 4,
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: { xs: 1, md: 2 },
              fontStyle: 'italic',
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
            }}
          >
            Nơi hội tụ phong cách đẳng cấp
          </Typography>
          
          <Typography
            sx={{
              mb: 5,
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.8
            }}
          >
            Khám phá bộ sưu tập thời trang nam cao cấp với những thiết kế tinh tế, 
            chất liệu cao cấp và phong cách không thể nhầm lẫn
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/products')}
              sx={{
                bgcolor: '#d4af37',
                color: '#1a1a1a',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 700,
                borderRadius: 0,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)',
                '&:hover': {
                  bgcolor: '#c41e3a',
                  color: 'white',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 35px rgba(196, 30, 58, 0.5)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Mua sắm ngay
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#d4af37',
                borderWidth: 2,
                color: '#d4af37',
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 700,
                borderRadius: 0,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                '&:hover': {
                  borderColor: '#c41e3a',
                  color: '#c41e3a',
                  bgcolor: 'rgba(196, 30, 58, 0.1)',
                  transform: 'translateY(-3px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Xem bộ sưu tập
            </Button>
          </Stack>
          
          {/* Stats */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 4,
            justifyContent: 'center',
            mt: 6,
            flexWrap: 'wrap'
          }}>
            {[
              { number: '10K+', label: 'Khách hàng' },
              { number: '500+', label: 'Sản phẩm' },
              { number: '98%', label: 'Hài lòng' }
            ].map((stat, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Typography sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 800,
                  color: '#d4af37',
                  mb: 0.5
                }}>
                  {stat.number}
                </Typography>
                <Typography sx={{
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  color: 'rgba(255,255,255,0.7)',
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        
        {/* Decorative lines */}
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)'
        }} />
      </Box>

      {/* Categories Section - Compact New Design */}
      <Box sx={{
        py: { xs: 4, md: 6 },
        background: '#ffffff',
        width: '100%',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.1)'
      }}>
        <Box sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 }, maxWidth: '1440px', mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.5rem', md: '2rem' },
                color: '#0f172a',
                mb: 1,
                textTransform: 'uppercase',
                letterSpacing: 1.5
              }}
            >
              Danh Mục Sản Phẩm
            </Typography>
          </Box>

          {categoriesLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#d4af37' }} size={30} />
            </Box>
          ) : categories.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography color="text.secondary" sx={{ fontSize: '0.9rem' }}>Chưa có danh mục sản phẩm</Typography>
            </Box>
          ) : (
            <Box
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', lg: 'repeat(8, 1fr)' }}
              gap={1.5}
            >
              {categories.slice(0, 8).map((category, index) => (
                <Card
                  key={category.categoryId}
                  onClick={() => handleCategoryClick(category.categoryId, category.name)}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'white',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    borderRadius: 1.5,
                    transition: 'all 0.3s ease',
                    minHeight: { xs: '100px', sm: '110px' },
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 20px rgba(212, 175, 55, 0.25)',
                      borderColor: '#d4af37',
                      bgcolor: 'rgba(212, 175, 55, 0.02)',
                      '& .category-icon': {
                        transform: 'scale(1.1)',
                        color: '#d4af37'
                      },
                      '& .category-name': {
                        color: '#d4af37'
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 }, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Box
                      className="category-icon"
                      sx={{
                        color: '#8b7355',
                        mb: 1,
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      {getCategoryIcon(category.name)}
                    </Box>
                    <Typography
                      className="category-name"
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.85rem' },
                        color: '#0f172a',
                        transition: 'color 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        lineHeight: 1.2
                      }}
                    >
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Flash Sale Section - New Design */}
      <Box sx={{
        background: '#0f172a',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        borderTop: '4px solid #d4af37',
        borderBottom: '4px solid #c41e3a'
      }}>
        {/* Diagonal background pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(212, 175, 55, 0.03) 10px,
              rgba(212, 175, 55, 0.03) 20px
            )
          `,
          zIndex: 1
        }} />
        
        <Box sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 }, position: 'relative', zIndex: 2, maxWidth: '1440px', mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label="⚡ ƯU ĐÃI ĐẶC BIỆT"
              sx={{
                bgcolor: '#c41e3a',
                color: 'white',
                mb: 3,
                px: 2,
                py: 0.5,
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: 'uppercase'
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '3.5rem' },
                color: 'white',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: 2
              }}
            >
              SALE SỐC
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Giảm giá lên đến 70% - Chỉ trong thời gian có hạn
            </Typography>
          </Box>

          {/* Countdown Timer - New Style */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            mb: 6,
            gap: { xs: 1, md: 2 },
            flexWrap: 'wrap'
          }}>
            {[
              { value: timeLeft.hours, label: 'Giờ' },
              { value: timeLeft.minutes, label: 'Phút' },
              { value: timeLeft.seconds, label: 'Giây' }
            ].map((item, index) => (
              <Box key={index} sx={{ 
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, md: 2 }
              }}>
                <Box>
                  <Box sx={{
                    bgcolor: '#1e293b',
                    border: '2px solid #d4af37',
                    borderRadius: 2,
                    px: { xs: 2, md: 3 },
                    py: { xs: 1.5, md: 2 },
                    minWidth: { xs: '70px', md: '90px' },
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                  }}>
                    <Typography sx={{
                      fontSize: { xs: '2rem', md: '3rem' },
                      fontWeight: 900,
                      color: '#d4af37',
                      lineHeight: 1
                    }}>
                      {String(item.value).padStart(2, '0')}
                    </Typography>
                  </Box>
                  <Typography sx={{
                    mt: 1,
                    fontSize: { xs: '0.75rem', md: '0.9rem' },
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontWeight: 600
                  }}>
                    {item.label}
                  </Typography>
                </Box>
                {index < 2 && (
                  <Typography sx={{
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    color: '#d4af37',
                    fontWeight: 800,
                    mx: { xs: 0.5, md: 1 }
                  }}>
                    :
                  </Typography>
                )}
              </Box>
            ))}
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

      {/* Featured Products - New Design */}
      <Box sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        width: '100%',
        position: 'relative'
      }}>
        <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 }, maxWidth: '1440px', mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label="BESTSELLER"
              sx={{
                bgcolor: '#d4af37',
                color: '#1a1a1a',
                mb: 2,
                px: 1,
                py: 0.5,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: 'uppercase'
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '3rem' },
                color: '#0f172a',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: 2,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #d4af37 0%, #c41e3a 100%)'
                }
              }}
            >
              Sản Phẩm Nổi Bật
            </Typography>
            <Typography
              sx={{
                mt: 4,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                color: '#64748b',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.7
              }}
            >
              Những sản phẩm được yêu thích nhất, được chọn lọc từ bộ sưu tập cao cấp của chúng tôi
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
              <CircularProgress sx={{ mb: 2, color: '#d4af37' }} />
              <Typography sx={{ color: '#64748b' }}>Đang tải sản phẩm nổi bật...</Typography>
            </Box>
          ) : featuredProductsApi.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: '#64748b' }}>Chưa có sản phẩm nổi bật</Typography>
            </Box>
          ) : (
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {featuredProductsApi.slice(0, 10).map((item) => {
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
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: 2,
                        overflow: 'hidden',
                        background: 'white',
                        border: '1px solid rgba(212, 175, 55, 0.1)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 15px 35px rgba(212, 175, 55, 0.2)',
                          borderColor: '#d4af37',
                          '& .product-image': {
                            transform: 'scale(1.08)'
                          },
                          '& .product-badge': {
                            opacity: 1,
                            transform: 'translateY(0)'
                          }
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#f8fafc' }}>
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
                            transition: 'transform 0.4s ease'
                          }}
                        />
                        {mapped.discount > 0 && (
                          <Chip
                            className="product-badge"
                            label={`-${mapped.discount}%`}
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              bgcolor: '#c41e3a',
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              height: '28px',
                              opacity: 0.9,
                              transform: 'translateY(-5px)',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        )}
                        <Box
                          className="product-badge"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: '#d4af37',
                            color: '#1a1a1a',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            opacity: 0,
                            transform: 'translateY(-5px)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          HOT
                        </Box>
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 }, bgcolor: 'white' }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            lineHeight: 1.4,
                            minHeight: { xs: '2.8em', sm: '3em' },
                            color: '#0f172a',
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {mapped.name}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1.5 }}>
                          <Rating
                            value={mapped.rating}
                            precision={0.5}
                            readOnly
                            size="small"
                            sx={{ 
                              '& .MuiRating-iconFilled': { color: '#d4af37' },
                              '& .MuiRating-iconEmpty': { color: '#e2e8f0' }
                            }}
                          />
                          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                            ({mapped.reviews})
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="baseline" spacing={1}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 800,
                              fontSize: { xs: '1rem', sm: '1.1rem' },
                              color: '#d4af37'
                            }}
                          >
                            {mapped.price}
                          </Typography>
                          {mapped.originalPrice && (
                            <Typography
                              variant="caption"
                              sx={{
                                textDecoration: 'line-through',
                                color: '#94a3b8',
                                fontSize: '0.75rem'
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
                bgcolor: '#d4af37',
                boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
                '&:hover': {
                  bgcolor: '#c41e3a',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(196, 30, 58, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Xem tất cả sản phẩm
            </Button>
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
    </Box>
  );
};

export default Home;