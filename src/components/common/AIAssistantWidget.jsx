import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Welcome to TwistMS Properties. I am your 24/7 Real Estate Assistant. How can I assist your property search or deed review today?',
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const reduce = useReducedMotion();

  const predefinedPrompts = [
    'Find land in Montana with river frontage',
    'What documents are needed to sell?',
    'Explain the Verified Deed process',
    'How do the 45-day free listings work?'
  ];

  const knowledgeBase = [
    {
      keywords: ['montana', 'river', 'land', 'acreage', 'timber', 'farm'],
      reply: 'We have flagship parcel MT-512 in Bozeman, MT: 320 contiguous acres with 1.2 miles of private Yellowstone riverfront, certified hay fields, and log home for $2,450,000. Would you like to inspect its legal dossier?'
    },
    {
      keywords: ['document', 'sell', 'seller', 'ownership', 'deed', 'requirements'],
      reply: 'To list a property on TwistMS, sellers must provide: 1) Government ID, 2) Recorded Grant Deed or Title Policy, 3) Current County Tax records, and 4) Survey documents where available. Our admin compliance desk reviews all submissions within 24 hours.'
    },
    {
      keywords: ['verified', 'badge', 'approval', 'review'],
      reply: 'The "Verified Deed" badge is issued only after our administrative compliance team verifies the title chain, county assessor parcel records, and seller authority. We never publish unverified listings.'
    },
    {
      keywords: ['free', 'cost', 'price', 'pricing', 'plan', 'package', '45'],
      reply: 'TwistMS offers three listing tiers: 1) Free Listing ($0 for 45 days, 5–100 photos and 1–5 videos), 2) Paid Verified ($49 for 150 days + Social Boost), and 3) Premium Elite ($129 for 365 days + full multi-channel TikTok/IG campaigns).'
    },
    {
      keywords: ['austin', 'texas', 'tx', 'ranch', 'residential'],
      reply: 'In Texas, check out TX-101: The Glass Haven Sanctuary & Ranch in Austin on 12.5 private acres, featuring 5 beds, 4.5 baths, equine barns, and solar grid for $1,850,000.'
    },
    {
      keywords: ['agent', 'broker', 'representative', 'contact', 'whatsapp'],
      reply: 'You can connect directly with licensed state agents via the "Inspect Dossier" button on any property page, or tap our WhatsApp Priority Desk at +1 (555) 019-9000.'
    }
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched = knowledgeBase.find((kb) =>
        kb.keywords.some((k) => lower.includes(k))
      );

      const aiReply = matched
        ? matched.reply
        : `Thank you for your inquiry regarding "${query}". Our USA brokerage desk and administrative compliance coordinators are standing by to assist. You can also submit this directly through our Escrow Intake portal.`;

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'end' });
  }, [messages, isTyping, reduce]);

  // Focus the composer when the window opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence mode="wait" initial={false}>
        {!isOpen ? (
          /* ---------- Floating Trigger ---------- */
          <motion.button
            key="trigger"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
            exit={{ opacity: 0, scale: 0.85, y: 8, transition: { duration: 0.18 } }}
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            className="relative flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#1A2315] text-[#FBF8F2] hover:bg-[#3E4E31] transition-colors duration-300 shadow-[0_18px_40px_-14px_rgba(15,20,12,0.7)] border border-white/15 group cursor-pointer"
            aria-label="Open TwistMS AI Assistant"
          >
            <span className="relative flex h-2.5 w-2.5 ring-expand">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#BFA668]" />
            </span>
            <span className="text-xs font-semibold tracking-wide">TwistMS AI Assistant</span>
            <span className="absolute inset-0 rounded-full bg-[#BFA668]/0 group-hover:bg-[#BFA668]/10 transition-colors duration-500 pointer-events-none" />
          </motion.button>
        ) : (
          /* ---------- Chat Window ---------- */
          <motion.div
            key="window"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 28, mass: 0.9 } }}
            exit={{ opacity: 0, scale: 0.94, y: 16, transition: { duration: 0.2, ease: 'easeIn' } }}
            style={{ transformOrigin: 'bottom right' }}
            className="w-[min(400px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-7rem))] rounded-3xl glass-panel-luxury border border-[#3E4E31]/15 shadow-[0_30px_80px_-24px_rgba(15,20,12,0.55)] flex flex-col overflow-hidden bg-white/95"
            role="dialog"
            aria-label="TwistMS AI Assistant"
          >
            {/* Header: smoked glass with fine grid */}
            <div className="relative p-4 bg-gradient-to-br from-[#1A2315] via-[#2C3A24] to-[#3E4E31] text-white flex items-center justify-between overflow-hidden">
              <div className="absolute inset-0 grid-fine-light opacity-60 pointer-events-none" />
              <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-[#BFA668]/20 blur-[50px] ambient-pulse pointer-events-none" />
              <div className="relative flex items-center gap-3">
                <motion.img
                  src="/logos/new-logo-white-removebg-preview.png"
                  alt="TwistMS AI"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <h3 className="text-sm font-bold font-editorial">TwistMS Real Estate Assistant</h3>
                  <p className="text-[10px] text-[#D4C28E] font-mono flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    Active PRD Knowledge Base
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative text-[#BFA668]/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close assistant"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#FBF8F2]/70" aria-live="polite">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      m.sender === 'user'
                        ? 'bg-[#3E4E31] text-[#FBF8F2] rounded-br-md shadow-md shadow-[#3E4E31]/20'
                        : 'bg-white border border-[#3E4E31]/10 text-[#1A2315] shadow-sm rounded-bl-md'
                    }`}
                  >
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                  <span className="text-[10px] text-[#596638] mt-1 font-mono px-1 font-semibold">{m.time}</span>
                </motion.div>
              ))}

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4, transition: { duration: 0.15 } }}
                    className="flex items-center gap-1.5 bg-white border border-[#3E4E31]/15 px-3.5 py-2.5 rounded-2xl rounded-bl-md w-fit shadow-sm"
                    aria-label="Assistant is typing"
                  >
                    <span className="typing-dot w-1.5 h-1.5 bg-[#BFA668] rounded-full" />
                    <span className="typing-dot w-1.5 h-1.5 bg-[#BFA668] rounded-full" />
                    <span className="typing-dot w-1.5 h-1.5 bg-[#BFA668] rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2.5 bg-white border-t border-[#3E4E31]/10 flex gap-1.5 overflow-x-auto no-scrollbar">
              {predefinedPrompts.map((p, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSend(p)}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.35, ease: EASE }}
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#F4EDDA] border border-[#BFA668]/30 text-[11px] font-bold text-[#1A2315] hover:bg-[#EAE0CA] hover:border-[#BFA668] transition-colors shrink-0"
                >
                  {p}
                </motion.button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-[#3E4E31]/10 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about properties, deeds, plans..."
                aria-label="Message the assistant"
                className="input-luxury flex-1 bg-white text-xs text-[#1A2315] font-medium border border-[#3E4E31]/20 rounded-xl px-3 py-2.5 placeholder:text-[#838961] focus:outline-none shadow-sm"
              />
              <motion.button
                onClick={() => handleSend()}
                whileHover={reduce ? undefined : { scale: 1.05 }}
                whileTap={reduce ? undefined : { scale: 0.92 }}
                className="p-2.5 rounded-xl bg-[#3E4E31] text-white hover:bg-[#BFA668] hover:text-[#1A2315] transition-colors duration-300 shadow-sm"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
