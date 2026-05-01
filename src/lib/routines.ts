export type Level = 1 | 2 | 3 | 4 | 5
export type DayType = 'push' | 'pull' | 'legs' | 'core' | 'rest'

export function getDayType(date: Date): DayType {
  const day = date.getDay() // 0=Dom, 1=Seg...
  const map: Record<number, DayType> = {
    0: 'rest',
    1: 'push',
    2: 'pull',
    3: 'legs',
    4: 'push',
    5: 'pull',
    6: 'legs',
  }
  return map[day]
}

export const dayTypeLabels: Record<DayType, { title: string, emoji: string, description: string }> = {
  push: { title: 'Dia de Push', emoji: '💪', description: 'Foco em peito, ombros e tríceps' },
  pull: { title: 'Dia de Pull', emoji: '🏋️', description: 'Foco em costas e bíceps' },
  legs: { title: 'Dia de Pernas', emoji: '🦵', description: 'Foco em quadríceps, isquiotibiais e glúteos' },
  core: { title: 'Dia de Core', emoji: '🔥', description: 'Foco em abdômen e estabilidade' },
  rest: { title: 'Descanso Ativo', emoji: '🧘', description: 'Alongamento e mobilidade' },
}

interface RoutineExercise {
  name: string
  nameEn: string
  sets: number
  reps: number | string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export const routines: Record<DayType, Record<Level, RoutineExercise[]>> = {
  push: {
    1: [
      { name: 'Flexão de Joelho', nameEn: 'Knee Push-up', sets: 3, reps: 8, difficulty: 'beginner' },
      { name: 'Flexão Inclinada', nameEn: 'Incline Push-up', sets: 3, reps: 6, difficulty: 'beginner' },
      { name: 'Prancha', nameEn: 'Plank', sets: 3, reps: '20s', difficulty: 'beginner' },
    ],
    2: [
      { name: 'Flexão', nameEn: 'Push-up', sets: 3, reps: 10, difficulty: 'beginner' },
      { name: 'Flexão Diamante', nameEn: 'Diamond Push-up', sets: 3, reps: 6, difficulty: 'intermediate' },
      { name: 'Flexão Pike', nameEn: 'Pike Push-up', sets: 3, reps: 8, difficulty: 'beginner' },
    ],
    3: [
      { name: 'Flexão', nameEn: 'Push-up', sets: 4, reps: 15, difficulty: 'beginner' },
      { name: 'Flexão Arqueiro', nameEn: 'Archer Push-up', sets: 3, reps: 8, difficulty: 'intermediate' },
      { name: 'Pseudo Planche', nameEn: 'Pseudo Planche Push-up', sets: 3, reps: 8, difficulty: 'intermediate' },
    ],
    4: [
      { name: 'Flexão Arqueiro', nameEn: 'Archer Push-up', sets: 4, reps: 10, difficulty: 'intermediate' },
      { name: 'Pseudo Planche', nameEn: 'Pseudo Planche Push-up', sets: 4, reps: 10, difficulty: 'intermediate' },
      { name: 'Flexão Pike', nameEn: 'Pike Push-up', sets: 3, reps: 6, difficulty: 'beginner' },
    ],
    5: [
      { name: 'Flexão Parada de Mão', nameEn: 'Handstand Push-up', sets: 4, reps: 6, difficulty: 'advanced' },
      { name: 'Planche Push-up', nameEn: 'Pseudo Planche Push-up', sets: 3, reps: 5, difficulty: 'advanced' },
      { name: 'Flexão Arqueiro', nameEn: 'Archer Push-up', sets: 4, reps: 15, difficulty: 'intermediate' },
    ],
  },
  pull: {
    1: [
      { name: 'Remada Australiana', nameEn: 'Australian Pull-up', sets: 3, reps: 8, difficulty: 'beginner' },
      { name: 'Dead Hang', nameEn: 'Dead Hang', sets: 3, reps: '20s', difficulty: 'beginner' },
    ],
    2: [
      { name: 'Remada Australiana', nameEn: 'Australian Pull-up', sets: 4, reps: 10, difficulty: 'beginner' },
      { name: 'Barra Negativa', nameEn: 'Negative Pull-up', sets: 3, reps: 5, difficulty: 'intermediate' },
    ],
    3: [
      { name: 'Barra Pronada', nameEn: 'Pull-up', sets: 3, reps: 8, difficulty: 'intermediate' },
      { name: 'Barra Supinada', nameEn: 'Chin-up', sets: 3, reps: 8, difficulty: 'intermediate' },
      { name: 'Barra Commando', nameEn: 'Commando Pull-up', sets: 3, reps: 6, difficulty: 'intermediate' },
    ],
    4: [
      { name: 'Muscle-up', nameEn: 'Muscle-up', sets: 3, reps: 5, difficulty: 'advanced' },
      { name: 'Barra Arqueiro', nameEn: 'Archer Pull-up', sets: 3, reps: 6, difficulty: 'advanced' },
      { name: 'Barra com L-sit', nameEn: 'L-sit Pull-up', sets: 3, reps: 5, difficulty: 'advanced' },
    ],
    5: [
      { name: 'Muscle-up', nameEn: 'Muscle-up', sets: 4, reps: 5, difficulty: 'advanced' },
      { name: 'Barra Arqueiro', nameEn: 'Archer Pull-up', sets: 4, reps: 8, difficulty: 'advanced' },
      { name: 'Barra com L-sit', nameEn: 'L-sit Pull-up', sets: 4, reps: 6, difficulty: 'advanced' },
    ],
  },
  legs: {
    1: [
      { name: 'Agachamento', nameEn: 'Squat', sets: 3, reps: 10, difficulty: 'beginner' },
      { name: 'Avanço', nameEn: 'Lunge', sets: 3, reps: 8, difficulty: 'beginner' },
    ],
    2: [
      { name: 'Agachamento', nameEn: 'Squat', sets: 4, reps: 12, difficulty: 'beginner' },
      { name: 'Agachamento com Salto', nameEn: 'Jump Squat', sets: 3, reps: 8, difficulty: 'beginner' },
      { name: 'Agachamento Búlgaro', nameEn: 'Bulgarian Split Squat', sets: 3, reps: 10, difficulty: 'intermediate' },
    ],
    3: [
      { name: 'Agachamento Búlgaro', nameEn: 'Bulgarian Split Squat', sets: 4, reps: 10, difficulty: 'intermediate' },
      { name: 'Pistol Squat Progressão', nameEn: 'Pistol Squat', sets: 3, reps: 6, difficulty: 'advanced' },
    ],
    4: [
      { name: 'Agachamento Pistol', nameEn: 'Pistol Squat', sets: 4, reps: 6, difficulty: 'advanced' },
      { name: 'Agachamento Camarão', nameEn: 'Shrimp Squat', sets: 3, reps: 6, difficulty: 'advanced' },
      { name: 'Curl Nórdico', nameEn: 'Nordic Curl', sets: 3, reps: 5, difficulty: 'advanced' },
    ],
    5: [
      { name: 'Agachamento Pistol', nameEn: 'Pistol Squat', sets: 4, reps: 8, difficulty: 'advanced' },
      { name: 'Agachamento Camarão', nameEn: 'Shrimp Squat', sets: 4, reps: 8, difficulty: 'advanced' },
      { name: 'Curl Nórdico', nameEn: 'Nordic Curl', sets: 4, reps: 6, difficulty: 'advanced' },
    ],
  },
  core: {
    1: [
      { name: 'Prancha', nameEn: 'Plank', sets: 3, reps: '20s', difficulty: 'beginner' },
      { name: 'Hollow Body', nameEn: 'Hollow Body Hold', sets: 3, reps: '15s', difficulty: 'beginner' },
    ],
    2: [
      { name: 'Prancha', nameEn: 'Plank', sets: 3, reps: '40s', difficulty: 'beginner' },
      { name: 'Hollow Body', nameEn: 'Hollow Body Hold', sets: 3, reps: '25s', difficulty: 'beginner' },
      { name: 'Elevação de Joelhos', nameEn: 'Hanging Knee Raise', sets: 3, reps: 8, difficulty: 'beginner' },
    ],
    3: [
      { name: 'L-sit', nameEn: 'L-sit', sets: 3, reps: '15s', difficulty: 'intermediate' },
      { name: 'Pés na Barra', nameEn: 'Toes to Bar', sets: 3, reps: 8, difficulty: 'intermediate' },
      { name: 'Roda Abdominal', nameEn: 'Ab Wheel Rollout', sets: 3, reps: 8, difficulty: 'intermediate' },
    ],
    4: [
      { name: 'L-sit', nameEn: 'L-sit', sets: 3, reps: '20s', difficulty: 'intermediate' },
      { name: 'Bandeira do Dragão', nameEn: 'Dragon Flag', sets: 3, reps: 6, difficulty: 'advanced' },
      { name: 'Pés na Barra', nameEn: 'Toes to Bar', sets: 3, reps: 12, difficulty: 'intermediate' },
    ],
    5: [
      { name: 'Bandeira do Dragão', nameEn: 'Dragon Flag', sets: 4, reps: 6, difficulty: 'advanced' },
      { name: 'L-sit', nameEn: 'L-sit', sets: 3, reps: '30s', difficulty: 'intermediate' },
      { name: 'Front Lever', nameEn: 'Front Lever', sets: 3, reps: '10s', difficulty: 'advanced' },
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
  return {
    dayType,
    exercises: routines[dayType][level] || [],
    label: dayTypeLabels[dayType],
  }
}
