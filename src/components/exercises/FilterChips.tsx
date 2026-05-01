'use client';

import { cn } from '@/lib/utils';

interface FilterChipsProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterChips({ options, value, onChange }: FilterChipsProps) {
  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-5 px-5">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
              isSelected 
                ? "bg-[#22c55e] border-[#22c55e] text-black" 
                : "bg-[#141414] border-white/10 text-neutral-400 hover:text-white"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
