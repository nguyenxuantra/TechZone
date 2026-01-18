import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyCqwYQCUe_OufDOJWrfnGZ9EA7qBdE-EJA';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export interface GeminiRequest {
  contents: GeminiMessage[];
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
    index: number;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
  modelVersion?: string;
  responseId?: string;
}

const geminiApi = {
  async sendMessage(message: string, conversationHistory: GeminiMessage[] = []): Promise<string> {
    try {
      const contents: GeminiMessage[] = [
        ...conversationHistory,
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];

      const response = await axios.post<GeminiResponse>(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.candidates && response.data.candidates.length > 0) {
        const text = response.data.candidates[0].content.parts[0]?.text || '';
        return text;
      }

      throw new Error('No response from Gemini API');
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error?.message || 'Failed to get response from AI');
      }
      throw new Error('Failed to get response from AI');
    }
  },
};

export default geminiApi;
