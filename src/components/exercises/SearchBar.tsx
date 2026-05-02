'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, onChange]);

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search size={18} className="text-zinc-500 group-focus-within:text-[#22c55e] transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-12 py-4 bg-zinc-900/50 border border-white/[0.05] rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#22c55e]/30 focus:border-[#22c55e]/30 focus:bg-zinc-900/80 transition-all duration-300"
        placeholder="Buscar exercícios..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          className="absolute inset-y-0 right-4 flex items-center"
        >
          <div className="p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <X size={14} className="text-zinc-400" />
          </div>
        </button>
      )}
    </div>
  );
}
