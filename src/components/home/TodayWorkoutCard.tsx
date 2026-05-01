'use client';

import { Play, Clock, Dumbbell } from 'lucide-react';
import { useWorkoutStore } from '@/hooks/useWorkoutStore';
import { Workout } from '@/types';

const MOCK_WORKOUT: Workout = {
  id: 'w1',
  name: 'Peito e Tríceps - Foco Força',
  durationMin: 45,
  exercises: [
    { exerciseId: 'e1', sets: 4, reps: 8, restSeconds: 90 },
    { exerciseId: 'e2', sets: 3, reps: 10, restSeconds: 60 },
    { exerciseId: 'e3', sets: 3, reps: 12, restSeconds: 60 },
  ],
};

export function TodayWorkoutCard() {
  const { startWorkout } = useWorkoutStore();

  const handleStart = () => {
    startWorkout(MOCK_WORKOUT);
  };

  return (
    <div className="bg-[#141414] rounded-2xl p-5 border border-white/5">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider mb-1 block">
            Treino de Hoje
          </span>
          <h3 className="text-lg font-bold text-white">{MOCK_WORKOUT.name}</h3>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex items-center text-neutral-400 text-sm">
          <Dumbbell size={16} className="mr-1.5" />
          <span>{MOCK_WORKOUT.exercises.length} exercícios</span>
        </div>
        <div className="flex items-center text-neutral-400 text-sm">
          <Clock size={16} className="mr-1.5" />
          <span>~{MOCK_WORKOUT.durationMin} min</span>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-bold py-3.5 px-4 rounded-xl flex items-center justify-center transition-colors"
      >
        <Play size={20} className="mr-2 fill-black" />
        Iniciar Treino
      </button>
    </div>
  );
}
