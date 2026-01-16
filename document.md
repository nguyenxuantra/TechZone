api lấy danh sách thông tin đơn hàng 
url: /orders
method: get 

request param 
 @RequestParam(defaultValue = "0") Integer pageNo,
 @RequestParam(defaultValue = "10") Integer pageSize,
 @RequestParam(required = false) String status 

response mẫu trả về:
{
    "code": 200,
    "message": "Success",
    "result": {
        "content": [
            {
                "orderId": 1,
                "userId": 1,
                "totalAmount": 1200000.0,
                "status": "PENDING",
                "createdAt": 1705300000,
                "addressId": 1,
                "couponId": null,
                "items": [
                    {
                        "orderItemId": 1,
                        "productId": 1,
                        "productName": "Dell XPS 13 Plus 9320",
                        "productImageUrl": null,
                        "quantity": 2,
                        "price": 600000.0
                    }
                ]
            }
        ],
        "pageNo": 0,
        "pageSize": 10,
        "totalElement": 1,
        "totalPages": 1,
        "last": true
    }
}


yêu cầu: ở trang quản lý đơn hàng bên admin đấu nối api lấy danh sách đơn hàng ở table chỉ cần hiển thị các trường sau 
"orderId": 1,
                "userId": 1,
                "totalAmount": 1200000.0,
                "status": "PENDING",
                "createdAt": 1705300000,
                "addressId": 1,
                "couponId": null, 
khi người dùng nhấn xem chi tiết đơn hàng  mới hiển thị đầy đủ thông tin đơn hàng 

