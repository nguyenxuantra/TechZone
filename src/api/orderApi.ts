import { baseApi, type DataResponse } from "./baseApi";

// Create Order Request
export interface CreateOrderRequest {
    addressId: number | null;
    couponId: number | null;
}

// Order Item Response
export interface OrderItemResponse {
    orderItemId: number;
    productId: number;
    productName: string;
    productImageUrl: string;
    quantity: number;
    price: number;
}

// Order Response
export interface OrderResponse {
    orderId: number;
    userId: number;
    totalAmount: number;
    status: string;
    createdAt: number;
    addressId: number | null;
    couponId: number | null;
    items: OrderItemResponse[];
}

const orderApi = {
    // Create Order
    createOrder: async (data: CreateOrderRequest): Promise<DataResponse<OrderResponse>> => {
        const response = await baseApi.post<DataResponse<OrderResponse>>('/orders', data);
        return response.data;
    }
};

export default orderApi;
