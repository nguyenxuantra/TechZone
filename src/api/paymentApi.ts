import { baseApi } from "./baseApi";

export interface VnPayPaymentRequest {
  amount: number;
  bankCode?: string;
}

export interface VnPayPaymentResponse {
  code: string;
  message: string;
  paymentUrl: string;
}

export interface VnPayPaymentApiResponse {
  code: number;
  message: string;
  data: VnPayPaymentResponse;
}

const paymentApi = {
  createVnPayPayment: (amount: number, bankCode: string = 'NCB') =>
    baseApi
      .get<VnPayPaymentApiResponse>(`/api/v1/payment/vn-pay?amount=${amount}&bankCode=${bankCode}`)
      .then((res) => res.data),
};

export default paymentApi;
