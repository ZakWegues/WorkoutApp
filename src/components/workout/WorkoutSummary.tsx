'use client';

import { CheckCircle, Clock, Activity, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatDuration } from '@/lib/utils';
import { FullWorkout, CompletedSet } from '@/hooks/useWorkoutSession';
import { translations, MuscleGroupKey } from '@/lib/translations';

interface WorkoutSummaryProps {
  workout: FullWorkout;
  completedSets: CompletedSet[];
  startedAt: string;
}

export function WorkoutSummary({ workout, completedSets, startedAt }: WorkoutSummaryProps) {
  const router = useRouter();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const start = new Date(startedAt).getTime();
    const end = new Date().getTime();
    setDuration(Math.floor((end - start) / 1000 / 60)); // duration in minutes
  }, [startedAt]);

  const totalSets = completedSets.length;
  const totalVolume = completedSets.reduce((acc, set) => acc + (set.weightKg * set.reps), 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] p-5 pb-safe">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center justify-center text-center mt-10 mb-12">
          <div className="w-20 h-20 bg-[#22c55e]/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-[#22c55e]" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Treino Concluído!</h1>
          <p className="text-neutral-400">{workout.name}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-[#141414] rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
            <Clock size={20} className="text-blue-500 mb-2" />
            <span className="text-xl font-bold text-white">{duration}m</span>
            <span className="text-[10px] text-neutral-500 uppercase mt-1">Tempo</span>
          </div>
          <div className="bg-[#141414] rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
            <Activity size={20} className="text-orange-500 mb-2" />
            <span className="text-xl font-bold text-white">{totalSets}</span>
            <span className="text-[10px] text-neutral-500 uppercase mt-1">Séries</span>
          </div>
          <div className="bg-[#141414] rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5">
            <Dumbbell size={20} className="text-purple-500 mb-2" />
            <span className="text-xl font-bold text-white">{Math.round(totalVolume / 1000)}k</span>
            <span className="text-[10px] text-neutral-500 uppercase mt-1">Vol (kg)</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Resumo dos Exercícios</h3>
        <div className="space-y-4">
          {workout.workout_exercises.map((we, index) => {
            const exerciseSets = completedSets.filter(s => s.exerciseId === we.exercise_id);
            if (exerciseSets.length === 0) return null;

            return (
              <div key={index} className="bg-[#141414] rounded-xl p-4 border border-white/5">
                <h4 className="font-semibold text-white mb-2">{we.exercises?.name}</h4>
                <div className="space-y-2">
                  {exerciseSets.map((set, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Série {set.setNumber}</span>
                      <span className="text-white font-medium">{set.weightKg} kg × {set.reps} reps</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button 
          onClick={() => router.push('/')}
          className="w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-bold py-4 px-4 rounded-xl transition-colors"
        >
          Voltar para Home
        </button>
        <button 
          onClick={() => router.push('/progress')}
          className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-4 px-4 rounded-xl transition-colors"
        >
          Ver Histórico
        </button>
      </div>
    </div>
  );
}
