import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiMic } from 'react-icons/fi';

const COMMANDS = {
  home: { keywords: ['home', 'main', 'start', 'begin', 'first page'], route: '/' },
  about: { keywords: ['about', 'who are you', 'profile', 'yourself'], route: '/about' },
  skills: { keywords: ['skill', 'tech stack', 'technologies', 'expert', 'tool', 'stack'], route: '/skills' },
  projects: { keywords: ['project', 'work', 'portfolio', 'build', 'built'], route: '/projects' },
  figma: { keywords: ['figma', 'design', 'ui', 'ux', 'mockup', 'sigma', 'finger', 'pigment', 'figure'], route: '/figma-designs' },
  hackathons: { keywords: ['hack', 'hackathon', 'competition', 'crop', 'pilot', 'code forge', 'croppilot', 'crop pilot', 'packet on', 'hacker'], route: '/hackathons' },
  certificates: { keywords: ['certificate', 'certified', 'certification', 'credential', 'cert'], route: '/certificates' },
  achievements: { keywords: ['achievement', 'milestone', 'award', 'recogni', 'top', 'finalist', 'achieve'], route: '/achievements' },
  leetcode: { keywords: ['leetcode', 'coding', 'problem solving', 'algorithm', 'lead code', 'eat code', 'delete code', 'leadcode'], route: '/leetcode' },
  resume: { keywords: ['resume', 'cv', 'curriculum vitae', 'download', 'document'], route: '/resume' },
  contact: { keywords: ['contact', 'hire', 'email', 'get in touch', 'reach out', 'message', 'connect'], route: '/contact' }
};

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const isRoutingRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Keep listening continuously until we explicitly stop it
      recognition.interimResults = true; // Capture LIVE streaming audio bits instantly
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        isRoutingRef.current = false;
      };
      
      recognition.onresult = (event) => {
        if (isRoutingRef.current) return; // Prevent double trigger
        
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript.toLowerCase();
        }
        
        if (transcript.trim()) {
           handleCommand(transcript, recognition);
        }
      };

      recognition.onerror = (event) => {
        if (!isRoutingRef.current) {
          setIsListening(false);
          setToastMessage('Voice processing ended or an issue occurred.');
          clearToast();
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [navigate]);

  const clearToast = () => {
    setTimeout(() => setToastMessage(null), 4000);
  };

  const speakOutput = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Clears out lingering speech commands
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.1; // Make it sound slightly friendlier
      utterance.rate = 1.05; // Slightly faster pacing
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCommand = (transcript, recognitionInstance) => {
    setToastMessage(`Hearing: "${transcript}..."`);
    
    // Check for reload command first
    if (transcript.includes('reload') || transcript.includes('refresh')) {
      isRoutingRef.current = true;
      recognitionInstance.stop();
      const successMsg = "Reloading portfolio...";
      setToastMessage(`Found command! ${successMsg} 🚀`);
      speakOutput(successMsg);
      setTimeout(() => window.location.reload(), 1200);
      return;
    }

    // Fuzzy keyword mid-sentence matching!
    for (const [key, pattern] of Object.entries(COMMANDS)) {
      if (pattern.keywords.some(word => transcript.includes(word))) {
        
        isRoutingRef.current = true;
        recognitionInstance.stop(); // INSTANTLY stop listening!
        
        const targetName = key.charAt(0).toUpperCase() + key.slice(1);
        const successMsg = `Navigating to ${targetName}`;
        
        setToastMessage(`Found command! ${successMsg} 🚀`);
        speakOutput(successMsg);
        
        navigate(pattern.route);
        clearToast();
        return; // Terminate scan
      }
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setToastMessage('Voice Recognition is not supported by your browser.');
      clearToast();
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setToastMessage('Listening...');
      recognitionRef.current.start();
    }
  };

  return (
    <div className="fixed bottom-[96px] right-4 md:right-6 z-[90] flex items-end justify-end">
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="absolute top-1/2 -translate-y-1/2 right-16 mr-2 whitespace-nowrap rounded-lg border border-white/10 bg-black/90 backdrop-blur-xl px-4 py-2 font-mono text-xs text-white shadow-lg"
          >
            <div className="flex items-center gap-2">
              {isListening && (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
              <span className="truncate max-w-[200px] md:max-w-xs">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Assistant Floating Action Button */}
      <motion.button
        onClick={toggleListening}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-black border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
      >
        {isListening ? (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Active AI Listening Ripples */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-[0px] rounded-full border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.2 }}
              className="absolute inset-[0px] rounded-full border border-red-400"
            />
            <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-red-500/20 text-red-500 backdrop-blur-md">
              <span className="font-display font-black text-xl italic tracking-tighter text-white shadow-black drop-shadow-md">MP</span>
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            <span className="font-display font-black text-xl italic tracking-tighter text-gray-300 transition-colors group-hover:text-white">MP</span>
            <motion.div 
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black border border-white/20 shadow-md shadow-white/5"
            >
               <FiMic size={10} className="text-gray-400 group-hover:text-neon-cyan" />
            </motion.div>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default VoiceAssistant;
