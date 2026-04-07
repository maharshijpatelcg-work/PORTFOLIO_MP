import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import SectionDivider from './components/SectionDivider';
import './App.css';

// Lazy load below-the-fold components for faster initial render
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Certificates = lazy(() => import('./components/Certificates'));
const LeetCode = lazy(() => import('./components/LeetCode'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
// Background3D removed — premium black theme doesn't need the solar system

// Minimal fallback while lazy chunks load
const SectionFallback = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for cinematic entry
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app min-h-screen bg-transparent text-white relative md:pl-16">
      <CustomCursor />

      {/* Premium black geometric background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/premium-black-bg.png')" }}
      />
      {/* Subtle dark overlay to blend content */}
      <div className="fixed inset-0 -z-10 bg-black/40" />



      <Navbar />

      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Certificates />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <LeetCode />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

/* ── Cinematic Multi-Vehicle Fleet Loading Screen ── */
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-primary z-[9999] flex items-center justify-center overflow-hidden">
      {/* Background hyperspeed lines */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-[2px] bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: '100%',
              width: `${Math.random() * 200 + 50}px`,
              animation: `hyper-speed ${Math.random() * 0.3 + 0.2}s linear infinite`,
              animationDelay: `${Math.random() * 1}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="absolute w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      <div className="relative flex flex-col items-center gap-10 w-full max-w-3xl px-4 mt-8">
        <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text opacity-90 drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">
          MP
        </h1>

        {/* Vehicles Container */}
        <div className="w-full relative h-[320px] border-b-2 border-white/10 overflow-visible flex items-end">
          
          {/* Animated Track Line */}
          <div className="absolute -bottom-0.5 left-0 h-1 bg-gradient-to-r from-accent via-neon-cyan to-neon-pink w-full origin-left drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
               style={{ animation: 'loading-progress 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards' }} />

          {/* 1. Spaceship (Highest) */}
          <div className="absolute w-full z-50 flex items-center" style={{ bottom: '260px', opacity: 0, animation: 'drive-vehicle 2.1s cubic-bezier(0.5, 0, 0.1, 1) forwards 0s' }}>
            {/* Plasma tail */}
            <div className="absolute left-[-40px] h-2 w-20 bg-gradient-to-l from-neon-pink to-transparent rounded-full blur-[2px]" />
            <svg className="w-24 h-12 text-white drop-shadow-[0_0_12px_rgba(255,0,255,0.8)] relative z-10" viewBox="0 0 100 40" fill="none">
              <path d="M10 20 L30 5 L80 15 L95 20 L80 25 L30 35 Z" fill="#1A1A2E" stroke="#FF00FF" strokeWidth="2" />
              <ellipse cx="60" cy="20" rx="12" ry="4" fill="#00F0FF" className="animate-pulse" />
              <line x1="80" y1="20" x2="120" y2="20" stroke="#00F0FF" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>

          {/* 2. Aeroplane */}
          <div className="absolute w-full z-40 flex items-center" style={{ bottom: '190px', opacity: 0, animation: 'drive-vehicle 2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.1s' }}>
            <div className="absolute left-[-30px] h-px w-24 bg-white/40" />
            <svg className="w-28 h-14 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] relative z-10" viewBox="0 0 120 50" fill="currentColor">
              <path d="M20 25 L40 25 L75 10 L85 25 L110 25 C115 25 115 30 110 30 L85 30 L75 45 L40 30 L20 30 L10 25 Z" fill="#D1D5DB" />
              <path d="M70 23 L85 23 L82 27 L70 27 Z" fill="#1F2937" />
              <circle cx="15" cy="25" r="3" fill="#FF0055" className="animate-ping" />
            </svg>
          </div>

          {/* 3. Helicopter */}
          <div className="absolute w-full z-30 flex items-center" style={{ bottom: '120px', opacity: 0, animation: 'drive-vehicle 2.3s ease-in-out forwards 0.05s' }}>
            <div className="absolute top-[-5px] left-8 w-20 h-1 bg-white/60 shadow-[0_0_10px_#fff]" style={{ animation: 'spin-rotor 0.05s linear infinite' }} />
            <div className="absolute -left-4 top-1/2 w-4 h-1 bg-white/50" style={{ animation: 'spin-rotor 0.08s linear infinite', transformOrigin: 'right' }} />
            <svg className="w-24 h-16 text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.4)] relative z-10" viewBox="0 0 100 60" fill="none">
              <path d="M30 25 Q50 10 70 25 Q75 40 50 45 Q30 40 30 25 M70 25 L90 25 M85 20 L85 30 M45 45 L45 55 M55 45 L55 55 M35 55 L65 55" stroke="#00F0FF" strokeWidth="2.5" fill="#111827" />
              <path d="M50 15 Q60 15 65 25 L40 25 Q45 15 50 15" fill="#00F0FF" opacity="0.3" />
            </svg>
          </div>

          {/* 4. Speedboat / Water ship */}
          <div className="absolute w-full z-20 flex items-center" style={{ bottom: '60px', opacity: 0, animation: 'drive-vehicle 2s cubic-bezier(0.5, 0.05, 0.1, 1) forwards 0.15s' }}>
            {/* Water wake effect */}
            <div className="absolute -bottom-2 -left-16 w-32 h-6 border-b-2 border-l-2 border-[#00F0FF] rounded-bl-full opacity-60" />
            <div className="absolute -left-10 h-1.5 w-16 bg-[#00F0FF] blur-[2px] opacity-80 rounded-full" />
            <svg className="w-28 h-12 text-[#00F0FF] drop-shadow-[0_0_10px_#00F0FF] relative z-10" viewBox="0 0 100 40" fill="currentColor">
              <path d="M10 32 L85 32 C90 32 95 28 92 24 L75 16 L25 16 Z" fill="#1F2937" stroke="#00F0FF" strokeWidth="1.5" />
              <path d="M35 16 L45 5 L60 16 Z" fill="#F3F4F6" />
              <circle cx="85" cy="24" r="2" fill="#fff" className="animate-pulse" />
            </svg>
          </div>

          {/* 5. Cyberpunk Car (Ground) */}
          <div className="absolute w-full z-10 flex items-center" style={{ bottom: '0px', opacity: 0, animation: 'drive-car-complex 2.2s cubic-bezier(0.5, 0.05, 0.1, 1) forwards 0s' }}>
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex items-center transform translate-y-1">
              <div className="h-4 w-16 bg-gradient-to-l from-white via-[#00F0FF] to-transparent rounded-full" style={{ animation: 'nitro-fire 0.05s infinite alternate' }} />
            </div>
            <div className="relative text-white w-32 h-16 drop-shadow-[0_0_15px_rgba(108,99,255,0.6)]" style={{ animation: 'bounce-vehicle 0.12s infinite alternate' }}>
              <svg viewBox="0 0 100 50" className="w-full h-full" fill="none">
                <ellipse cx="50" cy="45" rx="35" ry="6" fill="#6C63FF" filter="blur(6px)" opacity="0.8" />
                <path d="M15 35H85C88 35 91 32 91 29V25C91 23 89 21 87 21L76 17L66 9C64 8 62 8 60 8.5L28 11.5C26 11.7 24.5 13 23.5 15L19 26.5L9 26.7C7 26.7 5.5 28.5 5.5 30.5V31C5.5 33.5 7.5 35 15 35Z" fill="#1A1A2E" stroke="#6C63FF" strokeWidth="1" />
                <path d="M33 13.5L40 12.5H59L69 18.5H27L33 13.5Z" fill="#0A0A16" stroke="#00F0FF" strokeWidth="0.8" />
                <g style={{ animation: 'spin-rotor 0.1s linear infinite', transformOrigin: '25px 35px' }}>
                  <circle cx="25" cy="35" r="9" fill="#05050A" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="6 4" />
                </g>
                <g style={{ animation: 'spin-rotor 0.1s linear infinite', transformOrigin: '75px 35px' }}>
                  <circle cx="75" cy="35" r="9" fill="#05050A" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="6 4" />
                </g>
                <path d="M91 26L180 15L180 35Z" fill="url(#beam)" />
                <defs>
                  <linearGradient id="beam" x1="91" y1="26" x2="180" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6C63FF" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#6C63FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {/* Sparks */}
            <div className="absolute left-6 bottom-0" style={{ animation: 'opacity-fade 2.2s forwards' }}>
              <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full shrink-0" style={{ animation: 'spark-fly 0.3s infinite ease-out' }}/>
            </div>
          </div>
        </div>

        <p className="text-sm text-white font-mono tracking-widest uppercase flex items-center gap-3 drop-shadow-[0_0_8px_#00F0FF]">
          <span className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-ping" />
          Deploying Fleet...
        </p>
      </div>

      <style>{`
        @keyframes hyper-speed {
          0% { transform: translateX(0); }
          100% { transform: translateX(-150vw); }
        }
        @keyframes drive-vehicle {
          0% { left: 0%; transform: translateX(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; transform: translateX(50%); opacity: 0; }
        }
        @keyframes drive-car-complex {
          0% { left: 0%; transform: translateX(-100%) scale(1) rotate(-1deg); opacity: 0; }
          5% { opacity: 1; left: 5%; transform: translateX(-5%) scale(1.05) rotate(-3deg); }
          15% { left: 15%; transform: translateX(-15%) scale(1.05) rotate(2deg); }
          50% { left: 50%; transform: translateX(-50%) scale(1) rotate(0deg); }
          85% { left: 85%; transform: translateX(-85%) scale(1.05) rotate(1deg); opacity: 1; }
          100% { left: 100%; transform: translateX(50%) scale(1) rotate(0deg); opacity: 0; }
        }
        @keyframes loading-progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes spin-rotor {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-vehicle {
          from { transform: translateY(0px); }
          to { transform: translateY(3px); }
        }
        @keyframes nitro-fire {
          from { transform: scaleX(0.8) scaleY(0.9); opacity: 0.7; }
          to { transform: scaleX(1.4) scaleY(1.2); opacity: 1; }
        }
        @keyframes spark-fly {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-30px, -10px) scale(0); opacity: 0; }
        }
        @keyframes opacity-fade {
          0% { opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default App;
