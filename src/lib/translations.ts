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
    dumbbell: 'Haltere',
    cable: 'Cabo',
    machine: 'Máquina',
    bodyweight: 'Peso Corporal',
  },
  difficulty: {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  }
} as const;

export const exerciseTranslations: Record<string, string> = {
  'Push-up': 'Flexão',
  'Wide Push-up': 'Flexão Aberta',
  'Diamond Push-up': 'Flexão Diamante',
  'Archer Push-up': 'Flexão Arqueiro',
  'Pseudo Planche Push-up': 'Flexão Pseudo Planche',
  'Pike Push-up': 'Flexão Pike',
  'Australian Pull-up': 'Remada Australiana',
  'Pull-up': 'Barra Pronada',
  'Chin-up': 'Barra Supinada',
  'Archer Pull-up': 'Barra Arqueiro',
  'Muscle-up': 'Muscle-up',
  'L-sit Pull-up': 'Barra com L-sit',
  'Squat': 'Agachamento',
  'Jump Squat': 'Agachamento com Salto',
  'Bulgarian Split Squat': 'Agachamento Búlgaro',
  'Pistol Squat': 'Agachamento Pistol',
  'Shrimp Squat': 'Agachamento Camarão',
  'Nordic Curl': 'Curl Nórdico',
  'Handstand Push-up': 'Flexão Parada de Mão',
  'Wall Handstand Hold': 'Parada de Mão na Parede',
  'Freestanding Handstand': 'Parada de Mão Livre',
  'Close Push-up': 'Flexão Fechada',
  'Tricep Dip': 'Mergulho de Tríceps',
  'Commando Pull-up': 'Barra Commando',
  'Plank': 'Prancha',
  'Hollow Body Hold': 'Hollow Body',
  'L-sit': 'L-sit',
  'Dragon Flag': 'Bandeira do Dragão',
  'Ab Wheel Rollout': 'Roda Abdominal',
  'Hanging Knee Raise': 'Elevação de Joelhos na Barra',
  'Toes to Bar': 'Pés na Barra',
};

export const muscleGroupTranslations: Record<string, string> = translations.muscleGroups;
export const equipmentTranslations: Record<string, string> = translations.equipment;
export const difficultyTranslations: Record<string, string> = translations.difficulty;

export type MuscleGroupKey = keyof typeof translations.muscleGroups;
export type EquipmentKey = keyof typeof translations.equipment;
export type DifficultyKey = keyof typeof translations.difficulty;
