import { Exercise, Workout } from '../types';
import { EXERCISES_DB } from './exercises';

export interface ChallengeDay {
  dayNumber: number;
  isRestDay: boolean;
  focusArea: 'full_body' | 'abs' | 'chest' | 'arm' | 'leg' | 'rest';
  title: string;
  description: string;
  exercises?: Exercise[];
  recoveryTip?: string;
  estimatedMinutes?: number;
  estimatedCalories?: number;
}

const getEx = (id: string) => {
  const found = EXERCISES_DB.find(ex => ex.id === id);
  if (!found) throw new Error(`Exercise ${id} not found in DB`);
  return { ...found };
};

// Generates the 28-day challenge program programmatically for consistency and progression
export const getChallengeDays = (): ChallengeDay[] => {
  const challengeDays: ChallengeDay[] = [];

  const focusAreaSequence: ('full_body' | 'abs' | 'chest' | 'arm' | 'leg')[] = [
    'full_body', // Day 1
    'abs',       // Day 2
    'chest',     // Day 3
    // Day 4 is REST
    'arm',       // Day 5
    'leg',       // Day 6
    'full_body'  // Day 7
  ];

  const restTips = [
    'Мышцы растут и восстанавливаются во время отдыха, а не на тренировках. Убедитесь, что вы пьете достаточно воды (не менее 2 литров сегодня) и совершите легкую прогулку на свежем воздухе.',
    'Качественный сон (7-8 часов) — это главный катализатор спортивного прогресса. Сегодня постарайтесь лечь спать до 23:00 и хорошо проветрить комнату перед сном.',
    'Питание — это 70% вашего успеха. Потребляйте достаточное количество белка (курица, рыба, яйца, творог, бобовые) для быстрого восстановления поврежденных тренировками мышечных волокон.',
    'Попробуйте провести сегодня сессию легкой растяжки. Это снимет мышечный тонус, улучшит гибкость суставов и разгонит накопившуюся молочную кислоту.',
    'Слушайте сигналы своего тела. Если вы чувствуете глубокую мышечную усталость, легкий самомассаж или теплая ванна с солью помогут ускорить кровообращение и снять спазмы.',
    'Углеводы — это топливо для тренировок. Отдавайте предпочтение сложным углеводам (овсянка, гречка, бурый рис) — они обеспечат вас энергией на следующий цикл тренировок.',
    'Вы проделали колоссальную работу и вышли на финишную прямую! Сегодня наберитесь сил, расслабьтесь и приготовьтесь к финальному рывку последних тренировок!'
  ];

  let focusIndex = 0;
  let restIndex = 0;

  for (let day = 1; day <= 28; day++) {
    const isRest = day % 4 === 0;

    if (isRest) {
      challengeDays.push({
        dayNumber: day,
        isRestDay: true,
        focusArea: 'rest',
        title: `День ${day}: Восстановление`,
        description: 'Важный день для отдыха мышц и нервной системы.',
        recoveryTip: restTips[restIndex % restTips.length]
      });
      restIndex++;
    } else {
      const focus = focusAreaSequence[focusIndex % focusAreaSequence.length];
      focusIndex++;

      // Week multiplier for progressive overload
      const week = Math.ceil(day / 7);
      const intensityMultiplier = 1.0 + (week - 1) * 0.15; // +15% reps/duration every week

      // Select exercises based on focus area
      let exerciseIds: string[] = [];
      if (focus === 'full_body') {
        exerciseIds = ['jumping_jacks', 'squats', 'pushups', 'lunges', 'plank', 'cobra_stretch'];
      } else if (focus === 'abs') {
        exerciseIds = ['jumping_jacks', 'crunches', 'mountain_climbers', 'leg_raises', 'plank'];
      } else if (focus === 'chest') {
        exerciseIds = ['jumping_jacks', 'pushups', 'wall_sit', 'pushups', 'cobra_stretch'];
      } else if (focus === 'arm') {
        exerciseIds = ['jumping_jacks', 'pushups', 'mountain_climbers', 'pushups', 'plank'];
      } else if (focus === 'leg') {
        exerciseIds = ['squats', 'lunges', 'wall_sit', 'squats', 'lunges'];
      }

      // Map and scale exercises
      const dayExercises: Exercise[] = exerciseIds.map((id, idx) => {
        const ex = getEx(id);
        const cloned = { ...ex, id: `${ex.id}-d${day}-${idx}` };
        
        if (cloned.isDurationBased) {
          cloned.duration = Math.round(cloned.duration * intensityMultiplier);
        } else {
          cloned.reps = Math.round(cloned.reps * intensityMultiplier);
        }
        return cloned;
      });

      // Calculate total stats
      const estimatedMinutes = Math.max(2, Math.round(dayExercises.reduce((sum, ex) => {
        return sum + (ex.isDurationBased ? ex.duration : 15);
      }, 0) / 60));
      
      const estimatedCalories = dayExercises.reduce((sum, ex) => {
        const minutes = ex.isDurationBased ? (ex.duration / 60) : (ex.reps * 3 / 60);
        return sum + Math.round(minutes * ex.calorieRate);
      }, 0) || 20;

      const focusLabels = {
        full_body: 'Все тело',
        abs: 'Пресс',
        chest: 'Грудь',
        arm: 'Руки',
        leg: 'Ноги'
      };

      challengeDays.push({
        dayNumber: day,
        isRestDay: false,
        focusArea: focus,
        title: `День ${day}: ${focusLabels[focus]}`,
        description: `Комплексная проработка зоны: ${focusLabels[focus]}. Неделя ${week}.`,
        exercises: dayExercises,
        estimatedMinutes,
        estimatedCalories
      });
    }
  }

  return challengeDays;
};

// Convert challenge day to playable Workout object
export const challengeDayToWorkout = (day: ChallengeDay): Workout => {
  if (day.isRestDay || !day.exercises) {
    throw new Error('Cannot convert a rest day to a playable workout');
  }

  return {
    id: `challenge_day_${day.dayNumber}`,
    name: `День ${day.dayNumber}: ${day.title.split(': ')[1] || day.title}`,
    description: day.description,
    difficulty: day.dayNumber <= 7 ? 'beginner' : day.dayNumber <= 18 ? 'intermediate' : 'advanced',
    focusArea: day.focusArea === 'rest' ? 'full_body' : day.focusArea,
    exercises: day.exercises,
    estimatedMinutes: day.estimatedMinutes || 5,
    estimatedCalories: day.estimatedCalories || 30,
    iconName: 'Trophy'
  };
};
