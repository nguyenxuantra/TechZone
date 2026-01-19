import { Box, Typography, Link, IconButton, Stack, Divider } from '@mui/material';
import { 
  Facebook, 
  Instagram, 
  YouTube, 
  LocalPhone, 
  Email, 
  LocationOn, 
  AutoAwesomeOutlined,
  LocalFloristOutlined,
  VerifiedOutlined,
  LocalShippingOutlined,
} from '@mui/icons-material';

const Footer = () => {
  const palette = {
    wine900: '#1a0f14',
    wine700: '#341420',
    gold: '#c7a24a',
    border: 'rgba(255,255,255,0.14)',
  } as const;

  return (
    <Box
      component="footer"
      sx={{
        background: `radial-gradient(1200px 700px at 10% 0%, ${palette.wine700} 0%, ${palette.wine900} 55%, ${palette.wine900} 100%)`,
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto',
        width: '100%'
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        {/* Reassurance row */}
        <Box
          sx={{
            mb: 5,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {[
            { icon: <VerifiedOutlined />, title: 'Chính hãng & rõ nguồn gốc', desc: 'Cam kết chất lượng – kiểm tra trước khi nhận.' },
            { icon: <LocalShippingOutlined />, title: 'Giao nhanh toàn quốc', desc: 'Đóng gói kỹ – bảo vệ chai và hộp.' },
            { icon: <LocalFloristOutlined />, title: 'Tư vấn chọn mùi', desc: 'Gợi ý theo dịp, phong cách và ngân sách.' },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: `1px solid ${palette.border}`,
                bgcolor: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start',
              }}
            >
              <Box sx={{ color: palette.gold, mt: 0.2 }}>
                {item.icon}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', mt: 0.5 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
          {/* Company Info */}
          <Box>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AutoAwesomeOutlined sx={{ fontSize: 32, color: palette.gold }} />
                <Typography variant="h5" sx={{ 
                  fontWeight: 900, 
                  letterSpacing: 1,
                  background: `linear-gradient(45deg, #fff 30%, ${palette.gold} 95%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  LUALAB
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                Nơi hội tụ những mùi hương tinh tế dành cho bạn. Lựa chọn theo dịp, theo cá tính
                và theo tầng hương — trải nghiệm mua sắm sang trọng, chỉn chu.
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
                <LocalPhone sx={{ color: palette.gold, fontSize: 20 }} />
                <Typography variant="body2">
                  Hotline: 0900 000 000
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Email sx={{ color: palette.gold, fontSize: 20 }} />
                <Typography variant="body2">
                  Email: support@lualab.vn
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <LocationOn sx={{ color: palette.gold, fontSize: 20, mt: 0.5 }} />
                <Typography variant="body2">
                  123 Nguyễn Huệ, Quận 1,<br />
                  TP. Hồ Chí Minh
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Policies & Links */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Chính sách & Hỗ trợ
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
                    color: palette.gold
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
                    color: palette.gold
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Cam kết chất lượng
              </Link>
              <Link 
                href="/return" 
                color="inherit" 
                underline="none" 
                sx={{ 
                  opacity: 0.8,
                  '&:hover': {
                    opacity: 1,
                    color: palette.gold
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
                    color: palette.gold
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/faq"
                color="inherit"
                underline="none"
                sx={{
                  opacity: 0.8,
                  '&:hover': { opacity: 1, color: palette.gold },
                  transition: 'all 0.3s ease',
                }}
              >
                Hướng dẫn chọn mùi (FAQ)
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: palette.border }} />
        
        <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} LUALAB. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
