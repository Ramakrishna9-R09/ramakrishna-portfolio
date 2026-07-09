import { useState, useEffect, type MouseEvent } from 'react';
import { Folder, ArrowRight, X, Sparkles, Layers, Calendar, Cpu, Shield, Database, Layout, Play, Gauge, ExternalLink, CheckCircle2 } from 'lucide-react';
import { getProjectsData, saveData } from '../data/resumeData';
import type { ResumeProject } from '../data/resumeData';
import { useEditMode } from '../context/EditModeContext';
import { EditableText, EditableTextArea, EditableList } from './EditableField';

export default function Projects() {
  const { isEditMode, pendingChanges, setPendingChanges } = useEditMode();
  const [projectsData, setProjectsData] = useState<ResumeProject[]>(() => getProjectsData());
  const [activeProject, setActiveProject] = useState<ResumeProject | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', subtitle: '', year: '', technologies: '', github: '', architectureDetails: '', bulletPoints: '' });

  useEffect(() => {
    if (pendingChanges) {
      saveData('projects', projectsData);
      setPendingChanges(false);
    }
  }, [pendingChanges]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const renderIcon = (icon: string) => {
    const classVal = "w-4 h-4 text-purple-400";
    if (icon === 'shield') return <Shield className={classVal} />;
    if (icon === 'db') return <Database className={classVal} />;
    if (icon === 'layout') return <Layout className={classVal} />;
    if (icon === 'play') return <Play className={classVal} />;
    return <Cpu className={classVal} />;
  };

  const updateProject = (idx: number, field: string, value: any) => {
    const next = [...projectsData];
    (next[idx] as any)[field] = value;
    setProjectsData(next);
    setPendingChanges(true);
  };

  const updateMetric = (pIdx: number, mIdx: number, field: string, value: string) => {
    const next = [...projectsData];
    next[pIdx].metrics[mIdx] = { ...next[pIdx].metrics[mIdx], [field]: value };
    setProjectsData(next);
    setPendingChanges(true);
  };

  const addProject = () => {
    const techs = newProject.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const bps = newProject.bulletPoints.split('\n').filter(Boolean);
    const project: ResumeProject = {
      title: newProject.title || 'New Project',
      subtitle: newProject.subtitle || '',
      year: newProject.year || new Date().getFullYear().toString(),
      technologies: techs,
      metrics: [{ label: 'Metric', value: 'Value' }],
      bulletPoints: bps,
      architecture: newProject.architectureDetails,
      github: newProject.github,
      architectureDetails: newProject.architectureDetails,
      nodes: [{ label: 'Node', icon: 'cpu' }],
    };
    setProjectsData([...projectsData, project]);
    setNewProject({ title: '', subtitle: '', year: '', technologies: '', github: '', architectureDetails: '', bulletPoints: '' });
    setShowAddForm(false);
    setPendingChanges(true);
  };

  const removeProject = (idx: number) => {
    setProjectsData(projectsData.filter((_, i) => i !== idx));
    setPendingChanges(true);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black/80">
      <div className="absolute inset-0 z-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[70%] h-[300px] purple-horizon" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Production Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Engineering Case Studies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Four shipped systems, each framed around architecture, measurable impact, and the parts a hiring manager actually needs to evaluate.
          </p>
        </div>

        {isEditMode && (
          <div className="mb-6">
            <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold mb-4 cursor-pointer">
              {showAddForm ? 'Cancel' : '+ Add Project'}
            </button>
            {showAddForm && (
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20 mb-4 flex flex-col gap-2">
                <input type="text" placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm" />
                <input type="text" placeholder="Subtitle" value={newProject.subtitle} onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm" />
                <input type="text" placeholder="Year" value={newProject.year} onChange={(e) => setNewProject({ ...newProject, year: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm" />
                <input type="text" placeholder="Technologies (comma separated)" value={newProject.technologies} onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm" />
                <input type="text" placeholder="GitHub URL" value={newProject.github} onChange={(e) => setNewProject({ ...newProject, github: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm" />
                <textarea placeholder="Architecture details" value={newProject.architectureDetails} onChange={(e) => setNewProject({ ...newProject, architectureDetails: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm resize-y min-h-[60px]" />
                <textarea placeholder="Bullet points (one per line)" value={newProject.bulletPoints} onChange={(e) => setNewProject({ ...newProject, bulletPoints: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm resize-y min-h-[60px]" />
                <button onClick={addProject} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer">Create Project</button>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              style={{
                background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.09), rgba(244, 244, 245, 0.025), transparent), rgba(255, 255, 255, 0.02)'
              }}
              className={`glass-card border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 relative group overflow-hidden ${idx === 0 ? 'md:col-span-2 lg:grid lg:grid-cols-[1fr_0.72fr] lg:gap-8' : ''}`}
            >
              <div>
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Folder className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-purple-300 font-mono">
                        Case Study 0{idx + 1}
                      </span>
                      <p className="text-[11px] text-gray-500 mt-1">Architecture, metrics, source</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditMode && (
                      <button onClick={() => removeProject(idx)} className="text-white/70 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10">Delete</button>
                    )}
                    <span className="text-xs text-gray-500 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <EditableText value={project.year} onChange={(v) => updateProject(idx, 'year', v)} tag="span" />
                    </span>
                  </div>
                </div>

                <EditableText value={project.title} onChange={(v) => updateProject(idx, 'title', v)} className="font-display font-extrabold text-2xl md:text-3xl text-white group-hover:text-purple-300 transition-colors mb-2" tag="h3" />
                <EditableText value={project.subtitle} onChange={(v) => updateProject(idx, 'subtitle', v)} className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed max-w-2xl" tag="p" />

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-400 font-bold border border-purple-500/15">
                      +{project.technologies.length - 4} More
                    </span>
                  )}
                  {isEditMode && (
                    <EditableText value={project.technologies.join(', ')} onChange={(v) => updateProject(idx, 'technologies', v.split(',').map(t => t.trim()).filter(Boolean))} className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20" tag="span" />
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      {isEditMode ? (
                        <div className="flex flex-col gap-1">
                          <input type="text" value={metric.value} onChange={(e) => updateMetric(idx, i, 'value', e.target.value)} className="bg-white/10 border border-purple-500/40 rounded px-1 py-0.5 text-white text-sm text-center" />
                          <input type="text" value={metric.label} onChange={(e) => updateMetric(idx, i, 'label', e.target.value)} className="bg-white/10 border border-purple-500/40 rounded px-1 py-0.5 text-gray-400 text-xs text-center" />
                        </div>
                      ) : (
                        <>
                          <p className="text-lg md:text-xl font-bold font-display text-white">{metric.value}</p>
                          <p className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">{metric.label}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mb-6 rounded-2xl bg-black/35 border border-white/5 p-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-gray-500 font-mono mb-3">
                    <Gauge className="w-3.5 h-3.5 text-purple-400" />
                    System Summary
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {project.architectureDetails}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/5 self-end w-full">
                <button
                  onClick={() => setActiveProject(project)}
                  className="flex-1 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/15"
                >
                  Inspect Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-pill border border-white/10 text-gray-300 hover:text-white flex items-center justify-center hover:scale-105"
                  title="Source Code"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/85 backdrop-blur-md transition-opacity">
            <div className="w-full max-w-2xl h-full bg-neutral-950 border-l border-white/15 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-white/15 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
                    <span className="text-xs uppercase font-mono tracking-wider text-gray-500">PROJECT PROFILE</span>
                  </div>
                  <button onClick={() => setActiveProject(null)} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <EditableText value={activeProject.title} onChange={(v) => updateProject(projectsData.indexOf(activeProject), 'title', v)} className="font-display font-black text-3xl text-white mb-2" tag="h3" />
                <EditableText value={activeProject.subtitle} onChange={(v) => updateProject(projectsData.indexOf(activeProject), 'subtitle', v)} className="text-purple-400 text-sm font-semibold mb-6" tag="p" />

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {activeProject.metrics.map((metric) => (
                    <div key={`${metric.label}-${metric.value}`} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-center">
                      <p className="text-lg font-black text-white font-display">{metric.value}</p>
                      <p className="text-[9px] uppercase tracking-wider text-gray-500">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-8 p-5 rounded-2xl bg-white/[0.01] border border-white/10">
                  <h4 className="font-display font-bold text-xs text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" /> Interactive Flow Pipeline
                  </h4>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 py-4 overflow-x-auto text-[11px] font-mono">
                    {activeProject.nodes.map((node, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="glass-card px-4 py-3 rounded-xl border border-purple-500/20 text-white flex flex-col items-center gap-1.5 min-w-[100px] text-center bg-white/5">
                          {renderIcon(node.icon)}
                          <span>{node.label}</span>
                        </div>
                        {i < activeProject.nodes.length - 1 && (
                          <span className="text-purple-500 animate-pulse text-lg hidden sm:inline">➜</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" /> Key Engineering Actions
                  </h4>
                  <EditableList
                    items={activeProject.bulletPoints}
                    onChange={(v) => updateProject(projectsData.indexOf(activeProject), 'bulletPoints', v)}
                    className="flex flex-col gap-3.5 pl-1.5"
                    itemClass="flex items-start gap-3 text-xs md:text-sm text-gray-300"
                    bullet="✓"
                  />
                </div>

                <div className="mb-8 p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/15">
                  <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recruiter Signal
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    This project demonstrates implementation ownership across architecture, testing, performance tuning, and source-control discipline rather than only UI presentation.
                  </p>
                </div>

                <div className="mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" /> Systems Architecture
                  </h4>
                  <EditableTextArea
                    value={activeProject.architectureDetails}
                    onChange={(v) => updateProject(projectsData.indexOf(activeProject), 'architectureDetails', v)}
                    className="text-xs text-gray-400 leading-relaxed font-mono"
                  />
                </div>

                <div className="mb-8">
                  <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider mb-3">
                    Engine Components
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((t) => (
                      <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/5">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/15 flex gap-4">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all text-center flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  View GitHub Source
                </a>
                <button onClick={() => setActiveProject(null)} className="px-6 py-4 rounded-xl glass-pill hover:bg-white/10 text-xs font-bold text-white border border-white/10">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
