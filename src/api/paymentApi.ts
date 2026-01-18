import { baseApi } from "./baseApi";

// VNPay Payment Response (API trả về data chứ không phải result)
export interface VNPayPaymentResponse {
    code: string;
    message: string;
    paymentUrl: string;
}

// VNPay API Response Structure
export interface VNPayApiResponse {
    code: number;
    message: string;
    data: VNPayPaymentResponse;
}

// VNPay Payment Request Params
export interface VNPayPaymentParams {
    amount: number;  // Tổng tiền thanh toán
    bankCode?: string; // Mặc định: NCB
}

// VNPay Callback Response
export interface VNPayCallbackResponse {
    code: string;
    message: string;
    paymentUrl: string;
}

const paymentApi = {
    // Create VNPay payment URL
    createVNPayPayment: async (params: VNPayPaymentParams): Promise<VNPayApiResponse> => {
        const response = await baseApi.get<VNPayApiResponse>('/api/v1/payment/vn-pay', {
            params: {
                amount: params.amount,
                bankCode: params.bankCode || 'NCB'
            }
        });
        return response.data;
    }
};

export default paymentApi;
