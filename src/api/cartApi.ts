import { baseApi, type DataResponse } from "./baseApi";

export interface CartItemResponse {
    cartItemId: number;
    productId: number;
    productName: string;
    productPrice: number;
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

const cartApi = {
    addToCart: (data: AddToCartRequest) =>
        baseApi
            .post<DataResponse<CartResponse>>("/cart/items", data)
            .then((res) => res.data),
};

export default cartApi;
