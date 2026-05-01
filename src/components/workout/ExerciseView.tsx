'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, PlayCircle } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';
import { FullWorkoutExercise } from '@/hooks/useWorkoutSession';
import { exerciseTranslations } from '@/lib/translations';

interface ExerciseViewProps {
  exercise: FullWorkoutExercise;
  currentExerciseNum: number;
  totalExercises: number;
  currentSetNum: number;
  onComplete: (reps: number, weightKg: number) => void;
}

export function ExerciseView({ exercise, currentExerciseNum, totalExercises, currentSetNum, onComplete }: ExerciseViewProps) {
  const { triggerShort } = useHaptic();
  
  const [reps, setReps] = useState(exercise.reps);
  const [weight, setWeight] = useState(exercise.weight_suggestion_kg || 0);

  useEffect(() => {
    if (!exercise.exercises) return;
    try {
      const stored = localStorage.getItem(`last_weight_${exercise.exercises.id}`);
      if (stored) {
        setWeight(parseFloat(stored));
      }
    } catch (e) {}
  }, [exercise]);

  const handleComplete = () => {
    triggerShort();
    if (exercise.exercises) {
      localStorage.setItem(`last_weight_${exercise.exercises.id}`, weight.toString());
    }
    onComplete(reps, weight);
  };

  const adjustWeight = (amount: number) => {
    triggerShort();
    setWeight(prev => Math.max(0, prev + amount));
  };

  const adjustReps = (amount: number) => {
    triggerShort();
    setReps(prev => Math.max(1, prev + amount));
  };

  if (!exercise.exercises) return null;

  const displayName = exerciseTranslations[exercise.exercises.name] || exercise.exercises.name;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <div className="w-full aspect-video bg-[#141414] border-b border-white/5 flex flex-col items-center justify-center relative">
        <PlayCircle size={48} className="text-white/20" />
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-32">
        <div className="text-center mb-8">
          <p className="text-sm text-[#22c55e] font-semibold mb-1 uppercase tracking-wider">
            Exercício {currentExerciseNum} de {totalExercises}
          </p>
          <h2 className="text-2xl font-bold text-white">{displayName}</h2>
          <p className="text-neutral-400 mt-1 font-medium italic text-xs">{exercise.exercises.name}</p>
          <p className="text-neutral-400 mt-2">Série {currentSetNum} de {exercise.sets}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-[#141414] p-4 rounded-2xl border border-white/5">
            <label className="text-sm font-medium text-neutral-400 mb-3 block text-center uppercase tracking-wide">Peso (kg)</label>
            <div className="flex items-center justify-between">
              <button onClick={() => adjustWeight(-2.5)} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-white active:bg-white/10 transition-colors">
                <Minus size={24} />
              </button>
              
              <input 
                type="number" 
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-24 text-center bg-transparent text-3xl font-bold text-white focus:outline-none"
              />
              
              <button onClick={() => adjustWeight(2.5)} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-white active:bg-white/10 transition-colors">
                <Plus size={24} />
              </button>
            </div>
          </div>

          <div className="bg-[#141414] p-4 rounded-2xl border border-white/5">
            <label className="text-sm font-medium text-neutral-400 mb-3 block text-center uppercase tracking-wide">Repetições</label>
            <div className="flex items-center justify-between">
              <button onClick={() => adjustReps(-1)} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-white active:bg-white/10 transition-colors">
                <Minus size={24} />
              </button>
              
              <input 
                type="number" 
                inputMode="numeric"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value) || 0)}
                className="w-24 text-center bg-transparent text-3xl font-bold text-white focus:outline-none"
              />
              
              <button onClick={() => adjustReps(1)} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-white active:bg-white/10 transition-colors">
                <Plus size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-[430px] mx-auto bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
        <button 
          onClick={handleComplete}
          className="w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-bold py-4 px-4 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-[#22c55e]/20"
        >
          Concluir Série
        </button>
      </div>
    </div>
  );
}
