import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { PREDEFINED_WORKOUTS } from '../../data/workouts';
import { Workout } from '../../types';
import { Flame, Trophy, Clock, Zap, ChevronRight, Dumbbell, Play, X, Sparkles } from 'lucide-react';
import { ChallengeMap } from './ChallengeMap';

export const Dashboard: React.FC = () => {
  const { 
    streak, 
    totalCalories, 
    totalMinutes, 
    totalWorkouts, 
    history, 
    startWorkout,
    personalizedWorkout
  } = useFitness();

  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  // Filter workouts by difficulty
  const filteredWorkouts = PREDEFINED_WORKOUTS.filter(w => w.difficulty === selectedDifficulty);

  // Challenge Progress: how many unique days with completed workouts
  const uniqueWorkoutDaysCount = React.useMemo(() => {
    const dates = history.map(log => log.date);
    return new Set(dates).size;
  }, [history]);

  const challengePercent = Math.min(100, Math.round((uniqueWorkoutDaysCount / 28) * 100));

  // Determine active icon for workout list
  const getWorkoutIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Heart': return <Zap className="w-5 h-5 text-red-400" />;
      case 'TrendingUp': return <ChevronRight className="w-5 h-5 text-lime-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-lime-400" />;
      default: return <Dumbbell className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mt-2">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">ТВОЙ ЛИЧНЫЙ ТРЕНЕР</span>
          <h1 className="text-3xl font-black tracking-tight text-white mt-1">Привет, Атлет! 👋</h1>
        </div>
        
        {/* Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 animate-pulse">
          <Flame className="w-5 h-5 fill-orange-400" />
          <span className="text-sm font-black font-mono">{streak} дней</span>
        </div>
      </div>

      {/* QUICK STATS DASHBOARD */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-2xl p-3.5 border border-slate-800 flex flex-col gap-1 items-center text-center shadow-md relative overflow-hidden">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 mb-1">
            <Dumbbell className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Тренировки</span>
          <span className="text-xl font-black text-white font-mono mt-0.5">{totalWorkouts}</span>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-sky-500/5 blur-md" />
        </div>

        <div className="glass-card rounded-2xl p-3.5 border border-slate-800 flex flex-col gap-1 items-center text-center shadow-md relative overflow-hidden">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 mb-1">
            <Flame className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Калории</span>
          <span className="text-xl font-black text-white font-mono mt-0.5">{totalCalories} <span className="text-[10px] font-normal text-slate-400">ккал</span></span>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-orange-500/5 blur-md" />
        </div>

        <div className="glass-card rounded-2xl p-3.5 border border-slate-800 flex flex-col gap-1 items-center text-center shadow-md relative overflow-hidden">
          <div className="p-2 rounded-xl bg-lime-500/10 text-lime-400 mb-1">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Минуты</span>
          <span className="text-xl font-black text-white font-mono mt-0.5">{totalMinutes} <span className="text-[10px] font-normal text-slate-400">мин</span></span>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-lime-500/5 blur-md" />
        </div>
      </div>

      {/* 28-DAY CHALLENGE MAP */}
      <ChallengeMap />

      {/* PERSONALIZED WORKOUT CARD */}
      {personalizedWorkout && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h3 className="text-xl font-black text-slate-200 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-lime-400" /> Персональная цель
          </h3>
          <div
            onClick={() => setSelectedWorkout(personalizedWorkout)}
            className="relative overflow-hidden rounded-3xl p-5 border border-lime-400/30 bg-gradient-to-br from-slate-900 via-slate-900 to-lime-950/20 hover:border-lime-400/50 transition-all flex flex-col gap-3.5 cursor-pointer shadow-[0_4px_25px_rgba(163,230,53,0.06)] group"
          >
            <span className="absolute top-4 right-4 text-[9px] font-extrabold bg-lime-400 text-slate-950 px-2 py-1 rounded-full uppercase tracking-wider shadow-[0_0_8px_rgba(163,230,53,0.3)]">
              Рекомендовано
            </span>

            <div className="flex items-center gap-3.5 mt-1">
              <div className="p-3.5 rounded-2xl bg-lime-500/10 border border-lime-500/20 text-lime-400 group-hover:bg-lime-400 group-hover:text-slate-950 group-hover:border-lime-300 transition-all">
                <Sparkles className="w-5.5 h-5.5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-100 group-hover:text-white transition-colors text-base">{personalizedWorkout.name}</h4>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                  <span>{personalizedWorkout.exercises.length} упр.</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span>~{personalizedWorkout.estimatedMinutes} мин</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="text-orange-400">{personalizedWorkout.estimatedCalories} ккал</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-normal border-t border-slate-800/60 pt-3">
              {personalizedWorkout.description}
            </p>
          </div>
        </div>
      )}

      {/* DIFFICULTY SELECTION TABS */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-black text-slate-200 tracking-tight">Программы тренировок</h3>
        
        <div className="flex gap-2 p-1 bg-slate-950/80 rounded-2xl border border-slate-900/80">
          {(['beginner', 'intermediate', 'advanced'] as const).map((diff) => {
            const labels = {
              beginner: 'Новичок',
              intermediate: 'Средний',
              advanced: 'ПРО',
            };
            const isActive = selectedDifficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 ${
                  isActive 
                    ? 'bg-slate-800 text-lime-400 border border-slate-700/50 shadow-inner' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {labels[diff]}
              </button>
            );
          })}
        </div>

        {/* WORKOUT LIST */}
        <div className="flex flex-col gap-3">
          {filteredWorkouts.map((workout) => (
            <div
              key={workout.id}
              onClick={() => setSelectedWorkout(workout)}
              className="glass-card rounded-2xl p-4 border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-center justify-between cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-900 group-hover:border-slate-800/80 transition-all">
                  {getWorkoutIcon(workout.iconName)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 group-hover:text-white transition-colors">{workout.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span>{workout.exercises.length} упр.</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span>~{workout.estimatedMinutes} мин</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-orange-400">{workout.estimatedCalories} ккал</span>
                  </div>
                </div>
              </div>
              <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:bg-lime-400 group-hover:text-slate-950 group-hover:border-lime-300 transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK WARM-UPS & STRETCHES */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold text-slate-200">Быстрая разминка</h3>
        <div 
          onClick={() => setSelectedWorkout({
            id: 'quick_warmup',
            name: 'Разминка перед тренировкой',
            description: 'Короткий комплекс упражнений, направленный на разогрев суставов и подготовку мышц к нагрузке.',
            difficulty: 'beginner',
            focusArea: 'full_body',
            exercises: [
              { id: 'jumping_jacks', name: 'Разминочные прыжки', description: 'Мягкие прыжки для разгона пульса.', duration: 25, reps: 0, isDurationBased: true, calorieRate: 7, animationType: 'jumping_jacks' },
              { id: 'squats', name: 'Легкие приседания', description: 'Разминочные приседания с акцентом на технику.', duration: 0, reps: 10, isDurationBased: false, calorieRate: 5, animationType: 'squats' },
              { id: 'cobra_stretch', name: 'Растяжка спины', description: 'Разогрев позвоночника и мышц спины.', duration: 25, reps: 0, isDurationBased: true, calorieRate: 3, animationType: 'cobra_stretch' }
            ],
            estimatedMinutes: 3,
            estimatedCalories: 18,
            iconName: 'Activity'
          })}
          className="glass-card rounded-2xl p-4 border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-center justify-between cursor-pointer group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌅</span>
            <div>
              <h4 className="font-bold text-slate-100 group-hover:text-white">Суставная разминка (3 мин)</h4>
              <p className="text-xs text-slate-400 mt-0.5">3 упражнения для разогрева перед основной тренировкой</p>
            </div>
          </div>
          <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:bg-lime-400 group-hover:text-slate-950 transition-all">
            <Play className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>
      </div>

      {/* WORKOUT DETAIL MODAL */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col gap-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-lime-400 uppercase tracking-widest">{selectedWorkout.difficulty}</span>
                <h3 className="text-2xl font-black text-white mt-1">{selectedWorkout.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedWorkout(null)}
                className="p-1.5 rounded-full bg-slate-850 border border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-900">
              {selectedWorkout.description}
            </p>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950/20 p-2 rounded-2xl border border-slate-800/40 text-center font-mono">
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-semibold">Упражнения</span>
                <p className="text-sm font-bold text-slate-200 mt-0.5">{selectedWorkout.exercises.length}</p>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-semibold">Время</span>
                <p className="text-sm font-bold text-sky-400 mt-0.5">{selectedWorkout.estimatedMinutes} мин</p>
              </div>
              <div>
                <span className="text-[9px] text-slate-500 uppercase font-semibold">Энергия</span>
                <p className="text-sm font-bold text-orange-400 mt-0.5">{selectedWorkout.estimatedCalories} ккал</p>
              </div>
            </div>

            {/* Exercises List */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Упражнения в тренировке</span>
              <div className="flex flex-col gap-2 max-h-[30vh] overflow-y-auto pr-1">
                {selectedWorkout.exercises.map((ex, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-900/60 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500 w-4">{idx + 1}.</span>
                      <span className="font-bold text-slate-200">{ex.name}</span>
                    </div>
                    <span className="text-sky-400 font-semibold">
                      {ex.isDurationBased ? `${ex.duration} сек` : `x${ex.reps}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={() => {
                startWorkout(selectedWorkout);
                setSelectedWorkout(null);
              }}
              className="w-full py-4 rounded-2xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-lg tracking-wider active:scale-95 transition-all shadow-[0_4px_20px_rgba(163,230,53,0.25)] flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" /> НАЧАТЬ ТРЕНИРОВКУ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
