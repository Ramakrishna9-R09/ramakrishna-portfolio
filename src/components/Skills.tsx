import { useState, type ReactNode } from 'react';
import { Cpu, Server, Database, Code2, Award, ArrowUpRight } from 'lucide-react';

interface SkillItem {
  name: string;
  level: number; // 0 to 100
  info: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  colorClass: string;
  skills: SkillItem[];
  highlights: string[];
}

interface SkillsProps {
  activeTheme?: 'purple' | 'emerald' | 'indigo';
}

function CircularProgress({ level, activeTheme }: { level: number; activeTheme: 'purple' | 'emerald' | 'indigo' }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  const themeColors = {
    purple: { stroke: 'url(#skills-purple-grad)', text: 'text-purple-400', glow: 'rgba(168, 85, 247, 0.4)' },
    emerald: { stroke: 'url(#skills-emerald-grad)', text: 'text-emerald-400', glow: 'rgba(16, 185, 129, 0.4)' },
    indigo: { stroke: 'url(#skills-indigo-grad)', text: 'text-indigo-400', glow: 'rgba(99, 102, 241, 0.4)' }
  };

  const currentTheme = themeColors[activeTheme] || themeColors.purple;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center select-none animate-float">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="skills-purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="skills-emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="skills-indigo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="skills-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Track Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-white/[0.04] fill-none"
          strokeWidth="5"
        />
        
        {/* Gauge Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="fill-none transition-all duration-1000 ease-out"
          stroke={currentTheme.stroke}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter="url(#skills-glow)"
        />
      </svg>
      {/* Central label */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-mono text-lg font-black text-white leading-none">
          {level}%
        </span>
        <span className="text-[7px] font-mono tracking-wider text-gray-500 uppercase mt-0.5">
          Mastery
        </span>
      </div>
    </div>
  );
}

