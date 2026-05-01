import { StateCreator } from 'zustand';
import { Workout } from '@/types';

export interface ActiveWorkout extends Workout {
  startedAt: string;
}

export interface WorkoutSlice {
  activeWorkout: ActiveWorkout | null;
  currentExerciseIndex: number;
  currentSet: number;
  restTimer: number; // in seconds
  startWorkout: (workout: Workout) => void;
  nextExercise: () => void;
  nextSet: () => void;
  setRestTimer: (seconds: number) => void;
  finishWorkout: () => void;
}

export const createWorkoutSlice: StateCreator<WorkoutSlice, [], [], WorkoutSlice> = (set, get) => ({
  activeWorkout: null,
  currentExerciseIndex: 0,
  currentSet: 1,
  restTimer: 0,

  startWorkout: (workout) =>
    set({
      activeWorkout: { ...workout, startedAt: new Date().toISOString() },
      currentExerciseIndex: 0,
      currentSet: 1,
      restTimer: 0,
    }),

  nextExercise: () =>
    set((state) => {
      if (!state.activeWorkout) return state;
      return {
        currentExerciseIndex: Math.min(state.currentExerciseIndex + 1, state.activeWorkout.exercises.length - 1),
        currentSet: 1,
        restTimer: 0,
      };
    }),

  nextSet: () =>
    set((state) => {
      if (!state.activeWorkout) return state;
      const currentExercise = state.activeWorkout.exercises[state.currentExerciseIndex];
      const nextSetNum = state.currentSet + 1;
      
      if (nextSetNum > currentExercise.sets) {
        get().nextExercise();
        return {}; // State handled by nextExercise
      }
      
      return { currentSet: nextSetNum, restTimer: currentExercise.restSeconds };
    }),

  setRestTimer: (seconds) => set({ restTimer: seconds }),

  finishWorkout: () =>
    set({
      activeWorkout: null,
      currentExerciseIndex: 0,
      currentSet: 1,
      restTimer: 0,
    }),
});
