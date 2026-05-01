import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { WorkoutPlayer } from '@/components/workout/WorkoutPlayer';

export default async function WorkoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
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

  if (error || !data) {
    notFound();
  }

  const workout = data as unknown as WorkoutWithExercises;
  workout.workout_exercises.sort((a, b) => a.position - b.position);

  return <WorkoutPlayer workout={workout} />;
}

interface Exercise {
  id: string;
  name: string;
  muscle_group: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';
  secondary_muscles: string[] | null;
  equipment: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
  instructions: string | null;
  gif_url: string | null;
  created_at: string;
}

interface WorkoutExercise {
  id: string;
  workout_id: string | null;
  exercise_id: string | null;
  position: number;
  sets: number;
  reps: number;
  rest_seconds: number;
  weight_suggestion_kg: number | null;
  exercises: Exercise;
}

interface WorkoutWithExercises {
  id: string;
  user_id: string | null;
  name: string;
  description: string | null;
  estimated_duration_min: number | null;
  is_ai_generated: boolean | null;
  created_at: string;
  workout_exercises: WorkoutExercise[];
}