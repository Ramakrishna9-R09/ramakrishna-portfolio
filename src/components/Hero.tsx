import { useState, useEffect } from 'react';
import { Bot, Code, Database, Server, Download, Briefcase } from 'lucide-react';
import { getHero, saveData } from '../data/resumeData';
import { useEditMode } from '../context/EditModeContext';

interface HeroProps {
  activeTheme: 'purple' | 'emerald' | 'indigo';
  setActiveTheme: (theme: 'purple' | 'emerald' | 'indigo') => void;
}

export default function Hero({ activeTheme, setActiveTheme }: HeroProps) {
  const { isEditMode, pendingChanges, setPendingChanges } = useEditMode();
  const heroData = getHero();
  const [titles] = useState(heroData.titles);
  const [summary] = useState(heroData.summary);
  const [stats] = useState(heroData.stats);

  useEffect(() => {
    if (pendingChanges) {
      saveData('hero', { titles, stats, summary });
      setPendingChanges(false);
    }
  }, [pendingChanges]);

  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypSpeed] = useState(100);

  useEffect(() => {
    let timer: any;
    const fullText = titles[titleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypSpeed(100);
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypSpeed(50);
        if (currentText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          return;
        }
      }
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex, typingSpeed]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const styles = {
    purple: {
      pillBorder: 'border-purple-500/20 text-purple-300',
      pillBot: 'text-purple-400',
      glowClass: 'purple-horizon',
      buttonClass: 'from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-500/20 hover:shadow-purple-500/40',
      widgetClass: 'bg-purple-500/10 text-purple-400',
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    },
    emerald: {
      pillBorder: 'border-emerald-500/20 text-emerald-300',
      pillBot: 'text-emerald-400',
      glowClass: 'purple-horizon bg-emerald-500/25',
      buttonClass: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20 hover:shadow-emerald-500/40',
      widgetClass: 'bg-emerald-500/10 text-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    },
    indigo: {
      pillBorder: 'border-indigo-500/20 text-indigo-300',
      pillBot: 'text-indigo-400',
      glowClass: 'purple-horizon bg-indigo-500/25',
      buttonClass: 'from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-500/20 hover:shadow-indigo-500/40',
      widgetClass: 'bg-indigo-500/10 text-indigo-400',
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    }
  };

  const activeStyle = styles[activeTheme];

  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden bg-grid">
      {isEditMode && (
        <div className="absolute top-20 right-6 z-30 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
          EDIT MODE
        </div>
      )}

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-[90%] md:w-[75%] h-[450px] rounded-full transition-all duration-1000 ${activeStyle.glowClass}`} style={{
          background: activeTheme === 'emerald' 
            ? 'radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.02) 50%, rgba(3, 3, 3, 0) 100%)' 
            : activeTheme === 'indigo' 
            ? 'radial-gradient(ellipse at 50% 30%, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.02) 50%, rgba(3, 3, 3, 0) 100%)' 
            : 'radial-gradient(ellipse at 50% 30%, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.02) 50%, rgba(3, 3, 3, 0) 100%)',
          filter: 'blur(80px)'
        }} />
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] border border-white/[0.02] rounded-full pointer-events-none" />
        <div className="absolute top-[-2%] left-1/2 -translate-x-1/2 w-[500px] md:w-[950px] h-[500px] md:h-[950px] border border-white/[0.012] rounded-full pointer-events-none" />
      </div>

      <div className="absolute top-4 right-6 z-20 flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md">
        <button onClick={() => setActiveTheme('purple')} className={`w-5 h-5 rounded-full bg-purple-500 border-2 cursor-pointer transition-transform ${activeTheme === 'purple' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`} />
        <button onClick={() => setActiveTheme('emerald')} className={`w-5 h-5 rounded-full bg-emerald-500 border-2 cursor-pointer transition-transform ${activeTheme === 'emerald' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`} />
        <button onClick={() => setActiveTheme('indigo')} className={`w-5 h-5 rounded-full bg-indigo-500 border-2 cursor-pointer transition-transform ${activeTheme === 'indigo' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Open to Work Badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs md:text-sm mb-4 animate-float ${activeStyle.badge}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold">Open to Full-Time Software Engineering Roles</span>
        </div>

        {/* Announcement pill */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border text-xs md:text-sm mb-8 transition-colors animate-float-delayed ${activeStyle.pillBorder}`}>
          <Bot className={`w-4 h-4 animate-pulse ${activeStyle.pillBot}`} />
          <span>Anthropic Claude API & Agentic Systems Developer</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black font-display tracking-tight text-white mb-6">
          Venkata Ramakrishna
          <span className="block mt-2 bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent transition-all duration-500" style={{
            backgroundImage: activeTheme === 'emerald' 
              ? 'linear-gradient(to right, #ffffff, #ffffff, #10b981)' 
              : activeTheme === 'indigo' 
              ? 'linear-gradient(to right, #ffffff, #ffffff, #6366f1)' 
              : 'linear-gradient(to right, #ffffff, #ffffff, #a855f7)'
          }}>
            Kamepalli
          </span>
        </h1>

        {/* Dynamic Typing Title */}
        <div className="h-10 md:h-14 flex items-center justify-center mb-6">
          <p className="text-xl md:text-3xl font-display font-semibold tracking-wide text-purple-200">
            I am a <span className="text-white border-r-2 border-purple-500 pr-1 animate-pulse">{currentText}</span>
          </p>
        </div>

        {/* ATS-friendly keyword line */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 text-[11px] font-mono text-gray-500 uppercase tracking-widest">
          {['Python', 'AWS', 'React', 'MongoDB', 'GenAI', 'TypeScript', 'Node.js', 'Docker'].map((kw) => (
            <span key={kw} className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">{kw}</span>
          ))}
        </div>

        {/* Short Summary */}
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl leading-relaxed mb-10">
          Integrated M.Tech Software Engineering student at <span className="text-white font-semibold">VIT Chennai</span> (CGPA: 8.27). Specialized in scalable Python systems, event-driven AWS serverless pipelines, MongoDB indexing, and advanced agentic architectures.
        </p>

        {/* Impact Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-10 w-full max-w-2xl">
          {[
            { value: '4', label: 'Full-Stack Projects Shipped', icon: '🚀' },
            { value: '40%', label: 'System Reliability Boost', icon: '📈' },
            { value: '7', label: 'Industry Certifications', icon: '🏆' },
            { value: '8.27', label: 'CGPA / 10', icon: '🎓' },
          ].map((stat, i) => (
            <div key={i} className="glass-card border-white/5 rounded-2xl p-4 text-center hover:scale-105 transition-transform">
              <p className="text-lg mb-1">{stat.icon}</p>
              <p className="text-xl md:text-2xl font-black font-display text-white">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-lg">
          <a
            href="./Ramakrishna.pdf"
            target="_blank"
            className={`w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r font-semibold text-white shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer ${activeStyle.buttonClass}`}
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            Download Resume
          </a>
          
          <button
            onClick={() => handleScrollTo('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-pill hover:bg-white/10 font-semibold text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
          >
            <Briefcase className="w-5 h-5 text-gray-400" />
            Let's Talk
          </button>

          <button
            onClick={() => handleScrollTo('agent-terminal')}
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-pill hover:bg-white/10 font-semibold text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
          >
            <Code className="w-5 h-5 text-gray-400" />
            View Projects
          </button>
        </div>

        {/* Floating Widgets */}
        <div className="hidden xl:block absolute left-[-150px] top-[30%] animate-float">
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3 border border-white/5">
            <div className={`p-2.5 rounded-xl ${activeStyle.widgetClass}`}><Server className="w-5 h-5" /></div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Cloud Platform</p>
              <p className="text-sm font-semibold text-white">AWS Serverless</p>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute right-[-150px] top-[40%] animate-float-delayed">
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3 border border-white/5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400"><Database className="w-5 h-5" /></div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Database</p>
              <p className="text-sm font-semibold text-white">MongoDB Certified</p>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute left-[-80px] top-[65%] animate-float-delayed">
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3 border border-white/5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400"><Code className="w-5 h-5" /></div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Main Stack</p>
              <p className="text-sm font-semibold text-white">Python OOP / Pytest</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
