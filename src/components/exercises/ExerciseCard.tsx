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
import { cn } from '@/lib/utils';

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
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link href={`/explore/${exercise.id}`} className="block group">
        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-[32px] p-6 border border-white/[0.05] group-hover:border-[#22c55e]/30 group-hover:bg-zinc-900/60 transition-all relative overflow-hidden shadow-2xl">
          {/* Background Accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#22c55e]/5 blur-[80px] rounded-full group-hover:bg-[#22c55e]/10 transition-colors" />
          
          <button 
            onClick={handleFavorite}
            className="absolute top-6 right-6 z-10 p-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/5 hover:border-red-500/30 transition-all group/fav"
          >
            <Heart 
              size={18} 
              className={cn(
                "transition-all duration-300",
                favorite ? "fill-red-500 text-red-500 scale-110" : "text-zinc-600 group-hover/fav:text-zinc-400"
              )} 
            />
          </button>

          <div className="relative z-10">
            <h3 className="font-black text-white text-xl mb-1 pr-12 italic uppercase tracking-tighter leading-tight">
              {displayName}
            </h3>
            <p className="text-[10px] text-[#22c55e] font-black mb-6 uppercase tracking-[0.2em] opacity-80">
              {exercise.name}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  {translations.muscleGroups[exercise.muscle_group as MuscleGroupKey]}
                </span>
              </div>
              
              {exercise.difficulty && (
                <div className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border",
                  difficultyColors[exercise.difficulty as DifficultyKey]
                )}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {translations.difficulty[exercise.difficulty as DifficultyKey]}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-[#22c55e] text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-[#22c55e] text-black flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                  <Play size={14} fill="currentColor" />
                </div>
                Quick Start
              </div>
              
              <div className="text-zinc-700 text-[10px] font-black uppercase tracking-widest group-hover:text-zinc-500 transition-colors">
                Ver detalhes
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
