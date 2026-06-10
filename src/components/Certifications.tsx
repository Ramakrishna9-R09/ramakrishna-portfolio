import { useState, useEffect } from 'react';
import { Award, ExternalLink, Calendar, CheckCircle2, Plus, X } from 'lucide-react';
import { getCertificationsData, saveData } from '../data/resumeData';
import { useEditMode } from '../context/EditModeContext';
import type { CertificationItem } from '../data/resumeData';

export default function Certifications() {
  const { isEditMode, pendingChanges, setPendingChanges } = useEditMode();
  const [certifications, setCertifications] = useState<CertificationItem[]>(() => getCertificationsData());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', verifyUrl: '', isSpecial: false });

  useEffect(() => {
    if (pendingChanges) {
      saveData('certifications', certifications);
      setPendingChanges(false);
    }
  }, [pendingChanges]);

  const updateCert = (idx: number, field: string, value: any) => {
    const next = [...certifications];
    (next[idx] as any)[field] = value;
    setCertifications(next);
    setPendingChanges(true);
  };

  const addCert = () => {
    if (!newCert.title || !newCert.issuer) return;
    setCertifications([...certifications, { ...newCert, isSpecial: newCert.isSpecial }]);
    setNewCert({ title: '', issuer: '', date: '', verifyUrl: '', isSpecial: false });
    setShowAddForm(false);
    setPendingChanges(true);
  };

  const removeCert = (idx: number) => {
    setCertifications(certifications.filter((_, i) => i !== idx));
    setPendingChanges(true);
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 z-0 bg-grid opacity-20" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70%] h-[350px] purple-horizon" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Industry Credentials
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Verified qualifications and technical achievements, highlighting certifications in NoSQL and advanced Agentic AI systems.
          </p>
        </div>

        {isEditMode && (
          <div className="mb-6">
            <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold mb-4 cursor-pointer flex items-center gap-2">
              {showAddForm ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              {showAddForm ? 'Cancel' : 'Add Certification'}
            </button>
            {showAddForm && (
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20 mb-4 flex flex-col gap-2">
                <input type="text" placeholder="Title" value={newCert.title} onChange={(e) => setNewCert({ ...newCert, title: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm" />
                <input type="text" placeholder="Issuer" value={newCert.issuer} onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm" />
                <input type="text" placeholder="Date" value={newCert.date} onChange={(e) => setNewCert({ ...newCert, date: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm" />
                <input type="text" placeholder="Verify URL (optional)" value={newCert.verifyUrl} onChange={(e) => setNewCert({ ...newCert, verifyUrl: e.target.value })} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm" />
                <label className="flex items-center gap-2 text-xs text-gray-300">
                  <input type="checkbox" checked={newCert.isSpecial} onChange={(e) => setNewCert({ ...newCert, isSpecial: e.target.checked })} className="accent-purple-500" />
                  Special / Elite
                </label>
                <button onClick={addCert} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer">Create</button>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-2xl p-5 border flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 relative group ${
                cert.isSpecial
                  ? 'border-purple-500/20 bg-purple-500/[0.01] hover:border-purple-500/40 shadow-lg shadow-purple-500/5'
                  : 'border-white/5 bg-white/[0.01] hover:border-white/10'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-xl border ${
                    cert.isSpecial
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : 'bg-white/5 text-gray-400 border-white/5'
                  }`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {cert.isSpecial && (
                      <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/25 text-purple-300 font-extrabold border border-purple-500/20">
                        Elite GenAI
                      </span>
                    )}
                    {isEditMode && (
                      <button onClick={() => removeCert(idx)} className="text-red-400 hover:text-red-300 text-xs p-1">✕</button>
                    )}
                  </div>
                </div>

                {isEditMode ? (
                  <div className="flex flex-col gap-1 mb-2">
                    <input type="text" value={cert.title} onChange={(e) => updateCert(idx, 'title', e.target.value)} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm font-bold" />
                    <input type="text" value={cert.issuer} onChange={(e) => updateCert(idx, 'issuer', e.target.value)} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-gray-300 text-xs" />
                    <label className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <input type="checkbox" checked={cert.isSpecial} onChange={(e) => updateCert(idx, 'isSpecial', e.target.checked)} className="accent-purple-500" />
                      Special
                    </label>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display font-bold text-base md:text-lg text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-4 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      {cert.issuer}
                    </p>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                {isEditMode ? (
                  <input type="text" value={cert.date} onChange={(e) => updateCert(idx, 'date', e.target.value)} className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-xs flex-1" />
                ) : (
                  <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-500" />
                    {cert.date}
                  </span>
                )}

                {isEditMode ? (
                  <input type="text" value={cert.verifyUrl || ''} onChange={(e) => updateCert(idx, 'verifyUrl', e.target.value || undefined)} placeholder="Verify URL" className="bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-xs ml-2 flex-1" />
                ) : cert.verifyUrl ? (
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
                  <span className="text-[10px] text-gray-500 font-mono italic">Awarded</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
