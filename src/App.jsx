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
    // Extended loading time for fireworks cinematic entry
    const timer = setTimeout(() => setIsLoading(false), 4600);
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

/* ── Fireworks Loading Intro ── */
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#060b19] z-[9999] flex flex-col items-center justify-center overflow-hidden">
      {/* Night Sky Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `twinkle ${Math.random() * 3 + 1}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Fireworks Elements */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Firework 1 */}
        <div className="absolute top-[25%] left-[20%]">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={`fw1-${i}`} className="absolute top-0 left-0" style={{ transform: `rotate(${i * 15}deg)` }}>
              <div className="relative w-1.5 h-1.5 bg-neon-cyan shadow-[0_0_12px_#00F0FF] rounded-full flex flex-row-reverse items-center" style={{ animation: `firework-shoot 1s cubic-bezier(0.1, 0.8, 0.2, 1) forwards 0s`, opacity: 0 }}>
                <div className="absolute right-full w-10 h-[1.5px] bg-gradient-to-l from-neon-cyan/80 to-transparent origin-right" style={{ animation: 'particle-trail 1s ease-out forwards 0s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Firework 2 */}
        <div className="absolute top-[35%] right-[20%]">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={`fw2-${i}`} className="absolute top-0 left-0" style={{ transform: `rotate(${i * 15}deg)` }}>
              <div className="relative w-1.5 h-1.5 bg-neon-pink shadow-[0_0_12px_#f472b6] rounded-full flex flex-row-reverse items-center" style={{ animation: `firework-shoot 1s cubic-bezier(0.1, 0.8, 0.2, 1) forwards 0.3s`, opacity: 0 }}>
                <div className="absolute right-full w-10 h-[1.5px] bg-gradient-to-l from-neon-pink/80 to-transparent origin-right" style={{ animation: 'particle-trail 1s ease-out forwards 0.3s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Firework 3 (Center Burst) */}
        <div className="absolute top-[30%] left-[50%]">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={`fw3-${i}`} className="absolute top-0 left-0" style={{ transform: `rotate(${i * 10}deg)` }}>
              <div className="relative w-2 h-2 bg-[#facc15] shadow-[0_0_15px_#facc15] rounded-full flex flex-row-reverse items-center" style={{ animation: `firework-shoot-large 1.2s cubic-bezier(0.1, 0.8, 0.2, 1) forwards 0.6s`, opacity: 0 }}>
                <div className="absolute right-full w-16 h-[2px] bg-gradient-to-l from-[#facc15]/80 to-transparent origin-right" style={{ animation: 'particle-trail-large 1.2s ease-out forwards 0.6s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Main Text Content */}
      <div className="relative z-10 flex flex-col items-center mt-20" style={{ animation: 'text-reveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards 0.5s' }}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-neon-cyan to-[#7e22ce] tracking-wider text-center drop-shadow-[0_0_20px_rgba(0,182,255,0.4)] opacity-0" style={{ animation: 'fade-in-up 1s forwards 1s' }}>
          MAHARSHI PATEL
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.4em] text-blue-200/80 mt-6 opacity-0" style={{ animation: 'fade-in-up 1s forwards 1.2s' }}>
          PORTFOLIO
        </h2>
        
        {/* Loading Line & Centered Car Container */}
        <div className="relative mt-8 w-72 flex flex-col items-center justify-end opacity-0" style={{ animation: 'fade-in 0.5s forwards 1.4s' }}>
          
          {/* Cyberpunk Car Driving on Line */}
          <div className="absolute bottom-1 w-24 opacity-0 z-10" style={{ animation: 'drive-along-line 3s ease-in-out forwards 1.4s' }}>
            <div className="relative text-white w-full h-12 drop-shadow-[0_0_15px_rgba(108,99,255,0.6)]" style={{ animation: 'bounce-vehicle 0.12s infinite alternate' }}>
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center transform translate-y-1">
              <div className="h-3 w-10 bg-gradient-to-l from-white via-[#00F0FF] to-transparent rounded-full" style={{ animation: 'nitro-fire 0.05s infinite alternate' }} />
            </div>
            
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
            </svg>
            
            <div className="absolute left-2 bottom-0">
              <div className="h-1 w-1 bg-yellow-400 rounded-full shrink-0" style={{ animation: 'spark-fly 0.3s infinite ease-out' }}/>
            </div>
          </div>
          </div>

          {/* Loading Base Line */}
          <div className="w-full h-1 bg-blue-900/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-transparent via-neon-cyan to-[#facc15] rounded-full shadow-[0_0_12px_#00F0FF]" style={{ animation: 'loading-bar-fill 3s ease-in-out forwards 1.4s' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 0.7; transform: scale(1.3); }
        }
        @keyframes firework-shoot {
          0% { transform: translateX(0) scale(1); opacity: 1; }
          75% { opacity: 1; transform: translateX(80px) scale(0.6); }
          100% { transform: translateX(110px) scale(0); opacity: 0; }
        }
        @keyframes firework-shoot-large {
          0% { transform: translateX(0) scale(1.2); opacity: 1; }
          75% { opacity: 1; transform: translateX(130px) scale(0.6); }
          100% { transform: translateX(180px) scale(0); opacity: 0; }
        }
        @keyframes particle-trail {
          0% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        @keyframes particle-trail-large {
          0% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(25px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes loading-bar-fill {
          0% { width: 0%; opacity: 0.5; }
          40% { width: 60%; opacity: 1; }
          100% { width: 100%; opacity: 1; }
        }
        @keyframes drive-along-line {
          0% { left: -48px; opacity: 0; transform: rotate(-2deg); }
          5% { opacity: 1; left: -40px; transform: rotate(0deg); }
          95% { opacity: 1; left: 232px; transform: rotate(0deg); }
          100% { left: 240px; opacity: 0; transform: rotate(2deg); }
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
