'use client';

import { ExerciseRow } from '@/types/database';
import { translations, MuscleGroupKey, EquipmentKey, DifficultyKey } from '@/lib/translations';
import { Heart, Play } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ExerciseCardProps {
  exercise: ExerciseRow;
}

const difficultyColors = {
  beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(exercise.id);
  const router = useRouter();

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(exercise.id);
  };

  const handleQuickStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const quickWorkout = {
      id: `quick-${Date.now()}`,
      user_id: null,
      name: `Treino: ${exercise.name}`,
      description: 'Sessão rápida de um único exercício.',
      estimated_duration_min: 10,
      is_ai_generated: false,
      created_at: new Date().toISOString(),
      workout_exercises: [
        {
          id: `we-${Date.now()}`,
          workout_id: `quick-${Date.now()}`,
          exercise_id: exercise.id,
          position: 0,
          sets: 3,
          reps: 10,
          rest_seconds: 60,
          weight_suggestion_kg: 0,
          exercises: exercise,
        }
      ]
    };
    
    sessionStorage.setItem('quick_workout', JSON.stringify(quickWorkout));
    router.push('/workout/quick');
  };

  return (
    <Link href={`/explore/${exercise.id}`} className="block">
      <div className="bg-[#141414] rounded-2xl p-4 border border-white/5 active:bg-white/5 transition-colors relative">
        <button 
          onClick={handleFavorite}
          className="absolute top-4 right-4 z-10 p-2 -m-2"
        >
          <Heart 
            size={20} 
            className={favorite ? "fill-red-500 text-red-500" : "text-neutral-500"} 
          />
        </button>

        <h3 className="font-bold text-white text-lg mb-1 pr-8">{exercise.name}</h3>
        
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 bg-white/5 px-2 py-1 rounded-md">
            {translations.muscleGroups[exercise.muscle_group as MuscleGroupKey]}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 bg-white/5 px-2 py-1 rounded-md">
            {translations.equipment[exercise.equipment as EquipmentKey]}
          </span>
          {exercise.difficulty && (
            <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-md border ${difficultyColors[exercise.difficulty as DifficultyKey]}`}>
              {translations.difficulty[exercise.difficulty as DifficultyKey]}
            </span>
          )}
        </div>

        <button 
          onClick={handleQuickStart}
          className="w-full flex items-center justify-center py-2.5 bg-[#22c55e]/10 hover:bg-[#22c55e]/20 text-[#22c55e] rounded-xl font-semibold text-sm transition-colors"
        >
          <Play size={16} className="mr-2 fill-current" />
          Treino Rápido
        </button>
      </div>
    </Link>
  );
}
