import { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';
import { loadData, saveData } from '../data/resumeData';
import { useEditMode } from '../context/EditModeContext';
import { EditableText, EditableList } from './EditableField';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  highlights: string[];
  technologies: string[];
}

const defaultExperience: ExperienceItem[] = [
  {
    title: 'Open to Opportunities',
    company: 'Seeking Software Engineering / Full-Stack / Cloud Roles',
    location: 'Pan India (Pune / Bangalore / Hyderabad / Chennai)',
    duration: '2027 (Graduating)',
    type: 'Full-Time',
    highlights: [
      'Actively seeking Software Engineering, Backend, or Cloud roles starting July 2027',
      'Specializing in Python, AWS Serverless, and GenAI/Agentic Systems',
      '7 industry certifications including MongoDB, Anthropic Claude API, and OCI AI Foundations',
      '4 production-grade projects with quantified impact metrics',
    ],
    technologies: ['Python', 'AWS', 'React', 'MongoDB', 'TypeScript', 'Docker', 'Node.js', 'GenAI'],
  },
];

export default function Experience() {
  const { pendingChanges, setPendingChanges } = useEditMode();
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => loadData('experience', defaultExperience));

  useEffect(() => {
    if (pendingChanges) {
      saveData('experience', experiences);
      setPendingChanges(false);
    }
  }, [pendingChanges]);

  const updateExp = (idx: number, field: string, value: any) => {
    const next = [...experiences];
    (next[idx] as any)[field] = value;
    setExperiences(next);
    setPendingChanges(true);
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 z-0 bg-grid opacity-20" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70%] h-[350px] purple-horizon" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Career Signal
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Availability, focus areas, and hiring-ready proof points for backend, cloud, full-stack, and AI engineering teams.
          </p>
        </div>

        {/* Availability Banner */}
        <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Available for High-Ownership Engineering Roles</h3>
              <p className="text-sm text-gray-400">Graduating 2027 | Backend, Cloud, AI Systems, Full-Stack</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Actively Looking</span>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="glass-card border-white/5 rounded-3xl p-6 md:p-8 hover:border-purple-500/25 transition-all">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <EditableText value={exp.title} onChange={(v) => updateExp(idx, 'title', v)} className="font-display font-bold text-xl text-white" tag="h3" />
                    <EditableText value={exp.company} onChange={(v) => updateExp(idx, 'company', v)} className="text-purple-400 text-sm font-medium" tag="p" />
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-purple-400" /> {exp.duration}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-500" /> {exp.location}</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">{exp.type}</span>
                </div>
              </div>

              <EditableList
                items={exp.highlights}
                onChange={(v) => updateExp(idx, 'highlights', v)}
                className="flex flex-col gap-3 mb-6"
                itemClass="flex items-start gap-3 text-sm text-gray-300"
                bullet="▸"
              />

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((t) => (
                  <span key={t} className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-white/5 text-gray-300 border border-white/5">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Achievements */}
        <div className="mt-12 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
          <h3 className="font-display font-bold text-sm text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            Key Achievements That Set Me Apart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'AWS Serverless at Scale', desc: 'Reduced API latency by 20% through Lambda caching and event-driven pipeline optimization in StudyMate' },
              { title: 'IoT Reliability Engineering', desc: 'Boosted system reliability by 40% using multi-threaded Python on Linux for real-time CNN classification' },
              { title: 'MongoDB Query Optimization', desc: 'Improved database performance by 20% through index tuning and aggregation pipeline design' },
              { title: 'Anthropic API Pioneer', desc: 'One of the earliest certified Claude API, MCP, and Agent Skills developers in India (May 2026)' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all">
                <h4 className="font-display font-bold text-white text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
