import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
  isSpecial?: boolean;
}

export default function Certifications() {
  const certificationsData: Certification[] = [
    {
      title: 'MongoDB Certified Associate Developer',
      issuer: 'MongoDB',
      date: 'May 2026',
      verifyUrl: 'https://www.credly.com/users/venkata-ramakrishna.fe20e510',
      isSpecial: true
    },
    {
      title: 'Claude with the Anthropic API',
      issuer: 'Anthropic',
      date: 'May 2026',
      verifyUrl: 'https://verify.skilljar.com/c/y74wjp348erp',
      isSpecial: true
    },
    {
      title: 'Introduction to Model Context Protocol (MCP)',
      issuer: 'Anthropic',
      date: 'May 2026',
      verifyUrl: 'https://verify.skilljar.com/c/t832agpz7q82',
      isSpecial: true
    },
    {
      title: 'Introduction to Agent Skills',
      issuer: 'Anthropic',
      date: 'May 2026',
      verifyUrl: 'https://verify.skilljar.com/c/gj7g8nr79xug',
      isSpecial: true
    },
    {
      title: 'OCI 2025 Certified AI Foundations Associate',
      issuer: 'Oracle University',
      date: '2025',
      verifyUrl: 'https://education.oracle.com/',
      isSpecial: false
    },
    {
      title: 'Python Programming',
      issuer: 'Coursera',
      date: '2024',
      isSpecial: false
    },
    {
      title: 'Agile Scrum in Practice',
      issuer: 'Infosys Springboard',
      date: '2024',
      isSpecial: false
    }
  ];

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 z-0 bg-grid opacity-20" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70%] h-[350px] purple-horizon" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Industry Credentials
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Verified qualifications and technical achievements, highlighting certifications in NoSQL and advanced Agentic AI systems.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificationsData.map((cert, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-2xl p-5 border flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 relative group ${
                cert.isSpecial
                  ? 'border-purple-500/20 bg-purple-500/[0.01] hover:border-purple-500/40 shadow-lg shadow-purple-500/5'
                  : 'border-white/5 bg-white/[0.01] hover:border-white/10'
              }`}
            >
              <div>
                {/* Top Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-xl border ${
                    cert.isSpecial
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : 'bg-white/5 text-gray-400 border-white/5'
                  }`}>
                    <Award className="w-5 h-5" />
                  </div>
                  {cert.isSpecial && (
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/25 text-purple-300 font-extrabold border border-purple-500/20">
                      Elite GenAI
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-base md:text-lg text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-xs mb-4 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  {cert.issuer}
                </p>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-purple-500" />
                  {cert.date}
                </span>

                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 hover:underline transition-all"
                  >
                    Verify Credentials
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[10px] text-gray-500 font-mono italic">
                    Awarded
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
