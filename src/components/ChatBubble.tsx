import { MessageCircle } from "lucide-react";

const ChatBubble = () => (
  <button
    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
    className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-navy border border-primary-foreground/10 shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
  >
    <MessageCircle className="w-5 h-5 text-gold" />
    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
  </button>
);

export default ChatBubble;
