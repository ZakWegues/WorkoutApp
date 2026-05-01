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

export default function ExplorePage() {
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [equipment, setEquipment] = useState('bodyweight'); // Calistenia por padrão
  const [search, setSearch] = useState('');

  const { data: exercises, isLoading, error, refetch } = useExercises({
    muscleGroup: muscleGroup === 'all' ? undefined : muscleGroup,
    equipment: equipment === 'all' ? undefined : equipment,
    search: search || undefined,
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md px-5 pt-8 pb-4 space-y-4 border-b border-white/5">
        <h1 className="text-2xl font-bold text-white">Explorar</h1>
        
        <SearchBar value={search} onChange={setSearch} />
        
        <div className="space-y-3">
          <FilterChips 
            options={muscleGroupOptions} 
            value={muscleGroup} 
            onChange={setMuscleGroup} 
          />
          <FilterChips 
            options={equipmentOptions} 
            value={equipment} 
            onChange={setEquipment} 
          />
        </div>
      </div>

      <div className="p-5">
        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">Erro ao carregar exercícios.</p>
            <button 
              onClick={() => refetch()}
              className="px-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-white"
            >
              Tentar novamente
            </button>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => <ExerciseSkeleton key={i} />)}
          </div>
        ) : !exercises?.length ? (
          <div className="text-center py-20 text-neutral-500">
            <p>Nenhum exercício encontrado com estes filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 pb-24">
            <AnimatePresence>
              {exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
  );
}
