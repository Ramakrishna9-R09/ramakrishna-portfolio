import { useState, useEffect, type ReactNode } from 'react';
import { Cpu, Server, Database, Code2, Award, ArrowUpRight } from 'lucide-react';
import { getSkillsData, saveData } from '../data/resumeData';
import type { SkillGroup } from '../data/resumeData';
import { useEditMode } from '../context/EditModeContext';
import { EditableText, EditableList } from './EditableField';

interface SkillsProps {
  activeTheme?: 'purple' | 'emerald' | 'indigo';
}

function CircularProgress({ level, activeTheme }: { level: number; activeTheme: 'purple' | 'emerald' | 'indigo' }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  const themeColors = {
    purple: { stroke: 'url(#skills-purple-grad)', text: 'text-white', glow: 'rgba(255, 255, 255, 0.24)' },
    emerald: { stroke: 'url(#skills-emerald-grad)', text: 'text-white', glow: 'rgba(255, 255, 255, 0.2)' },
    indigo: { stroke: 'url(#skills-indigo-grad)', text: 'text-white', glow: 'rgba(244, 244, 245, 0.2)' }
  };

  const currentTheme = themeColors[activeTheme] || themeColors.purple;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center select-none animate-float">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="skills-purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d4d4d8" />
          </linearGradient>
          <linearGradient id="skills-emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4f4f5" />
            <stop offset="100%" stopColor="#d4d4d8" />
          </linearGradient>
          <linearGradient id="skills-indigo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a1a1aa" />
          </linearGradient>
          <filter id="skills-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <circle cx="50" cy="50" r={radius} className="stroke-white/[0.04] fill-none" strokeWidth="5" />
        <circle cx="50" cy="50" r={radius} className="fill-none transition-all duration-1000 ease-out" stroke={currentTheme.stroke} strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" filter="url(#skills-glow)" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-mono text-lg font-black text-white leading-none">{level}%</span>
        <span className="text-[7px] font-mono tracking-wider text-gray-500 uppercase mt-0.5">Mastery</span>
      </div>
    </div>
  );
}

const categoryIcons: Record<string, ReactNode> = {
  'GenAI & Agentic Systems': <Cpu className="w-6 h-6 text-purple-400" />,
  'Python & Software Engineering': <Code2 className="w-6 h-6 text-blue-400" />,
  'AWS Cloud & Backend': <Server className="w-6 h-6 text-orange-400" />,
  'Databases & Storage': <Database className="w-6 h-6 text-emerald-400" />,
};

const categoryColors: Record<string, string> = {
  'GenAI & Agentic Systems': 'shadow-purple-500/10 border-purple-500/20 border-t-purple-500/50',
  'Python & Software Engineering': 'shadow-blue-500/10 border-blue-500/20 border-t-blue-500/50',
  'AWS Cloud & Backend': 'shadow-orange-500/10 border-orange-500/20 border-t-orange-500/50',
  'Databases & Storage': 'shadow-emerald-500/10 border-emerald-500/20 border-t-emerald-500/50',
};

