import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  Psychology as PsychologyIcon,
  SmartToy as SmartToyIcon,
} from '@mui/icons-material';
import aiChatApi from '../../api/aiChatApi';

const AIManagement = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'model'; text: string; timestamp: Date }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message on mount
    if (messages.length === 0) {
      setMessages([
        {
          role: 'model',
          text: 'Xin chào! Tôi là AI tư vấn bán hàng thời trang nam. Tôi có thể giúp bạn tư vấn về sản phẩm, đơn hàng, và các vấn đề khác liên quan đến quản lý cửa hàng. Bạn cần hỗ trợ gì?',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to UI
    const newUserMessage = { role: 'user' as const, text: userMessage, timestamp: new Date() };
    setMessages((prev) => [...prev, newUserMessage]);

    setIsLoading(true);

    try {
      const response = await aiChatApi.sendMessage(userMessage);
      // Add AI message to UI
      setMessages((prev) => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi tin nhắn';
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: `Xin lỗi, ${errorMessage}. Vui lòng thử lại sau.`, timestamp: new Date() },
      ]);
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ height: 'calc(100vh - 120px)' }}>
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid rgba(102, 126, 234, 0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              width: 56,
              height: 56,
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          >
            <PsychologyIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              AI Quản lý
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.85rem' }}>
              Trợ lý AI tư vấn bán hàng thời trang nam
            </Typography>
          </Box>
          <Chip
            label="Online"
            size="small"
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          />
        </Box>

        {/* Messages Area */}
        <Box
          ref={chatContainerRef}
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
            background: 'linear-gradient(to bottom, #f8f9ff 0%, #ffffff 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            '&::-webkit-scrollbar': {
              width: '10px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(102, 126, 234, 0.3)',
              borderRadius: '5px',
              '&:hover': {
                background: 'rgba(102, 126, 234, 0.5)',
              },
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                animation: 'fadeIn 0.3s ease-in',
                '@keyframes fadeIn': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(10px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'flex-end',
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                  maxWidth: '75%',
                }}
              >
                {message.role === 'model' && (
                  <Avatar
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      width: 40,
                      height: 40,
                      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: 22 }} />
                  </Avatar>
                )}
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: message.role === 'user' 
                      ? '20px 20px 4px 20px' 
                      : '20px 20px 20px 4px',
                    background: message.role === 'user'
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'white',
                    color: message.role === 'user' ? 'white' : 'text.primary',
                    boxShadow: message.role === 'user'
                      ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                      : '0 2px 8px rgba(0,0,0,0.08)',
                    border: message.role === 'model' ? '1px solid rgba(102, 126, 234, 0.1)' : 'none',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                    }}
                  >
                    {message.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 1,
                      opacity: 0.7,
                      fontSize: '0.7rem',
                    }}
                  >
                    {formatTime(message.timestamp)}
                  </Typography>
                </Box>
                {message.role === 'user' && (
                  <Avatar
                    sx={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      width: 40,
                      height: 40,
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(245, 87, 108, 0.3)',
                    }}
                  >
                    A
                  </Avatar>
                )}
              </Box>
            </Box>
          ))}
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 1.5,
                animation: 'fadeIn 0.3s ease-in',
              }}
            >
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  width: 40,
                  height: 40,
                }}
              >
                <SmartToyIcon sx={{ fontSize: 22 }} />
              </Avatar>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '20px 20px 20px 4px',
                  bgcolor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(102, 126, 234, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <CircularProgress size={20} sx={{ color: '#667eea' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Đang suy nghĩ...
                </Typography>
              </Box>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            p: 3,
            bgcolor: 'white',
            borderTop: '1px solid',
            borderColor: 'rgba(102, 126, 234, 0.1)',
            display: 'flex',
            gap: 2,
            alignItems: 'flex-end',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Nhập câu hỏi của bạn về quản lý cửa hàng..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: '#f8f9ff',
                '& fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(102, 126, 234, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                },
              },
              '& .MuiInputBase-input': {
                fontSize: '0.95rem',
              },
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              width: 50,
              height: 50,
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
              },
              '&:disabled': {
                background: 'rgba(0,0,0,0.1)',
                color: 'rgba(0,0,0,0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default AIManagement;
