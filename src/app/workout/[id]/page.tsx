import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { WorkoutPlayer } from '@/components/workout/WorkoutPlayer';

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: rawWorkout, error } = await supabase
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

  if (error || !rawWorkout) {
    notFound();
  }

  const workout = rawWorkout as unknown as WorkoutWithExercises;

  workout.workout_exercises.sort((a, b) => a.position - b.position);

  return <WorkoutPlayer workout={workout} />;
}

interface Exercise {
  id: string;
  name: string;
  muscle_group: string;
  equipment: string;
  gif_url: string | null;
  instructions: string | null;
}

interface WorkoutExercise {
  id: string;
  position: number;
  sets: number;
  reps: number;
  rest_seconds: number;
  weight_suggestion_kg: number | null;
  exercises: Exercise;
}

interface WorkoutWithExercises {
  id: string;
  name: string;
  description: string | null;
  estimated_duration_min: number | null;
  is_ai_generated: boolean;
  workout_exercises: WorkoutExercise[];
}