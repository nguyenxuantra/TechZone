import { baseApi, type DataResponse } from "../baseApi";

export interface OrderItem {
    orderItemId: number;
    productId: number;
    productName: string;
    productImageUrl: string | null;
    quantity: number;
    price: number;
}

export interface Order {
    orderId: number;
    userId: number;
    totalAmount: number;
    status: string;
    createdAt: number;
    addressId: number;
    couponId: number | null;
    items: OrderItem[];
}

export interface OrderPage {
    content: Order[];
    pageNo: number;
    pageSize: number;
    totalElement: number;
    totalPages: number;
    last: boolean;
}

export interface GetOrdersParams {
    pageNo?: number;
    pageSize?: number;
    status?: string;
}

const orderApi = {
    getOrders: (params?: GetOrdersParams) =>
        baseApi
            .get<DataResponse<OrderPage>>("/orders", { params })
            .then((res) => res.data),
};

export default orderApi;
