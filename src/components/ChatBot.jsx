import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const BOT_KNOWLEDGE = {
  skills: "Maharshi is a Full Stack Developer highly skilled in React.js, Node.js, Express, MongoDB, Tailwind CSS, Python, C++, and UI/UX design!",
  projects: "His standout projects include MoveSmart (a real-time transit tracker), TaskManager API, CropPilot, and Ai-Onboarding-Engine.",
  contact: "You can reach out via the Contact section, or drop him a message on LinkedIn or GitHub. He'd love to collaborate!",
  hackathon: "He's a proven problem-solver! He won the SU Hackathon 2026 with 'CropPilot' and was a finalist at ArtPark CodeForge (IISc Bangalore).",
  experience: "He builds scalable backends, responsive glassmorphism frontends, and intelligent systems. He's a fast learner ready for complex challenges.",
  hello: "Hello! I'm Maharshi's AI assistant. Ask me about his skills, projects, or how to contact him!",
  hi: "Hi there! I'm an AI assistant. Are you looking for anything specific?",
  who: "I'm a custom-built AI assistant designed to guide you through Maharshi's web portfolio. Ask me about his tech stack!",
  resume: "You can check out his complete Resume by clicking the Resume icon in the side navigation bar."
};

const COMMANDS = {
  home: { keywords: ['home', 'main', 'start', 'begin', 'first page'], route: '/' },
  about: { keywords: ['about', 'who are you', 'profile', 'yourself'], route: '/about' },
  skills: { keywords: ['skill', 'tech stack', 'technologies', 'expert', 'tool', 'stack'], route: '/skills' },
  projects: { keywords: ['project', 'work', 'portfolio', 'build', 'built'], route: '/projects' },
  figma: { keywords: ['figma', 'design', 'ui', 'ux', 'mockup'], route: '/figma-designs' },
  hackathons: { keywords: ['hack', 'hackathon', 'competition', 'croppilot', 'crop pilot', 'code forge'], route: '/hackathons' },
  certificates: { keywords: ['certificate', 'certified', 'certification', 'credential', 'cert'], route: '/certificates' },
  achievements: { keywords: ['achievement', 'milestone', 'award', 'recogni', 'top', 'finalist'], route: '/achievements' },
  leetcode: { keywords: ['leetcode', 'coding', 'problem solving', 'algorithm'], route: '/leetcode' },
  resume: { keywords: ['resume', 'cv', 'curriculum vitae', 'download', 'document'], route: '/resume' },
  contact: { keywords: ['contact', 'hire', 'email', 'get in touch', 'reach out', 'message', 'connect'], route: '/contact' }
};

