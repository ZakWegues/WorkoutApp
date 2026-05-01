import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { WorkoutPlayer } from '@/components/workout/WorkoutPlayer';

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch workout with its exercises and the actual exercise details
  const { data: workout, error } = await supabase
    .from('workouts')
    .select(`
      *,
      workout_exercises (
        *,
        exercises (*)
      )
    `)
    .eq('id', id)
    .single();

  if (error || !workout) {
    notFound();
  }

  // Sort workout exercises by position
  workout.workout_exercises.sort((a: any, b: any) => a.position - b.position);

  return <WorkoutPlayer workout={workout as any} />;
}
