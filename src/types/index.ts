export interface User {
  id: string;
  name: string;
  email: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  goal: 'strength' | 'hypertrophy' | 'endurance' | 'weight_loss';
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  gifUrl?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  restSeconds: number;
}

export interface Workout {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  durationMin: number;
}

export interface WorkoutSet {
  exerciseId: string;
  setNumber: number;
  reps: number;
  weightKg: number;
  completedAt: string;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  userId: string;
  sets: WorkoutSet[];
  startedAt: string;
  finishedAt?: string;
}
