'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatDuration } from '@/lib/utils';

interface WorkoutHeaderProps {
  title: string;
  progress: number; // 0 to 1
  startedAt: string;
  onExit: () => void;
}

export function WorkoutHeader({ title, progress, startedAt, onExit }: WorkoutHeaderProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = new Date(startedAt).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setElapsed(Math.floor((now - start) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const timeString = `${mins}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="bg-[#0a0a0a] pt-safe border-b border-white/5 z-40 relative">
      <div className="flex items-center justify-between h-14 px-4">
        <button 
          onClick={onExit}
          className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col items-center justify-center flex-1">
          <span className="text-sm font-bold text-white truncate max-w-[200px]">{title}</span>
          <span className="text-xs text-neutral-400 font-medium tabular-nums">{timeString}</span>
        </div>
        
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>
      
      {/* Progress bar */}
      <div className="h-1 w-full bg-[#141414]">
        <div 
          className="h-full bg-[#22c55e] transition-all duration-300 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
