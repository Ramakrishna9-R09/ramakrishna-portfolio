import { useState, type MouseEvent } from 'react';
import { Folder, ArrowRight, X, Sparkles, Layers, Calendar, Cpu, Shield, Database, Layout, Play } from 'lucide-react';

interface ProjectDetail {
  title: string;
  subtitle: string;
  year: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
  architectureDetails: string;
  githubUrl: string;
  nodes: { label: string; icon: 'user' | 'cpu' | 'shield' | 'db' | 'layout' | 'play' }[];
}

export default function Projects() {
  const projectsData: ProjectDetail[] = [
    {
      title: 'StudyMate',
      subtitle: 'AI-Powered Serverless Notes Application',
      year: '2024',
      technologies: ['Python', 'AWS Lambda', 'S3', 'API Gateway', 'Cognito', 'CloudWatch', 'GenAI'],
      metrics: [
        { label: 'Latency Reduction', value: '20%' },
        { label: 'LLM Features', value: '5 Modules' },
        { label: 'Testing Coverage', value: '100% Pytest' }
      ],
      bulletPoints: [
        'Designed and coded a production-grade serverless AI application in Python on AWS, delivering 5 LLM-integrated features — MCQ generation, Summarization, Flashcards, Mindmaps, and Detailed Notes.',
        'Developed clean, maintainable Python Lambda functions forming an event-driven pipeline (Lambda ➔ API Gateway ➔ S3 ➔ EC2) with prompt engineering for consistent, structured AI output.',
        'Optimised code-level performance and cloud resource tuning to reduce API latency by 20%; implemented AWS Cognito authentication and CloudWatch monitoring.',
        'Executed end-to-end unit testing across all Python AI feature modules before deployment, ensuring software quality and reliability at scale.'
      ],
      architectureDetails: 'Event-driven serverless architecture using API Gateway for REST endpoints, Cognito for client JWT-based validation, S3 for storing document files, Lambda for execution (with Python cold start tunings), and prompt-engineered LLM engines for markdown output parser.',
      githubUrl: 'https://github.com/Ramakrishna9-R09/StudyMate',
      nodes: [
        { label: 'Client App', icon: 'layout' },
        { label: 'Cognito JWT', icon: 'shield' },
        { label: 'API Gateway', icon: 'play' },
        { label: 'AWS Lambda', icon: 'cpu' },
        { label: 'S3 & GenAI', icon: 'db' }
      ]
    },
    {
      title: 'IoT Scalp Disease Detection',
      subtitle: 'Edge AI Classification Hardware Pipeline',
      year: '2023 - 2024',
      technologies: ['Python', 'Pytest', 'CNN', 'Embedded C++', 'ESP32-CAM', 'Linux'],
      metrics: [
        { label: 'Reliability Increase', value: '40%' },
        { label: 'Resolved Bugs', value: '5+ Core' },
        { label: 'Unit Tests', value: 'Pytest Suite' }
      ],
      bulletPoints: [
        'Authored Python automation scripts integrating a CNN deep learning model into an embedded hardware pipeline, enabling intelligent real-time disease classification.',
        'Designed and executed Pytest-based automated test suites for sensor data validation and pipeline integrity.',
        'Implemented multi-threaded concurrent processing in Python on Linux/Ubuntu; resolved 5+ hardware-software integration bugs through systematic root cause analysis.',
        'Documented software design decisions and integration processes to facilitate team understanding and future maintenance.'
      ],
      architectureDetails: 'Embedded hardware pipeline connecting ESP32-CAM video stream over sockets to a local Linux host server running a concurrent Python classifier. Multi-threading is utilized to handle camera frames in thread A and execute TensorFlow/CNN classification on thread B without UI stutter.',
      githubUrl: 'https://github.com/Ramakrishna9-R09/IoT-Scalp-Disease',
      nodes: [
        { label: 'ESP32 Cam', icon: 'layout' },
        { label: 'Sockets IO', icon: 'play' },
        { label: 'Linux Worker', icon: 'cpu' },
        { label: 'CNN Model', icon: 'db' },
        { label: 'Pytest Logs', icon: 'shield' }
      ]
    },
    {
      title: 'VIT Connect',
      subtitle: 'Full-Stack Student Community Platform',
      year: '2023',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git', 'Agile'],
      metrics: [
        { label: 'Query Performance', value: '+20%' },
        { label: 'Agile Team', value: '4 Members' },
        { label: 'Auth Token', value: 'JWT Standard' }
      ],
      bulletPoints: [
        'Designed and built a full-stack MERN application with component-based architecture, RESTful backend APIs, and MongoDB NoSQL storage.',
        'Optimised MongoDB query performance by 20% through indexing and aggregation pipeline tuning.',
        'Led a 4-member Agile team through sprint planning, daily stand-ups, and Git-based peer code reviews.',
        'Managed the full codebase using Git version control, enforcing branching strategies and review workflows to ensure team-level maintainability.'
      ],
      architectureDetails: 'Standard MERN (MongoDB, Express, React, Node) architecture. Focused heavily on database scalability. Handled complex feeds and community metrics through customized MongoDB aggregate queries and compound indexing on posts and user tags.',
      githubUrl: 'https://github.com/Ramakrishna9-R09/VIT-Connect',
      nodes: [
        { label: 'React SPA', icon: 'layout' },
        { label: 'JWT Guard', icon: 'shield' },
        { label: 'Express Router', icon: 'play' },
        { label: 'MongoDB Index', icon: 'db' }
      ]
    },
    {
      title: 'HR Workflow Designer',
      subtitle: 'Type-Safe Drag & Drop Automation GUI',
      year: '2024 - Present',
      technologies: ['TypeScript', 'React.js', 'Node.js', 'Express.js', 'REST APIs', 'Git'],
      metrics: [
        { label: 'Frontend Safety', value: '100% Type-Safe' },
        { label: 'UI Library', value: 'Dnd-Kit' },
        { label: 'State Sync', value: 'Client/Server' }
      ],
      bulletPoints: [
        'Architected a type-safe full-stack workflow automation tool with drag-and-drop React.js frontend and Node.js/Express.js backend.',
        'Applied modular architecture, clean code principles, and comprehensive documentation to build scalable, high-performing components.',
        'Applied agile development practices, Git version control, and iterative sprint-based delivery.'
      ],
      architectureDetails: 'Type-safe React flow-editor utilizing React hooks and TypeScript schemas. Backend handles layout validations and schema mapping via Node Express server, storing workflow graphs in standard JSON trees.',
      githubUrl: 'https://github.com/Ramakrishna9-R09/HR-Workflow-Designer',
      nodes: [
        { label: 'React Flow GUI', icon: 'layout' },
        { label: 'Node API Shield', icon: 'shield' },
        { label: 'JSON validation', icon: 'play' },
        { label: 'Local Store', icon: 'db' }
      ]
    }
  ];

  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  // Dynamic card border mouse tracker
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const renderIcon = (type: 'user' | 'cpu' | 'shield' | 'db' | 'layout' | 'play') => {
    const classVal = "w-4 h-4 text-purple-400";
    if (type === 'shield') return <Shield className={classVal} />;
    if (type === 'db') return <Database className={classVal} />;
    if (type === 'layout') return <Layout className={classVal} />;
    if (type === 'play') return <Play className={classVal} />;
    return <Cpu className={classVal} />;
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black/80">
      <div className="absolute inset-0 z-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[70%] h-[300px] purple-horizon" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Engineering Showcases
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            A selection of production-grade systems built during Integrated M.Tech studies, emphasizing backend optimization, Cloud, IoT, and AI agents.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              style={{
                background: 'radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(168, 85, 247, 0.08), transparent), rgba(255, 255, 255, 0.02)'
              }}
              className="glass-card border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 relative group overflow-hidden"
            >
              <div>
                {/* Upper bar */}
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Folder className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-500 font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    {project.year}
                  </span>
                </div>

                {/* Info */}
                <h3 className="font-display font-extrabold text-2xl text-white group-hover:text-purple-300 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-white/5 text-gray-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-purple-500/10 text-purple-400 font-bold border border-purple-500/15">
                      +{project.technologies.length - 4} More
                    </span>
                  )}
                </div>

                {/* Highlight Metrics */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <p className="text-lg md:text-xl font-bold font-display text-white">
                        {metric.value}
                      </p>
                      <p className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={() => setActiveProject(project)}
                  className="flex-1 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/15"
                >
                  Inspect Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-pill border border-white/10 text-gray-300 hover:text-white flex items-center justify-center hover:scale-105"
                  title="Source Code"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Drawer */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/85 backdrop-blur-md transition-opacity">
            <div className="w-full max-w-2xl h-full bg-neutral-950 border-l border-white/15 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Header */}
                <div className="flex justify-between items-center pb-6 border-b border-white/15 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
                    <span className="text-xs uppercase font-mono tracking-wider text-gray-500">
                      PROJECT PROFILE
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-display font-black text-3xl text-white mb-2">
                  {activeProject.title}
                </h3>
                <p className="text-purple-400 text-sm font-semibold mb-6">
                  {activeProject.subtitle}
                </p>

                {/* Visual Systems Architecture Flow Node Diagram */}
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

                {/* Accomplishments */}
                <div className="mb-8">
                  <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" /> Key Engineering Actions
                  </h4>
                  <ul className="flex flex-col gap-3.5 pl-1.5">
                    {activeProject.bulletPoints.map((bp, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-gray-300">
                        <span className="text-purple-500 font-bold mt-1">✓</span>
                        <span className="leading-relaxed font-sans">{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Architecture */}
                <div className="mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" /> Systems Architecture
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-mono">
                    {activeProject.architectureDetails}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="mb-8">
                  <h4 className="font-display font-bold text-sm text-gray-300 uppercase tracking-wider mb-3">
                    Engine Components
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-white/15 flex gap-4">
                <a
                  href={activeProject.githubUrl}
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
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-4 rounded-xl glass-pill hover:bg-white/10 text-xs font-bold text-white border border-white/10"
                >
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
