import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Maximize2, MessageCircle, Minimize2, Phone, Send, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { generateUserId, initializeChat, sendMessage, subscribeToMessages, type ChatMessage } from "@/lib/firestore";

interface ChatProps {
  chatOpen: boolean;
  chatExpanded: boolean;
  isMobile: boolean;
  setChatOpen: (open: boolean) => void;
  setChatExpanded: (expanded: boolean) => void;
  userId?: string | null;
  dimmed?: boolean;
}

export const Chat = ({
  chatOpen,
  chatExpanded,
  isMobile,
  setChatOpen,
  setChatExpanded,
  userId: propUserId,
  dimmed = false,
}: ChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const CALL_IDENTIFIER = "0xU8911v5_call";

  // Use propUserId if provided, otherwise generate one
  useEffect(() => {
    if (propUserId) {
      setUserId(propUserId);
    } else if (chatOpen && !userId) {
      const newUserId = generateUserId();
      setUserId(newUserId);
      initializeChat(newUserId).catch(console.error);
    }
  }, [propUserId, chatOpen, userId]);

  useEffect(() => {
    if (userId) {
      const unsubscribe = subscribeToMessages(userId, (newMessages) => {
        setMessages(newMessages);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
      return unsubscribe;
    }
  }, [userId]);

  // Auto-scroll to bottom when chat opens
  useEffect(() => {
    if (chatOpen && messages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [chatOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !userId || isLoading) return;

    const messageContent = inputValue.trim();
    
    // Check for call identifier and silently clear if found
    if (messageContent === CALL_IDENTIFIER) {
      setInputValue("");
      return;
    }

    setIsLoading(true);
    try {
      await sendMessage(userId, messageContent);
      setInputValue("");
    } catch (error) {
      console.error('Failed to send message:', error);
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

  const formatTime = (timestamp: any) => {
    const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="fixed bottom-1 right-2 z-50">
      {chatOpen && (
        <Card
          className={`${
            chatExpanded || isMobile
              ? "fixed inset-4 w-auto h-auto rounded-lg"
              : "w-80 h-96 mb-20 rounded-lg"
          } bg-[#1a2332] border-[#64FFDA] shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01]`}
          role="dialog"
          aria-labelledby="chat-title"
          aria-describedby="chat-description"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#64FFDA]/20">
            <div className="flex items-center space-x-3">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Mubarak Ibrahim"
                className="w-8 h-8 rounded-full border border-[#64FFDA] hover:scale-105 transition-transform duration-300"
              />
              <div>
                <div
                  id="chat-title"
                  className="text-white font-semibold text-sm"
                >
                  Mubarak Ibrahim
                </div>
                <div className="text-[#64FFDA] text-xs">The codeswot</div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {!isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatExpanded(!chatExpanded)}
                  className="hover:bg-[#64FFDA]/10 text-gray-400 hover:text-[#64FFDA] hover:scale-105 transition-all duration-300 h-6 w-6 p-0"
                  aria-label={chatExpanded
                    ? "Minimize chat window"
                    : "Expand chat window"}
                >
                  {chatExpanded
                    ? <Minimize2 size={14} />
                    : <Maximize2 size={14} />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-[#64FFDA]/10 text-gray-400 hover:text-[#64FFDA] hover:scale-105 transition-all duration-300 h-6 w-6 p-0"
                aria-label="Start audio call"
              >
                <Phone size={14} />
              </Button>
              {(chatExpanded || isMobile) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setChatOpen(false)}
                  className="hover:bg-[#64FFDA]/10 text-gray-400 hover:text-[#64FFDA] hover:scale-105 transition-all duration-300 h-6 w-6 p-0"
                  aria-label="Close chat"
                >
                  <X size={14} />
                </Button>
              )}
            </div>
          </div>

          <div
            id="chat-description"
            className={`flex-1 px-4 py-4 space-y-4 overflow-y-auto ${
              chatExpanded || isMobile ? "h-[calc(100vh-180px)]" : "h-64"
            }`}
            role="log"
            aria-label="Chat messages"
          >
            {messages.map((msg) => {
              // Check if this is a call message
              if (msg.content === CALL_IDENTIFIER) {
                return (
                  <div key={msg.id} className="flex justify-center my-4">
                    <div className="flex items-center w-full text-[#64FFDA] text-sm">
                      <div className="flex-1 h-px bg-[#64FFDA]/30"></div>
                      <div className="flex items-center space-x-2 px-4">
                        <Phone size={16} className="text-[#64FFDA]/70 ml-2"/>
                        <span className="font-medium text-[#64FFDA]/70 ml-2">
                          {msg.user === "codeswot" ? "codeswot" : "you"}
                        </span>
                        <time className="text-xs text-[#64FFDA]/70 ml-2">
                          {formatTime(msg.timestamp)}
                        </time>
                      </div>
                      <div className="flex-1 h-px bg-[#64FFDA]/30"></div>
                    </div>
                  </div>
                );
              }

              // Regular message
              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.user !== "codeswot" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm hover:scale-[1.02] transition-transform duration-300 ${
                      msg.user !== "codeswot"
                        ? "bg-[#64FFDA] text-[#1a2332] rounded-br-sm"
                        : "bg-[#64FFDA]/10 text-white rounded-bl-sm"
                    }`}
                    role="article"
                    aria-label={`Message from ${msg.user === "codeswot" ? "Codeswot" : "You"}`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
                    <time className="text-xs opacity-70 mt-1">{formatTime(msg.timestamp)}</time>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-3 border-t border-[#64FFDA]/20 bg-[#1a2332] sticky bottom-0">
            <div className="flex items-center space-x-2">
              <label htmlFor="chat-input" className="sr-only">
                Type your message
              </label>
              <input
                id="chat-input"
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#64FFDA] h-8 text-sm transition-all duration-300"
                aria-describedby="chat-input-help"
              />
              <div id="chat-input-help" className="sr-only">
                Press Enter to send message
              </div>
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-[#64FFDA] text-[#1a2332] hover:bg-[#64FFDA]/90 rounded-lg px-3 py-2 h-8 min-w-[32px] flex items-center justify-center transition-all duration-300"
                aria-label="Send message"
              >
                <Send size={14} />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Chat Button with Icon Transition Animation */}
      <div
        className={`absolute bottom-0 right-0 transition-all duration-500 ${
          chatOpen && (chatExpanded || isMobile)
            ? "opacity-0 pointer-events-none scale-75"
            : dimmed
              ? "opacity-70 scale-75"
              : "opacity-100 scale-100"
        }`}
      >
        <Button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-[#64FFDA] text-[#1a2332] hover:bg-[#64FFDA]/90 shadow-lg hover:scale-105 transition-all duration-300 relative"
          aria-label={chatOpen ? "Close chat" : "Open chat"}
        >
          {/* Notification Dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg border-2 border-white" />
          
          {/* Chat Icon to X Animation */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div
              className={`absolute transition-all duration-300 ease-in-out ${
                chatOpen
                  ? "opacity-0 rotate-180 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            >
              <MessageCircle size={22} />
            </div>
            <div
              className={`absolute transition-all duration-300 ease-in-out ${
                chatOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-180 scale-75"
              }`}
            >
              <X size={22} />
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}; 