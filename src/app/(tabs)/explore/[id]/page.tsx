import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { translations, MuscleGroupKey, EquipmentKey, DifficultyKey } from '@/lib/translations';
import { ArrowLeft, PlayCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { ExerciseRow } from '@/types/database';

export default async function ExerciseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: exercise, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single();

  if (!exercise) {
    notFound();
  }

  const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center h-14 px-4 bg-[#0a0a0a]/90 backdrop-blur-md">
        <Link href="/explore" className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <span className="ml-4 font-semibold text-white">Detalhes do Exercício</span>
      </div>

      {/* Media Placeholder */}
      <div className="w-full aspect-video bg-[#141414] border-y border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
        <PlayCircle size={48} className="text-white/20 group-hover:text-[#22c55e]/50 transition-colors" />
        <span className="text-sm text-neutral-500 mt-2">GIF não disponível</span>
      </div>

      <div className="p-5">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-3">{exercise.name}</h1>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 bg-white/5 px-2.5 py-1.5 rounded-md">
              {translations.muscleGroups[exercise.muscle_group as MuscleGroupKey]}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 bg-white/5 px-2.5 py-1.5 rounded-md">
              {translations.equipment[exercise.equipment as EquipmentKey]}
            </span>
            {exercise.difficulty && (
              <span className={`text-xs font-medium uppercase tracking-wider px-2.5 py-1.5 rounded-md border ${difficultyColors[exercise.difficulty as DifficultyKey]}`}>
                {translations.difficulty[exercise.difficulty as DifficultyKey]}
              </span>
            )}
          </div>
        </div>

        {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-neutral-400 mb-2 uppercase tracking-wider">Músculos Secundários</h3>
            <p className="text-white bg-[#141414] p-3 rounded-xl border border-white/5">
              {exercise.secondary_muscles.map(m => translations.muscleGroups[m as MuscleGroupKey] || m).join(', ')}
            </p>
          </div>
        )}

        {exercise.instructions && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-neutral-400 mb-2 uppercase tracking-wider">Instruções</h3>
            <div className="bg-[#141414] p-4 rounded-xl border border-white/5">
              <p className="text-white/90 leading-relaxed text-sm">
                {exercise.instructions}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 max-w-[430px] mx-auto bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
        <button className="w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-bold py-4 px-4 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-[#22c55e]/20">
          <Plus size={20} className="mr-2" />
          Adicionar ao Treino
        </button>
      </div>
    </div>
  );
}
