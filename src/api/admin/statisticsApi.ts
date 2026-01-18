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
    }
};

export default statisticsApi;
