import { Exercise } from '../types';

export const EXERCISES_DB: Exercise[] = [
  {
    id: 'jumping_jacks',
    name: 'Прыжки Jumping Jacks',
    description: 'Исходное положение: ноги вместе, руки опущены. Сделайте прыжок, одновременно расставляя ноги шире плеч и поднимая руки вверх над головой. Вернитесь в исходное положение.',
    duration: 30,
    reps: 0,
    isDurationBased: true,
    calorieRate: 8,
    animationType: 'jumping_jacks'
  },
  {
    id: 'pushups',
    name: 'Классические отжимания',
    description: 'Примите упор лежа на прямых руках. Держите тело в одну линию от головы до пяток. Опустите корпус вниз, сгибая локти, пока грудь не окажется почти у пола. Вытолкните себя вверх.',
    duration: 0,
    reps: 12,
    isDurationBased: false,
    calorieRate: 7,
    animationType: 'pushups'
  },
  {
    id: 'squats',
    name: 'Приседания',
    description: 'Поставьте ноги на ширине плеч. Отведите таз назад и согните колени, как будто садитесь на стул. Опуститесь до параллели бедер с полом, держа спину прямой. Вернитесь в исходное положение.',
    duration: 0,
    reps: 15,
    isDurationBased: false,
    calorieRate: 6,
    animationType: 'squats'
  },
  {
    id: 'plank',
    name: 'Планка на локтях',
    description: 'Примите упор лежа, согнув руки в локтях под углом 90 градусов. Распределите вес на предплечья и носки. Держите тело прямо, напрягите пресс и ягодицы, не допускайте прогиба в пояснице.',
    duration: 30,
    reps: 0,
    isDurationBased: true,
    calorieRate: 5,
    animationType: 'plank'
  },
  {
    id: 'crunches',
    name: 'Скручивания на пресс',
    description: 'Лягте на спину, согните колени, стопы на полу. Руки держите у висков. Напрягая мышцы живота, оторвите лопатки от пола, скручивая корпус вперед. Плавно опуститесь назад.',
    duration: 0,
    reps: 15,
    isDurationBased: false,
    calorieRate: 6,
    animationType: 'crunches'
  },
  {
    id: 'leg_raises',
    name: 'Подъемы ног лежа',
    description: 'Лягте на спину, руки положите под ягодицы для поддержки поясницы. Медленно поднимите прямые ноги вверх до угла 90 градусов, затем плавно опустите их, не касаясь пятками пола.',
    duration: 0,
    reps: 12,
    isDurationBased: false,
    calorieRate: 5,
    animationType: 'leg_raises'
  },
  {
    id: 'wall_sit',
    name: 'Стульчик у стены',
    description: 'Прижмитесь спиной к стене и опуститесь вниз, сгибая колени под углом 90 градусов, словно сидите на стуле. Удерживайте это положение, напрягая квадрицепсы и ягодицы.',
    duration: 30,
    reps: 0,
    isDurationBased: true,
    calorieRate: 4,
    animationType: 'wall_sit'
  },
  {
    id: 'lunges',
    name: 'Выпады вперед',
    description: 'Встаньте прямо, руки на поясе. Сделайте широкий шаг вперед одной ногой и опустите таз вниз, пока бедро передней ноги не будет параллельно полу, а колено задней почти не коснется пола. Вернитесь назад.',
    duration: 0,
    reps: 12,
    isDurationBased: false,
    calorieRate: 7,
    animationType: 'lunges'
  },
  {
    id: 'cobra_stretch',
    name: 'Растяжка «Кобра»',
    description: 'Лягте на живот, ладони поставьте под плечами. Выпрямляя руки, поднимите грудную клетку вверх, прогибая спину. Смотрите вперед или немного вверх. Расслабьте плечи.',
    duration: 30,
    reps: 0,
    isDurationBased: true,
    calorieRate: 3,
    animationType: 'cobra_stretch'
  },
  {
    id: 'mountain_climbers',
    name: 'Упражнение «Альпинист»',
    description: 'Примите упор лежа на прямых руках. Быстро поочередно подтягивайте колени к груди, имитируя бег в гору. Держите спину ровной, не поднимайте высоко таз.',
    duration: 30,
    reps: 0,
    isDurationBased: true,
    calorieRate: 8,
    animationType: 'mountain_climbers'
  }
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return EXERCISES_DB.find(ex => ex.id === id);
};
