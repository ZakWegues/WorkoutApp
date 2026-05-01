'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou seu Coach de Calistenia. Como posso ajudar no seu treino hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Falha ao conectar com o Coach.');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Não foi possível ler a resposta.');

      let assistantContent = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const json = JSON.parse(line.replace('data: ', ''));
              const content = json.choices[0]?.delta?.content || '';
              assistantContent += content;
              
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = assistantContent;
                return newMessages;
              });
            } catch (e) {
              // Ignore partial JSON or non-JSON lines
            }
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro inesperado.');
      console.error('Coach Chat Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] pb-24">
      <header className="p-5 pt-8 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <Bot size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">IA Coach</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse" />
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Especialista em Calistenia</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl flex gap-3 ${
                m.role === 'user' 
                  ? 'bg-[#22c55e] text-black font-medium' 
                  : 'bg-[#141414] text-neutral-200 border border-white/5'
              }`}>
                {m.role === 'assistant' && <Bot size={18} className="shrink-0 mt-0.5 text-[#22c55e]" />}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
                {m.role === 'user' && <User size={18} className="shrink-0 mt-0.5" />}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && messages[messages.length - 1].role === 'user' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex items-center gap-2">
              <Loader2 size={18} className="animate-spin text-[#22c55e]" />
              <span className="text-xs text-neutral-500 font-medium">O Coach está pensando...</span>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-500/10 text-red-500 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2 border border-red-500/20">
              <AlertCircle size={14} />
              {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-5 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent pt-10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre treinos ou progressões..."
            className="w-full bg-[#141414] border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#22c55e] transition-all shadow-xl"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 w-10 bg-[#22c55e] hover:bg-[#22c55e]/90 text-black rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:grayscale"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-neutral-600 mt-3 font-medium">
          O Coach pode cometer erros. Verifique informações importantes.
        </p>
      </div>
    </div>
  );
}
