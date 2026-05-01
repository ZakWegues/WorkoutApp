import { create } from 'zustand';
import { createUserSlice, UserSlice } from '../store/userSlice';
import { createWorkoutSlice, WorkoutSlice } from '../store/workoutSlice';

type StoreState = UserSlice & WorkoutSlice;

export const useWorkoutStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createWorkoutSlice(...a),
}));
