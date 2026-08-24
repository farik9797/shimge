import React, { useState, useEffect, useRef } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { ExerciseVisual } from './ExerciseVisual';
import { Play, Pause, SkipForward, ArrowLeft, Check, RefreshCw, Star, Volume2 } from 'lucide-react';

type PlayerState = 'countdown' | 'exercise' | 'rest' | 'complete';

export const WorkoutPlayer: React.FC = () => {
  const { activeWorkout, profile, addActivityLog, cancelWorkout, completeChallengeDay } = useFitness();
  const [playerState, setPlayerState] = useState<PlayerState>('countdown');
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(profile.countdownDuration);
  const [isPaused, setIsPaused] = useState(false);
  const [difficulty, setDifficulty] = useState<number | undefined>(undefined);
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(0);

  // Confetti particles for completion screen
  const [confetti, setConfetti] = useState<{ id: number; left: number; color: string; delay: number; size: number }[]>([]);

  // Refs for tracking timer intervals
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeWorkoutRef = useRef(activeWorkout);
  const profileRef = useRef(profile);

  activeWorkoutRef.current = activeWorkout;
  profileRef.current = profile;

  const exercises = activeWorkout?.exercises || [];
  const currentExercise = exercises[exerciseIndex];
  const nextExercise = exercises[exerciseIndex + 1];

  // Synthesize Sound Effects
  const playSound = (type: 'beep' | 'whistle' | 'success') => {
    if (!profileRef.current.soundEffectsEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'beep') {
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'whistle') {
        osc.frequency.setValueAtTime(1000, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'success') {
        const now = ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.5];
        freqs.forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.setValueAtTime(freq, now + idx * 0.1);
          g.gain.setValueAtTime(0.05, now + idx * 0.1);
          g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
          o.start(now + idx * 0.1);
          o.stop(now + idx * 0.1 + 0.35);
        });
      }
    } catch (e) {
      console.warn("AudioContext error: ", e);
    }
  };

  // Text-To-Speech
  const speakText = (text: string) => {
    if (!profileRef.current.voiceGuideEnabled) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error: ", e);
    }
  };

  // Generate confetti particles on complete screen
  const generateConfetti = () => {
    const colors = ['#38bdf8', '#a3e635', '#fb923c', '#e2e8f0', '#f43f5e', '#a855f7'];
    const particles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2.5,
      size: Math.random() * 12 + 6
    }));
    setConfetti(particles);
  };

  // Handle flow transitions
  useEffect(() => {
    if (playerState === 'countdown') {
      setTimeLeft(profile.countdownDuration);
      speakText(`Приготовьтесь. Первое упражнение: ${currentExercise?.name || ''}`);
    } else if (playerState === 'exercise') {
      if (currentExercise.isDurationBased) {
        setTimeLeft(currentExercise.duration);
      }
      speakText(`Начали! ${currentExercise.name}`);
      playSound('whistle');
    } else if (playerState === 'rest') {
      setTimeLeft(profile.restDuration);
      if (nextExercise) {
        speakText(`Отдых. Следующее упражнение: ${nextExercise.name}`);
      } else {
        speakText("Отдых перед завершением тренировки");
      }
    } else if (playerState === 'complete') {
      speakText("Поздравляем! Тренировка завершена. Вы отлично поработали!");
      playSound('success');
      generateConfetti();
    }
  }, [playerState, exerciseIndex]);

  // Main Timer Effect
  useEffect(() => {
    if (isPaused || playerState === 'complete') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      // Track total active duration
      if (playerState === 'exercise') {
        setTotalDurationSeconds(prev => prev + 1);
      }

      if (playerState === 'exercise' && !currentExercise.isDurationBased) {
        // Rep-based exercises don't count down automatically
        return;
      }

      setTimeLeft(prev => {
        const nextTime = prev - 1;

        // Beep sound on last 3 seconds
        if (nextTime <= 3 && nextTime > 0 && (playerState === 'exercise' || playerState === 'countdown' || playerState === 'rest')) {
          playSound('beep');
        }

        if (nextTime <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);

          if (playerState === 'countdown') {
            setPlayerState('exercise');
          } else if (playerState === 'exercise') {
            handleExerciseComplete();
          } else if (playerState === 'rest') {
            setPlayerState('exercise');
          }
          return 0;
        }
        return nextTime;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playerState, isPaused, exerciseIndex, timeLeft]);

  const handleExerciseComplete = () => {
    if (exerciseIndex + 1 < exercises.length) {
      setExerciseIndex(prev => prev + 1);
      setPlayerState('rest');
    } else {
      setPlayerState('complete');
    }
  };

  const handleSkipRest = () => {
    setPlayerState('exercise');
  };

  const handleAddRest = () => {
    setTimeLeft(prev => prev + 10);
    speakText("Добавлено десять секунд отдыха");
  };

  const handlePrev = () => {
    if (exerciseIndex > 0) {
      setExerciseIndex(prev => prev - 1);
      setPlayerState('exercise');
    }
  };

  const handleNext = () => {
    handleExerciseComplete();
  };

  const handleFinishWorkout = () => {
    if (!activeWorkout) return;
    
    const calories = activeWorkout.estimatedCalories; // simple calorie estimate
    const isChallenge = activeWorkout.id.startsWith('challenge_day_');

    if (isChallenge) {
      const dayNum = parseInt(activeWorkout.id.replace('challenge_day_', ''));
      completeChallengeDay(dayNum, totalDurationSeconds, calories);
    } else {
      addActivityLog(
        activeWorkout.id,
        activeWorkout.name,
        totalDurationSeconds,
        calories,
        difficulty
      );
    }
    cancelWorkout();
  };

  // Sound Test Helper
  const testTTS = () => {
    speakText("Тест звукового гида. Всё работает отлично!");
  };

  if (!activeWorkout) return null;

  // Formatter for elapsed time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-6 overflow-y-auto">
      
      {/* CONFETTI (Complete screen only) */}
      {playerState === 'complete' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confetti.map(p => (
            <div
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.left}%`,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: p.id % 2 === 0 ? '50%' : '2px',
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button 
          onClick={cancelWorkout}
          className="flex items-center justify-center p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
          {activeWorkout.name}
        </span>
        <button 
          onClick={testTTS}
          className="flex items-center justify-center p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
          title="Проверить озвучку"
        >
          <Volume2 className="w-5 h-5 animate-pulse" />
        </button>
      </div>

      {/* WORKOUT INTERFACE FLOW */}

      {/* 1. COUNTDOWN SCREEN */}
      {playerState === 'countdown' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 my-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-300 mb-2">ПРИГОТОВЬТЕСЬ</h2>
            <p className="text-slate-400 text-sm max-w-xs">
              Следующее упражнение начнется через несколько секунд
            </p>
          </div>

          {/* Large Countdown Circle */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="88" cy="88" r="80" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle 
                cx="88" cy="88" r="80" fill="none" stroke="#a3e635" strokeWidth="8" 
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - timeLeft / profile.countdownDuration)}
                className="transition-all duration-1000 ease-linear"
                filter="url(#neon-glow-lime)"
              />
            </svg>
            <span className="text-6xl font-black text-lime-400 font-mono" style={{ textShadow: '0 0 10px rgba(163, 230, 53, 0.4)' }}>
              {timeLeft}
            </span>
          </div>

          {/* Preview of next exercise */}
          <div className="w-full max-w-sm flex flex-col gap-4">
            <div className="text-center font-bold text-xl text-sky-400">
              {currentExercise?.name}
            </div>
            <ExerciseVisual animationType={currentExercise?.animationType} isPlaying={false} />
          </div>
        </div>
      )}

      {/* 2. EXERCISE SCREEN */}
      {playerState === 'exercise' && currentExercise && (
        <div className="flex-1 flex flex-col justify-between gap-6 my-4">
          
          {/* Progress Indicators */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-widest">
              <span>Упражнение {exerciseIndex + 1} из {exercises.length}</span>
              <span>Время: {formatTime(totalDurationSeconds)}</span>
            </div>
            <div className="flex gap-1">
              {exercises.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 flex-1 rounded-full ${
                    i < exerciseIndex ? 'bg-sky-500' : i === exerciseIndex ? 'bg-lime-400 shadow-glow animate-pulse' : 'bg-slate-800'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* SVG Animation display */}
          <div className="flex-1 flex items-center justify-center">
            <ExerciseVisual animationType={currentExercise.animationType} isPlaying={!isPaused} />
          </div>

          {/* Information & Instructions */}
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-100">{currentExercise.name}</h2>
            <p className="text-xs text-slate-400 line-clamp-2 px-2 hover:line-clamp-none cursor-pointer leading-relaxed">
              {currentExercise.description}
            </p>
          </div>

          {/* Timer or Rep Count Visualizer */}
          <div className="flex flex-col items-center justify-center min-h-[90px]">
            {currentExercise.isDurationBased ? (
              <div className="text-center">
                <span className="text-6xl font-black font-mono text-lime-400 tracking-tighter" style={{ textShadow: '0 0 15px rgba(163,230,53,0.3)' }}>
                  {timeLeft}s
                </span>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">Осталось секунд</p>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-6xl font-black font-mono text-sky-400 tracking-tighter" style={{ textShadow: '0 0 15px rgba(56,189,248,0.3)' }}>
                  {currentExercise.reps}x
                </span>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">Повторений</p>
              </div>
            )}
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={handlePrev}
              disabled={exerciseIndex === 0}
              className={`p-3 rounded-full border border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900/50 ${
                exerciseIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
              }`}
            >
              <RefreshCw className="w-5 h-5 -scale-x-100" />
            </button>

            {currentExercise.isDurationBased ? (
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isPaused ? 'bg-lime-500 text-slate-950' : 'bg-sky-500 text-slate-950'
                }`}
              >
                {isPaused ? <Play className="w-8 h-8 fill-slate-950 ml-1" /> : <Pause className="w-8 h-8 fill-slate-950" />}
              </button>
            ) : (
              <button 
                onClick={handleExerciseComplete}
                className="w-20 h-20 rounded-full flex items-center justify-center bg-lime-400 text-slate-950 shadow-lg active:scale-95 transition-transform"
              >
                <Check className="w-10 h-10 stroke-[3]" />
              </button>
            )}

            <button 
              onClick={handleNext}
              className="p-3 rounded-full border border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900/50"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. REST SCREEN */}
      {playerState === 'rest' && (
        <div className="flex-1 flex flex-col items-center justify-between gap-6 my-4">
          <div className="text-center mt-4">
            <span className="text-sm font-semibold tracking-widest text-lime-400 uppercase">ВРЕМЯ ОТДЫХА</span>
            <h2 className="text-5xl font-black text-slate-200 font-mono mt-2">{timeLeft}s</h2>
          </div>

          {/* Quick Rest Adjustments */}
          <div className="flex gap-4">
            <button 
              onClick={handleAddRest}
              className="px-6 py-2.5 rounded-full border border-slate-800 bg-slate-900 text-slate-300 font-semibold text-sm hover:border-slate-700 active:scale-95 transition-transform"
            >
              +10 сек
            </button>
            <button 
              onClick={handleSkipRest}
              className="px-6 py-2.5 rounded-full bg-lime-400 text-slate-950 font-bold text-sm hover:bg-lime-300 active:scale-95 transition-transform"
            >
              Пропустить
            </button>
          </div>

          {/* Upcoming Exercise Panel */}
          {nextExercise && (
            <div className="w-full max-w-sm glass-card rounded-3xl p-5 border border-slate-800/80 flex flex-col gap-4 mt-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>СЛЕДУЮЩЕЕ УПРАЖНЕНИЕ ({exerciseIndex + 1} из {exercises.length})</span>
                <span className="text-sky-400">{nextExercise.isDurationBased ? `${nextExercise.duration} сек` : `x${nextExercise.reps}`}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">{nextExercise.name}</h3>
              <ExerciseVisual animationType={nextExercise.animationType} isPlaying={false} />
            </div>
          )}
        </div>
      )}

      {/* 4. COMPLETE / CELEBRATION SCREEN */}
      {playerState === 'complete' && activeWorkout && (
        <div className="flex-1 flex flex-col justify-between my-4 gap-6 max-w-md mx-auto w-full z-10">
          
          <div className="text-center flex flex-col gap-2 mt-8 animate-bounce">
            <span className="text-4xl">🎉🏆🥇</span>
            <h2 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-sky-400">
              ТРЕНИРОВКА ВЫПОЛНЕНА!
            </h2>
            <p className="text-slate-400 text-sm">Вы проделали отличную работу!</p>
          </div>

          {/* Stats card */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Время тренировки</span>
              <p className="text-3xl font-black text-sky-400 font-mono mt-1">
                {Math.round(totalDurationSeconds / 60) || 1}
                <span className="text-sm font-normal text-slate-400 ml-1">мин</span>
              </p>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Сожжено ккал</span>
              <p className="text-3xl font-black text-orange-400 font-mono mt-1">
                {activeWorkout.estimatedCalories}
                <span className="text-sm font-normal text-slate-400 ml-1">ккал</span>
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="glass-card rounded-3xl p-5 border border-slate-800 flex flex-col gap-4 text-center">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Как вам сложность?</span>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setDifficulty(star)}
                  className="p-1 transition-transform active:scale-125"
                >
                  <Star 
                    className={`w-9 h-9 ${
                      difficulty && star <= difficulty 
                        ? 'fill-orange-400 stroke-orange-400 filter drop-shadow-[0_0_6px_rgba(251,146,60,0.4)]' 
                        : 'stroke-slate-500 hover:stroke-slate-400'
                    }`} 
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold px-2 uppercase">
              <span>Слишком легко</span>
              <span>Идеально</span>
              <span>Слишком тяжело</span>
            </div>
          </div>

          {/* Finish Button */}
          <button 
            onClick={handleFinishWorkout}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-lime-400 to-sky-400 text-slate-950 font-black text-lg tracking-wider hover:from-lime-300 hover:to-sky-300 active:scale-95 transition-all shadow-[0_4px_20px_rgba(163,230,53,0.25)]"
          >
            ЗАВЕРШИТЬ
          </button>
        </div>
      )}
      
      {/* Decorative Glow elements */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-lime-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />
    </div>
  );
};
