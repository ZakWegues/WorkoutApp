'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function WeekCalendar() {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  // Mock data: 0 = empty, 1 = done, 2 = today (not done yet)
  const status = [0, 1, 1, 2, 0, 0, 0]; 

  return (
    <div className="bg-[#141414] rounded-2xl p-5 border border-white/5">
      <h3 className="text-sm font-semibold text-white mb-4">Esta Semana</h3>
      
      <div className="flex justify-between items-center">
        {days.map((day, idx) => {
          const isDone = status[idx] === 1;
          const isToday = status[idx] === 2;
          
          return (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className={cn(
                "text-[10px] font-medium uppercase",
                isToday ? "text-white" : "text-neutral-500"
              )}>
                {day}
              </span>
              
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-colors",
                isDone && "bg-[#22c55e]/20 border-[#22c55e]/50 text-[#22c55e]",
                isToday && "bg-[#22c55e] border-[#22c55e] text-black",
                !isDone && !isToday && "bg-transparent border-white/10 text-neutral-400"
              )}>
                {isDone ? <Check size={14} strokeWidth={3} /> : (idx + 1)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
