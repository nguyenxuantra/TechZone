api thêm sản phẩm vào giỏ hàng
url: /cart/items
method: post



response mẫu trả về:
{
    "code": 200,
    "message": "Thêm sản phẩm vào giỏ hàng thành công",
    "result": {
        "cartId": 1,
        "userId": 1,
        "items": [
            {
                "cartItemId": 1,
                "productId": 4,
                "productName": "Dell XPS 13 Plus 9320",
                "productPrice": 2.999E7,
                "productImageUrl": null,
                "quantity": 1,
                "createdAt": 1768406109821
            },
            {
                "cartItemId": 2,
                "productId": 7,
                "productName": "Dell XPS 13 Plus 9320",
                "productPrice": 2.999E7,
                "productImageUrl": "https://res.cloudinary.com/dxfqnkgun/image/upload/v1768390905/techbit/jmr1rjw3mwgp9ytdnkzy.jpg",
                "quantity": 1,
                "createdAt": 1768406179177
            }
        ],
        "updatedAt": null
    }
}




yêu cầu: đấu nối api thêm sản phẩm vào giỏ hàng, khi người dùng nhấn thêm sản phẩm vào giỏ hàng thì gọi api này ch cho tôi 


