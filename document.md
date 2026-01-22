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
    "result": "Chào anh/chị, em xin giới thiệu mẫu Quần short Nam AKSV427-1V ạ.\n\nSản phẩm này có giá 899,000 VNĐ, được trang bị công nghệ khô nhanh AT DRY và làm mát AT DRY FREEZE. Với chất liệu Polyamide88% Elastane12% co giãn 4 chiều, quần rất thoải mái. Form Regular Fit, phù hợp cho cả tập luyện và mặc hàng ngày.\n\nAnh/chị thấy mẫu này thế nào ạ, hay anh/chị đang tìm quần cho môn thể thao cụ thể nào khác không?"
}

yêu cầu: tạo cho tôi một message ở trang home có thể mở ra đóng vào, vị trí nằm góc bên trái, đấu nối api AI tư vấn bán hàng vào đó cho tôi 