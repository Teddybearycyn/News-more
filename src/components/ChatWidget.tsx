import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Power, PowerOff, ShieldCheck, Search, Image as ImageIcon } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { cn } from "../lib/utils.ts";
import { isAIEnabled } from "../services/blogService.ts";
import { auth } from "../lib/firebase.ts";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface Message {
  role: "user" | "bot";
  text: string;
  grounding?: { title: string; uri: string }[];
  image?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotEnabled, setIsBotEnabled] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi there! I'm your friendly AI companion. I'm here to chat, answer your questions, or just keep you company while you browse our blogs. How are you doing today?" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isAIEnabled().then(setIsBotEnabled);
    
    // Check if the current user is the owner
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // davidnweke26@gmail.com is the restricted owner
      setIsAdmin(user?.email === "davidnweke26@gmail.com");
    });
    return () => unsubscribe();
  }, []);

  const handleAdminLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputText.trim() && !selectedImage) || isLoading || !isBotEnabled) return;

    const userMessage = inputText.trim();
    const userImage = selectedImage;
    
    setInputText("");
    setSelectedImage(null);
    setMessages(prev => [...prev, { role: "user", text: userMessage, image: userImage || undefined }]);
    setIsLoading(true);

    try {
      // Re-initialize to ensure fresh environment context
      const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const parts: any[] = [];
      if (userImage) {
        parts.push({
          inlineData: {
            data: userImage.split(',')[1],
            mimeType: "image/png"
          }
        });
      }
      parts.push({ text: userMessage || "Analyze this image." });

      const modelName = userImage ? "gemini-3.1-pro-preview" : "gemini-3-flash-preview";
      const response = await genAI.models.generateContent({
        model: modelName,
        contents: [
          ...messages.slice(-6).map(m => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }]
          })),
          { role: "user", parts }
        ],
        config: {
          systemInstruction: "You are a friendly, warm, and human-like conversational ChatBot for the 'News More' platform. Your goal is to be a companion to users, chat with them if they are bored, and answer their questions beautifully. You can help users with research, find live news, or analyze market trends/charts if they ask. DISCLAIMER: Any financial analysis provided is for informational purposes only and is not financial advice. CRITICAL: You are strictly prohibited from discussing anything evil, illegal, dangerous, or harmful. If a user asks about such topics, politely decline and steer the conversation back to something positive. Be concise but warm.",
          tools: [{ googleSearch: {} }] as any
        }
      });

      const botText = response.text || "I'm sorry, my mind went blank for a second. What were we saying?";
      
      const grounding = (response as any).candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || "Source",
        uri: chunk.web?.uri
      })).filter((c: any) => c.uri);

      setMessages(prev => [...prev, { role: "bot", text: botText, grounding }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "bot", text: "I'm feeling a bit disconnected. This usually happens if there's a temporary network glitch or I'm unable to process the request right now. Can you try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 w-[280px] md:w-[320px] h-[400px] bg-[#0A0A0A] border border-white/10 rounded-[24px] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className={cn("p-4 flex items-center justify-between transition-colors", isBotEnabled ? "bg-orange-600" : "bg-zinc-800")}>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  {isBotEnabled ? <Bot size={16} className="text-white" /> : <PowerOff size={16} className="text-white" />}
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs">Friendly AI</h3>
                  <p className="text-white/70 text-[8px] uppercase tracking-widest font-bold">{isBotEnabled ? "Here to Chat" : "Resting..."}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {isAdmin ? (
                  <button 
                    onClick={async () => {
                      const next = !isBotEnabled;
                      setIsBotEnabled(next);
                      await fetch("/api/ai/toggle", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ enabled: next })
                      });
                    }}
                    className="p-1.5 hover:bg-black/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    title={isBotEnabled ? "Hibernate ChatBot" : "Wake Up ChatBot"}
                  >
                    {isBotEnabled ? <Power size={14} /> : <Power size={14} className="text-orange-500" />}
                  </button>
                ) : (
                  <button 
                    onDoubleClick={handleAdminLogin}
                    className="p-1.5 text-white/5 opacity-0 hover:opacity-10 transition-opacity"
                    title="Admin restricted"
                  >
                    <ShieldCheck size={14} />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-black/10 rounded-lg transition-colors text-white/60 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isBotEnabled ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <PowerOff size={32} className="text-white/10 mb-4" />
                <h4 className="text-white font-bold text-sm mb-1">ChatBot is Offline</h4>
                <p className="text-white/40 text-xs leading-relaxed">Your companion is currently resting. Feel free to browse our blogs!</p>
              </div>
            ) : (
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10"
              >
                {messages.map((m, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div className={cn(
                      "px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap",
                      m.role === "user" 
                        ? "bg-orange-600 text-white rounded-2xl rounded-br-none" 
                        : "bg-white/5 text-white/80 border border-white/10 rounded-2xl rounded-bl-none"
                    )}>
                      {m.image && (
                        <img src={m.image} alt="User upload" className="w-full max-w-[150px] rounded-lg mb-2 border border-white/10" />
                      )}
                      {m.text}
                      {m.grounding && m.grounding.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-1.5">
                          <div className="text-[9px] uppercase tracking-wider text-white/30 flex items-center gap-1">
                            <Search size={8} /> Sources
                          </div>
                          {m.grounding.map((g, gi) => (
                            <a 
                              key={gi} 
                              href={g.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[10px] text-orange-400 hover:underline flex items-center gap-1 group"
                            >
                              {g.title} <X size={8} className="rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-medium animate-pulse pl-1">
                    <Loader2 size={12} className="animate-spin" /> Thinking...
                  </div>
                )}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 pt-0">
              {selectedImage && (
                <div className="mb-2 relative inline-block">
                  <img src={selectedImage} alt="Preview" className="h-12 w-12 object-cover rounded-lg border border-orange-500/50" />
                  <button 
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-1.5 -right-1.5 bg-black text-white rounded-full p-1 border border-white/10 hover:bg-zinc-800"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}
              <div className="relative flex items-center gap-1.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!isBotEnabled}
                  className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  <ImageIcon size={16} />
                </button>
                <div className="relative flex-1">
                  <input
                    type="text"
                    disabled={!isBotEnabled}
                    placeholder={isBotEnabled ? "Message..." : "Offline"}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={(!inputText.trim() && !selectedImage) || isLoading || !isBotEnabled}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:hover:bg-orange-600 transition-all"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group",
          isOpen ? "bg-white text-black" : "bg-orange-600 text-white"
        )}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
}
