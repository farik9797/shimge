import { Workout } from '../types';
import { EXERCISES_DB } from './exercises';

const getEx = (id: string) => {
  const found = EXERCISES_DB.find(ex => ex.id === id);
  if (!found) throw new Error(`Exercise ${id} not found in DB`);
  return { ...found };
};

// Helper to create copy of exercise with customized reps/duration
const exWith = (id: string, overrides: { reps?: number; duration?: number }) => {
  const ex = getEx(id);
  if (overrides.reps !== undefined) {
    ex.reps = overrides.reps;
    ex.isDurationBased = false;
  }
  if (overrides.duration !== undefined) {
    ex.duration = overrides.duration;
    ex.isDurationBased = true;
  }
  return ex;
};

export const PREDEFINED_WORKOUTS: Workout[] = [
  // BEGINNER
  {
    id: 'full_body_beginner',
    name: 'Все тело (Новичок)',
    description: 'Идеальная разминка и тренировка для всего тела, направленная на тонус мышц и выносливость.',
    difficulty: 'beginner',
    focusArea: 'full_body',
    exercises: [
      exWith('jumping_jacks', { duration: 30 }),
      exWith('squats', { reps: 12 }),
      exWith('pushups', { reps: 8 }),
      exWith('lunges', { reps: 10 }),
      exWith('crunches', { reps: 12 }),
      exWith('plank', { duration: 30 }),
      exWith('cobra_stretch', { duration: 20 })
    ],
    estimatedMinutes: 7,
    estimatedCalories: 45,
    iconName: 'Activity'
  },
  {
    id: 'abs_beginner',
    name: 'Пресс (Новичок)',
    description: 'Простая и эффективная тренировка для укрепления кора и проработки прямой мышцы живота.',
    difficulty: 'beginner',
    focusArea: 'abs',
    exercises: [
      exWith('jumping_jacks', { duration: 25 }),
      exWith('crunches', { reps: 12 }),
      exWith('mountain_climbers', { duration: 20 }),
      exWith('leg_raises', { reps: 10 }),
      exWith('crunches', { reps: 10 }),
      exWith('plank', { duration: 25 }),
      exWith('cobra_stretch', { duration: 20 })
    ],
    estimatedMinutes: 6,
    estimatedCalories: 35,
    iconName: 'Flame'
  },
  {
    id: 'chest_beginner',
    name: 'Грудь (Новичок)',
    description: 'Укрепление грудных мышц и трицепсов без дополнительного веса с помощью отжиманий.',
    difficulty: 'beginner',
    focusArea: 'chest',
    exercises: [
      exWith('jumping_jacks', { duration: 30 }),
      exWith('pushups', { reps: 8 }),
      exWith('wall_sit', { duration: 30 }),
      exWith('pushups', { reps: 6 }),
      exWith('plank', { duration: 25 }),
      exWith('cobra_stretch', { duration: 25 })
    ],
    estimatedMinutes: 6,
    estimatedCalories: 38,
    iconName: 'Heart'
  },
  {
    id: 'arm_beginner',
    name: 'Руки (Новичок)',
    description: 'Базовый комплекс упражнений для тонуса бицепсов, трицепсов и плечевых мышц.',
    difficulty: 'beginner',
    focusArea: 'arm',
    exercises: [
      exWith('jumping_jacks', { duration: 30 }),
      exWith('pushups', { reps: 10 }),
      exWith('mountain_climbers', { duration: 25 }),
      exWith('pushups', { reps: 8 }),
      exWith('plank', { duration: 30 })
    ],
    estimatedMinutes: 5,
    estimatedCalories: 32,
    iconName: 'TrendingUp'
  },
  {
    id: 'leg_beginner',
    name: 'Ноги (Новичок)',
    description: 'Проработка бедер и ягодиц с минимальной нагрузкой на суставы.',
    difficulty: 'beginner',
    focusArea: 'leg',
    exercises: [
      exWith('jumping_jacks', { duration: 25 }),
      exWith('squats', { reps: 12 }),
      exWith('lunges', { reps: 10 }),
      exWith('wall_sit', { duration: 30 }),
      exWith('squats', { reps: 10 }),
      exWith('lunges', { reps: 8 })
    ],
    estimatedMinutes: 7,
    estimatedCalories: 42,
    iconName: 'Activity'
  },

  // INTERMEDIATE
  {
    id: 'full_body_intermediate',
    name: 'Все тело (Средний)',
    description: 'Интенсивная тренировка на все группы мышц для тех, кто хочет повысить силу и сжечь жир.',
    difficulty: 'intermediate',
    focusArea: 'full_body',
    exercises: [
      exWith('jumping_jacks', { duration: 40 }),
      exWith('squats', { reps: 20 }),
      exWith('pushups', { reps: 16 }),
      exWith('lunges', { reps: 16 }),
      exWith('mountain_climbers', { duration: 30 }),
      exWith('crunches', { reps: 18 }),
      exWith('leg_raises', { reps: 14 }),
      exWith('plank', { duration: 45 }),
      exWith('cobra_stretch', { duration: 30 })
    ],
    estimatedMinutes: 11,
    estimatedCalories: 75,
    iconName: 'Activity'
  },
  {
    id: 'abs_intermediate',
    name: 'Пресс (Средний)',
    description: 'Комплексная проработка верхнего, нижнего пресса и косых мышц живота.',
    difficulty: 'intermediate',
    focusArea: 'abs',
    exercises: [
      exWith('jumping_jacks', { duration: 35 }),
      exWith('crunches', { reps: 20 }),
      exWith('mountain_climbers', { duration: 35 }),
      exWith('leg_raises', { reps: 15 }),
      exWith('crunches', { reps: 15 }),
      exWith('mountain_climbers', { duration: 30 }),
      exWith('plank', { duration: 45 }),
      exWith('cobra_stretch', { duration: 30 })
    ],
    estimatedMinutes: 10,
    estimatedCalories: 60,
    iconName: 'Flame'
  },

  // ADVANCED
  {
    id: 'full_body_advanced',
    name: 'Все тело (ПРО)',
    description: 'Высокоинтенсивный тренинг для максимального сжигания калорий и развития силы.',
    difficulty: 'advanced',
    focusArea: 'full_body',
    exercises: [
      exWith('jumping_jacks', { duration: 60 }),
      exWith('squats', { reps: 30 }),
      exWith('pushups', { reps: 24 }),
      exWith('lunges', { reps: 24 }),
      exWith('mountain_climbers', { duration: 45 }),
      exWith('crunches', { reps: 25 }),
      exWith('leg_raises', { reps: 20 }),
      exWith('squats', { reps: 20 }),
      exWith('pushups', { reps: 18 }),
      exWith('plank', { duration: 60 }),
      exWith('cobra_stretch', { duration: 40 })
    ],
    estimatedMinutes: 15,
    estimatedCalories: 120,
    iconName: 'Activity'
  }
];

export const getWorkoutById = (id: string): Workout | undefined => {
  return PREDEFINED_WORKOUTS.find(w => w.id === id);
};
