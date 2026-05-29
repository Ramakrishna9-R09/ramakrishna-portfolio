import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AgentTerminal from './components/AgentTerminal';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import EducationTimeline from './components/EducationTimeline';
import Contact from './components/Contact';
import ScrollReveal from './components/ScrollReveal';
import PerformanceMonitor from './components/PerformanceMonitor';
import AIAssistant from './components/AIAssistant';
import ArchitectureExplorer from './components/ArchitectureExplorer';
import { ArrowUp, Mail } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'purple' | 'emerald' | 'indigo'>('purple');

  // Monitor Scroll and update scroll progress & scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      // Progress calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Show/hide scroll to top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Active Section tracking
      const sections = ['hero', 'agent-terminal', 'architecture-explorer', 'skills', 'projects', 'certifications', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200; // offset for nav triggers

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = rect.height;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hardware-accelerated mouse coordinates CSS tracker (keeps 60 FPS)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--global-mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--global-mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Dynamic colors mapping based on active theme
  const themeColors = {
    purple: 'from-purple-500 via-pink-500 to-indigo-500',
    emerald: 'from-emerald-500 via-teal-500 to-cyan-500',
    indigo: 'from-indigo-500 via-blue-500 to-sky-500'
  };

  // Dynamic glow gradients mapping based on active theme
  const themeGradients = {
    purple: {
      color1: 'rgba(168, 85, 247, 0.12)',
      color2: 'rgba(99, 102, 241, 0.05)'
    },
    emerald: {
      color1: 'rgba(16, 185, 129, 0.12)',
      color2: 'rgba(6, 182, 212, 0.05)'
    },
    indigo: {
      color1: 'rgba(99, 102, 241, 0.12)',
      color2: 'rgba(59, 130, 246, 0.05)'
    }
  };

  // Dynamic spotlight colors mapping based on active theme
  const spotlightColors = {
    purple: 'rgba(168, 85, 247, 0.06)',
    emerald: 'rgba(16, 185, 129, 0.06)',
    indigo: 'rgba(99, 102, 241, 0.06)'
  };

  return (
    <div 
      className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30 selection:text-purple-200 antialiased font-sans relative overflow-x-hidden"
      style={{ '--spotlight-color': spotlightColors[activeTheme] } as React.CSSProperties}
    >
      {/* Premium Film Grain Noise overlay */}
      <div className="noise-overlay" />

      {/* GPU-Driven Spotlight Grid */}
      <div className="spotlight-glow" />
      <div className="spotlight-grid" />

      {/* Structural layout vertical lines */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 pointer-events-none z-10 border-x border-white/[0.015]" />

      {/* Drifting CSS studio backlights */}
      <div className="ambient-glow-container">
        <div 
          className="ambient-glow-1 transition-all duration-1000" 
          style={{ 
            background: `radial-gradient(circle, ${themeGradients[activeTheme].color1} 0%, rgba(3, 3, 3, 0) 70%)` 
          }}
        />
        <div 
          className="ambient-glow-2 transition-all duration-1000" 
          style={{ 
            background: `radial-gradient(circle, ${themeGradients[activeTheme].color2} 0%, rgba(3, 3, 3, 0) 70%)` 
          }}
        />
      </div>

      {/* Top Glowing Scroll Progress Bar */}
      <div 
        className={`fixed top-0 left-0 h-[3px] bg-gradient-to-r ${themeColors[activeTheme]} z-50 transition-all duration-300`} 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <Navbar activeSection={activeSection} activeTheme={activeTheme} />

      {/* Live System Performance Telemetry HUD */}
      <PerformanceMonitor />

      {/* Main Content Layout wrapped in Apple-style Scroll Reveals */}
      <main>
        <Hero activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
        
        <ScrollReveal>
          <AgentTerminal />
        </ScrollReveal>
        
        <ScrollReveal>
          <ArchitectureExplorer activeTheme={activeTheme} />
        </ScrollReveal>
        
        <ScrollReveal>
          <Skills activeTheme={activeTheme} />
        </ScrollReveal>
        
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
        
        <ScrollReveal>
          <Certifications />
        </ScrollReveal>
        
        <ScrollReveal>
          <EducationTimeline />
        </ScrollReveal>
        
        <ScrollReveal>
          <Contact activeTheme={activeTheme} />
        </ScrollReveal>
      </main>

      {/* Floating Interactive AI Assistant */}
      <AIAssistant />

      {/* Scroll to Top Button */}
      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-xl glass-pill border border-white/10 text-purple-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        title="Scroll to Top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/60 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] purple-horizon-bottom opacity-50" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-display font-bold text-lg text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-black shadow-lg">RK</span>
              Venkata Ramakrishna Kamepalli
            </h4>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} All Rights Reserved. Engineered with React, TypeScript & Agentic Design.
            </p>
          </div>

          {/* Footer Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ramakrishna9-R09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors flex items-center justify-center"
              title="GitHub"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/venkata-ramakrishna-kamepalli-b60878290/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors flex items-center justify-center"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="mailto:ramakrishna.mvp2004@gmail.com"
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
