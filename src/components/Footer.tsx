import { Box, Typography, Link, IconButton, Stack, Divider, Grid } from '@mui/material';
import { 
  Facebook, 
  Instagram, 
  YouTube, 
  Twitter,
  LocalPhone, 
  Email, 
  LocationOn, 
  Checkroom,
  Payment,
  LocalShipping,
  Security,
  VerifiedUser
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        pt: 8,
        pb: 4,
        mt: 'auto',
        width: '100%',
        borderTop: '4px solid #d4af37',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%)'
        }
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 }, maxWidth: '1440px', mx: 'auto', position: 'relative', zIndex: 1 }}>
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Brand Section */}
          <Grid  size={{xs:12 , md:4}}>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Checkroom sx={{ fontSize: 40, color: '#d4af37' }} />
                <Typography variant="h4" sx={{ 
                  fontWeight: 900, 
                  letterSpacing: 2,
                  color: 'white',
                  textTransform: 'uppercase',
                  fontFamily: '"Playfair Display", serif'
                }}>
                  ELITE MEN
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ 
                color: 'rgba(255,255,255,0.8)', 
                lineHeight: 1.8,
                fontSize: '0.95rem'
              }}>
                Thương hiệu thời trang nam cao cấp, mang đến những sản phẩm chất lượng với phong cách đẳng cấp. 
                Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.
              </Typography>
              
              {/* Social Media */}
              <Stack direction="row" spacing={1.5}>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#d4af37',
                    '&:hover': { 
                      bgcolor: '#1877f2',
                      borderColor: '#1877f2',
                      color: 'white',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#d4af37',
                    '&:hover': { 
                      bgcolor: '#e4405f',
                      borderColor: '#e4405f',
                      color: 'white',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#d4af37',
                    '&:hover': { 
                      bgcolor: '#1DA1F2',
                      borderColor: '#1DA1F2',
                      color: 'white',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#d4af37',
                    '&:hover': { 
                      bgcolor: '#ff0000',
                      borderColor: '#ff0000',
                      color: 'white',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <YouTube />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
          
          {/* Quick Links */}
          <Grid size={{xs:12, sm:6, md:2}}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              mb: 3,
              color: '#d4af37',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: '1rem'
            }}>
              Liên kết nhanh
            </Typography>
            <Stack spacing={2}>
              {['Về chúng tôi', 'Sản phẩm', 'Bộ sưu tập', 'Tin tức'].map((link) => (
                <Link 
                  key={link}
                  href="#" 
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    '&:hover': {
                      color: '#d4af37',
                      transform: 'translateX(5px)'
                    },
                    transition: 'all 0.3s ease',
                    display: 'block'
                  }}
                >
                  {link}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Customer Service */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              mb: 3,
              color: '#d4af37',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: '1rem'
            }}>
              Hỗ trợ khách hàng
            </Typography>
            <Stack spacing={2}>
              {[
                { text: 'Chính sách vận chuyển', icon: <LocalShipping sx={{ fontSize: 18, color: '#d4af37', mr: 1 }} /> },
                { text: 'Chính sách đổi trả', icon: <Payment sx={{ fontSize: 18, color: '#d4af37', mr: 1 }} /> },
                { text: 'Chính sách bảo hành', icon: <Security sx={{ fontSize: 18, color: '#d4af37', mr: 1 }} /> },
                { text: 'Câu hỏi thường gặp', icon: <VerifiedUser sx={{ fontSize: 18, color: '#d4af37', mr: 1 }} /> }
              ].map((item, index) => (
                <Link 
                  key={index}
                  href="#" 
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      color: '#d4af37',
                      transform: 'translateX(5px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {item.icon}
                  {item.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid size={{xs:12, md:3}}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              mb: 3,
              color: '#d4af37',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontSize: '1rem'
            }}>
              Liên hệ
            </Typography>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <LocalPhone sx={{ color: '#d4af37', fontSize: 20, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 0.5 }}>
                    Hotline
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                    1900 xxxx xxx
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Email sx={{ color: '#d4af37', fontSize: 20, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 0.5 }}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                    support@elitemen.com
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <LocationOn sx={{ color: '#d4af37', fontSize: 20, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 0.5 }}>
                    Địa chỉ
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.6 }}>
                    123 Đường ABC, Quận XYZ,<br />
                    TP. Hồ Chí Minh
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ 
          my: 4, 
          borderColor: 'rgba(212, 175, 55, 0.2)',
          borderWidth: 1
        }} />
        
        {/* Copyright */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ 
            color: 'rgba(255,255,255,0.6)',
            textAlign: { xs: 'center', md: 'left' }
          }}>
            © {new Date().getFullYear()} ELITE MEN. Tất cả quyền được bảo lưu.
          </Typography>
          <Typography variant="body2" sx={{ 
            color: 'rgba(255,255,255,0.6)',
            textAlign: { xs: 'center', md: 'right' }
          }}>
            Được thiết kế với ❤️ cho phong cách đẳng cấp
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