export default function Skills({ activeTheme = 'purple' }: SkillsProps) {
  const categories: SkillCategory[] = [
    {
      id: 'genai',
      title: 'GenAI & Agentic Systems',
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      description: 'Designing autonomous agents, LLM tool integration, and model coordination.',
      colorClass: 'shadow-purple-500/10 border-purple-500/20 border-t-purple-500/50',
      skills: [
        { name: 'Claude API Integration', level: 95, info: 'Certified by Anthropic in Anthropic Claude API.' },
        { name: 'Model Context Protocol (MCP)', level: 90, info: 'Certified in MCP. Creating custom host-client tools.' },
        { name: 'Agent Skills Framework', level: 90, info: 'Anthropic Certified. Tool-use pipelines, agentic planning.' },
        { name: 'RAG Architecture', level: 85, info: 'Retrieval-Augmented Generation for semantic document querying.' },
        { name: 'Convolutional Neural Networks (CNN)', level: 80, info: 'Deep learning classification models for image/sensor analysis.' },
      ],
      highlights: [
        'Anthropic Claude API & Agent Skills Certified',
        'Built StudyMate - serverless RAG AI document platform',
        'Integrated custom CNN models onto embedded ESP32-CAM systems'
      ]
    },
    {
      id: 'python',
      title: 'Python & Software Engineering',
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      description: 'Writing clean, high-performance, object-oriented production software.',
      colorClass: 'shadow-blue-500/10 border-blue-500/20 border-t-blue-500/50',
      skills: [
        { name: 'Object-Oriented Programming', level: 95, info: 'Class hierarchies, polymorphism, solid clean code.' },
        { name: 'Pytest (Automated Testing)', level: 90, info: 'Developing comprehensive test suites and mock tests.' },
        { name: 'Multi-threaded Concurrency', level: 85, info: 'Parallel background workers on Linux/Ubuntu.' },
        { name: 'Debugging & Root Cause Analysis', level: 90, info: 'Systematic troubleshooting to resolve integration bugs.' },
        { name: 'Java, JavaScript (ES6+), C', level: 80, info: 'Broad foundational coding capability.' }
      ],
      highlights: [
        'Optimized system reliability by 40% using concurrent threading structures',
        'Authored robust automated test suites checking sensor feeds',
        'Continuous reviewer enforcing Git workflows and style guidelines'
      ]
    },
    {
      id: 'cloud',
      title: 'AWS Cloud & Backend',
      icon: <Server className="w-6 h-6 text-orange-400" />,
      description: 'Designing serverless, microservice-based backend systems.',
      colorClass: 'shadow-orange-500/10 border-orange-500/20 border-t-orange-500/50',
      skills: [
        { name: 'AWS Lambda (Serverless)', level: 90, info: 'Creating highly modular event-driven backend functions.' },
        { name: 'AWS Cognito (Auth)', level: 85, info: 'Secure authentication, user pool management, JWT.' },
        { name: 'AWS API Gateway & S3', level: 90, info: 'Hosting APIs and organizing media assets pipelines.' },
        { name: 'Node.js & Express.js', level: 85, info: 'REST API architectures and route handling.' },
        { name: 'Git & CI/CD Fundamentals', level: 85, info: 'Enforcing branching standards, review protocols, pull requests.' }
      ],
      highlights: [
        'Reduced server API latency by 20% using Lambda caching and optimization',
        'Constructed event-driven workflows mapping API Gateway -> S3 -> EC2',
        'Implemented type-safe workflow engines with TypeScript/React'
      ]
    },
    {
      id: 'databases',
      title: 'Databases & Storage',
      icon: <Database className="w-6 h-6 text-emerald-400" />,
      description: 'Structuring transactional and analytical NoSQL/SQL schemas.',
      colorClass: 'shadow-emerald-500/10 border-emerald-500/20 border-t-emerald-500/50',
      skills: [
        { name: 'MongoDB (NoSQL)', level: 95, info: 'Certified MongoDB Associate Developer.' },
        { name: 'Query Optimization & Indexing', level: 90, info: 'Creating indexes and optimizing compound query workloads.' },
        { name: 'Aggregation Pipelines', level: 90, info: 'Complex analytics queries and document restructuring.' },
        { name: 'DynamoDB', level: 85, info: 'AWS primary store schema designs.' },
        { name: 'PostgreSQL / MySQL', level: 80, info: 'Relational database schema structure and SQL queries.' }
      ],
      highlights: [
        'MongoDB Certified Associate Developer (Valid till May 2026)',
        'Sped up database queries by 20% using indexes and pipeline tuning',
        'Developed full stack MERN architectures with optimized data flow'
      ]
    }
  ];

  const [activeCat, setActiveCat] = useState<string>(categories[0].id);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(categories[0].skills[0]);

  const currentCategory = categories.find((c) => c.id === activeCat) || categories[0];

  const themeAccentClasses = {
    purple: {
      text: 'text-purple-400',
      bgLight: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      borderActive: 'border-purple-500/40',
      glow: 'shadow-purple-500/5',
      dot: 'bg-purple-400',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/20',
      horizon: 'purple-horizon'
    },
    emerald: {
      text: 'text-emerald-400',
      bgLight: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      borderActive: 'border-emerald-500/40',
      glow: 'shadow-emerald-500/5',
      dot: 'bg-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20',
      horizon: 'purple-horizon bg-emerald-500/25'
    },
    indigo: {
      text: 'text-indigo-400',
      bgLight: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      borderActive: 'border-indigo-500/40',
      glow: 'shadow-indigo-500/5',
      dot: 'bg-indigo-400',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/20',
      horizon: 'purple-horizon bg-indigo-500/25'
    }
  };

  const themeStyle = themeAccentClasses[activeTheme];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 z-0 bg-grid opacity-30" />
      <div className={`absolute top-[30%] left-1/2 -translate-x-1/2 w-[70%] h-[300px] transition-all duration-500 ${themeStyle.horizon}`} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Technical Arsenal
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Hover over categories and click on individual skills to inspect proficiency levels, descriptions, and projects where they were utilized.
          </p>
        </div>

        {/* Categories Tab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCat(cat.id);
                setSelectedSkill(cat.skills[0]);
              }}
              className={`text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-[150px] ${
                activeCat === cat.id
                  ? `glass-card border-t-2 ${cat.colorClass} scale-[1.02] bg-white/5`
                  : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between">
                {cat.icon}
                <Award className={`w-4 h-4 opacity-0 transition-opacity ${activeCat === cat.id ? `opacity-100 ${themeStyle.text}` : ''}`} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1 font-display">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Skill Viewer (Split-screen) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Skills Selection (Left) */}
          <div className="lg:col-span-7 glass-card border-white/5 rounded-3xl p-6 flex flex-col gap-4">
            <h3 className="font-display font-semibold text-base text-gray-400 mb-2 uppercase tracking-wider">
              Skills Checklist
            </h3>
            
            <div className="flex flex-col gap-2.5">
              {currentCategory.skills.map((skill) => (
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

          {/* Skill Analysis & Projects (Right) */}
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

              {/* Highlights List */}
              <div className="mb-6">
                <h5 className="text-[11px] uppercase tracking-wider font-mono text-gray-500 mb-3">
                  Applied Competence
                </h5>
                <ul className="flex flex-col gap-2.5">
                  {currentCategory.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-400">
                      <span className={`${themeStyle.text} mt-1`}>▹</span>
                      <span className="leading-relaxed font-sans">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[11px] text-gray-500 font-mono">
                Category: {currentCategory.title}
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
