import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Scale, Calendar as CalendarIcon, Calculator, ChevronRight, Activity, Plus, TrendingDown } from 'lucide-react';

export const ProgressStats: React.FC = () => {
  const { history, weightHistory, logWeight, profile } = useFitness();
  const [newWeight, setNewWeight] = useState(profile.weight.toString());

  // Weekly Activity Calculations (Mon-Sun)
  const getLocalDateString = (offsetDays = 0) => {
    const d = new Date();
    if (offsetDays !== 0) {
      d.setDate(d.getDate() + offsetDays);
    }
    return d.toLocaleDateString('sv');
  };

  const weeklyActivity = React.useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysSinceMonday);
    
    const weekDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      weekDates.push(d.toLocaleDateString('sv'));
    }
    
    const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    return weekDates.map((dateStr, idx) => {
      const dayLogs = history.filter(log => log.date === dateStr);
      const seconds = dayLogs.reduce((sum, log) => sum + log.durationSeconds, 0);
      const minutes = Math.round(seconds / 60);
      return {
        label: dayLabels[idx],
        date: dateStr,
        minutes
      };
    });
  }, [history]);

  // 1. BMI Calculation
  const heightInMeters = profile.height / 100;
  const currentWeight = weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].weight : profile.weight;
  const bmi = heightInMeters > 0 ? Number((currentWeight / (heightInMeters * heightInMeters)).toFixed(1)) : 0;

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Дефицит массы', color: 'text-sky-400', bg: 'bg-sky-500' };
    if (val < 25) return { label: 'Нормальный вес', color: 'text-lime-400', bg: 'bg-lime-400' };
    if (val < 30) return { label: 'Избыточный вес', color: 'text-orange-400', bg: 'bg-orange-400' };
    return { label: 'Ожирение', color: 'text-red-400', bg: 'bg-red-500' };
  };

  const bmiCat = getBmiCategory(bmi);

  // 2. Weight Chart Calculations (SVG Curved Chart)
  const chartWidth = 340;
  const chartHeight = 120;
  const paddingX = 25;
  const paddingY = 15;

  const weightPoints = React.useMemo(() => {
    if (weightHistory.length === 0) return [];
    
    // Sort weights chronologically
    const sorted = [...weightHistory].sort((a, b) => a.date.localeCompare(b.date));
    
    // Keep last 6 logs to avoid cluttering
    const data = sorted.slice(-6);

    const weights = data.map(w => w.weight);
    const minW = Math.min(...weights) - 1.5;
    const maxW = Math.max(...weights) + 1.5;
    const range = maxW - minW || 3;

    return data.map((w, index) => {
      const x = paddingX + (index / (data.length - 1 || 1)) * (chartWidth - paddingX * 2);
      const y = chartHeight - paddingY - ((w.weight - minW) / range) * (chartHeight - paddingY * 2);
      return { x, y, date: w.date.substring(5), weight: w.weight }; // MM-DD
    });
  }, [weightHistory]);

  const chartLinePath = weightPoints.length > 0 
    ? weightPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    : '';

  const chartAreaPath = weightPoints.length > 0 
    ? `${chartLinePath} L ${weightPoints[weightPoints.length - 1].x} ${chartHeight - paddingY} L ${weightPoints[0].x} ${chartHeight - paddingY} Z`
    : '';

  // 3. Calendar Grid (Current Month Days)
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const firstDayIndex = new Date(year, month, 1).getDay(); // day of week of 1st day (0 = Sunday, 1 = Monday...)
  // Adjust to start calendar from Monday
  const adjustedFirstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get active workout days in current month (YYYY-MM-DD starts with YYYY-MM)
  const monthPrefix = `${year}-${(month + 1).toString().padStart(2, '0')}`;
  const currentMonthWorkouts = history.filter(log => log.date.startsWith(monthPrefix));
  const activeWorkoutDays = new Set(currentMonthWorkouts.map(log => log.date));

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(newWeight);
    if (!isNaN(w) && w > 20 && w < 300) {
      logWeight(w);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* HEADER */}
      <div className="mt-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">ПРОГРЕСС</span>
        <h1 className="text-3xl font-black tracking-tight text-white mt-1">Отчеты и ИМТ</h1>
      </div>

      {/* WEEKLY ACTIVITY HISTOGRAM */}
      <div className="glass-card rounded-3xl p-5 border border-slate-800/80 shadow-md flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-slate-100">Недельная активность</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Мин / день</span>
        </div>

        <div className="flex justify-between items-end h-28 px-1 mt-2 relative">
          {weeklyActivity.map((day) => {
            const maxVal = Math.max(...weeklyActivity.map(d => d.minutes), 30);
            const barHeightPercent = Math.min(100, (day.minutes / maxVal) * 100);
            const isToday = day.date === getLocalDateString();
            
            return (
              <div key={day.label} className="flex flex-col items-center gap-1.5 flex-1 group relative">
                {/* Tooltip on hover */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-slate-800 text-[9px] text-slate-200 px-1.5 py-0.5 rounded font-mono font-bold absolute -top-7 z-10 whitespace-nowrap shadow-md">
                  {day.minutes} мин
                </span>

                {/* Vertical Bar */}
                <div className="w-5 bg-slate-950/80 rounded-t-lg h-20 flex items-end relative overflow-hidden border border-slate-900">
                  <div 
                    style={{ height: `${Math.max(4, barHeightPercent)}%` }}
                    className={`w-full rounded-t-[5px] transition-all duration-500 ${
                      day.minutes > 0
                        ? isToday
                          ? 'bg-gradient-to-t from-lime-500 to-sky-400 shadow-[0_0_10px_rgba(163,230,53,0.35)]'
                          : 'bg-gradient-to-t from-lime-500 to-lime-400'
                        : 'bg-transparent'
                    }`}
                  />
                </div>

                {/* Day name label */}
                <span className={`text-[10px] font-bold ${isToday ? 'text-sky-400 font-extrabold' : 'text-slate-500'}`}>
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 1. MONTHLY CALENDAR CARD */}
      <div className="glass-card rounded-3xl p-5 border border-slate-800/80 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="w-5 h-5 text-lime-400" />
          <h3 className="font-bold text-slate-100">{monthNames[month]} {year}</h3>
        </div>

        {/* Week Days Headers */}
        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">
          <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold font-mono">
          {/* Pad offset days */}
          {Array.from({ length: adjustedFirstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Render Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateStr = `${monthPrefix}-${dayNum.toString().padStart(2, '0')}`;
            const hasWorkout = activeWorkoutDays.has(dateStr);
            const isToday = today.getDate() === dayNum;

            return (
              <div
                key={`day-${dayNum}`}
                className={`aspect-square rounded-xl flex items-center justify-center relative transition-all ${
                  hasWorkout 
                    ? 'bg-lime-500 text-slate-950 shadow-[0_0_8px_rgba(163,230,53,0.35)]' 
                    : isToday
                      ? 'border border-sky-400 text-sky-400 bg-sky-950/20'
                      : 'bg-slate-900/60 border border-slate-850/60 text-slate-400'
                }`}
              >
                <span>{dayNum}</span>
                {hasWorkout && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-slate-950" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. BMI CALCULATOR CARD */}
      <div className="glass-card rounded-3xl p-5 border border-slate-800/80 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-sky-400" />
          <h3 className="font-bold text-slate-100">Индекс Массы Тела (ИМТ)</h3>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4 bg-slate-950/30 p-4 rounded-2xl border border-slate-900">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Ваш текущий ИМТ</span>
            <p className="text-3xl font-black text-white mt-1 font-mono">{bmi || '--'}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Категория</span>
            <p className={`text-sm font-black mt-1 uppercase ${bmiCat.color}`}>{bmiCat.label}</p>
          </div>
        </div>

        {/* BMI Scale Visualizer */}
        <div className="flex flex-col gap-2">
          {/* Colored progress bar scale */}
          <div className="h-2 w-full rounded-full flex overflow-hidden bg-slate-950">
            <div className="h-full bg-sky-400" style={{ width: '18.5%' }} title="Дефицит" />
            <div className="h-full bg-lime-400" style={{ width: '35%' }} title="Норма" />
            <div className="h-full bg-orange-400" style={{ width: '25%' }} title="Избыток" />
            <div className="h-full bg-red-500" style={{ width: '21.5%' }} title="Ожирение" />
          </div>

          {/* Text Labels */}
          <div className="flex justify-between text-[8px] text-slate-500 font-bold uppercase tracking-wider px-1">
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
          </div>

          {/* Dynamic Cursor position pointer */}
          {bmi > 0 && (
            <div className="w-full relative h-4">
              <div 
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                style={{ 
                  left: `${Math.min(95, Math.max(5, ((bmi - 10) / 30) * 100))}%` 
                }}
              >
                <div className="w-2 h-2 rotate-45 bg-lime-400 shadow-[0_0_6px_#a3e635]" />
                <span className="text-[9px] font-bold text-slate-300 mt-1 font-mono">Вы тут ({bmi})</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. WEIGHT TRACKER CARD WITH SVG CHART */}
      <div className="glass-card rounded-3xl p-5 border border-slate-800/80 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-orange-400" />
            <h3 className="font-bold text-slate-100 font-sans">История веса</h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {currentWeight} кг
          </span>
        </div>

        {/* Draw Custom SVG Chart */}
        {weightPoints.length > 1 ? (
          <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-2 relative overflow-hidden">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-28">
              <defs>
                <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#1e293b" strokeWidth="0.5" />
              <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#1e293b" strokeWidth="0.5" />
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#1e293b" strokeWidth="0.5" />

              {/* Area path */}
              <path d={chartAreaPath} fill="url(#chart-area-grad)" />

              {/* Line path */}
              <path d={chartLinePath} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

              {/* Dots on points */}
              {weightPoints.map((p, idx) => (
                <g key={idx}>
                  <circle cx={p.x} cy={p.y} r="5.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx={p.x} cy={p.y} r="2" fill="#38bdf8" />
                  {/* Weight label */}
                  <text 
                    x={p.x} y={p.y - 8} 
                    textAnchor="middle" 
                    fill="#f8fafc" 
                    fontSize="8" 
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {p.weight}
                  </text>
                  {/* Date label */}
                  <text 
                    x={p.x} y={chartHeight - 3} 
                    textAnchor="middle" 
                    fill="#475569" 
                    fontSize="7" 
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {p.date}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-slate-500 italic">
            Запишите вес несколько раз, чтобы построить график
          </div>
        )}

        {/* Input Log Weight Form */}
        <form onSubmit={handleWeightSubmit} className="flex gap-2">
          <input
            type="number"
            step="0.1"
            required
            placeholder="Новый вес (кг)..."
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-400 font-semibold"
          />
          <button
            type="submit"
            className="px-4 rounded-xl bg-orange-500/10 border border-orange-500/35 hover:bg-orange-500 hover:text-slate-950 transition-all text-xs font-bold text-orange-400 flex items-center gap-1 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" /> Записать
          </button>
        </form>
      </div>

      {/* 4. ACTIVITY HISTORY LOG FEED */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-black text-slate-200 tracking-tight flex items-center gap-2">
          <Activity className="w-5 h-5 text-lime-400" /> История тренировок
        </h3>

        {history.length === 0 ? (
          <div className="glass-card rounded-2xl p-6 border border-slate-800 text-center text-xs text-slate-500 italic">
            Вы еще не выполнили ни одной тренировки. Начните сегодня!
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {history.slice(0, 10).map((log) => (
              <div
                key={log.id}
                className="glass-card rounded-xl p-3.5 border border-slate-800 flex justify-between items-center text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-200">{log.workoutName}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5 font-mono">
                    {log.date}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sky-400 font-mono">
                    {Math.round(log.durationSeconds / 60) || 1} мин
                  </span>
                  <span className="mx-1.5 text-slate-700">|</span>
                  <span className="font-bold text-orange-400 font-mono">
                    {log.caloriesBurned} ккал
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
