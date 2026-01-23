import { Box, Typography, Link, IconButton, Stack, Divider } from '@mui/material';
import { 
  Facebook, 
  Instagram, 
  YouTube, 
  LocalPhone, 
  Email, 
  LocationOn, 
  Computer
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1a1a3a 0%, #2d1b69 100%)',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto',
        width: '100%'
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
          {/* Company Info */}
          <Box>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Computer sx={{ fontSize: 32, color: '#667eea' }} />
                <Typography variant="h5" sx={{ 
                  fontWeight: 900, 
                  letterSpacing: 1,
                  background: 'linear-gradient(45deg, #fff 30%, #667eea 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  TECH BIT
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                Chuyên cung cấp các sản phẩm công nghệ chính hãng với giá tốt nhất thị trường. 
                Dịch vụ chăm sóc khách hàng tận tâm, bảo hành chính hãng.
              </Typography>
              
              {/* Social Media */}
              <Stack direction="row" spacing={1}>
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: '#1877f2',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: '#e4405f',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: '#ff0000',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <YouTube />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
          
          {/* Contact Info */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Thông tin liên hệ
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <LocalPhone sx={{ color: '#4CAF50', fontSize: 20 }} />
                <Typography variant="body2">
                  Hotline: 1900 xxxx xxx
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Email sx={{ color: '#2196F3', fontSize: 20 }} />
                <Typography variant="body2">
                  Email: support@techzone.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <LocationOn sx={{ color: '#FF9800', fontSize: 20, mt: 0.5 }} />
                <Typography variant="body2">
                  123 Đường ABC, Quận XYZ,<br />
                  TP. Hồ Chí Minh
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Policies & Links */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Chính sách & Điều khoản
            </Typography>
            <Stack spacing={1.5}>
              <Link 
                href="/shipping" 
                color="inherit" 
                underline="none" 
                sx={{ 
                  opacity: 0.8,
                  '&:hover': {
                    opacity: 1,
                    color: '#667eea'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Chính sách vận chuyển
              </Link>
              <Link 
                href="/warranty" 
                color="inherit" 
                underline="none" 
                sx={{ 
                  opacity: 0.8,
                  '&:hover': {
                    opacity: 1,
                    color: '#667eea'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Chính sách bảo hành
              </Link>
              <Link 
                href="/return" 
                color="inherit" 
                underline="none" 
                sx={{ 
                  opacity: 0.8,
                  '&:hover': {
                    opacity: 1,
                    color: '#667eea'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Chính sách đổi trả
              </Link>
              <Link 
                href="/privacy" 
                color="inherit" 
                underline="none" 
                sx={{ 
                  opacity: 0.8,
                  '&:hover': {
                    opacity: 1,
                    color: '#667eea'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Chính sách bảo mật
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} TECH BIT. Tất cả quyền được bảo lưu.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
