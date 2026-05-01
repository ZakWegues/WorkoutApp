export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          level: 'beginner' | 'intermediate' | 'advanced'
          goal: 'strength' | 'hypertrophy' | 'endurance' | 'weight_loss' | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          name: string
          level?: 'beginner' | 'intermediate' | 'advanced'
          goal?: 'strength' | 'hypertrophy' | 'endurance' | 'weight_loss' | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          level?: 'beginner' | 'intermediate' | 'advanced'
          goal?: 'strength' | 'hypertrophy' | 'endurance' | 'weight_loss' | null
          avatar_url?: string | null
          created_at?: string
        }
      }
      exercises: {
        Row: {
          id: string
          name: string
          muscle_group: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core'
          secondary_muscles: string[] | null
          equipment: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight'
          difficulty: 'beginner' | 'intermediate' | 'advanced' | null
          instructions: string | null
          gif_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          muscle_group: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core'
          secondary_muscles?: string[] | null
          equipment: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight'
          difficulty?: 'beginner' | 'intermediate' | 'advanced' | null
          instructions?: string | null
          gif_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          muscle_group?: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core'
          secondary_muscles?: string[] | null
          equipment?: 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight'
          difficulty?: 'beginner' | 'intermediate' | 'advanced' | null
          instructions?: string | null
          gif_url?: string | null
          created_at?: string
        }
      }
      workouts: {
        Row: {
          id: string
          user_id: string | null
          name: string
          description: string | null
          estimated_duration_min: number | null
          is_ai_generated: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          description?: string | null
          estimated_duration_min?: number | null
          is_ai_generated?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          description?: string | null
          estimated_duration_min?: number | null
          is_ai_generated?: boolean | null
          created_at?: string
        }
      }
      workout_exercises: {
        Row: {
          id: string
          workout_id: string | null
          exercise_id: string | null
          position: number
          sets: number
          reps: number
          rest_seconds: number
          weight_suggestion_kg: number | null
        }
        Insert: {
          id?: string
          workout_id?: string | null
          exercise_id?: string | null
          position: number
          sets?: number
          reps?: number
          rest_seconds?: number
          weight_suggestion_kg?: number | null
        }
        Update: {
          id?: string
          workout_id?: string | null
          exercise_id?: string | null
          position?: number
          sets?: number
          reps?: number
          rest_seconds?: number
          weight_suggestion_kg?: number | null
        }
      }
      workout_sessions: {
        Row: {
          id: string
          workout_id: string | null
          user_id: string | null
          started_at: string
          finished_at: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          workout_id?: string | null
          user_id?: string | null
          started_at?: string
          finished_at?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          workout_id?: string | null
          user_id?: string | null
          started_at?: string
          finished_at?: string | null
          notes?: string | null
        }
      }
      session_sets: {
        Row: {
          id: string
          session_id: string | null
          exercise_id: string | null
          set_number: number
          reps_completed: number | null
          weight_kg: number | null
          completed_at: string
        }
        Insert: {
          id?: string
          session_id?: string | null
          exercise_id?: string | null
          set_number: number
          reps_completed?: number | null
          weight_kg?: number | null
          completed_at?: string
        }
        Update: {
          id?: string
          session_id?: string | null
          exercise_id?: string | null
          set_number?: number
          reps_completed?: number | null
          weight_kg?: number | null
          completed_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type ProfileRow = Database['public']['Tables']['profiles']['Row']
export type ExerciseRow = Database['public']['Tables']['exercises']['Row']
export type WorkoutRow = Database['public']['Tables']['workouts']['Row']
export type WorkoutExerciseRow = Database['public']['Tables']['workout_exercises']['Row']
export type WorkoutSessionRow = Database['public']['Tables']['workout_sessions']['Row']
export type SessionSetRow = Database['public']['Tables']['session_sets']['Row']
