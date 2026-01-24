import { useState, useRef, useEffect } from "react";
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
} from "@mui/material";
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Psychology as PsychologyIcon,
} from "@mui/icons-material";
import aiChatApi from "../api/aiChatApi";

interface Message {
  role: "user" | "model";
  text: string;
  isImage?: boolean;
  imageUrl?: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hàm tách response thành các message nhỏ và xử lý link ảnh
  const parseResponse = (response: string): Message[] => {
    // Tách theo \n\n
    const parts = response.split(/\n\n+/);
    const messages: Message[] = [];

    parts.forEach((part) => {
      if (!part.trim()) return;

      // Kiểm tra xem có link ảnh không
      const imageUrlRegex =
        /https:\/\/[^\s]+\.(webp|jpg|jpeg|png|gif)/gi;
      const imageMatches = part.match(imageUrlRegex);

      if (imageMatches && imageMatches.length > 0) {
        // Nếu có link ảnh
        const imageUrl = imageMatches[0];
        // Tách text và link ảnh
        const textWithoutLink = part
          .replace(imageUrlRegex, "")
          .trim();

        // Thêm text nếu có
        if (textWithoutLink) {
          messages.push({
            role: "model",
            text: textWithoutLink,
          });
        }

        // Thêm ảnh
        messages.push({
          role: "model",
          text: "",
          isImage: true,
          imageUrl: imageUrl,
        });
      } else {
        // Nếu không có ảnh, chỉ thêm text
        messages.push({
          role: "model",
          text: part.trim(),
        });
      }
    });

    return messages;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");

    // Add user message to UI
    const newUserMessage: Message = {
      role: "user",
      text: userMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    setIsLoading(true);

    try {
      const response = await aiChatApi.sendMessage(userMessage);
      // Parse response và tách thành nhiều message
      const parsedMessages = parseResponse(response);
      setMessages((prev) => [...prev, ...parsedMessages]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi gửi tin nhắn";
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: `Xin lỗi, ${errorMessage}. Vui lòng thử lại sau.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when opening for the first time
      setMessages([
        {
          role: "model",
          text: "Chào bạn! Tôi là trợ lý AI của TechZone. Tôi có thể giúp gì cho bạn?",
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
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={handleToggle}
            sx={{
              width: 64,
              height: 60,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                transform: "scale(1.1)",
                boxShadow: "0 12px 32px rgba(102, 126, 234, 0.6)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": {
                  boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                },
                "50%": {
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.6)",
                },
              },
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
            position: "fixed",
            bottom: 24,
            right: 24,
            width: { xs: "calc(100vw - 32px)", sm: 380, md: 420 },
            height: {
              xs: "calc(100dvh - 96px)", // chừa chỗ header + safe
              sm: 520,
              md: 555,
            },
            maxHeight: {xs: 'calc(100dvh - 96px)',
      sm: 600, },
            display: "flex",
            flexDirection: "column",
            zIndex: 1001,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              p: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  width: 48,
                  height: 48,
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                <PsychologyIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                >
                  AI Tư vấn
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.95, fontSize: "0.75rem" }}
                >
                  Trợ lý thông minh TechZone
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={handleToggle}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.2)",
                  transform: "rotate(90deg)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 2.5,
              background:
                "linear-gradient(to bottom, #f8f9ff 0%, #ffffff 100%)",
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(102, 126, 234, 0.3)",
                borderRadius: "4px",
                "&:hover": {
                  background: "rgba(102, 126, 234, 0.5)",
                },
              },
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.role === "user" ? "flex-end" : "flex-start",
                  gap: 1.5,
                  animation: "fadeIn 0.3s ease-in",
                  "@keyframes fadeIn": {
                    from: {
                      opacity: 0,
                      transform: "translateY(10px)",
                    },
                    to: {
                      opacity: 1,
                      transform: "translateY(0)",
                    },
                  },
                }}
              >
                {message.role === "model" && (
                  <Avatar
                    sx={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      width: 36,
                      height: 36,
                      boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    <PsychologyIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                )}
                {message.isImage && message.imageUrl ? (
                  <Box
                    sx={{
                      maxWidth: "78%",
                      borderRadius: "20px 20px 20px 4px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      border: "1px solid rgba(102, 126, 234, 0.1)",
                    }}
                  >
                    <img
                      src={message.imageUrl}
                      alt="Product"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      maxWidth: "78%",
                      p: 2,
                      borderRadius:
                        message.role === "user"
                          ? "20px 20px 4px 20px"
                          : "20px 20px 20px 4px",
                      background:
                        message.role === "user"
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "white",
                      color:
                        message.role === "user"
                          ? "white"
                          : "text.primary",
                      boxShadow:
                        message.role === "user"
                          ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                          : "0 2px 8px rgba(0,0,0,0.08)",
                      border:
                        message.role === "model"
                          ? "1px solid rgba(102, 126, 234, 0.1)"
                          : "none",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        lineHeight: 1.6,
                        fontSize: "0.9rem",
                      }}
                    >
                      {message.text}
                    </Typography>
                  </Box>
                )}
                {message.role === "user" && (
                  <Avatar
                    sx={{
                      background:
                        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      width: 36,
                      height: 36,
                      fontWeight: 600,
                      boxShadow: "0 2px 8px rgba(245, 87, 108, 0.3)",
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
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 1.5,
                  animation: "fadeIn 0.3s ease-in",
                }}
              >
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    width: 36,
                    height: 36,
                  }}
                >
                  <PsychologyIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "20px 20px 20px 4px",
                    bgcolor: "white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(102, 126, 234, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CircularProgress size={18} sx={{ color: "#667eea" }} />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", ml: 0.5 }}
                  >
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
              p: 2.5,
              bgcolor: "white",
              borderTop: "1px solid",
              borderColor: "rgba(102, 126, 234, 0.1)",
              display: "flex",
              gap: 1.5,
              alignItems: "flex-end",
              boxShadow: "0 -4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Nhập câu hỏi của bạn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#f8f9ff",
                  "& fieldset": {
                    borderColor: "rgba(102, 126, 234, 0.2)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(102, 126, 234, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                  },
                },
                "& .MuiInputBase-input": {
                  fontSize: "0.9rem",
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                width: 44,
                height: 44,
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                },
                "&:disabled": {
                  background: "rgba(0,0,0,0.1)",
                  color: "rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
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
