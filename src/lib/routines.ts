export type Level = 1 | 2 | 3 | 4 | 5
export type DayType = 'push' | 'pull' | 'legs' | 'core' | 'rest' | 'legs_core'

export function getDayType(date: Date): DayType {
  const day = date.getDay() // 0=Dom, 1=Seg...
  const map: Record<number, DayType> = {
    0: 'rest',
    1: 'push',
    2: 'pull',
    3: 'legs',
    4: 'push',
    5: 'pull',
    6: 'legs_core',
  }
  return map[day]
}

export const dayTypeLabels: Record<DayType, { title: string, emoji: string, description: string }> = {
  push: { title: 'Dia de Push', emoji: '💪', description: 'Foco em peito, ombros e tríceps' },
  pull: { title: 'Dia de Pull', emoji: '🏋️', description: 'Foco em costas e bíceps' },
  legs: { title: 'Dia de Pernas', emoji: '🦵', description: 'Foco em quadríceps, isquiotibiais e glúteos' },
  core: { title: 'Dia de Core', emoji: '🔥', description: 'Foco em abdômen e estabilidade' },
  rest: { title: 'Descanso Ativo', emoji: '🧘', description: 'Alongamento e mobilidade' },
  legs_core: { title: 'Pernas + Core', emoji: '🦵🔥', description: 'Foco em membros inferiores e abdômen' },
}

