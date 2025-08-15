import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Header from './Header';

const HeaderDemo: React.FC = () => {
  return (
    <Box>
      <Header />
      
      {/* Content để test scroll effect */}
      <Box sx={{ pt: 20, minHeight: '200vh', p: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Demo Header Responsive
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Tính năng đã được cải thiện:
        </Typography>
        
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Typography variant="body1">
            ✅ <strong>Mobile Menu:</strong> Menu hamburger cho màn hình nhỏ
          </Typography>
          <Typography variant="body1">
            ✅ <strong>Responsive Layout:</strong> Tự động điều chỉnh theo kích thước màn hình
          </Typography>
          <Typography variant="body1">
            ✅ <strong>Logo Responsive:</strong> Logo ngắn gọn trên mobile
          </Typography>
          <Typography variant="body1">
            ✅ <strong>Search Bar:</strong> Ẩn trên mobile nhỏ để tiết kiệm không gian
          </Typography>
          <Typography variant="body1">
            ✅ <strong>Action Buttons:</strong> Chỉ hiện cart và profile trên mobile nhỏ
          </Typography>
          <Typography variant="body1">
            ✅ <strong>Top Promo Bar:</strong> Ẩn trên mobile để tối ưu không gian
          </Typography>
        </Stack>

        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Hướng dẫn test:
        </Typography>
        
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="body2">
            1. <strong>Desktop:</strong> Xem header đầy đủ với search bar và tất cả buttons
          </Typography>
          <Typography variant="body2">
            2. <strong>Tablet:</strong> Resize browser để xem responsive breakpoints
          </Typography>
          <Typography variant="body2">
            3. <strong>Mobile:</strong> Resize nhỏ để xem mobile menu và layout tối ưu
          </Typography>
          <Typography variant="body2">
            4. <strong>Scroll Effect:</strong> Cuộn xuống để xem header thay đổi style
          </Typography>
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Header đã được tối ưu cho mobile với menu hamburger, responsive layout và UX tốt hơn
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderDemo;
