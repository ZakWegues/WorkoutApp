import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase-browser';
import { ExerciseRow } from '@/types/database';

interface UseExercisesParams {
  muscleGroup?: string;
  equipment?: string;
  search?: string;
}

export function useExercises({ muscleGroup, equipment, search }: UseExercisesParams = {}) {
  const supabase = createClient();

  return useQuery({
    queryKey: ['exercises', { muscleGroup, equipment, search }],
    queryFn: async () => {
      let query = supabase.from('exercises').select('*');

      if (muscleGroup && muscleGroup !== 'all') {
        query = query.eq('muscle_group', muscleGroup);
      }
      
      if (equipment && equipment !== 'all') {
        query = query.eq('equipment', equipment);
      }

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data: raw, error } = await query.order('name');

      if (error) {
        throw error;
      }

      return (raw ?? []) as unknown as ExerciseRow[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
