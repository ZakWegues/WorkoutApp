'use client';

import { Flame, Target, Trophy } from 'lucide-react';

interface Stats {
  workouts: number;
  volume: number;
  streak: number;
  hours: number;
}

interface StreakStatsProps {
  stats: Stats;
}

export function StreakStats({ stats }: StreakStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
        <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center mb-2">
          <Flame size={20} className="text-orange-500 fill-orange-500" />
        </div>
        <span className="text-xl font-black text-white">{stats.streak}</span>
        <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Dias</span>
      </div>

      <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
        <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center mb-2">
          <Target size={20} className="text-[#22c55e]" />
        </div>
        <span className="text-xl font-black text-white">{stats.workouts}</span>
        <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Treinos</span>
      </div>

      <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
        <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
          <Trophy size={20} className="text-blue-500" />
        </div>
        <span className="text-xl font-black text-white">{Math.round(stats.volume / 100) / 10}k</span>
        <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Vol (t)</span>
      </div>
    </div>
  );
}
