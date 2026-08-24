import React, { useState, useEffect } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { User, Volume2, Clock, Trash2, Shield, Info, Check, Sparkles, Bell, Plus } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const { profile, updateProfile, resetAllData, addReminder, deleteReminder, toggleReminder } = useFitness();
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // States for inputs using string representation to avoid typing locking bugs (e.g. empty string resets to default)
  const [heightInput, setHeightInput] = useState(profile.height.toString());
  const [weightInput, setWeightInput] = useState(profile.weight.toString());
  const [waterTargetInput, setWaterTargetInput] = useState(profile.waterTarget.toString());
  
  const [gender, setGender] = useState(profile.gender);
  const [restDuration, setRestDuration] = useState(profile.restDuration);
  const [countdownDuration, setCountdownDuration] = useState(profile.countdownDuration);
  const [voiceGuideEnabled, setVoiceGuideEnabled] = useState(profile.voiceGuideEnabled);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(profile.soundEffectsEnabled);

  // Reminder configuration state
  const [newReminderTime, setNewReminderTime] = useState('08:00');
  const [newReminderDays, setNewReminderDays] = useState<number[]>([1, 2, 3, 4, 5]); // default Mon-Fri

  const dayOrder = [1, 2, 3, 4, 5, 6, 0]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
  const dayNamesShort = {
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб',
    0: 'Вс'
  };

  // Sync state if profile changes externally (like after reset)
  useEffect(() => {
    setHeightInput(profile.height.toString());
    setWeightInput(profile.weight.toString());
    setWaterTargetInput(profile.waterTarget.toString());
    setGender(profile.gender);
    setRestDuration(profile.restDuration);
    setCountdownDuration(profile.countdownDuration);
    setVoiceGuideEnabled(profile.voiceGuideEnabled);
    setSoundEffectsEnabled(profile.soundEffectsEnabled);
  }, [profile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse values and apply defaults if invalid
    const h = parseInt(heightInput) || profile.height;
    const w = parseFloat(weightInput) || profile.weight;
    const wt = parseInt(waterTargetInput) || profile.waterTarget;

    updateProfile({
      height: h,
      weight: w,
      gender,
      waterTarget: wt,
      restDuration,
      countdownDuration,
      voiceGuideEnabled,
      soundEffectsEnabled
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleTestVoice = () => {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Голосовой помощник работает отлично! Приятной тренировки.");
      utterance.lang = 'ru-RU';
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      alert("Синтез речи не поддерживается на вашем устройстве.");
    }
  };

  const handleResetData = () => {
    resetAllData();
    setShowConfirmReset(false);
  };

  const handleDayToggle = (day: number) => {
    setNewReminderDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleAddReminderClick = async () => {
    if (newReminderDays.length === 0) {
      alert("Выберите хотя бы один день недели.");
      return;
    }

    // Request permissions for PWA push notifications
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log("Notification permission granted!");
      }
    }

    addReminder(newReminderTime, newReminderDays);
    // Reset to defaults
    setNewReminderTime('08:00');
    setNewReminderDays([1, 2, 3, 4, 5]);
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* HEADER */}
      <div className="mt-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans">КОНФИГУРАЦИЯ</span>
        <h1 className="text-3xl font-black tracking-tight text-white mt-1">Настройки</h1>
      </div>

      <form onSubmit={handleSaveProfile} className="flex flex-col gap-5">
        
        {/* 1. USER PROFILE PROFILE SECTION */}
        <div className="glass-card rounded-3xl p-5 border border-slate-800/80 flex flex-col gap-4 shadow-sm">
          <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wide">
            <User className="w-4.5 h-4.5 text-lime-400" /> Профиль пользователя
          </h3>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Рост (см)</label>
              <input
                type="number"
                required
                min="50"
                max="250"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-lime-400 font-semibold font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Вес (кг)</label>
              <input
                type="number"
                step="0.1"
                required
                min="20"
                max="300"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-lime-400 font-semibold font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Пол</label>
            <div className="grid grid-cols-3 gap-2">
              {['male', 'female', 'other'].map((g) => {
                const label = g === 'male' ? 'Мужчина' : g === 'female' ? 'Женщина' : 'Другой';
                const isActive = gender === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g as any)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      isActive 
                        ? 'bg-slate-800 text-lime-400 border-lime-500/20 shadow-inner' 
                        : 'bg-slate-950/60 border-slate-850/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. WORKOUT DEFAULTS SECTION */}
        <div className="glass-card rounded-3xl p-5 border border-slate-800/80 flex flex-col gap-4 shadow-sm">
          <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wide">
            <Clock className="w-4.5 h-4.5 text-sky-400" /> Настройки таймеров
          </h3>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Время отдыха</span>
              <span className="text-sky-400 font-mono">{restDuration} секунд</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={restDuration}
              onChange={(e) => setRestDuration(parseInt(e.target.value))}
              className="w-full accent-sky-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Обратный отсчет перед упр.</span>
              <span className="text-sky-400 font-mono">{countdownDuration} секунд</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="5"
              value={countdownDuration}
              onChange={(e) => setCountdownDuration(parseInt(e.target.value))}
              className="w-full accent-sky-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Цель по воде (мл)</label>
            <input
              type="number"
              required
              step="100"
              min="500"
              max="8000"
              value={waterTargetInput}
              onChange={(e) => setWaterTargetInput(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-lime-400 font-semibold font-mono"
            />
          </div>
        </div>

        {/* 3. SOUND SETTINGS SECTION */}
        <div className="glass-card rounded-3xl p-5 border border-slate-800/80 flex flex-col gap-4 shadow-sm">
          <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wide">
            <Volume2 className="w-4.5 h-4.5 text-orange-400" /> Звуки и Озвучка
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/40 border border-slate-900 select-none">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-slate-200">Голосовой гид</span>
                <span className="text-[10px] text-slate-400">Произношение упражнений (TTS)</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={voiceGuideEnabled}
                  onChange={(e) => setVoiceGuideEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/40 border border-slate-900 select-none">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-slate-200">Звуковые эффекты</span>
                <span className="text-[10px] text-slate-400">Свисток, сигналы таймера</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundEffectsEnabled}
                  onChange={(e) => setSoundEffectsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>

          {voiceGuideEnabled && (
            <button
              type="button"
              onClick={handleTestVoice}
              className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-orange-400 hover:text-orange-300 border border-slate-700 transition-all font-bold text-xs uppercase tracking-wider active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" /> Проверить голос
            </button>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-black text-lg tracking-wider active:scale-95 transition-all shadow-[0_4px_15px_rgba(163,230,53,0.25)] flex items-center justify-center gap-2"
        >
          {saveSuccess ? (
            <>
              <Check className="w-5 h-5 stroke-[3]" /> СОХРАНЕНО!
            </>
          ) : (
            'СОХРАНИТЬ ИЗМЕНЕНИЯ'
          )}
        </button>

      </form>

      {/* WORKOUT REMINDERS SECTION */}
      <div className="glass-card rounded-3xl p-5 border border-slate-800/80 flex flex-col gap-4 shadow-sm">
        <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wide">
          <Bell className="w-4.5 h-4.5 text-sky-400" /> Напоминания о тренировках
        </h3>

        {/* Active Reminders List */}
        {(profile.reminders || []).length > 0 ? (
          <div className="flex flex-col gap-2.5">
            {(profile.reminders || []).map((rem) => (
              <div 
                key={rem.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/40 border border-slate-900"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-lg font-black font-mono text-slate-200">{rem.time}</span>
                  <div className="flex gap-1">
                    {dayOrder.map((day) => {
                      const isActive = rem.days.includes(day);
                      return (
                        <span 
                          key={day} 
                          className={`text-[8px] font-bold px-1 rounded ${
                            isActive ? 'bg-sky-500/10 text-sky-400 border border-sky-500/25' : 'text-slate-650'
                          }`}
                        >
                          {dayNamesShort[day as keyof typeof dayNamesShort]}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rem.enabled}
                      onChange={() => toggleReminder(rem.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
                  </label>
                  
                  <button 
                    type="button"
                    onClick={() => deleteReminder(rem.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-slate-500 italic text-center py-2">
            Напоминания не настроены. Создайте напоминание ниже.
          </p>
        )}

        {/* Add Reminder Form */}
        <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-900 flex flex-col gap-3 mt-1.5">
          <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Новое напоминание</span>
          
          <div className="flex items-center justify-between gap-4">
            <input 
              type="time"
              value={newReminderTime}
              onChange={(e) => setNewReminderTime(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-sky-400 font-black font-mono text-center w-32"
            />

            <button
              type="button"
              onClick={handleAddReminderClick}
              className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all font-black text-xs uppercase tracking-wider active:scale-95 flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" /> Добавить
            </button>
          </div>

          {/* Day selection row */}
          <div className="flex justify-between gap-1 mt-1">
            {dayOrder.map((day) => {
              const isSelected = newReminderDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                    isSelected
                      ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                      : 'bg-slate-950/80 border-slate-900 text-slate-500 hover:text-slate-350'
                  }`}
                >
                  {dayNamesShort[day as keyof typeof dayNamesShort]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PERSONALIZATION SECTION */}
      <div className="glass-card rounded-3xl p-5 border border-slate-800/80 flex flex-col gap-4 shadow-sm">
        <h3 className="font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2 text-sm uppercase tracking-wide">
          <Sparkles className="w-4.5 h-4.5 text-lime-400" /> Персонализация
        </h3>
        <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
          Вы можете пройти опрос заново, чтобы пересчитать параметры вашего персонального плана тренировок на основе новых целей и физического состояния.
        </p>
        <button
          type="button"
          onClick={() => updateProfile({ hasCompletedQuiz: false })}
          className="w-full py-3 rounded-xl bg-lime-500/10 hover:bg-lime-500/20 border border-lime-500/20 hover:border-lime-500/40 text-lime-400 transition-all font-bold text-xs uppercase tracking-wider active:scale-95 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> Пройти опрос заново
        </button>
      </div>

      {/* DANGER ZONE - DATA RESET */}
      <div className="glass-card rounded-3xl p-5 border border-red-500/10 flex flex-col gap-4 shadow-sm bg-red-950/5">
        <h3 className="font-bold text-red-400 flex items-center gap-2 border-b border-red-500/10 pb-2 text-sm uppercase tracking-wide">
          <Shield className="w-4.5 h-4.5" /> Опасная зона
        </h3>

        <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
          Очистка удалит ваш профиль, всю историю тренировок, показатели веса и логи воды. Это действие необратимо.
        </p>

        {showConfirmReset ? (
          <div className="flex gap-2.5 mt-1">
            <button
              type="button"
              onClick={() => setShowConfirmReset(false)}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 text-xs font-bold active:scale-95 transition-all"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleResetData}
              className="flex-1 py-3 rounded-xl bg-red-650 hover:bg-red-500 text-white text-xs font-bold active:scale-95 transition-all"
            >
              Да, стереть всё
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="w-full py-3 rounded-xl bg-red-950/15 hover:bg-red-950/30 border border-red-950/30 hover:border-red-500/30 text-red-400 hover:text-red-300 transition-all font-bold text-xs uppercase tracking-wider active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Сбросить все данные
          </button>
        )}
      </div>

      {/* APP INFORMATION */}
      <div className="flex gap-2.5 items-center justify-center text-[10px] text-slate-600 font-bold uppercase tracking-wider">
        <Info className="w-3.5 h-3.5 text-slate-600" />
        <span>Домашние тренировки • Версия 1.0.0</span>
      </div>
    </div>
  );
};
