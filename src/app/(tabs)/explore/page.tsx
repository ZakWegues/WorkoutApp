'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/exercises/SearchBar';
import { FilterChips } from '@/components/exercises/FilterChips';
import { ExerciseCard } from '@/components/exercises/ExerciseCard';
import { ExerciseSkeleton } from '@/components/exercises/ExerciseSkeleton';
import { useExercises } from '@/hooks/useExercises';
import { translations } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';

const muscleGroupOptions = [
  { label: 'Todos', value: 'all' },
  ...Object.entries(translations.muscleGroups).map(([key, label]) => ({
    value: key,
    label,
  })),
];

const equipmentOptions = [
  { label: 'Todos', value: 'all' },
  ...Object.entries(translations.equipment).map(([key, label]) => ({
    value: key,
    label,
  })),
];

const difficultyOptions = [
  { label: 'Todos', value: 'all' },
  ...Object.entries(translations.difficulty).map(([key, label]) => ({
    value: key,
    label,
  })),
];

const muscleGroupIcons: Record<string, string> = {
  chest: '💪',
  back: '🏋️',
  legs: '🦵',
  shoulders: '🙌',
  arms: '💪',
  core: '🔥',
};

export default function ExplorePage() {
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [equipment, setEquipment] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'progression'>('grid');

  const { data: exercises, isLoading, error, refetch } = useExercises({
    muscleGroup: muscleGroup === 'all' ? undefined : muscleGroup,
    equipment: equipment === 'all' ? undefined : equipment,
    difficulty: difficulty === 'all' ? undefined : difficulty,
    search: search || undefined,
  });

  const recommendations = exercises?.filter(ex => ex.difficulty === 'beginner').slice(0, 3) || [];

  const groupedByProgression = exercises ? exercises.reduce((acc, ex) => {
    const mg = ex.muscle_group;
    if (!acc[mg]) acc[mg] = [];
    acc[mg].push(ex);
    return acc;
  }, {} as Record<string, typeof exercises>) : {};

  // Sort by difficulty within groups
  Object.keys(groupedByProgression).forEach(mg => {
    groupedByProgression[mg].sort((a, b) => {
      const order = { beginner: 1, intermediate: 2, advanced: 3 };
      return (order[a.difficulty as keyof typeof order] || 0) - (order[b.difficulty as keyof typeof order] || 0);
    });
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] pb-24">
      {/* Header & Filters */}
      <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-2xl px-6 pt-12 pb-6 space-y-6 border-b border-white/[0.05]">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Explorar</h1>
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'progression' : 'grid')}
            className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all text-[#22c55e]"
          >
            {viewMode === 'grid' ? 'Ver Progressões' : 'Ver Grade'}
          </button>
        </div>
        
        <SearchBar value={search} onChange={setSearch} />
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <FilterChips options={difficultyOptions} value={difficulty} onChange={setDifficulty} />
        </div>
      </div>

      <div className="flex-1 space-y-10 py-8">
        {/* Recommendations */}
        {viewMode === 'grid' && !search && muscleGroup === 'all' && (
          <section className="px-6 space-y-5">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 italic">Recomendados para você</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
              {recommendations.map((ex, i) => (
                <div key={i} className="flex-shrink-0 w-64">
                   <ExerciseCard exercise={ex} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Exercises List / Progression */}
        <div className="px-6 space-y-8">
          {viewMode === 'progression' ? (
            <div className="space-y-12">
              {Object.entries(groupedByProgression).map(([mg, items]) => (
                <div key={mg} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{muscleGroupIcons[mg] || '💪'}</span>
                    <h2 className="text-xl font-black italic uppercase tracking-tight text-white">
                      {translations.muscleGroups[mg as MuscleGroupKey]}
                    </h2>
                  </div>
                  
                  <div className="relative pl-4 space-y-4 border-l-2 border-zinc-900">
                    {items.map((ex, idx) => (
                      <div key={ex.id} className="relative">
                        <div className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-[#050505] group-hover:bg-[#22c55e]" />
                        <ExerciseCard exercise={ex} />
                        {idx < items.length - 1 && (
                          <div className="flex justify-center py-2 opacity-30">
                            <ChevronRight className="rotate-90 text-zinc-600" size={16} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-3">Grupo Muscular</p>
                <FilterChips options={muscleGroupOptions} value={muscleGroup} onChange={setMuscleGroup} />
              </div>
              
              <AnimatePresence mode="popLayout">
                {exercises?.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ExerciseCard exercise={exercise} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
