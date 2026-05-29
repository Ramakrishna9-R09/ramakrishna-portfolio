import { Calendar, MapPin, GraduationCap, Star } from 'lucide-react';

interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  duration: string;
  metricLabel: string;
  metricValue: string;
  highlights: string[];
}

export default function EducationTimeline() {
  const educationData: EducationItem[] = [
    {
      institution: 'Vellore Institute of Technology (VIT)',
      location: 'Chennai, India',
      degree: 'Integrated M.Tech in Software Engineering',
      duration: '2022 -- 2027',
      metricLabel: 'CGPA',
      metricValue: '8.27/10',
      highlights: [
        '15 Years Full-Time Education milestone',
        'Specialized coursework: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, DBMS, Software Engineering, Cloud Computing'
      ]
    },
    {
      institution: 'Saraswathi Junior College',
      location: 'Ongole, India',
      degree: 'Intermediate (Class XII)',
      duration: '2020 -- 2022',
      metricLabel: 'Board Score',
      metricValue: '97%',
      highlights: [
        'Advanced MPC curriculum (Mathematics, Physics, Chemistry)',
        'Academic Excellence recognition for scoring 97% overall'
      ]
    },
    {
      institution: 'Apex High School',
      location: 'Ongole, India',
      degree: 'Secondary School (Class X)',
      duration: '2019 -- 2020',
      metricLabel: 'State Board Score',
      metricValue: '98%',
      highlights: [
        'Top 1% score in Class X examinations',
        'Demonstrated strong foundation in STEM disciplines'
      ]
    }
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-black/80">
      <div className="absolute inset-0 z-0 bg-grid opacity-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] purple-horizon" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Academic Timeline
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Professional education history, outlining academic tracks and major test scores.
          </p>
        </div>

        {/* Timeline Line container */}
        <div className="relative border-l border-white/10 pl-6 md:pl-10 ml-4 md:ml-6 flex flex-col gap-12">
          {educationData.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Indicator Dot */}
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-[3px] border-purple-500 shadow-md shadow-purple-500/50 group-hover:scale-125 transition-transform" />

              {/* Glowing vertical beam snippet (optional effect) */}
              <div className="absolute -left-[30px] md:-left-[46px] top-7 bottom-0 w-[1px] bg-gradient-to-b from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="glass-card border-white/5 rounded-3xl p-6 md:p-8 hover:border-purple-500/25 transition-all">
                {/* Upper bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                    <h3 className="font-display font-extrabold text-lg md:text-xl text-white group-hover:text-purple-300 transition-colors">
                      {item.institution}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-purple-400 font-semibold font-mono bg-purple-500/10 border border-purple-500/15 px-3 py-1 rounded-full w-max">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.duration}
                  </span>
                </div>

                {/* Degree / Location */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs md:text-sm text-gray-400 mb-6 font-medium">
                  <span className="text-white font-semibold">{item.degree}</span>
                  <span className="text-gray-600">|</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    {item.location}
                  </span>
                </div>

                {/* Score & Highlights Split */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/5">
                  {/* Score Column */}
                  <div className="md:col-span-3 flex md:flex-col justify-between md:justify-center items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="text-center md:mb-1">
                      <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">
                        {item.metricLabel}
                      </p>
                      <p className="text-2xl font-black font-display text-white mt-1">
                        {item.metricValue}
                      </p>
                    </div>
                    <Star className="w-5 h-5 text-amber-500/80 animate-pulse hidden md:block mt-2" />
                  </div>

                  {/* Highlights Column */}
                  <div className="md:col-span-9 flex flex-col justify-center">
                    <ul className="flex flex-col gap-2.5">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-400">
                          <span className="text-purple-400 mt-1">▹</span>
                          <span className="leading-relaxed font-sans">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
