import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiVideo, FiVideoOff, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const COMMANDS = {
  home: { keywords: ['home', 'main'], route: '/' },
  about: { keywords: ['about', 'profile'], route: '/about' },
  skills: { keywords: ['skill', 'tech', 'stack'], route: '/skills' },
  projects: { keywords: ['project', 'portfolio'], route: '/projects' },
  figma: { keywords: ['figma', 'design', 'ui'], route: '/figma-designs' },
  hackathons: { keywords: ['hack', 'hackathon', 'croppilot'], route: '/hackathons' },
  certificates: { keywords: ['cert', 'certificate'], route: '/certificates' },
  achievements: { keywords: ['achievement', 'milestone', 'award'], route: '/achievements' },
  leetcode: { keywords: ['leetcode', 'coding'], route: '/leetcode' },
  resume: { keywords: ['resume', 'cv'], route: '/resume' },
  contact: { keywords: ['contact', 'hire'], route: '/contact' }
};

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'],
  ['SPACE', 'ENTER']
];

const CameraAssistant = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inputText, setInputText] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [pointers, setPointers] = useState({ x: -100, y: -100, isTracking: false });
  const [hoveredKey, setHoveredKey] = useState(null);
  const [hoverProgress, setHoverProgress] = useState(0); 
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const streamRef = useRef(null);
  const handsRef = useRef(null);
  const rAFRef = useRef(null);
  const processingRef = useRef(false); // Frame throttle lock
  
  const hoverTargetRef = useRef(null);
  const hoverStartTimeRef = useRef(0);
  const textRef = useRef(''); 
  const navigate = useNavigate();

  const speakOutput = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.1; utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const processCommand = (cmd) => {
    if (!cmd.trim()) return;
    if (cmd.includes('reload') || cmd.includes('refresh')) {
      showToast("Reloading portfolio...");
      speakOutput("Reloading portfolio");
      setTimeout(() => window.location.reload(), 1000);
      return;
    }
    for (const [key, pattern] of Object.entries(COMMANDS)) {
      if (pattern.keywords.some(word => cmd.includes(word))) {
        const targetName = key.charAt(0).toUpperCase() + key.slice(1);
        const msg = `Navigating to ${targetName}...`;
        showToast(msg);
        speakOutput(msg);
        setTimeout(() => {
          navigate(pattern.route);
          stopCamera();
          setInputText('');
          textRef.current = '';
        }, 800);
        return;
      }
    }
    showToast("Command not recognized.");
    setInputText('');
    textRef.current = '';
  };

  const typeKey = (key) => {
    if (key === 'DEL') {
      textRef.current = textRef.current.slice(0, -1);
    } else if (key === 'SPACE') {
      textRef.current += ' ';
    } else if (key === 'ENTER') {
      processCommand(textRef.current.toLowerCase());
    } else {
      textRef.current += key;
    }
    setInputText(textRef.current);
    
    // Play sound click organically to simulate real-world touch
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } catch(e) {}
  };

  const loadMediaPipe = async () => {
    setIsCameraActive(true); 
    return new Promise((resolve) => {
      if (window.Hands) { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  };

  const startCamera = async () => {
    try {
      await loadMediaPipe();
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; }
      
      setHasError(false);
      
      // Initialize Hands
      const hands = new window.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
      });
      
      hands.onResults((results) => {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0 && containerRef.current) {
           const landmarks = results.multiHandLandmarks[0];
           const x = landmarks[8].x; // Index Finger Tip X
           const y = landmarks[8].y; // Index Finger Tip Y
           
           const rect = containerRef.current.getBoundingClientRect();
           const pxX = rect.left + ((1 - x) * rect.width);
           const pxY = rect.top + (y * rect.height);
           
           setPointers({ x: pxX, y: pxY, isTracking: true });
           
           // Collision detection
           const elements = document.elementsFromPoint(pxX, pxY);
           const keyEl = elements && elements.find(el => el.hasAttribute('data-key'));
           
           if (keyEl) {
              const currentKey = keyEl.getAttribute('data-key');
              if (hoverTargetRef.current !== currentKey) {
                 hoverTargetRef.current = currentKey;
                 hoverStartTimeRef.current = Date.now();
                 setHoveredKey(currentKey);
                 setHoverProgress(0);
              } else {
                 const diff = Date.now() - hoverStartTimeRef.current;
                 const threshold = 1200; // ms required to focus/press
                 if (diff >= threshold) {
                    typeKey(currentKey);
                    hoverTargetRef.current = null;
                    hoverStartTimeRef.current = Date.now() + 1000; // Refractory period block
                    setHoverProgress(0);
                 } else {
                    setHoverProgress(diff / threshold);
                 }
              }
           } else {
              hoverTargetRef.current = null;
              setHoveredKey(null);
              setHoverProgress(0);
           }
        } else {
           setPointers({ x: -100, y: -100, isTracking: false });
           setHoverProgress(0);
           setHoveredKey(null);
           hoverTargetRef.current = null;
        }
        processingRef.current = false;
      });
      
      handsRef.current = hands;
      
      // Native Video Loop Processor
      const videoLoop = async () => {
         if (videoRef.current && handsRef.current && !processingRef.current && videoRef.current.readyState >= 2) {
            processingRef.current = true;
            await handsRef.current.send({ image: videoRef.current });
         }
         rAFRef.current = requestAnimationFrame(videoLoop);
      };
      
      videoRef.current.onloadeddata = () => {
         videoLoop();
      };
      
    } catch (err) {
      console.error("Error starting AR camera:", err);
      setHasError(true);
      setIsCameraActive(false);
      alert('Camera access denied or device not found.');
    }
  };

  const stopCamera = () => {
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (handsRef.current) {
      handsRef.current.close();
      handsRef.current = null;
    }
    setIsCameraActive(false);
    setPointers({ x: -100, y: -100, isTracking: false });
    setHoverProgress(0);
    setHoveredKey(null);
    setInputText('');
    textRef.current = '';
    processingRef.current = false;
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const toggleCamera = () => {
    if (isCameraActive) stopCamera();
    else startCamera();
  };

  return (
    <>
      {/* AR Camera Modal Overlay */}
      <AnimatePresence>
        {isCameraActive && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
          >
            <div 
               ref={containerRef}
               className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-[0_0_50px_rgba(6,182,212,0.5)] w-full max-w-[1100px] aspect-video bg-black flex flex-col items-center justify-end cursor-none"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 h-full w-full object-cover transform -scale-x-100 opacity-60"
              />
              
              {!pointers.isTracking && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-display text-white/50 text-xl tracking-widest text-center animate-pulse">
                    LOADING VISION AI... <br/><span className="text-sm">SHOW YOUR HAND TO THE CAMERA TO TYPE</span>
                 </div>
              )}

              {/* HUD Keys Overlay */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end pb-8">
                 
                 {/* Display Bar */}
                 <div className="mb-6 flex h-14 w-[80%] max-w-[600px] items-center justify-center rounded-2xl border border-white/30 bg-black/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl px-6">
                    <span className="font-mono text-2xl text-neon-cyan tracking-widest uppercase">{inputText || 'AIR TYPE COMMAND...'}</span>
                    <span className="animate-pulse h-6 w-3 ml-2 bg-neon-cyan opacity-80" />
                 </div>

                 {/* Virtual Keys */}
                 <div className="flex flex-col gap-3">
                   {KEYBOARD_ROWS.map((row, rIdx) => (
                     <div key={rIdx} className="flex justify-center gap-2 sm:gap-3">
                       {row.map((key) => {
                         const isHovered = hoveredKey === key;
                         return (
                         <div
                           key={key}
                           data-key={key}
                           className={`relative flex items-center justify-center border font-mono text-lg text-white shadow-xl transition-all duration-150 backdrop-blur-md ${
                             key === 'SPACE' ? 'w-48 sm:w-64 h-14 rounded-2xl border-white/20 bg-white/10' : 
                             key === 'ENTER' ? 'w-24 sm:w-32 h-14 rounded-2xl bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50 font-bold' : 
                             key === 'DEL' ? 'w-16 sm:w-20 h-14 rounded-2xl bg-red-500/20 text-red-100 border-red-500/50' : 'w-12 sm:w-14 h-14 rounded-xl border-white/20 bg-white/10'
                           } ${isHovered ? 'scale-110 !border-white bg-white/30 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20' : ''}`}
                         >
                           {key}
                           {/* Dwell Loading Bar */}
                           {isHovered && (
                             <div className="absolute bottom-0 left-0 h-1.5 bg-neon-cyan rounded-b-xl transition-none" style={{ width: `${Math.min(hoverProgress * 100, 100)}%` }} />
                           )}
                         </div>
                       )})}
                     </div>
                   ))}
                 </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={stopCamera}
                className="absolute top-4 right-4 z-50 rounded-full bg-black/60 p-3 text-white backdrop-blur-md hover:bg-red-500/80 transition-colors border border-white/20"
              >
                <FiX size={20} />
              </button>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-black/60 px-4 py-2 text-xs text-neon-cyan font-mono backdrop-blur-md border border-white/20">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                </span>
                AR VISION CORE
              </div>
            </div>

            {/* Simulated Hand Cursor Drop */}
            {pointers.isTracking && (
              <div 
                className="fixed z-[1000] w-5 h-5 rounded-full border-2 border-white pointer-events-none drop-shadow-[0_0_15px_rgba(255,255,255,1)] flex items-center justify-center transition-all duration-75"
                style={{
                  left: pointers.x,
                  top: pointers.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                 {hoverProgress > 0 && (
                    <div className="w-full h-full rounded-full bg-neon-cyan opacity-50 scale-150 animate-pulse" />
                 )}
              </div>
            )}
            
            {/* Transient Toast Notification */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 50 }}
                  className="fixed bottom-12 z-50 rounded-2xl bg-black/90 px-8 py-4 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                >
                  <span className="font-mono text-neon-cyan text-lg font-bold tracking-wider">{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Dock Button */}
      {!isCameraActive && (
        <div className="fixed bottom-[168px] right-4 md:right-6 z-[80] flex flex-col items-end">
          <motion.button
            onClick={toggleCamera}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-black border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <div className="relative flex items-center justify-center">
              <span className="font-display font-black text-xl italic tracking-tighter text-gray-300 transition-colors group-hover:text-white">MP</span>
              <motion.div 
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className={`absolute -top-1 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-black border border-white/20 shadow-md`}
              >
                <FiVideoOff size={10} className="text-gray-400 group-hover:text-neon-cyan" />
              </motion.div>
            </div>
          </motion.button>
        </div>
      )}
    </>
  );
};

export default CameraAssistant;
