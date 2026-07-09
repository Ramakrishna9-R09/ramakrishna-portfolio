import { useState, useEffect, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AgentTerminal from './components/AgentTerminal';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import EducationTimeline from './components/EducationTimeline';
import Contact from './components/Contact';
import ScrollReveal from './components/ScrollReveal';
import PerformanceMonitor from './components/PerformanceMonitor';
import AIAssistant from './components/AIAssistant';
import ArchitectureExplorer from './components/ArchitectureExplorer';
import { EditModeProvider } from './context/EditModeContext';
import EditToggle from './components/EditToggle';
import { ArrowUp, Mail, Download } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'purple' | 'emerald' | 'indigo'>('purple');

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    const shouldStartAtHero = !window.location.hash || window.location.hash === '#hero';
    if (shouldStartAtHero) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const sections = ['hero', 'agent-terminal', 'architecture-explorer', 'skills', 'projects', 'experience', 'certifications', 'education', 'contact'];
      let currentActive = '';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            currentActive = sectionId;
            break;
          }
        }
      }

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection('contact');
      } else if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--global-mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--global-mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themeGradients = {
    purple: { color1: 'rgba(255, 255, 255, 0.09)', color2: 'rgba(244, 244, 245, 0.05)' },
    emerald: { color1: 'rgba(244, 244, 245, 0.08)', color2: 'rgba(255, 255, 255, 0.04)' },
    indigo: { color1: 'rgba(161, 161, 170, 0.08)', color2: 'rgba(255, 255, 255, 0.045)' }
  };

  const spotlightColors = {
    purple: 'rgba(255, 255, 255, 0.055)',
    emerald: 'rgba(255, 255, 255, 0.045)',
    indigo: 'rgba(244, 244, 245, 0.04)'
  };

  return (
    <EditModeProvider>
    <div 
      className="premium-shell min-h-screen text-white selection:bg-white/30 selection:text-black antialiased font-sans relative overflow-x-hidden"
      style={{ '--spotlight-color': spotlightColors[activeTheme] } as React.CSSProperties}
    >
      <div className="automotive-background" />
      <div className="noise-overlay" />
      <div className="spotlight-glow" />
      <div className="spotlight-grid" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 pointer-events-none z-10 border-x border-white/[0.015]" />

      <div className="ambient-glow-container">
        <div className="ambient-glow-1 transition-all duration-1000" style={{ background: `radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, ${themeGradients[activeTheme].color1} 28%, rgba(3, 3, 3, 0) 72%)` }} />
        <div className="ambient-glow-2 transition-all duration-1000" style={{ background: `radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, ${themeGradients[activeTheme].color2} 36%, rgba(3, 3, 3, 0) 72%)` }} />
      </div>

      <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-white via-neutral-300 to-white z-50 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      <Navbar activeSection={activeSection} activeTheme={activeTheme} />
      <PerformanceMonitor />

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
          <Experience />
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

      <AIAssistant />
      <EditToggle />

      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-xl glass-pill border border-white/10 text-white/80 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        title="Scroll to Top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Recruiter-Optimized Footer */}
      <footer className="py-16 border-t border-white/10 bg-[#050505]/95 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] purple-horizon-bottom opacity-50" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* CTA Banner */}
          <div className="text-center mb-12 p-8 rounded-3xl bg-white/[0.055] border border-white/15">
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-3">
              Ready to build something great together?
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-6 max-w-lg mx-auto">
              I'm actively seeking full-time Software Engineering roles starting 2027. Let's connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="./Ramakrishna.pdf"
                target="_blank"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-white to-neutral-200 hover:from-white hover:to-white text-black font-semibold shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
              <a
                href="mailto:ramakrishna.mvp2004@gmail.com"
                className="px-8 py-4 rounded-full glass-pill border border-white/10 hover:bg-white/10 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-display font-bold text-lg text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                <span className="w-6 h-6 rounded-lg bg-white text-black flex items-center justify-center text-xs font-black shadow-lg shadow-white/10">RK</span>
                Venkata Ramakrishna Kamepalli
              </h4>
              <p className="text-xs text-gray-500">
                Software Engineer | Python | AWS | GenAI | MongoDB
              </p>
              <p className="text-xs text-gray-500 mt-1">
                © {new Date().getFullYear()} All Rights Reserved. Engineered with React & TypeScript.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://github.com/Ramakrishna9-R09" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors" title="GitHub">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/venkata-ramakrishna-kamepalli-b60878290/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors" title="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="mailto:ramakrishna.mvp2004@gmail.com" className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </EditModeProvider>
  );
}
