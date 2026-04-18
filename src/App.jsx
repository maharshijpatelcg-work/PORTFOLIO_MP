import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ChatBot from './components/ChatBot';
import VoiceAssistant from './components/VoiceAssistant';
import CameraAssistant from './components/CameraAssistant';
import ArcadeHub from './components/ArcadeHub';
import ThemeSwitcher from './components/ThemeSwitcher';
import Preloader from './components/Preloader';
import './App.css';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const FigmaDesignsPage = lazy(() => import('./pages/FigmaDesignsPage'));
const HackathonsPage = lazy(() => import('./pages/HackathonsPage'));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const LeetCodePage = lazy(() => import('./pages/LeetCodePage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Footer = lazy(() => import('./components/Footer'));

// Minimal fallback while lazy chunks load
const PageFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

// ScrollToTop component — scrolls to page top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="app min-h-screen bg-transparent text-white relative md:pl-16 overflow-x-hidden">
      <Preloader />
      <CustomCursor />
      <ThemeSwitcher />
      <ChatBot />
      <VoiceAssistant />
      <CameraAssistant />
      <ArcadeHub />

      {/* Premium black geometric background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hex-bg.png')" }}
      />
      {/* Subtle dark overlay to blend content */}
      <div className="fixed inset-0 -z-10 bg-black/40" />

      <Navbar />
      <ScrollToTop />

      <main className="relative z-10">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/figma-designs" element={<FigmaDesignsPage />} />
            <Route path="/hackathons" element={<HackathonsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/leetcode" element={<LeetCodePage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
