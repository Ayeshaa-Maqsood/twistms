import React, { useState, useRef, useEffect } from 'react';

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

  const predefinedPrompts = [
    'Find land in Montana with river frontage',
    'What documents are needed to sell?',
    'Explain the Verified Deed process',
    'How do the 90-day free listings work?'
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
      keywords: ['free', 'cost', 'price', 'pricing', 'plan', 'package', '90'],
      reply: 'TwistMS offers three listing tiers: 1) Free Listing ($0 for 90 days, up to 50 photos), 2) Paid Verified ($49 for 150 days + Social Boost), and 3) Premium Elite ($129 for 365 days + full multi-channel TikTok/IG campaigns).'
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#1A202C] text-[#FBF8F2] hover:bg-[#C5A880] hover:text-[#1A202C] transition-all duration-300 shadow-2xl border border-white/20 group cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] group-hover:bg-[#1A202C] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide">TwistMS AI Assistant</span>
        </button>
      )}

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl glass-panel-luxury border border-[#2C3539]/15 shadow-2xl flex flex-col overflow-hidden bg-[#FFFFFF]/95">
          
          {/* Header */}
          <div className="p-4 bg-[#1A202C] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logos/TwistMs-White-Logo.jfif"
                alt="TwistMS AI"
                className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5"
              />
              <div>
                <h3 className="text-sm font-bold font-editorial">TwistMS Real Estate Assistant</h3>
                <p className="text-[10px] text-[#D8C29D] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active PRD Knowledge Base
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#FBF8F2]/60">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-[#1A202C] text-[#FBF8F2] rounded-br-none'
                      : 'bg-white border border-[#2C3539]/10 text-[#1A202C] shadow-sm rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[9px] text-[#9CA3AF] mt-1 font-mono px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-[#2C3539]/10 px-3 py-2 rounded-2xl w-fit">
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 bg-white border-t border-[#2C3539]/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {predefinedPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#F4ECE1] text-[10px] font-medium text-[#1A202C] hover:bg-[#C5A880]/30 transition-colors shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-[#2C3539]/10 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about properties, deeds, plans..."
              className="flex-1 bg-[#FBF8F2] text-xs text-[#1A202C] border border-[#2C3539]/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#C5A880]"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-[#1A202C] text-[#FBF8F2] hover:bg-[#C5A880] hover:text-[#1A202C] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

