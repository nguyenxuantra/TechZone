
api : Lấy danh sách sản phẩm cho user
method: GET
endpoint : /products

request param: 
@RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "category_id", required = false) Integer categoryId,
            @RequestParam(value = "min_price", required = false) Double minPrice,
            @RequestParam(value = "max_price", required = false) Double maxPrice,
            @RequestParam(value = "flash_sale", required = false) Boolean flashSale,
            @RequestParam(value = "sort_by", required = false, defaultValue = "productId") String sortBy,
            @RequestParam(value = "sort_dir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "page_no", required = false, defaultValue = "1") int pageNo,
            @RequestParam(value = "page_size", required = false, defaultValue = "10") int pageSize

response mẫu trả về 
{
    "code": 200,
    "message": "Lấy danh sách sản phẩm thành công",
    "result": {
        "content": [
            {
                "productId": 11,
                "name": "Tai nghe Sony WH-1000XM5",
                "description": "Tai nghe chống ồn hàng đầu thế giới với công nghệ NC/Ambient Sound Control, âm thanh chất lượng cao và thời lượng pin lên đến 30 giờ",
                "price": 2000000.0,
                "discount": 1000000.0,
                "stock": 26,
                "imageUrl": "https://res.cloudinary.com/dxfqnkgun/image/upload/v1768634788/techbit/ry5abidc4ulqkazpxi6v.webp",
                "rating": null,
                "brand": "sony",
                "categoryName": "Đồng hồ",
                "createdAt": 1768634850350
            },
            {
                "productId": 10,
                "name": "Dell XPS 13 Plus 9320",
                "description": "Dell XPS 13 Plus với thiết kế siêu mỏng, màn hình 13.4 inch 4K OLED, chip Intel thế hệ 13 và bàn phím cảm ứng tiên tiến",
                "price": 2.999E7,
                "discount": 2000000.0,
                "stock": 15,
                "imageUrl": "imga",
                "rating": null,
                "brand": "Dell",
                "categoryName": "airport",
                "createdAt": 1768634261372
            }
        ],
        "pageNo": 0,
        "pageSize": 2,
        "totalElement": 8,
        "totalPages": 4,
        "last": false
    }
}




yêu cầu: Ở trang product của người dùng gọi api lấy danh sách sản phẩm đấu nối api với bộ lọc sao cho hợp lý  
+ phần sort_by để value là price 
+ phân trang lấy ra 10 sản phẩm cho tôi 
- không cần lọc theo thương hiệu.