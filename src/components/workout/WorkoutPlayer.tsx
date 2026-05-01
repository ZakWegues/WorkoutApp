'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkoutSession, FullWorkout } from '@/hooks/useWorkoutSession';
import { WorkoutHeader } from './WorkoutHeader';
import { ExerciseView } from './ExerciseView';
import { RestView } from './RestView';
import { WorkoutSummary } from './WorkoutSummary';
import { ExitConfirmModal } from './ExitConfirmModal';

interface WorkoutPlayerProps {
  workout: FullWorkout;
}

export function WorkoutPlayer({ workout }: WorkoutPlayerProps) {
  const router = useRouter();
  const { state, startSession, completeSet, skipRest, finishSession } = useWorkoutSession(workout);
  const [showExitModal, setShowExitModal] = useState(false);

  // Auto-start session
  useEffect(() => {
    startSession();
  }, [startSession]);

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    localStorage.removeItem('active_session');
    router.back();
  };

  // Progress logic
  const totalSets = workout.workout_exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const progress = state.completedSets.length / totalSets;

  if (state.phase === 'finished') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="summary"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          <WorkoutSummary 
            workout={state.workout} 
            completedSets={state.completedSets} 
            startedAt={state.startedAt} 
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  const currentExercise = workout.workout_exercises[state.currentExerciseIndex];
  if (!currentExercise || !currentExercise.exercises) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0a]">
      <WorkoutHeader 
        title={workout.name} 
        progress={progress} 
        startedAt={state.startedAt} 
        onExit={handleExit} 
      />

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {state.phase === 'exercising' && (
            <motion.div
              key="exercising"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ExerciseView 
                exercise={currentExercise}
                currentExerciseNum={state.currentExerciseIndex + 1}
                totalExercises={workout.workout_exercises.length}
                currentSetNum={state.currentSetIndex}
                onComplete={(reps, weight) => completeSet(reps, weight)}
              />
            </motion.div>
          )}

          {state.phase === 'resting' && (
            <motion.div
              key="resting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <RestView 
                durationSeconds={state.restSecondsLeft}
                nextExerciseName={
                  state.currentSetIndex >= currentExercise.sets 
                    ? (workout.workout_exercises[state.currentExerciseIndex + 1]?.exercises?.name || 'Fim do treino')
                    : currentExercise.exercises.name
                }
                nextSetNum={
                  state.currentSetIndex >= currentExercise.sets 
                    ? 1 
                    : state.currentSetIndex + 1
                }
                onSkip={skipRest}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ExitConfirmModal 
        isOpen={showExitModal} 
        onClose={() => setShowExitModal(false)} 
        onConfirm={confirmExit} 
      />
    </div>
  );
}
