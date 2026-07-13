"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Mic, ChevronLeft, Send, Square } from "lucide-react";
import { useAiChat } from "@/hooks/useAiChat";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState(null); // 'text' | 'voice' | null
  const messagesEndRef = useRef(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isListening,
    isPlaying,
    toggleListening,
    stopAudio,
    audioRef,
  } = useAiChat(chatMode);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 transition-transform duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 hover:scale-110"
        }`}
      >
        <div className="w-[72px] h-[72px] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] overflow-hidden border-2 border-blue-400 bg-black flex items-center justify-center relative">
          <img
            src="/images/ai-logo.png"
            alt="AI Assistant"
            className="w-full h-full object-cover scale-[1.35] translate-y-1"
          />
        </div>
      </button>

      {/* Chat Window Shell */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-3">
                {chatMode && (
                  <button 
                    onClick={() => {
                      setChatMode(null);
                      stopAudio();
                    }}
                    className="p-1 -ml-2 hover:bg-slate-800 rounded transition-colors text-slate-300"
                    title="Back to options"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div className="w-10 h-10 rounded-full overflow-hidden bg-black border border-blue-500/30 flex items-center justify-center relative">
                  <img
                    src="/images/ai-logo.png"
                    alt="AI Avatar"
                    className="w-full h-full object-cover scale-[1.35] translate-y-0.5"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px]">AGN Assistant</h3>
                  <div className="flex items-center gap-1.5 text-xs text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Online & Ready
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  stopAudio();
                  setTimeout(() => setChatMode(null), 300);
                }}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-300 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Hidden Audio Element for TTS */}
            <audio ref={audioRef} className="hidden" />

            {/* Content Area */}
            {!chatMode ? (
              // Mode Selection Screen
              <div className="flex-1 bg-white p-6 flex flex-col items-center justify-center text-center">
                <h4 className="text-xl font-bold text-slate-800 mb-2">How can we help?</h4>
                <p className="text-slate-500 text-sm mb-8">Choose how you'd like to interact with our AI Assistant.</p>
                
                <div className="w-full space-y-4">
                  <button 
                    onClick={() => setChatMode('text')}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all group text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-800 text-[15px]">Chat with AI</h5>
                      <p className="text-xs text-slate-500">Type your questions</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setChatMode('voice')}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all group text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mic size={24} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-800 text-[15px]">Talk to the AI</h5>
                      <p className="text-xs text-slate-500">Voice Assistant</p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              // Chat Interface (Text or Voice mode)
              <>
                <div className="flex-1 bg-slate-50 p-4 overflow-y-auto flex flex-col gap-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-black border border-blue-500/30 flex-shrink-0 mr-2 relative">
                          <img
                            src="/images/ai-logo.png"
                            alt="AI"
                            className="w-full h-full object-cover scale-[1.35] translate-y-0.5"
                          />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[80%] rounded-2xl p-3 text-[15px] leading-relaxed shadow-sm ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-tr-sm"
                            : "bg-white text-slate-700 border border-slate-200 rounded-tl-sm"
                        }`}
                      >
                        {msg.content || (
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Input Area */}
                {chatMode === 'text' ? (
                  <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Type a message..."
                      className="flex-1 bg-slate-100 border-none outline-none text-[15px] text-slate-700 placeholder:text-slate-400 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                ) : (
                  <div className="p-6 bg-white border-t border-slate-100 flex flex-col items-center justify-center">
                    <div className="text-sm font-medium text-slate-500 mb-4 h-5">
                      {isPlaying ? "AI is speaking..." : isListening ? "Listening..." : "Click mic to speak"}
                    </div>
                    
                    <button
                      onClick={toggleListening}
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
                        isListening 
                          ? "bg-red-500 text-white scale-110 shadow-red-500/30" 
                          : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                      }`}
                    >
                      {isListening ? (
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                          <Square size={24} fill="currentColor" />
                        </motion.div>
                      ) : (
                        <Mic size={24} />
                      )}
                    </button>
                    {isListening && <div className="text-xs text-red-500 mt-3 animate-pulse font-medium">Recording active</div>}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
