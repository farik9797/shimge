import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { getChallengeDays, challengeDayToWorkout, ChallengeDay } from '../../data/challenge';
import { Trophy, Check, Coffee, Play, X, Star, Calendar, Sparkles } from 'lucide-react';

export const ChallengeMap: React.FC = () => {
  const { profile, completeChallengeDay, startWorkout } = useFitness();
  const [selectedDay, setSelectedDay] = useState<ChallengeDay | null>(null);

  const challengeDays = getChallengeDays();
  const completedDays = new Set(profile.completedChallengeDays || []);

  const handleStartWorkout = (day: ChallengeDay) => {
    const workout = challengeDayToWorkout(day);
    startWorkout(workout);
    setSelectedDay(null);
  };

  const handleCompleteRestDay = (dayNum: number) => {
    completeChallengeDay(dayNum, 0, 0); // rest day completed with 0s and 0kcal
    setSelectedDay(null);
  };

  // Group days by week (7 days per week)
  const weeks = [
    { number: 1, days: challengeDays.slice(0, 7) },
    { number: 2, days: challengeDays.slice(7, 14) },
    { number: 3, days: challengeDays.slice(14, 21) },
    { number: 4, days: challengeDays.slice(21, 28) }
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center bg-gradient-to-r from-lime-500/10 to-sky-500/10 p-4 rounded-2xl border border-slate-800">
        <div>
          <span className="text-[10px] font-bold text-lime-400 uppercase tracking-widest flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> ЧЕЛЛЕНДЖ 7х4
          </span>
          <h2 className="text-base font-bold text-white mt-1">28 дней тренировок</h2>
        </div>
        <div className="text-right">
          <span className="text-xs font-black font-mono text-lime-400">
            {completedDays.size} / 28
          </span>
          <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">дней выполнено</p>
        </div>
      </div>

      {/* Grid mapping weeks */}
      <div className="flex flex-col gap-4">
        {weeks.map((week) => {
          // Count completed days in this week
          const weekCompletedCount = week.days.filter(d => completedDays.has(d.dayNumber)).length;
          
          return (
            <div key={week.number} className="glass-card rounded-2xl p-4 border border-slate-800/80 flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Неделя {week.number}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                  {weekCompletedCount} из 7 вып.
                </span>
              </div>

              {/* Days list in week */}
              <div className="grid grid-cols-7 gap-2">
                {week.days.map((day) => {
                  const isCompleted = completedDays.has(day.dayNumber);
                  
                  return (
                    <button
                      key={day.dayNumber}
                      onClick={() => setSelectedDay(day)}
                      type="button"
                      className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all active:scale-90 ${
                        isCompleted
                          ? 'bg-lime-500/20 border-lime-400/40 text-lime-300 shadow-[0_0_8px_rgba(163,230,53,0.15)]'
                          : day.isRestDay
                            ? 'bg-slate-900 border-sky-500/25 text-sky-400'
                            : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:border-slate-750'
                      }`}
                    >
                      <span className="text-xs font-mono font-black">{day.dayNumber}</span>
                      
                      {/* Checkmark or Sleep icon display */}
                      <div className="mt-1">
                        {isCompleted ? (
                          <Check className="w-3.5 h-3.5 stroke-[3.5] text-lime-400" />
                        ) : day.isRestDay ? (
                          <Coffee className="w-3.5 h-3.5 text-sky-400" />
                        ) : (
                          <span className="text-[8px] uppercase tracking-tighter opacity-80">день</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* DAY DETAIL MODAL */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col gap-5 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-lime-400 uppercase tracking-widest">Челлендж 7х4</span>
                <h3 className="text-2xl font-black text-white mt-1">День {selectedDay.dayNumber}</h3>
              </div>
              <button 
                onClick={() => setSelectedDay(null)}
                className="p-1.5 rounded-full bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-850"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* REST DAY DISPLAY */}
            {selectedDay.isRestDay ? (
              <div className="flex flex-col gap-4 text-center my-2">
                <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-2 animate-pulse">
                  <Coffee className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Время отдыхать! 🧘</h4>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-900 text-left">
                  {selectedDay.recoveryTip}
                </p>

                {completedDays.has(selectedDay.dayNumber) ? (
                  <div className="py-3 text-xs font-bold text-lime-400 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4 stroke-[3]" /> День отдыха выполнен!
                  </div>
                ) : (
                  <button
                    onClick={() => handleCompleteRestDay(selectedDay.dayNumber)}
                    className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-base tracking-wider active:scale-95 transition-all shadow-[0_4px_15px_rgba(56,189,248,0.2)]"
                  >
                    ОТМЕТИТЬ КАК ВЫПОЛНЕННЫЙ
                  </button>
                )}
              </div>
            ) : (
              // WORKOUT DAY DISPLAY
              <>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-900">
                  {selectedDay.description}
                </p>

                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-2 bg-slate-950/20 p-2 rounded-2xl border border-slate-800/40 text-center font-mono">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Упражнения</span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">{selectedDay.exercises?.length || 0}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Время</span>
                    <p className="text-sm font-bold text-sky-400 mt-0.5">{selectedDay.estimatedMinutes} мин</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Энергия</span>
                    <p className="text-sm font-bold text-orange-400 mt-0.5">{selectedDay.estimatedCalories} ккал</p>
                  </div>
                </div>

                {/* Exercises list preview */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Упражнения на сегодня</span>
                  <div className="flex flex-col gap-2 max-h-[30vh] overflow-y-auto pr-1">
                    {selectedDay.exercises?.map((ex, idx) => (
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
                  onClick={() => handleStartWorkout(selectedDay)}
                  className="w-full py-4 rounded-2xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-lg tracking-wider active:scale-95 transition-all shadow-[0_4px_20px_rgba(163,230,53,0.25)] flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-current" /> НАЧАТЬ ТРЕНИРОВКУ {completedDays.has(selectedDay.dayNumber) && '(ПОВТОРНО)'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
