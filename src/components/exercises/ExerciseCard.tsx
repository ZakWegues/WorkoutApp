'use client';

import { ExerciseRow } from '@/types/database';
import { 
  translations, 
  exerciseTranslations, 
  MuscleGroupKey, 
  EquipmentKey, 
  DifficultyKey 
} from '@/lib/translations';
import { Heart, Play } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
      name: `Treino: ${exerciseTranslations[exercise.name] || exercise.name}`,
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

  const displayName = exerciseTranslations[exercise.name] || exercise.name;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/explore/${exercise.id}`} className="block">
        <div className="bg-[#141414] rounded-3xl p-5 border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all relative group">
          <button 
            onClick={handleFavorite}
            className="absolute top-5 right-5 z-10 p-2 -m-2 opacity-60 group-hover:opacity-100 transition-opacity"
          >
            <Heart 
              size={20} 
              className={favorite ? "fill-red-500 text-red-500" : "text-neutral-500"} 
            />
          </button>

          <h3 className="font-bold text-white text-lg mb-1 pr-10">{displayName}</h3>
          <p className="text-[10px] text-neutral-500 font-medium mb-4 uppercase tracking-widest">{exercise.name}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
              {translations.muscleGroups[exercise.muscle_group as MuscleGroupKey]}
            </span>
            {exercise.difficulty && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border ${difficultyColors[exercise.difficulty as DifficultyKey]}`}>
                {translations.difficulty[exercise.difficulty as DifficultyKey]}
              </span>
            )}
          </div>

          <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-[#22c55e] text-xs font-bold">
            <Play size={14} className="mr-1.5 fill-current" />
            Iniciar Treino Rápido
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
