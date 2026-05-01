export const translations = {
  muscleGroups: {
    chest: 'Peito',
    back: 'Costas',
    legs: 'Pernas',
    shoulders: 'Ombros',
    arms: 'Braços',
    core: 'Core',
  },
  equipment: {
    barbell: 'Barra',
    dumbbell: 'Halteres',
    cable: 'Cabo',
    machine: 'Máquina',
    bodyweight: 'Peso corporal',
  },
  difficulty: {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  }
} as const;

export type MuscleGroupKey = keyof typeof translations.muscleGroups;
export type EquipmentKey = keyof typeof translations.equipment;
export type DifficultyKey = keyof typeof translations.difficulty;
