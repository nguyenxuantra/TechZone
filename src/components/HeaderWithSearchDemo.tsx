import React from 'react';
import { Box, Typography, Stack, Paper, Chip } from '@mui/material';
import Header from './Header';
import { CartProvider } from '../contexts/CartContext';

const HeaderWithSearchDemo: React.FC = () => {
  return (
    <CartProvider>
      <Box>
        <Header />
        
        {/* Content để test */}
        <Box sx={{ pt: 20, minHeight: '100vh', p: 4, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', mb: 4, color: '#1a1a3a' }}>
            Demo Header với Tìm kiếm & Giỏ hàng
          </Typography>
          
          <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#2d1b69' }}>
              🎯 Chức năng Tìm kiếm Sản phẩm
            </Typography>
            
            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">
                ✅ <strong>Real-time Search:</strong> Tìm kiếm theo tên sản phẩm, thương hiệu, danh mục
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Search Results:</strong> Hiển thị kết quả tìm kiếm với hình ảnh, giá, đánh giá
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Add to Cart:</strong> Thêm sản phẩm trực tiếp từ kết quả tìm kiếm
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Auto-close:</strong> Tự động đóng kết quả khi click ra ngoài
              </Typography>
            </Stack>

            <Box sx={{ background: 'rgba(26, 26, 58, 0.05)', p: 3, borderRadius: 2, border: '1px solid rgba(26, 26, 58, 0.1)' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#2d1b69' }}>
                🔍 Hướng dẫn test tìm kiếm:
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  1. <strong>Nhập từ khóa:</strong> "iPhone", "Samsung", "Laptop", "Gaming"
                </Typography>
                <Typography variant="body2">
                  2. <strong>Xem kết quả:</strong> Kết quả hiển thị ngay lập tức
                </Typography>
                <Typography variant="body2">
                  3. <strong>Thêm vào giỏ:</strong> Click nút "Thêm" trên sản phẩm
                </Typography>
                <Typography variant="body2">
                  4. <strong>Kiểm tra giỏ hàng:</strong> Số lượng hiển thị trên icon giỏ hàng
                </Typography>
              </Stack>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#2d1b69' }}>
              🛒 Chức năng Giỏ hàng
            </Typography>
            
            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">
                ✅ <strong>Cart Context:</strong> Quản lý giỏ hàng toàn cục với React Context
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Local Storage:</strong> Lưu giỏ hàng vào localStorage, không mất khi refresh
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Cart Counter:</strong> Hiển thị số lượng sản phẩm trên icon giỏ hàng
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Duplicate Handling:</strong> Tự động tăng số lượng nếu sản phẩm đã có
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Cart State:</strong> Nút "Đã thêm" khi sản phẩm đã có trong giỏ
              </Typography>
            </Stack>

            <Box sx={{ background: 'rgba(26, 26, 58, 0.05)', p: 3, borderRadius: 2, border: '1px solid rgba(26, 26, 58, 0.1)' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#2d1b69' }}>
                🧪 Hướng dẫn test giỏ hàng:
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  1. <strong>Tìm kiếm sản phẩm:</strong> Nhập từ khóa để tìm sản phẩm
                </Typography>
                <Typography variant="body2">
                  2. <strong>Thêm vào giỏ:</strong> Click nút "Thêm" trên sản phẩm
                </Typography>
                <Typography variant="body2">
                  3. <strong>Kiểm tra counter:</strong> Số lượng hiển thị trên icon giỏ hàng
                </Typography>
                <Typography variant="body2">
                  4. <strong>Thêm lại:</strong> Thêm cùng sản phẩm để test duplicate handling
                </Typography>
                <Typography variant="body2">
                  5. <strong>Refresh page:</strong> Kiểm tra giỏ hàng được lưu trong localStorage
                </Typography>
              </Stack>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#2d1b69' }}>
              📱 Responsive Design
            </Typography>
            
            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography variant="body1">
                ✅ <strong>Mobile Menu:</strong> Menu hamburger cho màn hình nhỏ
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Search Bar:</strong> Ẩn trên mobile nhỏ để tiết kiệm không gian
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Cart Icon:</strong> Luôn hiển thị với badge số lượng
              </Typography>
              <Typography variant="body1">
                ✅ <strong>Touch Friendly:</strong> Kích thước button phù hợp cho mobile
              </Typography>
            </Stack>

            <Box sx={{ background: 'rgba(26, 26, 58, 0.05)', p: 3, borderRadius: 2, border: '1px solid rgba(26, 26, 58, 0.1)' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#2d1b69' }}>
                📐 Test Responsive:
              </Typography>
              <Stack spacing={1}>
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
                  4. <strong>Search Results:</strong> Kiểm tra hiển thị kết quả tìm kiếm trên mobile
                </Typography>
              </Stack>
            </Box>
          </Paper>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Header đã được tích hợp đầy đủ chức năng tìm kiếm và giỏ hàng
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Chip label="Tìm kiếm Real-time" color="primary" variant="outlined" />
              <Chip label="Giỏ hàng Context" color="success" variant="outlined" />
              <Chip label="Local Storage" color="info" variant="outlined" />
              <Chip label="Responsive Design" color="warning" variant="outlined" />
              <Chip label="Mobile Menu" color="secondary" variant="outlined" />
            </Stack>
          </Box>
        </Box>
      </Box>
    </CartProvider>
  );
};

export default HeaderWithSearchDemo;
