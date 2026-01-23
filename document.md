
API chatbot gemini
endpoint: https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent
method: POST
request param
key: AIzaSyCqwYQCUe_OufDOJWrfnGZ9EA7qBdE-EJA
response mẫu trả về: 
{
    "candidates": [
        {
            "content": {
                "parts": [
                    {
                        "text": "Chào bạn! Tôi có thể giúp gì cho bạn?"
                    }
                ],
                "role": "model"
            },
            "finishReason": "STOP",
            "index": 0
        }
    ],
    "usageMetadata": {
        "promptTokenCount": 3,
        "candidatesTokenCount": 11,
        "totalTokenCount": 59,
        "promptTokensDetails": [
            {
                "modality": "TEXT",
                "tokenCount": 3
            }
        ],
        "thoughtsTokenCount": 45
    },
    "modelVersion": "gemini-2.5-flash",
    "responseId": "js5sad-OCb6a1e8PjevTgAs"
}

Yêu cầu : Đấu nối Api chatbot gemini 
+ tạo giao diện ở trang home một message ở góc phải màn hình có thể mở ra đóng giao, để người dùng có thể nhắn tin với AI 
