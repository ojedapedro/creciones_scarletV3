import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { CHAT_SUGGESTIONS } from '../constants';

const GeminiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '¡Hola! Soy Scarlet ✨, tu asistente de moda virtual. ¿Buscas un outfit para una ocasión especial o tienes dudas sobre nuestras tallas?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Use current messages for history (excluding the one we just added because state update is async)
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    const responseText = await sendMessageToGemini(textToSend, history);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center gap-2 ${
          isOpen ? 'bg-gray-800 text-white rotate-0' : 'bg-gradient-to-r from-scarlet-500 to-pink-500 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        {!isOpen && <span className="font-medium hidden sm:inline">Asistente Virtual</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-40 flex flex-col overflow-hidden max-h-[600px] h-[70vh] animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-scarlet-500 to-pink-500 p-4 text-white shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-base">Scarlet AI</h3>
                <p className="text-xs text-scarlet-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    En línea
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-scarlet-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
                        <Bot size={14} />
                    </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-scarlet-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0 mt-1">
                        <User size={14} />
                    </div>
                )}
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-scarlet-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
                    <Bot size={14} />
                 </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5 items-center h-full">
                    <span className="w-2 h-2 bg-scarlet-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-scarlet-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-scarlet-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions (Only show if history is short or user hasn't typed recently) */}
          {!isLoading && messages.length < 4 && (
             <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar">
                {CHAT_SUGGESTIONS.map((suggestion, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSend(suggestion)}
                        className="flex-shrink-0 text-xs bg-white border border-scarlet-200 text-scarlet-700 px-3 py-1.5 rounded-full hover:bg-scarlet-50 transition-colors whitespace-nowrap"
                    >
                        {suggestion}
                    </button>
                ))}
             </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-scarlet-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-scarlet-100 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm outline-none placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                className={`p-2 rounded-full transition-all duration-200 ${
                  inputValue.trim() 
                    ? 'bg-scarlet-500 text-white shadow-md hover:bg-scarlet-600' 
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiChat;