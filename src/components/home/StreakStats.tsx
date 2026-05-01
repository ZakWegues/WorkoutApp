'use client';

import { Flame, Calendar, Weight } from 'lucide-react';

export function StreakStats() {
  // Mock data
  const stats = {
    streakDays: 4,
    workoutsThisWeek: 3,
    totalVolumeKg: 12450,
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-[#141414] rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 text-center">
        <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center mb-2">
          <Flame size={16} className="text-orange-500" />
        </div>
        <span className="text-xl font-bold text-white mb-0.5">{stats.streakDays}</span>
        <span className="text-[10px] text-neutral-500 uppercase tracking-wide">Dias</span>
      </div>

      <div className="bg-[#141414] rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 text-center">
        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
          <Calendar size={16} className="text-blue-500" />
        </div>
        <span className="text-xl font-bold text-white mb-0.5">{stats.workoutsThisWeek}</span>
        <span className="text-[10px] text-neutral-500 uppercase tracking-wide">Na Semana</span>
      </div>

      <div className="bg-[#141414] rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 text-center">
        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
          <Weight size={16} className="text-purple-500" />
        </div>
        <span className="text-xl font-bold text-white mb-0.5">{Math.round(stats.totalVolumeKg / 1000)}k</span>
        <span className="text-[10px] text-neutral-500 uppercase tracking-wide">Volume (kg)</span>
      </div>
    </div>
  );
}
