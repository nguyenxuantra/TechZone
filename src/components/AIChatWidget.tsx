import { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import aiChatApi from '../api/aiChatApi';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Xin chào! Tôi là trợ lý AI tư vấn bán hàng. Tôi có thể giúp gì cho bạn?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await aiChatApi.sendMessage(inputMessage);
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: response.result || response.message || 'Xin lỗi, tôi không thể trả lời lúc này.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              bgcolor: '#d4af37',
              color: '#1a1a1a',
              width: 60,
              height: 60,
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
              '&:hover': {
                bgcolor: '#c41e3a',
                color: 'white',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ChatIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            width: { xs: 'calc(100vw - 48px)', sm: 400 },
            height: { xs: 'calc(100vh - 48px)', sm: 600 },
            maxHeight: { sm: 600 },
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: '#1e293b',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: '#d4af37',
              color: '#1a1a1a',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                sx={{
                  bgcolor: '#1a1a1a',
                  color: '#d4af37',
                  width: 32,
                  height: 32,
                }}
              >
                AI
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  AI Tư vấn bán hàng
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
                  Trợ lý thời trang nam
                </Typography>
              </Box>
            </Stack>
            <IconButton
              onClick={() => setIsOpen(false)}
              size="small"
              sx={{
                color: '#1a1a1a',
                '&:hover': {
                  bgcolor: 'rgba(26, 26, 26, 0.1)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              bgcolor: '#0f172a',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: '#1e293b',
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: '#d4af37',
                borderRadius: '4px',
                '&:hover': {
                  bgcolor: '#c41e3a',
                },
              },
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '75%',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: message.isUser ? '#d4af37' : '#334155',
                    color: message.isUser ? '#1a1a1a' : 'white',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {message.text}
                  </Typography>
                </Box>
              </Box>
            ))}
            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: '#334155',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <CircularProgress size={16} sx={{ color: '#d4af37' }} />
                  <Typography variant="body2" sx={{ color: 'white', fontSize: '0.9rem' }}>
                    Đang suy nghĩ...
                  </Typography>
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box
            sx={{
              p: 2,
              bgcolor: '#1e293b',
              borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                placeholder="Nhập tin nhắn của bạn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#0f172a',
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(212, 175, 55, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(212, 175, 55, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#d4af37',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      opacity: 1,
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                sx={{
                  bgcolor: '#d4af37',
                  color: '#1a1a1a',
                  '&:hover': {
                    bgcolor: '#c41e3a',
                    color: 'white',
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(212, 175, 55, 0.3)',
                    color: 'rgba(26, 26, 26, 0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default AIChatWidget;
