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
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-neutral-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-3 bg-[#141414] border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#22c55e] focus:border-[#22c55e] transition-colors"
        placeholder="Buscar exercícios..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X size={18} className="text-neutral-500 hover:text-white" />
        </button>
      )}
    </div>
  );
}
