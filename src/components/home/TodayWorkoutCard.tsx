'use client';

import { Play, Clock, Sparkles, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TodayWorkoutCard() {
  const router = useRouter();
  const [hasWorkout, setHasWorkout] = useState(false);

  if (!hasWorkout) {
    return (
      <div className="bg-[#141414] rounded-3xl p-6 border border-[#22c55e]/10 bg-gradient-to-br from-[#141414] to-[#0a0a0a] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles size={80} className="text-[#22c55e]" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">Sem treino planejado?</h3>
          <p className="text-neutral-400 text-sm mb-6 max-w-[200px]">
            Deixe nossa IA criar uma rotina de calistenia personalizada para você agora.
          </p>
          
          <button
            onClick={() => router.push('/coach')}
            className="w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)]"
          >
            <Sparkles size={18} className="mr-2 fill-black" />
            Gerar Treino com IA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] rounded-3xl p-6 border border-white/5 relative group hover:border-white/10 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.2em] mb-1 block">
            TREINO DO DIA
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-[#22c55e] transition-colors">Full Body Calisthenics</h3>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex items-center text-neutral-400 text-xs font-medium">
          <Clock size={14} className="mr-1.5" />
          <span>~45 min</span>
        </div>
        <div className="flex items-center text-neutral-400 text-xs font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mr-1.5" />
          <span>Foco: Hipertrofia</span>
        </div>
      </div>

      <button
        onClick={() => {}}
        className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center transition-all border border-white/5"
      >
        <Play size={18} className="mr-2 fill-current" />
        Iniciar Sessão
      </button>
    </div>
  );
}
