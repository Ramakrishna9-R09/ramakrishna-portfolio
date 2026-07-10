import { useState, useEffect, type MouseEvent } from 'react';
import { Menu, X, FileText, Pencil, Check } from 'lucide-react';
import { useEditMode } from '../context/EditModeContext';

interface NavbarProps {
  activeSection: string;
  activeTheme?: 'purple' | 'emerald' | 'indigo';
}

export default function Navbar({ activeSection, activeTheme = 'purple' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isEditMode, setIsEditMode } = useEditMode();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', name: 'Home' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'experience', name: 'Experience' },
    { id: 'certifications', name: 'Credentials' },
    { id: 'education', name: 'Education' },
    { id: 'contact', name: 'Contact' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const themeLogoStyles = {
    purple: {
      bg: 'from-white to-neutral-300 shadow-white/10 text-black',
      textGrad: 'from-white via-white to-neutral-300',
      icon: 'text-white',
      activeTab: 'bg-white text-black shadow-lg shadow-white/10',
      mobileActiveTab: 'bg-white/10 text-white border-l-2 border-white pl-4'
    },
    emerald: {
      bg: 'from-white to-neutral-300 shadow-white/10',
      textGrad: 'from-white via-white to-neutral-300',
      icon: 'text-white',
      activeTab: 'bg-white text-black shadow-lg shadow-white/10',
      mobileActiveTab: 'bg-white/10 text-white border-l-2 border-white pl-4'
    },
    indigo: {
      bg: 'from-neutral-700 to-neutral-950 shadow-white/10',
      textGrad: 'from-white via-white to-neutral-400',
      icon: 'text-white',
      activeTab: 'bg-white text-black shadow-lg shadow-white/10',
      mobileActiveTab: 'bg-white/10 text-white border-l-2 border-white pl-4'
    }
  };

  const currentStyle = themeLogoStyles[activeTheme] || themeLogoStyles.purple;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-black/70 backdrop-blur-xl border-b border-white/10' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-4">
        {/* Brand */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')}
          className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2 group"
        >
          <span className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${currentStyle.bg} flex items-center justify-center text-sm font-black shadow-lg group-hover:scale-105 transition-transform`}>
            RK
          </span>
          <span className={`nav-brand-name bg-gradient-to-r ${currentStyle.textGrad} bg-clip-text text-transparent group-hover:opacity-90 transition-opacity`}>
            Ramakrishna.
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.08] border border-white/10 rounded-md p-1.5 backdrop-blur-xl">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center whitespace-nowrap ${
                activeSection === item.id
                  ? currentStyle.activeTab
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href="https://github.com/Ramakrishna9-R09"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors items-center justify-center"
            title="GitHub"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/venkata-ramakrishna-kamepalli-b60878290/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors items-center justify-center"
            title="LinkedIn"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="./Ramakrishna.pdf"
            target="_blank"
            className="glass-pill nav-action px-3.5 py-2 rounded-md text-xs font-semibold text-white flex items-center gap-2 hover:scale-105"
          >
            <FileText className={`w-4 h-4 ${currentStyle.icon}`} />
            Resume PDF
          </a>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`glass-pill nav-action px-3.5 py-2 rounded-md text-xs font-semibold flex items-center gap-2 hover:scale-105 ${
              isEditMode ? 'text-black bg-white border-white/40' : 'text-white'
            }`}
            title={isEditMode ? 'Finish updating' : 'Update portfolio'}
          >
            {isEditMode ? <Check className="w-4 h-4" /> : <Pencil className={`w-4 h-4 ${currentStyle.icon}`} />}
            {isEditMode ? 'Done' : 'Update'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="./Ramakrishna.pdf"
            target="_blank"
            className="glass-pill px-3 py-1.5 rounded-md text-[11px] font-semibold text-white flex items-center gap-1.5 hover:scale-105"
          >
            <FileText className={`w-3.5 h-3.5 ${currentStyle.icon}`} />
            Resume
          </a>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`glass-pill px-3 py-1.5 rounded-md text-[11px] font-semibold flex items-center gap-1.5 hover:scale-105 ${
              isEditMode ? 'text-black bg-white border-white/40' : 'text-white'
            }`}
            title={isEditMode ? 'Finish updating' : 'Update portfolio'}
          >
            {isEditMode ? <Check className="w-3.5 h-3.5" /> : <Pencil className={`w-3.5 h-3.5 ${currentStyle.icon}`} />}
            {isEditMode ? 'Done' : 'Update'}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[73px] bg-black/95 backdrop-blur-lg border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[400px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`py-2 px-3 rounded-lg text-base font-medium flex items-center transition-all ${
                activeSection === item.id
                  ? currentStyle.mobileActiveTab
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </a>
          ))}
          <div className="flex gap-4 pt-4 border-t border-white/5">
            <a
              href="https://github.com/Ramakrishna9-R09"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/venkata-ramakrishna-kamepalli-b60878290/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
