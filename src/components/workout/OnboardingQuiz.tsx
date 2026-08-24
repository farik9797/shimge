import React, { useState, useEffect } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { ChevronLeft, ArrowRight, Activity, Flame, Trophy, Scale, Sparkles } from 'lucide-react';

export const OnboardingQuiz: React.FC = () => {
  const { completeQuiz } = useFitness();
  const [step, setStep] = useState(1);

  // Form states
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [goal, setGoal] = useState<'lose_weight' | 'build_muscle' | 'keep_fit'>('keep_fit');
  const [focusArea, setFocusArea] = useState<'full_body' | 'abs' | 'chest' | 'arm' | 'leg'>('full_body');
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);

  // States for the loading/analysis phase
  const [analyzingText, setAnalyzingText] = useState('Анализ физических параметров...');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Simple loading animation at step 6
  useEffect(() => {
    if (step !== 6) return;

    const phrases = [
      'Анализ физических параметров...',
      'Расчет индекса массы тела (ИМТ)...',
      'Подбор упражнений под ваши цели...',
      'Генерация 28-дневного плана тренировок...',
      'Персональный план готов!'
    ];

    let currentPhraseIdx = 0;
    const phraseInterval = setInterval(() => {
      currentPhraseIdx++;
      if (currentPhraseIdx < phrases.length) {
        setAnalyzingText(phrases[currentPhraseIdx]);
      }
    }, 800);

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(phraseInterval);
          // Complete Quiz
          setTimeout(() => {
            completeQuiz({
              gender,
              goal,
              focusArea,
              fitnessLevel,
              height,
              weight
            });
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
    };
  }, [step]);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  // Rendering step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-black text-white text-center leading-tight">Укажите ваш пол</h2>
            <p className="text-slate-400 text-xs text-center leading-relaxed">
              Это поможет нам точнее оценить ваши физические возможности и энергозатраты.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              {[
                { id: 'male', label: '🙋‍♂️ Мужчина' },
                { id: 'female', label: '🙋‍♀️ Женщина' },
                { id: 'other', label: '👤 Другой' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGender(item.id as any)}
                  className={`w-full py-4 px-6 rounded-2xl border text-left font-bold text-sm transition-all relative overflow-hidden active:scale-[0.98] ${
                    gender === item.id 
                      ? 'bg-lime-500/10 border-lime-400 text-lime-300 shadow-[0_0_15px_rgba(163,230,53,0.1)]' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                  {gender === item.id && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_6px_#a3e635]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-black text-white text-center leading-tight">Какова ваша цель?</h2>
            <p className="text-slate-400 text-xs text-center">
              Мы адаптируем тренировочную интенсивность под выбранную цель.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              {[
                { id: 'lose_weight', label: 'Сбросить вес', desc: 'Упор на кардио и интенсивные жиросжигающие связки', icon: <Flame className="w-5 h-5 text-orange-400" /> },
                { id: 'build_muscle', label: 'Набрать мышцы', desc: 'Проработка рельефа, силовые комплексы и статика', icon: <Trophy className="w-5 h-5 text-lime-400" /> },
                { id: 'keep_fit', label: 'Быть в форме', desc: 'Тонус мышц, выносливость, растяжка и баланс', icon: <Activity className="w-5 h-5 text-sky-400" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGoal(item.id as any)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all relative flex gap-3.5 items-center active:scale-[0.98] ${
                    goal === item.id 
                      ? 'bg-lime-500/10 border-lime-400 text-lime-300 shadow-[0_0_15px_rgba(163,230,53,0.1)]' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl bg-slate-950/80 border ${goal === item.id ? 'border-lime-550' : 'border-slate-800'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="font-bold text-sm block">{item.label}</span>
                    <span className="text-[10px] text-slate-450 mt-0.5 block leading-normal">{item.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-black text-white text-center leading-tight">Какая зона в приоритете?</h2>
            <p className="text-slate-400 text-xs text-center">
              Приоритетная зона получит повышенный акцент в тренировках.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { id: 'full_body', label: 'Все тело', emoji: '💪' },
                { id: 'abs', label: 'Пресс', emoji: '🔥' },
                { id: 'chest', label: 'Грудь', emoji: '❤️' },
                { id: 'arm', label: 'Руки', emoji: '⚡' },
                { id: 'leg', label: 'Ноги', emoji: '🦵' }
              ].map((item) => {
                const isSelected = focusArea === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFocusArea(item.id as any)}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 active:scale-[0.98] ${
                      isSelected 
                        ? 'bg-lime-500/10 border-lime-400 text-lime-300 shadow-[0_0_15px_rgba(163,230,53,0.1)]' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    } ${item.id === 'full_body' ? 'col-span-2 py-5' : ''}`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-bold text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-black text-white text-center leading-tight">Ваш уровень подготовки</h2>
            <p className="text-slate-400 text-xs text-center">
              Мы настроим время упражнений и количество повторений под ваш уровень.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              {[
                { id: 'beginner', label: 'Новичок', desc: 'Только начинаю, тяжело делать много отжиманий' },
                { id: 'intermediate', label: 'Средний', desc: 'Могу отжаться 15 раз, регулярно двигаюсь' },
                { id: 'advanced', label: 'Продвинутый (ПРО)', desc: 'Имею хорошую подготовку, готов к нагрузкам' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFitnessLevel(item.id as any)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all relative flex flex-col active:scale-[0.98] ${
                    fitnessLevel === item.id 
                      ? 'bg-lime-500/10 border-lime-400 text-lime-300 shadow-[0_0_15px_rgba(163,230,53,0.1)]' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-sm">{item.label}</span>
                  <span className="text-[10px] text-slate-450 mt-1 leading-normal">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-black text-white text-center leading-tight">Физические параметры</h2>
            <p className="text-slate-400 text-xs text-center">
              Рост и вес необходимы для точного расчета калорий и ИМТ.
            </p>

            <div className="flex flex-col gap-5 mt-4">
              {/* Height Input */}
              <div className="glass-card rounded-2xl p-4 border border-slate-800/80">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-450 uppercase mb-2">
                  <span>Рост</span>
                  <span className="text-sky-400 font-mono text-sm">{height} см</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* Weight Input (Fix UX - input with slider) */}
              <div className="glass-card rounded-2xl p-4 border border-slate-800/80">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-450 uppercase mb-2">
                  <span>Вес</span>
                  <span className="text-orange-400 font-mono text-sm">{weight} кг</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="150"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full accent-orange-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
                />
                
                {/* Manual text input for precise weight without UX lock */}
                <div className="flex items-center gap-2 mt-3.5 border-t border-slate-800/60 pt-3">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Точный вес (кг):</span>
                  <input
                    type="number"
                    value={weight || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setWeight(0);
                      } else {
                        setWeight(Math.min(250, parseFloat(val) || 0));
                      }
                    }}
                    onBlur={() => {
                      if (!weight || weight < 30) setWeight(70);
                    }}
                    className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 font-mono text-center focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col items-center justify-center gap-6 py-12 animate-in fade-in duration-500">
            {/* Spinning Loader */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
              <div className="absolute inset-0 rounded-full border-4 border-lime-400 border-t-transparent animate-spin" />
              <Sparkles className="w-8 h-8 text-lime-400 animate-pulse" />
            </div>

            <div className="text-center flex flex-col gap-2">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Создание плана</h3>
              <p className="text-slate-400 text-xs font-semibold font-mono animate-pulse min-h-[16px]">
                {analyzingText}
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <div 
                className="h-full bg-gradient-to-r from-lime-400 to-sky-400 transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-6">
      
      {/* HEADER */}
      {step < 6 && (
        <div className="flex flex-col gap-3">
          {/* Progress and back */}
          <div className="flex items-center justify-between">
            {step > 1 ? (
              <button 
                onClick={handlePrev}
                className="flex items-center gap-1 text-slate-450 hover:text-slate-200 font-bold text-xs uppercase"
              >
                <ChevronLeft className="w-4.5 h-4.5" /> Назад
              </button>
            ) : (
              <div className="w-10" />
            )}
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Шаг {step} из 5
            </span>
            <div className="w-10" />
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-lime-400 to-sky-400 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* BODY CONTENT */}
      <div className="flex-1 flex flex-col justify-center my-6 max-w-sm mx-auto w-full">
        {renderStepContent()}
      </div>

      {/* FOOTER ACTION BUTTONS */}
      {step < 6 && (
        <div className="max-w-sm mx-auto w-full">
          <button
            onClick={handleNext}
            disabled={step === 5 && (!weight || weight < 20)}
            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 ${
              step === 5 && (!weight || weight < 20)
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-850'
                : 'bg-lime-400 hover:bg-lime-300 text-slate-950 shadow-[0_4px_15px_rgba(163,230,53,0.25)]'
            }`}
          >
            Далее <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}

      {/* BG glows */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-lime-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-sky-500/5 blur-[100px] pointer-events-none" />
    </div>
  );
};
