import { Pencil, Check } from 'lucide-react';
import { useEditMode } from '../context/EditModeContext';

export default function EditToggle() {
  const { isEditMode, setIsEditMode } = useEditMode();

  return (
    <button
      onClick={() => setIsEditMode(!isEditMode)}
      className={`fixed bottom-6 left-6 z-50 px-4 py-3 rounded-xl glass-pill border cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2 font-semibold text-sm ${
        isEditMode
          ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400 hover:text-emerald-300'
          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
      }`}
      title={isEditMode ? 'Finish updating' : 'Update portfolio'}
    >
      {isEditMode ? <Check className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
      <span>{isEditMode ? 'Done' : 'Update'}</span>
    </button>
  );
}
