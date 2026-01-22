import { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
  Fade,
  Slide,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as SmartToyIcon,
} from '@mui/icons-material';
import geminiApi, { type GeminiMessage } from '../api/geminiApi';

const ChatBot = () => {
  // Palette (nước hoa)
  const palette = {
    wine900: '#1a0f14',
    wine800: '#241018',
    wine700: '#341420',
    cream: '#fbf6f0',
    ink: '#24161a',
    muted: '#6b5a61',
    gold: '#c7a24a',
    rose: '#c3576a',
    borderSoft: 'rgba(26,15,20,0.08)',
  } as const;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'model'; text: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationHistoryRef = useRef<GeminiMessage[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    const newUserMessage = { role: 'user' as const, text: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);

    conversationHistoryRef.current.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    setIsLoading(true);

    try {
      const response = await geminiApi.sendMessage(userMessage, conversationHistoryRef.current);
      
      conversationHistoryRef.current.push({
        role: 'model',
        parts: [{ text: response }],
      });

      setMessages((prev) => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi tin nhắn';
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: `Xin lỗi, ${errorMessage}. Vui lòng thử lại sau.` },
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'model',
          text: 'Xin chào! Tôi là trợ lý AI của Halua Perfume. Tôi có thể giúp bạn tìm kiếm mùi hương phù hợp, tư vấn về các sản phẩm chế độ chăm sóc, hoặc trả lời bất kỳ câu hỏi nào về các bộ sưu tập của chúng tôi. 🌸',
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Fade in={!isOpen}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={handleToggle}
            sx={{
              width: 64,
              height: 64,
              bgcolor: palette.wine900,
              color: palette.cream,
              boxShadow: `0 6px 24px ${palette.rose}40`,
              '&:hover': {
                bgcolor: palette.wine700,
                transform: 'scale(1.12)',
                boxShadow: `0 8px 32px ${palette.rose}60`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ChatIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
      </Fade>

      {/* Chat Window */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={24}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: { xs: 'calc(100vw - 48px)', sm: 400 },
            height: { xs: 'calc(100vh - 48px)', sm: 600 },
            maxHeight: { xs: 'calc(100vh - 48px)', sm: 600 },
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1001,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: `0 12px 40px ${palette.wine900}30`,
            bgcolor: palette.cream,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${palette.wine900} 0%, ${palette.wine700} 100%)`,
              color: palette.cream,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: palette.cream, color: palette.wine900 }}>
                <SmartToyIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Trợ lý AI
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.88 }}>
                  Halua Perfume Assistant
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={handleToggle}
              sx={{
                color: palette.cream,
                '&:hover': {
                  bgcolor: 'rgba(251,246,240,0.15)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              bgcolor: 'rgba(251,246,240,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: 1,
                }}
              >
                {message.role === 'model' && (
                  <Avatar
                    sx={{
                      bgcolor: palette.wine900,
                      color: palette.cream,
                      width: 32,
                      height: 32,
                    }}
                  >
                    <SmartToyIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: '75%',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: message.role === 'user' ? palette.wine900 : 'white',
                    color: message.role === 'user' ? palette.cream : palette.ink,
                    boxShadow: message.role === 'user' 
                      ? `0 4px 12px ${palette.wine900}20` 
                      : `0 2px 8px ${palette.borderSoft}`,
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {message.text}
                  </Typography>
                </Box>
                {message.role === 'user' && (
                  <Avatar
                    sx={{
                      bgcolor: palette.gold,
                      color: palette.wine900,
                      width: 32,
                      height: 32,
                      fontWeight: 700,
                    }}
                  >
                    U
                  </Avatar>
                )}
              </Box>
            ))}
            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: palette.wine900,
                    color: palette.cream,
                    width: 32,
                    height: 32,
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'white',
                    boxShadow: `0 2px 8px ${palette.borderSoft}`,
                  }}
                >
                  <CircularProgress size={16} sx={{ color: palette.wine900 }} />
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              bgcolor: palette.cream,
              borderTop: `1px solid ${palette.borderSoft}`,
              display: 'flex',
              gap: 1,
              alignItems: 'flex-end',
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Hỏi về mùi hương yêu thích..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&:hover fieldset': {
                    borderColor: palette.gold,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: palette.gold,
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: palette.muted,
                  opacity: 0.7,
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              sx={{
                bgcolor: palette.wine900,
                color: palette.cream,
                '&:hover': {
                  bgcolor: palette.wine700,
                },
                '&:disabled': {
                  bgcolor: palette.muted,
                  color: palette.cream,
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </>
  );
};

export default ChatBot;