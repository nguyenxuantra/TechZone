import { baseApi, type DataResponse } from "../baseApi";

// KPI Overview Response
export interface OverviewKPI {
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    totalProducts: number;
    newUsersToday: number;
    ordersToday: number;
    revenueToday: number;
}

// Time Statistics Response
export interface TimeStatistic {
    date: string;
    revenue: number;
}

// Time Statistics Request Params
export interface TimeStatisticsParams {
    fromDate?: string;  // format: yyyy-MM-dd
    toDate?: string;    // format: yyyy-MM-dd
    groupBy?: 'DAY' | 'MONTH' | 'YEAR';
}

// Orders Statistics Response
export interface OrdersStatistics {
    total: number;
    success: number;
    approved: number;
    pending: number;
}

// Top Product Response
export interface TopProduct {
    productId: number;
    name: string;
    quantity: number;
    revenue: number;
}

const statisticsApi = {
    // Get KPI Overview
    getOverview: async (): Promise<DataResponse<OverviewKPI>> => {
        const response = await baseApi.get<DataResponse<OverviewKPI>>('/admin/statistics/overview');
        return response.data;
    },

    // Get Time Statistics
    getTimeStatistics: async (params?: TimeStatisticsParams): Promise<DataResponse<TimeStatistic[]>> => {
        const response = await baseApi.get<DataResponse<TimeStatistic[]>>('/admin/statistics/time', {
            params: {
                fromDate: params?.fromDate,
                toDate: params?.toDate,
                groupBy: params?.groupBy || 'DAY'
            }
        });
        return response.data;
    },

    // Get Orders Statistics
    getOrdersStatistics: async (): Promise<DataResponse<OrdersStatistics>> => {
        const response = await baseApi.get<DataResponse<OrdersStatistics>>('/admin/statistics/orders');
        return response.data;
    },

    // Get Top Products
    getTopProducts: async (): Promise<DataResponse<TopProduct[]>> => {
        const response = await baseApi.get<DataResponse<TopProduct[]>>('/admin/statistics/top-products');
        return response.data;
    }
};

export default statisticsApi;
