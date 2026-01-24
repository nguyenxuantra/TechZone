API: AI tư vấn bán hàng thời trang nam
Method: POST
endpoint:/api/ai/chat

Request body:   
 
{
    "message":"giới thiệu cho tôi 1 cái quần"
}

response mẫu trả về là : 
{
    "code": 200,
    "message": "success",
    "result": "Chào bạn, bạn muốn tìm hiểu về máy tính Dell XPS 13 Plus 9320 đúng không ạ?\n\nChúng tôi có sản phẩm Dell XPS 13 Plus 9320 với giá 3,000,000 VNĐ. Máy có thiết kế siêu mỏng, màn hình 13.4 inch 4K OLED, chip Intel thế hệ 13 và bàn phím cảm ứng tiên tiến. Bạn có thể xem hình ảnh tại đây: https://res.cloudinary.com/dxfqnkgun/image/upload/v1768641308/techbit/nfbc6viezpjysydld8n6.webp\n\nNgoài ra, chúng tôi cũng có sản phẩm Dell XPS 13 Plus 9320 với giá 29,000,000 VNĐ. Sản phẩm này cũng có thiết kế siêu mỏng, màn hình 13.4 inch 4K OLED, chip Intel thế hệ 13 và bàn phím cảm ứng tiên tiến. Hình ảnh sản phẩm: https://res.cloudinary.com/dxfqnkgun/image/upload/v1768641225/techbit/b04a6oue6stk1ifphutf.webp\n\nBạn cần thêm thông tin gì về sản phẩm này không ạ?"
}

yêu cầu: ở trang hôm sửa lại chatbox khi result trả về chuỗi hãy sử lý chuối này ở trong chatbox như sau khi thấy kí hiệu \n\n hay gần giống thế (\n) thì tạo một message mới ( nghĩa là một result trả về có thể chia ra nhiều message nhỏ) và khi có link ảnh này https://res.cloudinary.com/dxfqnkgun/image/upload/v1768641308/techbit/nfbc6viezpjysydld8n6.webp thì hiển thị ở dạng ảnh cho tôi 