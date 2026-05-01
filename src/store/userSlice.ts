import { StateCreator } from 'zustand';
import { User } from '@/types';

export interface UserSlice {
  user: User | null;
  setProfile: (data: Partial<User>) => void;
  clearProfile: () => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  user: null,
  setProfile: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : (data as User),
    })),
  clearProfile: () => set({ user: null }),
});
