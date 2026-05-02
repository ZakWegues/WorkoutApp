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

export default function ExplorePage() {
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [equipment, setEquipment] = useState('bodyweight'); // Calistenia por padrão
  const [difficulty, setDifficulty] = useState('all');
  const [search, setSearch] = useState('');

  const { data: exercises, isLoading, error, refetch } = useExercises({
    muscleGroup: muscleGroup === 'all' ? undefined : muscleGroup,
    equipment: equipment === 'all' ? undefined : equipment,
    difficulty: difficulty === 'all' ? undefined : difficulty,
    search: search || undefined,
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      <div className="sticky top-0 z-20 bg-[#050505]/60 backdrop-blur-2xl px-6 pt-10 pb-6 space-y-6 border-b border-white/[0.05]">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Explorar</h1>
          <div className="flex flex-col items-end">
             <p className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.2em] mb-1">
              {exercises?.length || 0} Exercícios
            </p>
          </div>
        </div>
        
        <SearchBar value={search} onChange={setSearch} />
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Dificuldade</p>
            <FilterChips 
              options={difficultyOptions} 
              value={difficulty} 
              onChange={setDifficulty} 
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Músculo</p>
            <FilterChips 
              options={muscleGroupOptions} 
              value={muscleGroup} 
              onChange={setMuscleGroup} 
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Equipamento</p>
            <FilterChips 
              options={equipmentOptions} 
              value={equipment} 
              onChange={setEquipment} 
            />
          </div>
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
