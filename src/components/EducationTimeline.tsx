import { useState, useEffect } from 'react';
import { MapPin, GraduationCap, Star } from 'lucide-react';
import { getEducationData, saveData } from '../data/resumeData';
import { useEditMode } from '../context/EditModeContext';
import { EditableText, EditableList } from './EditableField';

interface EducationDisplayItem {
  institution: string;
  location: string;
  degree: string;
  duration: string;
  metricLabel: string;
  metricValue: string;
  highlights: string[];
}

export default function EducationTimeline() {
  const { isEditMode, pendingChanges, setPendingChanges } = useEditMode();
  const [education, setEducation] = useState<EducationDisplayItem[]>(() => {
    const raw = getEducationData();
    return raw.map((e: any) => ({
      institution: e.institution,
      location: e.location,
      degree: e.degree,
      duration: e.duration,
      metricLabel: e.metricLabel || e.metric?.label || '',
      metricValue: e.metricValue || e.metric?.value || '',
      highlights: e.highlights || [],
    }));
  });

  useEffect(() => {
    if (pendingChanges) {
      saveData('education', education);
      setPendingChanges(false);
    }
  }, [pendingChanges]);

  const updateItem = (idx: number, field: string, value: any) => {
    const next = [...education];
    (next[idx] as any)[field] = value;
    setEducation(next);
    setPendingChanges(true);
  };

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-black/80">
      <div className="absolute inset-0 z-0 bg-grid opacity-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] purple-horizon" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Academic Timeline
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Professional education history, outlining academic tracks and major test scores.
          </p>
        </div>

        <div className="relative border-l border-white/10 pl-6 md:pl-10 ml-4 md:ml-6 flex flex-col gap-12">
          {education.map((item, idx) => (
            <div key={idx} className="relative group">
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-[3px] border-purple-500 shadow-md shadow-purple-500/50 group-hover:scale-125 transition-transform" />
              <div className="absolute -left-[30px] md:-left-[46px] top-7 bottom-0 w-[1px] bg-gradient-to-b from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="glass-card border-white/5 rounded-3xl p-6 md:p-8 hover:border-purple-500/25 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                    <EditableText value={item.institution} onChange={(v) => updateItem(idx, 'institution', v)} className="font-display font-extrabold text-lg md:text-xl text-white group-hover:text-purple-300 transition-colors" tag="h3" />
                  </div>
                  <EditableText value={item.duration} onChange={(v) => updateItem(idx, 'duration', v)} className="inline-flex items-center gap-1 text-xs text-purple-400 font-semibold font-mono bg-purple-500/10 border border-purple-500/15 px-3 py-1 rounded-full w-max" tag="span" />
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs md:text-sm text-gray-400 mb-6 font-medium">
                  <EditableText value={item.degree} onChange={(v) => updateItem(idx, 'degree', v)} className="text-white font-semibold" tag="span" />
                  <span className="text-gray-600">|</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <EditableText value={item.location} onChange={(v) => updateItem(idx, 'location', v)} tag="span" />
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/5">
                  <div className="md:col-span-3 flex md:flex-col justify-between md:justify-center items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="text-center md:mb-1">
                      <EditableText value={item.metricLabel} onChange={(v) => updateItem(idx, 'metricLabel', v)} className="text-[10px] uppercase font-mono tracking-wider text-gray-500" tag="p" />
                      {isEditMode ? (
                        <input type="text" value={item.metricValue} onChange={(e) => updateItem(idx, 'metricValue', e.target.value)} className="text-2xl font-black font-display text-white mt-1 bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-center w-full" />
                      ) : (
                        <p className="text-2xl font-black font-display text-white mt-1">{item.metricValue}</p>
                      )}
                    </div>
                    <Star className="w-5 h-5 text-amber-500/80 animate-pulse hidden md:block mt-2" />
                  </div>

                  <div className="md:col-span-9 flex flex-col justify-center">
                    <EditableList
                      items={item.highlights}
                      onChange={(v) => updateItem(idx, 'highlights', v)}
                      className="flex flex-col gap-2.5"
                      itemClass="flex items-start gap-2.5 text-xs md:text-sm text-gray-400"
                      bullet="▹"
                    />
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
