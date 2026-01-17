import { baseApi, type DataResponse } from "./baseApi";

export interface CartItemResponse {
    cartItemId: number;
    productId: number;
    productName: string;
    productPrice: number; // Giá gốc
    productDiscount: number; // Giá bán
    productImageUrl: string | null;
    quantity: number;
    createdAt: number;
}

export interface CartResponse {
    cartId: number;
    userId: number;
    items: CartItemResponse[];
    updatedAt: number | null;
}

export interface AddToCartRequest {
    productId: number;
    quantity: number;
}

export interface UpdateCartItemQuantityRequest {
    quantity: number;
}

const cartApi = {
    addToCart: (data: AddToCartRequest) =>
        baseApi
            .post<DataResponse<CartResponse>>("/cart/items", data)
            .then((res) => res.data),
    getCart: () =>
        baseApi
            .get<DataResponse<CartResponse>>("/cart")
            .then((res) => res.data),
    deleteCartItem: (cartItemId: number) =>
        baseApi
            .delete<DataResponse<null>>(`/cart/items/${cartItemId}`)
            .then((res) => res.data),
    updateCartItemQuantity: (cartItemId: number, data: UpdateCartItemQuantityRequest) =>
        baseApi
            .put<DataResponse<CartResponse>>(`/cart/items/${cartItemId}`, data)
            .then((res) => res.data),
};

export default cartApi;
