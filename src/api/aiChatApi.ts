import { baseApi, type DataResponse } from "./baseApi";

export interface AIChatRequest {
  message: string;
}

export interface AIChatResponse {
  code: number;
  message: string;
  result: string;
}

const aiChatApi = {
  sendMessage: (message: string) =>
    baseApi
      .post<DataResponse<string>>("/api/ai/chat", { message })
      .then((res) => res.data),
};

export default aiChatApi;
