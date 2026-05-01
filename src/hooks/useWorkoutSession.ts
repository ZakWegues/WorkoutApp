'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { toast } from 'sonner';
import { WorkoutRow, WorkoutExerciseRow, ExerciseRow, Database } from '@/types/database';

export type FullWorkoutExercise = WorkoutExerciseRow & { exercises: ExerciseRow | null };
export type FullWorkout = WorkoutRow & { workout_exercises: FullWorkoutExercise[] };

export interface CompletedSet {
  exerciseId: string;
  setNumber: number;
  reps: number;
  weightKg: number;
}

interface SessionState {
  sessionId: string | null;
  workout: FullWorkout;
  currentExerciseIndex: number;
  currentSetIndex: number;
  completedSets: CompletedSet[];
  phase: 'exercising' | 'resting' | 'finished';
  restSecondsLeft: number;
  startedAt: string;
}

export function useWorkoutSession(initialWorkout: FullWorkout) {
  const supabase = createClient();

  const [state, setState] = useState<SessionState>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('active_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.workout.id === initialWorkout.id) {
            return parsed;
          }
        } catch (e) {}
      }
    }

    return {
      sessionId: null,
      workout: initialWorkout,
      currentExerciseIndex: 0,
      currentSetIndex: 1,
      completedSets: [],
      phase: 'exercising',
      restSecondsLeft: 0,
      startedAt: new Date().toISOString(),
    };
  });

  useEffect(() => {
    if (state.phase !== 'finished') {
      localStorage.setItem('active_session', JSON.stringify(state));
    } else {
      localStorage.removeItem('active_session');
    }
  }, [state]);

  const startSession = useCallback(async () => {
    if (state.sessionId) return state.sessionId;
    
    // Create session in Supabase
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      // Using quick session without auth
      return 'quick-session-id';
    }

    const insertData: Database['public']['Tables']['workout_sessions']['Insert'] = {
      workout_id: state.workout.id,
      user_id: userData.user.id,
      started_at: state.startedAt,
    };

    const { data, error } = await (supabase as any)
      .from('workout_sessions')
      .insert(insertData)
      .select('id')
      .single();

    if (error || !data) {
      toast.error('Erro ao iniciar sessão.');
      console.error(error);
      return null;
    }

    const sessionData = data as WorkoutSessionRow;
    setState(prev => ({ ...prev, sessionId: sessionData.id }));
    return sessionData.id;
  }, [state.sessionId, state.startedAt, state.workout.id, supabase]);

  const completeSet = useCallback(async (reps: number, weightKg: number) => {
    const currentEx = state.workout.workout_exercises[state.currentExerciseIndex];
    if (!currentEx || !currentEx.exercises) return;

    const newSet: CompletedSet = {
      exerciseId: currentEx.exercises.id,
      setNumber: state.currentSetIndex,
      reps,
      weightKg,
    };

    // Save to Supabase if we have a real sessionId
    if (state.sessionId && state.sessionId !== 'quick-session-id') {
      const insertSetData: Database['public']['Tables']['session_sets']['Insert'] = {
        session_id: state.sessionId,
        exercise_id: newSet.exerciseId,
        set_number: newSet.setNumber,
        reps_completed: reps,
        weight_kg: weightKg,
      };

      const { error } = await (supabase as any).from('session_sets').insert(insertSetData);
      if (error) {
        toast.error('Erro ao salvar a série.');
      }
    }

    setState(prev => {
      const nextSets = [...prev.completedSets, newSet];
      const isLastSet = prev.currentSetIndex >= currentEx.sets;

      if (isLastSet) {
        const isLastExercise = prev.currentExerciseIndex >= prev.workout.workout_exercises.length - 1;
        if (isLastExercise) {
          return { ...prev, completedSets: nextSets, phase: 'finished' };
        }
      }

      return {
        ...prev,
        completedSets: nextSets,
        phase: 'resting',
        restSecondsLeft: currentEx.rest_seconds || 60,
      };
    });
  }, [state, supabase]);

  const skipRest = useCallback(() => {
    setState(prev => {
      const currentEx = prev.workout.workout_exercises[prev.currentExerciseIndex];
      const isLastSet = prev.currentSetIndex >= currentEx.sets;

      if (isLastSet) {
        return {
          ...prev,
          phase: 'exercising',
          currentExerciseIndex: prev.currentExerciseIndex + 1,
          currentSetIndex: 1,
        };
      } else {
        return {
          ...prev,
          phase: 'exercising',
          currentSetIndex: prev.currentSetIndex + 1,
        };
      }
    });
  }, []);

  const finishSession = useCallback(async () => {
    if (state.sessionId && state.sessionId !== 'quick-session-id') {
      const { error } = await (supabase as any)
        .from('workout_sessions')
        .update({ finished_at: new Date().toISOString() })
        .eq('id', state.sessionId);
      
      if (error) {
        toast.error('Erro ao finalizar sessão.');
      }
    }
    setState(prev => ({ ...prev, phase: 'finished' }));
    localStorage.removeItem('active_session');
  }, [state.sessionId, supabase]);

  return {
    state,
    startSession,
    completeSet,
    skipRest,
    finishSession,
  };
}
