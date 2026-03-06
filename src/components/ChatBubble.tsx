import { MessageCircle } from "lucide-react";

const ChatBubble = () => (
  <a
    href="#contact"
    className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
  >
    <div className="relative">
      <MessageCircle className="w-5 h-5 text-gold" />
      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />
    </div>
  </a>
);

export default ChatBubble;
