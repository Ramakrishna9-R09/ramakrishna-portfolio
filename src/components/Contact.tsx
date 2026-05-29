import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Clock } from 'lucide-react';

interface ContactProps {
  activeTheme?: 'purple' | 'emerald' | 'indigo';
}

export default function Contact({ activeTheme = 'purple' }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = {
    email: 'ramakrishna.mvp2004@gmail.com',
    phone: '+91 8008874541',
    location: 'Hyderabad, India',
    availability: 'Full-time (Work from Office in Pune / Bangalore / Hyderabad / Chennai)'
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request latency
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const themeStyles = {
    purple: {
      focusRing: 'focus:border-purple-500/40',
      btn: 'bg-purple-600 hover:bg-purple-500 hover:shadow-purple-500/25',
      copyText: 'text-purple-400',
      horizon: 'purple-horizon',
      socialHover: 'hover:border-purple-500/40'
    },
    emerald: {
      focusRing: 'focus:border-emerald-500/40',
      btn: 'bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-500/25',
      copyText: 'text-emerald-400',
      horizon: 'purple-horizon bg-emerald-500/25',
      socialHover: 'hover:border-emerald-500/40'
    },
    indigo: {
      focusRing: 'focus:border-indigo-500/40',
      btn: 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-indigo-500/25',
      copyText: 'text-indigo-400',
      horizon: 'purple-horizon bg-indigo-500/25',
      socialHover: 'hover:border-indigo-500/40'
    }
  };

  const currentTheme = themeStyles[activeTheme] || themeStyles.purple;

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black/40">
      <div className="absolute inset-0 z-0 bg-grid opacity-10" />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[350px] transition-all duration-500 ${currentTheme.horizon}`} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-display text-white">
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Reach out via phone, email, or send a message below to connect regarding career opportunities, projects, or collaborations.
          </p>
        </div>

        {/* Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              {/* Email Card */}
              <div className="glass-card border-white/5 rounded-2xl p-5 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Email Address</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-sm font-semibold text-white hover:text-purple-300 transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(contactInfo.email, 'email')}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="glass-card border-white/5 rounded-2xl p-5 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Phone Contact</p>
                    <a href={`tel:${contactInfo.phone}`} className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors cursor-pointer"
                  title="Copy Phone"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="glass-card border-white/5 rounded-2xl p-5 flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Location Base</p>
                  <p className="text-sm font-semibold text-white">{contactInfo.location}</p>
                </div>
              </div>

              {/* Availability Card */}
              <div className="glass-card border-white/5 rounded-2xl p-5 flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Work Availability</p>
                  <p className="text-xs font-semibold text-white leading-relaxed">{contactInfo.availability}</p>
                </div>
              </div>
            </div>

            {/* Socials Row */}
            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/5">
              <a
                href="https://github.com/Ramakrishna9-R09"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3.5 rounded-xl glass-pill ${currentTheme.socialHover} border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2`}
              >
                <svg className={`w-4 h-4 ${currentTheme.copyText} mr-1`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/venkata-ramakrishna-kamepalli-b60878290/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3.5 rounded-xl glass-pill ${currentTheme.socialHover} border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2`}
              >
                <svg className={`w-4 h-4 ${currentTheme.copyText} mr-1`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Form Card (Right) */}
          <div className="lg:col-span-7 glass-card border-white/5 rounded-3xl p-6 md:p-8">
            <h3 className="font-display font-extrabold text-xl md:text-2xl text-white mb-6">
              Write a Message
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase font-mono tracking-wider text-gray-500">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className={`px-4 py-3.5 rounded-xl bg-white/5 border border-white/5 ${currentTheme.focusRing} text-white outline-none font-sans text-sm transition-all focus:bg-white/[0.08]`}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase font-mono tracking-wider text-gray-500">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className={`px-4 py-3.5 rounded-xl bg-white/5 border border-white/5 ${currentTheme.focusRing} text-white outline-none font-sans text-sm transition-all focus:bg-white/[0.08]`}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] uppercase font-mono tracking-wider text-gray-500">Message Content</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hey, let's talk about the software engineering project..."
                  className={`px-4 py-3.5 rounded-xl bg-white/5 border border-white/5 ${currentTheme.focusRing} text-white outline-none font-sans text-sm transition-all resize-none focus:bg-white/[0.08]`}
                />
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className={`w-full py-4 rounded-xl ${currentTheme.btn} text-xs font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50`}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : submitSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Secure Message
                  </>
                )}
              </button>

              {/* Copy confirmation toast notice */}
              {copiedField && (
                <div className="text-center text-xs text-emerald-400 font-mono py-1 animate-pulse">
                  Copied {copiedField === 'email' ? 'Email Address' : 'Phone Number'} to clipboard!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