export default function Skills({ activeTheme = 'purple' }: SkillsProps) {
  const { isEditMode, pendingChanges, setPendingChanges } = useEditMode();
  const [categories, setCategories] = useState<SkillGroup[]>(() => getSkillsData());

  useEffect(() => {
    if (pendingChanges) {
      saveData('skills', categories);
      setPendingChanges(false);
    }
  }, [pendingChanges]);

  const [activeCat, setActiveCat] = useState<string>(categories[0]?.category || '');
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; level: number; info: string } | null>(
    categories[0]?.skills[0] || null
  );

  const currentCategory = categories.find((c) => c.category === activeCat) || categories[0];

  const themeAccentClasses = {
    purple: { text: 'text-purple-400', bgLight: 'bg-purple-500/10', border: 'border-purple-500/20', borderActive: 'border-purple-500/40', glow: 'shadow-purple-500/5', dot: 'bg-purple-400', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/20', horizon: 'purple-horizon' },
    emerald: { text: 'text-emerald-400', bgLight: 'bg-emerald-500/10', border: 'border-emerald-500/20', borderActive: 'border-emerald-500/40', glow: 'shadow-emerald-500/5', dot: 'bg-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20', horizon: 'purple-horizon bg-emerald-500/25' },
    indigo: { text: 'text-indigo-400', bgLight: 'bg-indigo-500/10', border: 'border-indigo-500/20', borderActive: 'border-indigo-500/40', glow: 'shadow-indigo-500/5', dot: 'bg-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/20', horizon: 'purple-horizon bg-indigo-500/25' }
  };

  const themeStyle = themeAccentClasses[activeTheme];

  const updateCategory = (idx: number, field: string, value: any) => {
    const next = [...categories];
    (next[idx] as any)[field] = value;
    setCategories(next);
    setPendingChanges(true);
  };

  const updateSkill = (catIdx: number, skillIdx: number, field: string, value: any) => {
    const next = [...categories];
    (next[catIdx].skills[skillIdx] as any)[field] = value;
    setCategories(next);
    setPendingChanges(true);
  };

  const addSkill = (catIdx: number) => {
    const next = [...categories];
    next[catIdx].skills.push({ name: 'New Skill', level: 50, info: '' });
    setCategories(next);
    setPendingChanges(true);
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    const next = [...categories];
    next[catIdx].skills = next[catIdx].skills.filter((_, i) => i !== skillIdx);
    setCategories(next);
    setPendingChanges(true);
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 z-0 bg-grid opacity-30" />
      <div className={`absolute top-[30%] left-1/2 -translate-x-1/2 w-[70%] h-[300px] transition-all duration-500 ${themeStyle.horizon}`} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Engineering Capability Matrix
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            A focused map of the systems, cloud, data, and agentic AI capabilities used across production-grade projects.
          </p>
        </div>

        {/* In edit mode, allow category name editing */}
        {isEditMode && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <p className="text-xs text-amber-400 font-mono mb-3">Edit categories, skills, and highlights below.</p>
            {categories.map((cat, ci) => (
              <div key={ci} className="mb-4 p-3 rounded-lg bg-white/5">
                <div className="flex gap-2 mb-2 items-center">
                  <EditableText value={cat.category} onChange={(v) => updateCategory(ci, 'category', v)} className="font-bold text-white" tag="span" />
                  <EditableText value={cat.description} onChange={(v) => updateCategory(ci, 'description', v)} className="text-gray-400 text-xs flex-1" tag="span" />
                </div>
                <EditableList items={cat.highlights} onChange={(v) => updateCategory(ci, 'highlights', v)} className="ml-4" itemClass="text-xs text-gray-400" bullet="▹" />
                <div className="mt-2 ml-4">
                  {cat.skills.map((sk, si) => (
                    <div key={si} className="flex items-center gap-2 mb-1">
                      <EditableText value={sk.name} onChange={(v) => updateSkill(ci, si, 'name', v)} className="text-sm text-white" tag="span" />
                      <input type="range" min={0} max={100} value={sk.level} onChange={(e) => updateSkill(ci, si, 'level', Number(e.target.value))} className="w-20 accent-purple-500" />
                      <span className="text-xs text-purple-400 font-mono w-8">{sk.level}%</span>
                      <EditableText value={sk.info} onChange={(v) => updateSkill(ci, si, 'info', v)} className="text-xs text-gray-500 flex-1" tag="span" />
                      <button onClick={() => removeSkill(ci, si)} className="text-white/70 hover:text-white text-xs">✕</button>
                    </div>
                  ))}
                  <button onClick={() => addSkill(ci)} className="text-purple-400 hover:text-purple-300 text-xs mt-1">+ Add skill</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setActiveCat(cat.category);
                setSelectedSkill(cat.skills[0]);
              }}
              className={`text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-[150px] ${
                activeCat === cat.category
                  ? `glass-card border-t-2 ${categoryColors[cat.category] || categoryColors['GenAI & Agentic Systems']} scale-[1.02] bg-white/5`
                  : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between">
                {categoryIcons[cat.category] || <Cpu className="w-6 h-6 text-purple-400" />}
                <Award className={`w-4 h-4 opacity-0 transition-opacity ${activeCat === cat.category ? `opacity-100 ${themeStyle.text}` : ''}`} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1 font-display">
                  {cat.category}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 glass-card border-white/5 rounded-3xl p-6 flex flex-col gap-4">
            <h3 className="font-display font-semibold text-base text-gray-400 mb-2 uppercase tracking-wider">
              Skills Checklist
            </h3>
            
            <div className="flex flex-col gap-2.5">
              {currentCategory?.skills.map((skill) => (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSkill?.name === skill.name
                      ? `bg-white/5 ${themeStyle.borderActive} shadow-lg ${themeStyle.glow}`
                      : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${selectedSkill?.name === skill.name ? `${themeStyle.dot} animate-ping` : 'bg-gray-600'}`} />
                    <span className={`text-xs md:text-sm font-medium ${selectedSkill?.name === skill.name ? 'text-white font-semibold' : 'text-gray-300'}`}>
                      {skill.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-16 md:w-24 bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${activeTheme === 'emerald' ? 'from-emerald-500 to-teal-500' : activeTheme === 'indigo' ? 'from-indigo-500 to-blue-500' : 'from-purple-500 to-indigo-500'} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className={`text-[11px] md:text-xs font-mono ${themeStyle.text} font-bold min-w-[30px] text-right`}>
                      {skill.level}%
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 glass-card border-white/5 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold border ${themeStyle.badge}`}>
                    SKILL METRIC
                  </span>
                  <h4 className="font-display font-extrabold text-xl md:text-2xl text-white mt-2">
                    {selectedSkill ? selectedSkill.name : 'Select a Skill'}
                  </h4>
                </div>
                {selectedSkill && (
                  <CircularProgress level={selectedSkill.level} activeTheme={activeTheme} />
                )}
              </div>

              {selectedSkill && (
                <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                    {selectedSkill.info}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h5 className="text-[11px] uppercase tracking-wider font-mono text-gray-500 mb-3">
                  Applied Competence
                </h5>
                <EditableList
                  items={currentCategory?.highlights || []}
                  onChange={(v) => {
                    const idx = categories.findIndex((c) => c.category === activeCat);
                    if (idx >= 0) updateCategory(idx, 'highlights', v);
                  }}
                  className="flex flex-col gap-2.5"
                  itemClass="flex items-start gap-2.5 text-xs text-gray-400"
                  bullet="▹"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[11px] text-gray-500 font-mono">
                Category: {currentCategory?.category}
              </span>
              <a
                href="#projects"
                className={`text-xs ${themeStyle.text} hover:opacity-80 font-semibold flex items-center gap-1 hover:underline transition-colors`}
              >
                Inspect Projects <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
