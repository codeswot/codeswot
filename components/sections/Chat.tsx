import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Maximize2, MessageCircle, Minimize2, Phone, Send, X } from "lucide-react";

interface ChatProps {
  chatOpen: boolean;
  chatExpanded: boolean;
  isMobile: boolean;
  setChatOpen: (open: boolean) => void;
  setChatExpanded: (expanded: boolean) => void;
}

export const Chat = ({
  chatOpen,
  chatExpanded,
  isMobile,
  setChatOpen,
  setChatExpanded,
}: ChatProps) => {
  const chatMessages = [
    {
      sender: "Mubarak Ibrahim",
      message: "Hello 👋 How may I be of help ?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      isUser: false,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm hover:scale-[1.02] transition-transform duration-300 ${
                    msg.isUser
                      ? "bg-[#64FFDA] text-[#1a2332] rounded-br-sm"
                      : "bg-[#64FFDA]/10 text-white rounded-bl-sm"
                  }`}
                  role="article"
                  aria-label={`Message from ${msg.sender}`}
                >
                  <p className="leading-relaxed">{msg.message}</p>
                  <time className="text-xs opacity-70 mt-1">{msg.time}</time>
                </div>
              </div>
            ))}
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
                disabled
                className="flex-1 bg-[#64FFDA]/10 border border-[#64FFDA]/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#64FFDA] h-8 text-sm transition-all duration-300 opacity-50 cursor-not-allowed"
                aria-describedby="chat-input-help"
              />
              <div id="chat-input-help" className="sr-only">
                Press Enter to send message
              </div>
              <Button
                size="sm"
                disabled
                className="bg-[#64FFDA] text-[#1a2332] hover:bg-[#64FFDA]/90 rounded-lg px-3 py-2 h-8 min-w-[32px] flex items-center justify-center transition-all duration-300 opacity-50 cursor-not-allowed"
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
            : "opacity-100 scale-100"
        }`}
      >
        <Button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-[#64FFDA] text-[#1a2332] hover:bg-[#64FFDA]/90 shadow-lg hover:scale-105 transition-all duration-300 relative"
          aria-label={chatOpen ? "Close chat" : "Open chat"}
        >
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