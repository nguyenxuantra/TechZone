import { baseApi } from './baseApi';

export interface AiChatRequest {
  message: string;
}

export interface AiChatResponse {
  code: number;
  message: string;
  result: string;
}

const aiChatApi = {
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await baseApi.post<AiChatResponse>('/api/ai/chat', {
        message,
      });

      // Handle the response structure: { code: 200, message: "success", result: "..." }
      if (response.data.code === 200 && response.data.result) {
        return response.data.result;
      }

      throw new Error(response.data.message || 'Failed to get response from AI');
    } catch (error) {
      console.error('Error calling AI Chat API:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to get response from AI');
    }
  },
};

export default aiChatApi;