export interface RoutineExercise {
  name: string
  nameEn: string
  sets: number
  reps: number | string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export const routines: Record<Exclude<DayType, 'legs_core'>, Record<Level, RoutineExercise[]>> = {
  push: {
    1: [
      { name: 'Flexão de Joelho', nameEn: 'Knee Push-up', sets: 3, reps: 8, difficulty: 'beginner' },
      { name: 'Flexão Inclinada', nameEn: 'Incline Push-up', sets: 3, reps: 6, difficulty: 'beginner' },
      { name: 'Prancha', nameEn: 'Plank', sets: 3, reps: '20s', difficulty: 'beginner' },
    ],
    2: [
      { name: 'Flexão Normal', nameEn: 'Push-up', sets: 3, reps: 10, difficulty: 'beginner' },
      { name: 'Flexão Diamante', nameEn: 'Diamond Push-up', sets: 3, reps: 6, difficulty: 'intermediate' },
      { name: 'Pike Push-up', nameEn: 'Pike Push-up', sets: 3, reps: 8, difficulty: 'beginner' },
    ],
    3: [
      { name: 'Flexão', nameEn: 'Push-up', sets: 4, reps: 15, difficulty: 'beginner' },
      { name: 'Flexão Arqueiro', nameEn: 'Archer Push-up', sets: 3, reps: 8, difficulty: 'intermediate' },
      { name: 'Pseudo Planche', nameEn: 'Pseudo Planche Push-up', sets: 3, reps: 8, difficulty: 'intermediate' },
    ],
    4: [
      { name: 'Flexão Arqueiro', nameEn: 'Archer Push-up', sets: 4, reps: 10, difficulty: 'intermediate' },
      { name: 'Pseudo Planche', nameEn: 'Pseudo Planche Push-up', sets: 4, reps: 10, difficulty: 'intermediate' },
      { name: 'Pike HSPU', nameEn: 'Pike Handstand Push-up', sets: 3, reps: 6, difficulty: 'advanced' },
    ],
    5: [
      { name: 'HSPU', nameEn: 'Handstand Push-up', sets: 4, reps: 6, difficulty: 'advanced' },
      { name: 'Planche Push-up Progressão', nameEn: 'Planche Push-up Progression', sets: 3, reps: 5, difficulty: 'advanced' },
      { name: 'Pseudo Planche', nameEn: 'Pseudo Planche Push-up', sets: 4, reps: 15, difficulty: 'intermediate' },
    ],
  },
  pull: {
    1: [
      { name: 'Remada Australiana', nameEn: 'Australian Pull-up', sets: 3, reps: 8, difficulty: 'beginner' },
      { name: 'Dead Hang', nameEn: 'Dead Hang', sets: 3, reps: '20s', difficulty: 'beginner' },
    ],
    2: [
      { name: 'Remada Australiana', nameEn: 'Australian Pull-up', sets: 4, reps: 10, difficulty: 'beginner' },
      { name: 'Chin-up Negativo', nameEn: 'Negative Chin-up', sets: 3, reps: 5, difficulty: 'intermediate' },
    ],
    3: [
      { name: 'Pull-up', nameEn: 'Pull-up', sets: 3, reps: 8, difficulty: 'intermediate' },
      { name: 'Chin-up', nameEn: 'Chin-up', sets: 3, reps: 8, difficulty: 'intermediate' },
      { name: 'Commando Pull-up', nameEn: 'Commando Pull-up', sets: 3, reps: 6, difficulty: 'intermediate' },
    ],
    4: [
      { name: 'Muscle-up Progressão', nameEn: 'Muscle-up Progression', sets: 3, reps: 5, difficulty: 'advanced' },
      { name: 'Archer Pull-up', nameEn: 'Archer Pull-up', sets: 3, reps: 6, difficulty: 'advanced' },
      { name: 'L-sit Pull-up', nameEn: 'L-sit Pull-up', sets: 3, reps: 5, difficulty: 'advanced' },
    ],
    5: [
      { name: 'Muscle-up', nameEn: 'Muscle-up', sets: 4, reps: 5, difficulty: 'advanced' },
      { name: 'Archer Pull-up', nameEn: 'Archer Pull-up', sets: 4, reps: 8, difficulty: 'advanced' },
      { name: 'L-sit Pull-up', nameEn: 'L-sit Pull-up', sets: 4, reps: 6, difficulty: 'advanced' },
    ],
  },
  legs: {
    1: [
      { name: 'Agachamento', nameEn: 'Squat', sets: 3, reps: 10, difficulty: 'beginner' },
      { name: 'Lunge', nameEn: 'Lunge', sets: 3, reps: 8, difficulty: 'beginner' },
    ],
    2: [
      { name: 'Agachamento', nameEn: 'Squat', sets: 4, reps: 12, difficulty: 'beginner' },
      { name: 'Jump Squat', nameEn: 'Jump Squat', sets: 3, reps: 8, difficulty: 'beginner' },
      { name: 'Lunge', nameEn: 'Lunge', sets: 3, reps: 10, difficulty: 'beginner' },
    ],
    3: [
      { name: 'Pistol Squat Progressão', nameEn: 'Pistol Squat Progression', sets: 3, reps: 6, difficulty: 'intermediate' },
      { name: 'Bulgarian Split Squat', nameEn: 'Bulgarian Split Squat', sets: 3, reps: 10, difficulty: 'intermediate' },
    ],
    4: [
      { name: 'Pistol Squat', nameEn: 'Pistol Squat', sets: 4, reps: 6, difficulty: 'advanced' },
      { name: 'Shrimp Squat', nameEn: 'Shrimp Squat', sets: 3, reps: 6, difficulty: 'advanced' },
      { name: 'Nordic Curl', nameEn: 'Nordic Curl', sets: 3, reps: 5, difficulty: 'advanced' },
    ],
    5: [
      { name: 'Pistol Squat', nameEn: 'Pistol Squat', sets: 4, reps: 8, difficulty: 'advanced' },
      { name: 'Shrimp Squat', nameEn: 'Shrimp Squat', sets: 4, reps: 8, difficulty: 'advanced' },
      { name: 'Nordic Curl', nameEn: 'Nordic Curl', sets: 4, reps: 6, difficulty: 'advanced' },
    ],
  },
  core: {
    1: [
      { name: 'Prancha', nameEn: 'Plank', sets: 3, reps: '20s', difficulty: 'beginner' },
      { name: 'Hollow Body', nameEn: 'Hollow Body', sets: 3, reps: '15s', difficulty: 'beginner' },
    ],
    2: [
      { name: 'Prancha', nameEn: 'Plank', sets: 3, reps: '40s', difficulty: 'beginner' },
      { name: 'Hollow Body', nameEn: 'Hollow Body', sets: 3, reps: '25s', difficulty: 'beginner' },
      { name: 'Hanging Knee Raise', nameEn: 'Hanging Knee Raise', sets: 3, reps: 8, difficulty: 'beginner' },
    ],
    3: [
      { name: 'L-sit Progressão', nameEn: 'L-sit Progression', sets: 3, reps: '15s', difficulty: 'intermediate' },
      { name: 'Toes to Bar', nameEn: 'Toes to Bar', sets: 3, reps: 8, difficulty: 'intermediate' },
      { name: 'Ab Wheel', nameEn: 'Ab Wheel', sets: 3, reps: 8, difficulty: 'intermediate' },
    ],
    4: [
      { name: 'L-sit', nameEn: 'L-sit', sets: 3, reps: '20s', difficulty: 'intermediate' },
      { name: 'Dragon Flag Progressão', nameEn: 'Dragon Flag Progression', sets: 3, reps: 6, difficulty: 'advanced' },
      { name: 'Toes to Bar', nameEn: 'Toes to Bar', sets: 3, reps: 12, difficulty: 'intermediate' },
    ],
    5: [
      { name: 'Dragon Flag', nameEn: 'Dragon Flag', sets: 4, reps: 6, difficulty: 'advanced' },
      { name: 'Planche Hold', nameEn: 'Planche Hold', sets: 3, reps: '10s', difficulty: 'advanced' },
      { name: 'Front Lever Progressão', nameEn: 'Front Lever Progression', sets: 3, reps: '10s', difficulty: 'advanced' },
    ],
  },
  rest: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  },
}

export function getTodayRoutine(level: Level): {
  dayType: DayType
  exercises: RoutineExercise[]
  label: typeof dayTypeLabels[DayType]
} {
  const dayType = getDayType(new Date())
  
  if (dayType === 'legs_core') {
    return {
      dayType,
      exercises: [...routines.legs[level], ...routines.core[level]],
      label: dayTypeLabels.legs_core,
    }
  }

  return {
    dayType,
    exercises: routines[dayType as Exclude<DayType, 'legs_core'>][level] || [],
    label: dayTypeLabels[dayType],
  }
}

