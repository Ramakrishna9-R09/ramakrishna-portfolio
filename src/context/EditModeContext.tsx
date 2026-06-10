import { createContext, useContext, useState, type ReactNode } from 'react';
import { saveData } from '../data/resumeData';

interface EditModeContextType {
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
  pendingChanges: boolean;
  setPendingChanges: (v: boolean) => void;
  saveAll: <T>(key: string, data: T) => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);

  const saveAll = <T,>(key: string, data: T) => {
    saveData(key, data);
    setPendingChanges(false);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, setIsEditMode, pendingChanges, setPendingChanges, saveAll }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error('useEditMode must be used within EditModeProvider');
  return ctx;
}
