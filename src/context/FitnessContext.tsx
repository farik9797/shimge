import React, { createContext, useContext, useState, useEffect } from 'react';
import { Exercise, Workout, CustomWorkout, UserProfile, WeightLog, WaterLog, ActivityLog, TabRoute, Reminder } from '../types';
import { EXERCISES_DB } from '../data/exercises';

interface FitnessContextType {
  history: ActivityLog[];
  profile: UserProfile;
  customWorkouts: CustomWorkout[];
  weightHistory: WeightLog[];
  waterHistory: WaterLog[];
  activeTab: TabRoute;
  activeWorkout: Workout | null;
  personalizedWorkout: Workout | null;
  streak: number;
  totalCalories: number;
  totalMinutes: number;
  totalWorkouts: number;
  getTodayWater: () => number;
  addActivityLog: (workoutId: string, workoutName: string, durationSeconds: number, caloriesBurned: number, difficultyRating?: number) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addCustomWorkout: (name: string, exercises: Exercise[]) => void;
  deleteCustomWorkout: (id: string) => void;
  logWeight: (weight: number) => void;
  logWater: (amount: number) => void;
  resetAllData: () => void;
  startWorkout: (workout: Workout) => void;
  cancelWorkout: () => void;
  setActiveTab: (tab: TabRoute) => void;
  completeQuiz: (answers: {
    gender: 'male' | 'female' | 'other';
    goal: 'lose_weight' | 'build_muscle' | 'keep_fit';
    focusArea: 'full_body' | 'abs' | 'chest' | 'arm' | 'leg';
    fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
    height: number;
    weight: number;
  }) => void;
  completeChallengeDay: (dayNumber: number, durationSeconds: number, caloriesBurned: number) => void;
  addReminder: (time: string, days: number[]) => void;
  deleteReminder: (id: string) => void;
  toggleReminder: (id: string) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  height: 175,
  weight: 70,
  gender: 'male',
  waterTarget: 2000,
  restDuration: 20,
  countdownDuration: 10,
  voiceGuideEnabled: true,
  soundEffectsEnabled: true,
  hasCompletedQuiz: false,
  completedChallengeDays: [],
  reminders: []
};

// Generates string date in Swedish locale (YYYY-MM-DD)
const getLocalDateString = (offsetDays = 0) => {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  return d.toLocaleDateString('sv');
};

const INITIAL_MOCK_HISTORY: ActivityLog[] = [
  {
    id: 'mock-1',
    date: getLocalDateString(-4),
    workoutId: 'abs_beginner',
    workoutName: 'Пресс (Новичок)',
    durationSeconds: 360,
    caloriesBurned: 35,
    difficultyRating: 3
  },
  {
    id: 'mock-2',
    date: getLocalDateString(-2),
    workoutId: 'full_body_beginner',
    workoutName: 'Все тело (Новичок)',
    durationSeconds: 420,
    caloriesBurned: 45,
    difficultyRating: 4
  },
  {
    id: 'mock-3',
    date: getLocalDateString(-1),
    workoutId: 'arm_beginner',
    workoutName: 'Руки (Новичок)',
    durationSeconds: 300,
    caloriesBurned: 32,
    difficultyRating: 2
  }
];

const INITIAL_MOCK_WEIGHTS: WeightLog[] = [
  { id: 'w-1', date: getLocalDateString(-15), weight: 72.5 },
  { id: 'w-2', date: getLocalDateString(-10), weight: 71.8 },
  { id: 'w-3', date: getLocalDateString(-5), weight: 71.2 },
  { id: 'w-4', date: getLocalDateString(-1), weight: 70.2 }
];

