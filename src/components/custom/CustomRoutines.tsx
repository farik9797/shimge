import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { EXERCISES_DB } from '../../data/exercises';
import { Exercise, Workout } from '../../types';
import { Plus, Trash2, Dumbbell, Play, X, Check, Clock, ChevronRight } from 'lucide-react';

export const CustomRoutines: React.FC = () => {
  const { customWorkouts, addCustomWorkout, deleteCustomWorkout, startWorkout } = useFitness();
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  // Add exercise to custom list
  const handleAddExercise = (baseEx: Exercise) => {
    // Clone exercise and add a unique ID for this instance in the routine
    const exerciseInstance: Exercise = {
      ...baseEx,
      id: `${baseEx.id}-${Date.now()}`
    };
    setSelectedExercises(prev => [...prev, exerciseInstance]);
  };

  // Remove exercise instance from custom list
  const handleRemoveExerciseInstance = (instanceId: string) => {
    setSelectedExercises(prev => prev.filter(ex => ex.id !== instanceId));
  };

  // Update reps or duration of an exercise instance
  const handleUpdateExerciseValue = (instanceId: string, isDuration: boolean, delta: number) => {
    setSelectedExercises(prev => prev.map(ex => {
      if (ex.id !== instanceId) return ex;
      
      if (isDuration) {
        const newDur = Math.max(5, ex.duration + delta);
        return { ...ex, duration: newDur };
      } else {
        const newReps = Math.max(1, ex.reps + delta);
        return { ...ex, reps: newReps };
      }
    }));
  };

  // Save the custom routine
  const handleSaveRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (selectedExercises.length === 0) return;

    addCustomWorkout(name.trim(), selectedExercises);
    
    // Reset state
    setName('');
    setSelectedExercises([]);
    setIsCreating(false);
  };

  // Convert custom workout to standard Workout structure for playing
  const handlePlayCustomWorkout = (customW: { id: string; name: string; exercises: Exercise[] }) => {
    // Calculate total minutes and calories
    const totalMins = Math.max(1, Math.round(customW.exercises.reduce((sum, ex) => {
      return sum + (ex.isDurationBased ? ex.duration : 15); // assume 15s per rep for time calculation
    }, 0) / 60));
    
    const totalCals = customW.exercises.reduce((sum, ex) => {
      const minutes = ex.isDurationBased ? (ex.duration / 60) : (ex.reps * 3 / 60); // assume 3s per rep
      return sum + Math.round(minutes * ex.calorieRate);
    }, 0);

    const playableWorkout: Workout = {
      id: customW.id,
      name: customW.name,
      description: 'Индивидуальная тренировка, собранная вами в конструкторе.',
      difficulty: 'intermediate',
      focusArea: 'full_body',
      exercises: customW.exercises,
      estimatedMinutes: totalMins,
      estimatedCalories: totalCals || 25,
      iconName: 'Dumbbell'
    };

    startWorkout(playableWorkout);
  };

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* HEADER */}
      <div className="flex justify-between items-center mt-2">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">КОНСТРУКТОР</span>
          <h1 className="text-3xl font-black tracking-tight text-white mt-1">
            {isCreating ? 'Новый план' : 'Мои тренировки'}
          </h1>
        </div>
        
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-[0_4px_15px_rgba(163,230,53,0.2)]"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Создать
          </button>
        )}
      </div>

      {/* 1. LIST OF CUSTOM WORKOUTS */}
      {!isCreating && (
        <div className="flex flex-col gap-4">
          {customWorkouts.length === 0 ? (
            <div className="glass-card rounded-3xl p-8 border border-slate-800 text-center flex flex-col items-center gap-4 shadow-md">
              <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-500 mb-2">
                <Dumbbell className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-200">Нет сохраненных тренировок</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Создайте свою собственную программу! Соберите любимые упражнения, настройте время и тренируйтесь в своем темпе.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="mt-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-lime-400 font-bold text-sm border border-slate-700 transition-all active:scale-95"
              >
                Создать первую тренировку
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {customWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between shadow-sm group hover:border-slate-750 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-900 text-sky-400">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100">{workout.name}</h4>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                        {workout.exercises.length} упражнений
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => deleteCustomWorkout(workout.id)}
                      className="p-2 rounded-xl bg-red-950/10 border border-red-950/20 text-red-400 hover:bg-red-500 hover:text-white transition-all active:scale-95"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePlayCustomWorkout(workout)}
                      className="p-2.5 rounded-xl bg-lime-450 text-slate-950 hover:bg-lime-300 transition-all active:scale-95 shadow-[0_2px_8px_rgba(163,230,53,0.15)] flex items-center gap-1.5 font-bold text-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Старт
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. CREATE NEW ROUTINE MODE */}
      {isCreating && (
        <form onSubmit={handleSaveRoutine} className="flex flex-col gap-5">
          {/* Name input */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Название тренировки</label>
            <input
              type="text"
              required
              placeholder="Напр. Бодрое утро, Супер Пресс..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-lime-400 text-sm transition-colors font-semibold"
            />
          </div>

          {/* Current Routine Selected Exercises */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex justify-between">
              <span>Выбранные упражнения ({selectedExercises.length})</span>
              {selectedExercises.length > 0 && <span className="text-slate-500">прокрутите вниз</span>}
            </span>

            <div className="flex flex-col gap-2.5 max-h-[35vh] overflow-y-auto bg-slate-950/40 p-2.5 rounded-2xl border border-slate-900">
              {selectedExercises.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500 italic font-semibold">
                  Добавьте упражнения из списка ниже 👇
                </div>
              ) : (
                selectedExercises.map((ex, index) => (
                  <div 
                    key={ex.id} 
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500 w-4">{index + 1}.</span>
                      <div>
                        <span className="text-xs font-bold text-slate-100">{ex.name}</span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {ex.isDurationBased ? 'По времени' : 'На количество'}
                        </div>
                      </div>
                    </div>

                    {/* Adjust values */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-slate-950 rounded-lg p-0.5 border border-slate-850">
                        <button
                          type="button"
                          onClick={() => handleUpdateExerciseValue(ex.id, ex.isDurationBased, ex.isDurationBased ? -5 : -1)}
                          className="w-6 h-6 rounded-md bg-slate-900 text-slate-400 hover:text-white font-bold flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-mono text-sky-400 min-w-[32px] text-center">
                          {ex.isDurationBased ? `${ex.duration}c` : `x${ex.reps}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateExerciseValue(ex.id, ex.isDurationBased, ex.isDurationBased ? 5 : 1)}
                          className="w-6 h-6 rounded-md bg-slate-900 text-slate-400 hover:text-white font-bold flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveExerciseInstance(ex.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Database of Exercises (Add new) */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Добавить упражнения</span>
            <div className="grid grid-cols-1 gap-2 max-h-[30vh] overflow-y-auto pr-1">
              {EXERCISES_DB.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => handleAddExercise(ex)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-900/60 hover:border-slate-800 cursor-pointer hover:bg-slate-900/40 transition-all group"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-white">{ex.name}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{ex.description}</p>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-900 border border-slate-800 group-hover:bg-lime-400 group-hover:text-slate-950 transition-all text-slate-400">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save & Cancel Actions */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setSelectedExercises([]);
                setName('');
              }}
              className="flex-1 py-3.5 rounded-2xl border border-slate-800 bg-slate-900 text-slate-400 font-bold text-sm hover:text-slate-200 transition-colors active:scale-95"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={selectedExercises.length === 0}
              className={`flex-1 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all active:scale-95 ${
                selectedExercises.length === 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-850'
                  : 'bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-[0_4px_15px_rgba(163,230,53,0.2)]'
              }`}
            >
              Сохранить
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
