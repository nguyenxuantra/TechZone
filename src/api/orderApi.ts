import { baseApi, type DataResponse } from "./baseApi";

export interface CreateOrderRequest {
  addressId: number | null;
  couponId: number | null;
}

export interface OrderItem {
  orderItemId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  orderId: number;
  userId: number;
  totalAmount: number;
  status: string;
  createdAt: number;
  addressId: number | null;
  couponId: number | null;
  items: OrderItem[];
}

const orderApi = {
  createOrder: (data: CreateOrderRequest) =>
    baseApi
      .post<DataResponse<OrderResponse>>("/orders", data)
      .then((res) => res.data),
};

export default orderApi;