const INITIAL_MOCK_WATER: WaterLog[] = [
  { date: getLocalDateString(-2), amount: 1500 },
  { date: getLocalDateString(-1), amount: 1750 }
];

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('fit_history');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_HISTORY;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fit_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure arrays exist for backwards compatibility
      return {
        ...DEFAULT_PROFILE,
        ...parsed,
        completedChallengeDays: parsed.completedChallengeDays || [],
        reminders: parsed.reminders || []
      };
    }
    return DEFAULT_PROFILE;
  });

  const [customWorkouts, setCustomWorkouts] = useState<CustomWorkout[]>(() => {
    const saved = localStorage.getItem('fit_custom');
    return saved ? JSON.parse(saved) : [];
  });

  const [weightHistory, setWeightHistory] = useState<WeightLog[]>(() => {
    const saved = localStorage.getItem('fit_weights');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_WEIGHTS;
  });

  const [waterHistory, setWaterHistory] = useState<WaterLog[]>(() => {
    const saved = localStorage.getItem('fit_water');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_WATER;
  });

  const [personalizedWorkout, setPersonalizedWorkout] = useState<Workout | null>(() => {
    const saved = localStorage.getItem('fit_personalized');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState<TabRoute>('home');
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fit_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('fit_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('fit_custom', JSON.stringify(customWorkouts));
  }, [customWorkouts]);

  useEffect(() => {
    localStorage.setItem('fit_weights', JSON.stringify(weightHistory));
  }, [weightHistory]);

  useEffect(() => {
    localStorage.setItem('fit_water', JSON.stringify(waterHistory));
  }, [waterHistory]);

  useEffect(() => {
    localStorage.setItem('fit_personalized', JSON.stringify(personalizedWorkout));
  }, [personalizedWorkout]);

  // Derived state calculations
  const totalCalories = history.reduce((sum, log) => sum + log.caloriesBurned, 0);
  const totalMinutes = Math.round(history.reduce((sum, log) => sum + log.durationSeconds, 0) / 60);
  const totalWorkouts = history.length;

  const streak = React.useMemo(() => {
    if (history.length === 0) return 0;
    
    // Extract unique dates of workout, sort descending
    const uniqueDates = Array.from(new Set(history.map(log => log.date))) as string[];
    uniqueDates.sort((a, b) => b.localeCompare(a));
    
    const today = getLocalDateString();
    const yesterday = getLocalDateString(-1);
    
    // If the latest workout is not today and not yesterday, streak is broken
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
      return 0;
    }
    
    let currentStreak = 1;
    let current = new Date(uniqueDates[0]);
    
    for (let i = 1; i < uniqueDates.length; i++) {
      const next = new Date(uniqueDates[i]);
      const diffTime = Math.abs(current.getTime() - next.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        current = next;
      } else if (diffDays > 1) {
        break;
      }
    }
    return currentStreak;
  }, [history]);

  const getTodayWater = () => {
    const todayStr = getLocalDateString();
    const todayLog = waterHistory.find(w => w.date === todayStr);
    return todayLog ? todayLog.amount : 0;
  };

  const addActivityLog = (
    workoutId: string,
    workoutName: string,
    durationSeconds: number,
    caloriesBurned: number,
    difficultyRating?: number
  ) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      date: getLocalDateString(),
      workoutId,
      workoutName,
      durationSeconds,
      caloriesBurned,
      difficultyRating
    };
    setHistory(prev => [newLog, ...prev]);
  };

  // Helper to add or update weight logs
  const logWeightDirectly = (weight: number) => {
    const todayStr = getLocalDateString();
    setWeightHistory(prev => {
      const index = prev.findIndex(w => w.date === todayStr);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], weight };
        return updated;
      } else {
        return [...prev, { id: `w-${Date.now()}`, date: todayStr, weight }].sort((a, b) => a.date.localeCompare(b.date));
      }
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    if (updates.weight !== undefined) {
      logWeightDirectly(updates.weight);
    }
  };

  const addCustomWorkout = (name: string, exercises: Exercise[]) => {
    const newWorkout: CustomWorkout = {
      id: `custom-${Date.now()}`,
      name,
      exercises
    };
    setCustomWorkouts(prev => [...prev, newWorkout]);
  };

  const deleteCustomWorkout = (id: string) => {
    setCustomWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const logWeight = (weight: number) => {
    logWeightDirectly(weight);
    setProfile(prev => ({ ...prev, weight }));
  };

  const logWater = (amount: number) => {
    const todayStr = getLocalDateString();
    setWaterHistory(prev => {
      const index = prev.findIndex(w => w.date === todayStr);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], amount: Math.max(0, updated[index].amount + amount) };
        return updated;
      } else {
        return [...prev, { date: todayStr, amount: Math.max(0, amount) }];
      }
    });
  };

  const resetAllData = () => {
    localStorage.removeItem('fit_history');
    localStorage.removeItem('fit_profile');
    localStorage.removeItem('fit_custom');
    localStorage.removeItem('fit_weights');
    localStorage.removeItem('fit_water');
    localStorage.removeItem('fit_personalized');
    
    setHistory([]);
    setProfile(DEFAULT_PROFILE);
    setCustomWorkouts([]);
    setWeightHistory([{ id: `w-${Date.now()}`, date: getLocalDateString(), weight: DEFAULT_PROFILE.weight }]);
    setWaterHistory([]);
    setPersonalizedWorkout(null);
    setActiveWorkout(null);
    setActiveTab('home');
  };

  const startWorkout = (workout: Workout) => {
    setActiveWorkout(workout);
  };

  const cancelWorkout = () => {
    setActiveWorkout(null);
  };

  // COMPLETE QUIZ AND GENERATE WORKOUT
  const completeQuiz = (answers: {
    gender: 'male' | 'female' | 'other';
    goal: 'lose_weight' | 'build_muscle' | 'keep_fit';
    focusArea: 'full_body' | 'abs' | 'chest' | 'arm' | 'leg';
    fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
    height: number;
    weight: number;
  }) => {
    let selectedIds: string[] = [];
    if (answers.focusArea === 'abs') {
      selectedIds = ['jumping_jacks', 'crunches', 'mountain_climbers', 'leg_raises', 'crunches', 'plank', 'cobra_stretch'];
    } else if (answers.focusArea === 'chest') {
      selectedIds = ['jumping_jacks', 'pushups', 'squats', 'pushups', 'plank', 'cobra_stretch'];
    } else if (answers.focusArea === 'arm') {
      selectedIds = ['jumping_jacks', 'pushups', 'mountain_climbers', 'pushups', 'plank'];
    } else if (answers.focusArea === 'leg') {
      selectedIds = ['jumping_jacks', 'squats', 'lunges', 'wall_sit', 'squats', 'lunges'];
    } else {
      selectedIds = ['jumping_jacks', 'squats', 'pushups', 'crunches', 'lunges', 'plank', 'cobra_stretch'];
    }

    const personalizedExercises: Exercise[] = selectedIds.map((id, idx) => {
      const base = EXERCISES_DB.find(ex => ex.id === id);
      if (!base) throw new Error(`Exercise ${id} not found`);
      const cloned = { ...base, id: `${base.id}-p-${idx}` };
      const levelMultiplier = answers.fitnessLevel === 'beginner' ? 0.8 : answers.fitnessLevel === 'intermediate' ? 1.2 : 1.6;

      if (cloned.isDurationBased) {
        cloned.duration = Math.round(cloned.duration * levelMultiplier);
      } else {
        cloned.reps = Math.round(cloned.reps * levelMultiplier);
      }
      return cloned;
    });

    const goalText = 
      answers.goal === 'lose_weight' ? 'Сжигание жира' : 
      answers.goal === 'build_muscle' ? 'Набор мышечной массы' : 'Поддержание формы';

    const focusText = 
      answers.focusArea === 'abs' ? 'Проработка Пресса' : 
      answers.focusArea === 'chest' ? 'Проработка Груди' : 
      answers.focusArea === 'arm' ? 'Сила Рук' : 
      answers.focusArea === 'leg' ? 'Тонус Ног' : 'Всё Тело';

    const levelText = 
      answers.fitnessLevel === 'beginner' ? 'Новичок' : 
      answers.fitnessLevel === 'intermediate' ? 'Средний' : 'Профи';

    const estimatedMinutes = Math.max(1, Math.round(personalizedExercises.reduce((sum, ex) => {
      return sum + (ex.isDurationBased ? ex.duration : 15);
    }, 0) / 60));
    
    const estimatedCalories = personalizedExercises.reduce((sum, ex) => {
      const minutes = ex.isDurationBased ? (ex.duration / 60) : (ex.reps * 3 / 60);
      return sum + Math.round(minutes * ex.calorieRate);
    }, 0) || 30;

    const generatedWorkout: Workout = {
      id: 'personalized_workout',
      name: 'Мой Персональный План',
      description: `Индивидуальная программа тренировок, составленная под ваши параметры. Цель: ${goalText}. Фокус: ${focusText}. Сложность: ${levelText}.`,
      difficulty: answers.fitnessLevel,
      focusArea: answers.focusArea,
      exercises: personalizedExercises,
      estimatedMinutes,
      estimatedCalories,
      iconName: 'Sparkles'
    };

    setPersonalizedWorkout(generatedWorkout);
    logWeightDirectly(answers.weight);

    updateProfile({
      height: answers.height,
      weight: answers.weight,
      gender: answers.gender,
      goal: answers.goal,
      focusArea: answers.focusArea,
      fitnessLevel: answers.fitnessLevel,
      hasCompletedQuiz: true,
      personalizedWorkoutId: generatedWorkout.id,
      completedChallengeDays: [],
      reminders: []
    });
  };

  // CHALLENGE FUNCTIONS
  const completeChallengeDay = (dayNumber: number, durationSeconds: number, caloriesBurned: number) => {
    updateProfile({
      completedChallengeDays: Array.from(new Set([...(profile.completedChallengeDays || []), dayNumber]))
    });
    
    addActivityLog(
      `challenge_day_${dayNumber}`,
      `Челлендж 7х4: День ${dayNumber}`,
      durationSeconds,
      caloriesBurned
    );
  };

  // REMINDER FUNCTIONS
  const addReminder = (time: string, days: number[]) => {
    const newReminder: Reminder = {
      id: `rem-${Date.now()}`,
      time,
      enabled: true,
      days
    };
    updateProfile({
      reminders: [...(profile.reminders || []), newReminder]
    });
  };

  const deleteReminder = (id: string) => {
    updateProfile({
      reminders: (profile.reminders || []).filter(r => r.id !== id)
    });
  };

  const toggleReminder = (id: string) => {
    updateProfile({
      reminders: (profile.reminders || []).map(r => r.id === id ? { ...r, enabled: !r.enabled } : r)
    });
  };

  return (
    <FitnessContext.Provider
      value={{
        history,
        profile,
        customWorkouts,
        weightHistory,
        waterHistory,
        activeTab,
        activeWorkout,
        personalizedWorkout,
        streak,
        totalCalories,
        totalMinutes,
        totalWorkouts,
        getTodayWater,
        addActivityLog,
        updateProfile,
        addCustomWorkout,
        deleteCustomWorkout,
        logWeight,
        logWater,
        resetAllData,
        startWorkout,
        cancelWorkout,
        setActiveTab,
        completeQuiz,
        completeChallengeDay,
        addReminder,
        deleteReminder,
        toggleReminder
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
