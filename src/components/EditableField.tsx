import { useEditMode } from '../context/EditModeContext';

interface EditableTextProps {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  placeholder?: string;
}

export function EditableText({ value, onChange, className = '', tag = 'span', placeholder = '' }: EditableTextProps) {
  const { isEditMode } = useEditMode();
  const Tag = tag;

  if (isEditMode) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white outline-none focus:border-purple-400 ${className}`}
        placeholder={placeholder}
      />
    );
  }

  return <Tag className={className}>{value || placeholder}</Tag>;
}

interface EditableTextAreaProps {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
}

export function EditableTextArea({ value, onChange, className = '', placeholder = '' }: EditableTextAreaProps) {
  const { isEditMode } = useEditMode();

  if (isEditMode) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white outline-none focus:border-purple-400 resize-y min-h-[60px] w-full ${className}`}
        placeholder={placeholder}
      />
    );
  }

  return <p className={className}>{value || placeholder}</p>;
}

interface EditableListProps {
  items: string[];
  onChange: (items: string[]) => void;
  className?: string;
  itemClass?: string;
  bullet?: string;
}

export function EditableList({ items, onChange, className = '', itemClass = '', bullet = '▹' }: EditableListProps) {
  const { isEditMode } = useEditMode();

  if (isEditMode) {
    const handleChange = (idx: number, val: string) => {
      const next = [...items];
      next[idx] = val;
      onChange(next);
    };
    const addItem = () => onChange([...items, '']);
    const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleChange(i, e.target.value)}
              className="flex-1 bg-white/10 border border-purple-500/40 rounded px-2 py-1 text-white text-sm outline-none"
            />
            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 text-xs px-1">✕</button>
          </div>
        ))}
        <button onClick={addItem} className="text-purple-400 hover:text-purple-300 text-xs text-left mt-1">+ Add item</button>
      </div>
    );
  }

  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li key={i} className={itemClass}>
          <span className="text-purple-400 mr-2">{bullet}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

interface EditableNumberProps {
  value: number;
  onChange: (v: number) => void;
  className?: string;
  min?: number;
  max?: number;
}

export function EditableNumber({ value, onChange, className = '', min = 0, max = 100 }: EditableNumberProps) {
  const { isEditMode } = useEditMode();

  if (isEditMode) {
    return (
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`accent-purple-500 ${className}`}
      />
    );
  }

  return <span className={className}>{value}</span>;
}