const getBotResponse = (input) => {
  const normalized = input.toLowerCase();
  
  if (normalized.includes('reload') || normalized.includes('refresh')) {
    return { text: "Reloading portfolio...", action: 'reload' };
  }

  // Check if it's a navigation command
  const navigationTriggers = ['navigate', 'go to', 'open', 'show', 'take me', 'bring me', 'move to'];
  const isNavCommand = navigationTriggers.some(trigger => normalized.includes(trigger));

  if (isNavCommand) {
    for (const [key, pattern] of Object.entries(COMMANDS)) {
      if (pattern.keywords.some(word => normalized.includes(word))) {
        const targetName = key.charAt(0).toUpperCase() + key.slice(1);
        return { text: `Navigating to ${targetName}...`, route: pattern.route };
      }
    }
  }

  // Normal Chat Responses
  if (normalized.includes('skill') || normalized.includes('tech') || normalized.includes('stack')) return { text: BOT_KNOWLEDGE.skills };
  if (normalized.includes('project') || normalized.includes('work') || normalized.includes('portfolio')) return { text: BOT_KNOWLEDGE.projects };
  if (normalized.includes('contact') || normalized.includes('hire') || normalized.includes('email') || normalized.includes('reach')) return { text: BOT_KNOWLEDGE.contact };
  if (normalized.includes('hackathon') || normalized.includes('competition') || normalized.includes('win')) return { text: BOT_KNOWLEDGE.hackathon };
  if (normalized.includes('experience') || normalized.includes('background')) return { text: BOT_KNOWLEDGE.experience };
  if (normalized.includes('hello') || normalized.includes('hey')) return { text: BOT_KNOWLEDGE.hello };
  if (normalized.includes('hi ')) return { text: BOT_KNOWLEDGE.hi };
  if (normalized.includes('who are you') || normalized.includes('what are you')) return { text: BOT_KNOWLEDGE.who };
  if (normalized.includes('resume') || normalized.includes('cv')) return { text: BOT_KNOWLEDGE.resume };

  return { text: "That's an interesting question! While I don't have the exact answer, you can explore the portfolio sections or use the Contact form to ask Maharshi directly." };
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am Maharshi\'s AI Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const speakOutput = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.1; 
      utterance.rate = 1.05; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getBotResponse(userMessage.text);
      setMessages((prev) => [...prev, { sender: 'bot', text: response.text }]);
      
      if (response.action === 'reload') {
        speakOutput(response.text);
        setTimeout(() => window.location.reload(), 1200);
      } else if (response.route) {
        speakOutput(response.text); // Fire voice synthesis
        setTimeout(() => {
           navigate(response.route);
        }, 800);
      }
      
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
              className="mb-4 w-[320px] sm:w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl origin-bottom-right flex flex-col"
              style={{ boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.3)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-accent/20 to-neon-cyan/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-white blur-[1px]"
                    />
                    <motion.span 
                      animate={{ y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="relative z-10 font-display font-black text-sm tracking-tighter"
                    >
                      MP
                    </motion.span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-sm">MP-Assistant AI</h3>
                    <p className="text-xs text-neon-cyan flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                      </span>
                      Online
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="h-[350px] overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                  >
                    {msg.sender === 'bot' && (
                      <motion.div 
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="relative mt-auto flex h-6 w-6 shrink-0 flex-col items-center justify-center rounded-full bg-gradient-to-br from-accent/80 to-neon-cyan/80 text-[10px] text-white overflow-hidden shadow-md shadow-accent/20"
                      >
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0, 0.4, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 bg-white"
                        />
                        <span className="relative z-10 font-display font-bold italic">MP</span>
                      </motion.div>
                    )}
                    
                    <div 
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.sender === 'user' 
                          ? 'bg-accent text-white rounded-br-sm' 
                          : 'bg-white/10 text-gray-200 rounded-bl-sm border border-white/5'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.sender === 'user' && (
                      <div className="mt-auto flex h-6 w-6 shrink-0 flex-col items-center justify-center rounded-full bg-gray-700 text-[10px] text-white">
                        <FiUser />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start gap-2"
                  >
                    <motion.div 
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="relative mt-auto flex h-6 w-6 shrink-0 flex-col items-center justify-center rounded-full bg-gradient-to-br from-accent/80 to-neon-cyan/80 text-[10px] text-white overflow-hidden shadow-md shadow-accent/20"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0, 0.4, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-white"
                      />
                      <span className="relative z-10 font-display font-bold italic">MP</span>
                    </motion.div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-white/5 bg-white/10 px-4 py-3">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts (only if less than 3 messages) */}
              {messages.length < 3 && !isTyping && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  <button onClick={() => handleQuickQuestion("What are your core skills?")} className="text-[10px] bg-white/5 hover:bg-white/15 border border-white/10 rounded-full px-3 py-1.5 text-gray-300 transition-colors">
                    Core Skills?
                  </button>
                  <button onClick={() => handleQuickQuestion("Tell me about your projects")} className="text-[10px] bg-white/5 hover:bg-white/15 border border-white/10 rounded-full px-3 py-1.5 text-gray-300 transition-colors">
                    Top Projects?
                  </button>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 border-t border-white/10 bg-black/40">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask something..." 
                    className="w-full rounded-full border border-white/20 bg-white/5 py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSend size={14} className="-ml-0.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-neon-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
        >
          {isOpen ? <FiX size={24} /> : (
            <div className="relative flex items-center justify-center w-full h-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-[-4px] rounded-full border-[1.5px] border-dashed border-white/60"
              />
              <motion.span 
                animate={{ 
                  scale: [1, 1.15, 1], 
                  textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 10px rgba(255,255,255,0.9)", "0px 0px 0px rgba(255,255,255,0)"] 
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="font-display font-black text-xl italic tracking-tighter"
              >
                MP
              </motion.span>
            </div>
          )}
          
          {/* Notification Ping */}
          {!isOpen && (
             <span className="absolute right-0 top-0 flex h-3.5 w-3.5">
               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
               <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-black"></span>
             </span>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default ChatBot;
