import { MessageCircle } from "lucide-react";

const ChatBubble = () => (
  <a
    href="#contact"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-card/95 backdrop-blur-sm border border-border/50 shadow-lg rounded-full pl-4 pr-5 py-3 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer group"
  >
    <div className="relative">
      <MessageCircle className="w-5 h-5 text-gold" />
      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />
    </div>
    <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
      Available Now
    </span>
  </a>
);

export default ChatBubble;
