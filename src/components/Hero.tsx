import { useState, useEffect } from 'react';
import {
  Bot,
  Database,
  Server,
  Download,
  Briefcase,
  CheckCircle2,
  Terminal,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
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
  }, [pendingChanges, setPendingChanges, stats, summary, titles]);

  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypSpeed] = useState(100);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
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
  }, [currentText, isDeleting, titleIndex, titles, typingSpeed]);

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
      pillBorder: 'border-white/15 text-white/80',
      pillBot: 'text-red-300',
      glowClass: 'purple-horizon',
      buttonClass: 'from-white to-neutral-200 hover:from-white hover:to-white text-black shadow-white/10 hover:shadow-white/20',
      widgetClass: 'bg-white/10 text-white',
      badge: 'bg-white/10 text-white border-white/20',
    },
    emerald: {
      pillBorder: 'border-emerald-500/20 text-emerald-300',
      pillBot: 'text-emerald-400',
      glowClass: 'purple-horizon bg-emerald-500/25',
      buttonClass: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20 hover:shadow-emerald-500/40',
      widgetClass: 'bg-emerald-500/10 text-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    indigo: {
      pillBorder: 'border-indigo-500/20 text-indigo-300',
      pillBot: 'text-indigo-400',
      glowClass: 'purple-horizon bg-indigo-500/25',
      buttonClass: 'from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-500/20 hover:shadow-indigo-500/40',
      widgetClass: 'bg-indigo-500/10 text-indigo-400',
      badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
  };

  const activeStyle = styles[activeTheme];

  const proofMetrics = [
    { value: '20%', label: 'API latency reduction', detail: 'AWS Lambda + cache tuning' },
    { value: '40%', label: 'Reliability boost', detail: 'Concurrent Python workers' },
    { value: '7', label: 'Verified credentials', detail: 'Anthropic, MongoDB, Oracle' },
    { value: '8.27', label: 'CGPA / 10', detail: 'Integrated M.Tech, VIT Chennai' },
  ];

  const commandFeed = [
    { prompt: 'codex inspect resume --signals', result: 'Python, AWS, MongoDB, GenAI, MCP' },
    { prompt: 'claude code review StudyMate', result: '5 LLM modules, 100% Pytest validation' },
    { prompt: 'agent verify credentials', result: 'Anthropic MCP + Claude API certified' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-start lg:items-center justify-center pt-24 pb-10 overflow-hidden">
      {isEditMode && (
        <div className="absolute top-20 right-6 z-30 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
          EDIT MODE
        </div>
      )}

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="tesla-hero-sweep" />
        <div
          className={`absolute top-[-12%] left-1/2 -translate-x-1/2 w-[90%] md:w-[75%] h-[450px] rounded-full transition-all duration-1000 ${activeStyle.glowClass}`}
          style={{
            background:
              activeTheme === 'emerald'
                ? 'radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.02) 50%, rgba(3, 3, 3, 0) 100%)'
                : activeTheme === 'indigo'
                  ? 'radial-gradient(ellipse at 50% 30%, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.02) 50%, rgba(3, 3, 3, 0) 100%)'
                  : 'radial-gradient(ellipse at 50% 30%, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.02) 50%, rgba(3, 3, 3, 0) 100%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] border border-white/[0.02] rounded-full pointer-events-none" />
        <div className="absolute top-[-2%] left-1/2 -translate-x-1/2 w-[500px] md:w-[950px] h-[500px] md:h-[950px] border border-white/[0.012] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-[1.02fr_0.98fr] gap-8 lg:gap-10 items-center">
        <div className="text-left">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs md:text-sm ${activeStyle.badge}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">Open to full-time software engineering roles</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border text-xs md:text-sm transition-colors ${activeStyle.pillBorder}`}>
              <Bot className={`w-4 h-4 ${activeStyle.pillBot}`} />
              <span>Claude API, MCP, Agent Skills</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-7xl font-black font-display tracking-tight text-white mb-4 leading-[0.9]">
            Venkata Ramakrishna
            <span
              className="block mt-2 bg-gradient-to-r from-white via-neutral-200 to-white/65 bg-clip-text text-transparent transition-all duration-500"
              style={{
                backgroundImage:
                  activeTheme === 'emerald'
                    ? 'linear-gradient(to right, #ffffff, #f5f5f5, #d1d5db)'
                    : activeTheme === 'indigo'
                      ? 'linear-gradient(to right, #ffffff, #f5f5f5, #d1d5db)'
                      : 'linear-gradient(to right, #ffffff, #f5f5f5, #d1d5db)',
              }}
            >
              Kamepalli
            </span>
          </h1>

          <p className="text-lg md:text-2xl font-display font-semibold tracking-wide text-white/80 mb-4 min-h-8">
            I build as a <span className="text-white border-r-2 border-red-500 pr-1 animate-pulse">{currentText}</span>
          </p>

          <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mb-5">
            Integrated M.Tech Software Engineering student at <span className="text-white font-semibold">VIT Chennai</span> building Python-first backend systems, AWS serverless workflows, MongoDB-backed products, and agentic interfaces that recruiters can inspect directly.
          </p>

          <div className="flex flex-wrap gap-2 mb-5 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            {['Python', 'AWS Lambda', 'MongoDB', 'Claude API', 'MCP', 'TypeScript', 'React', 'Pytest'].map((kw) => (
              <span key={kw} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07]">
                {kw}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-6">
            <a
              href="./Ramakrishna.pdf"
              target="_blank"
              className={`px-7 py-3.5 rounded-md bg-gradient-to-r font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer ${activeStyle.buttonClass}`}
            >
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </a>

            <button
              onClick={() => handleScrollTo('projects')}
              className="px-7 py-3.5 rounded-md glass-pill hover:bg-white/10 font-semibold text-white hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 border border-white/15 cursor-pointer"
            >
              <Briefcase className="w-5 h-5 text-gray-400" />
              Inspect Work
            </button>

            <div className="flex items-center gap-2">
              <a href="https://github.com/Ramakrishna9-R09" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-md glass-pill text-gray-300 hover:text-white" title="GitHub">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/venkata-ramakrishna-kamepalli-b60878290/" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-md glass-pill text-gray-300 hover:text-white" title="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-2xl">
            {proofMetrics.map((stat) => (
              <div key={stat.label} className="glass-card border-white/5 rounded-2xl p-3.5 hover:translate-y-[-2px] transition-transform">
                <p className="text-xl md:text-2xl font-black font-display text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-300 mt-1 font-semibold">{stat.label}</p>
                <p className="hidden xl:block text-[11px] text-gray-500 mt-1.5">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="glass-card rounded-2xl border-white/15 overflow-hidden bg-black/55 shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.04]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-gray-400">claude-code-workbench</span>
              </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white bg-white/10 border border-white/20 px-2 py-1 rounded-full">ready</span>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl ${activeStyle.widgetClass}`}>
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-display font-bold text-white">Agentic portfolio runtime</p>
                  <p className="text-xs text-gray-500">Interactive resume, API sandbox, and systems proof</p>
                </div>
              </div>

              <div className="space-y-2.5 font-mono text-[11px]">
                {commandFeed.map((line) => (
                  <div key={line.prompt} className="rounded-2xl bg-white/[0.035] border border-white/[0.06] p-3">
                    <p className="text-purple-300">
                      <span className="text-gray-500">$</span> {line.prompt}
                    </p>
                    <p className="mt-2 text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {line.result}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: Server, label: 'Serverless', value: 'AWS' },
                  { icon: Database, label: 'Storage', value: 'MongoDB' },
                  { icon: ShieldCheck, label: 'Verified', value: 'MCP' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-white/7 bg-white/[0.025] p-2.5 text-center">
                    <Icon className={`w-5 h-5 mx-auto mb-2 ${activeStyle.pillBot}`} />
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">{label}</p>
                    <p className="text-sm font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-red-200 mt-0.5" />
                <p className="text-xs xl:text-sm text-gray-300 leading-relaxed">
                  Designed like a live engineering artifact: commands, telemetry, project traces, credentials, and contact paths all visible without recruiter guesswork.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="text-[10px] uppercase tracking-widest font-mono text-gray-500">Operator theme</div>
                <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md">
                  <button aria-label="Black theme" onClick={() => setActiveTheme('purple')} className={`w-5 h-5 rounded-full bg-neutral-100 border-2 cursor-pointer transition-transform ${activeTheme === 'purple' ? 'border-red-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`} />
                  <button aria-label="Performance theme" onClick={() => setActiveTheme('emerald')} className={`w-5 h-5 rounded-full bg-red-600 border-2 cursor-pointer transition-transform ${activeTheme === 'emerald' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`} />
                  <button aria-label="Midnight theme" onClick={() => setActiveTheme('indigo')} className={`w-5 h-5 rounded-full bg-neutral-700 border-2 cursor-pointer transition-transform ${activeTheme === 'indigo' ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`} />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 -top-5 hidden sm:block glass-card rounded-2xl border-white/10 px-4 py-3 animate-float">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-mono text-gray-300">ship-ready UI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
