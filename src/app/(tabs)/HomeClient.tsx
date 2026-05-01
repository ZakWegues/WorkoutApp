'use client';

import { motion } from 'framer-motion';
import { Bell, ChevronRight, CheckCircle2, Sparkles, TrendingUp, Trophy, Flame } from 'lucide-react';
import { DifficultyBadge } from '@/components/ui/DifficultyBadge';
import { DayType, dayTypeLabels, RoutineExercise, Level } from '@/lib/routines';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HomeClientProps {
  profile: {
    name: string;
    level: Level;
    goal: string | null;
  };
  greeting: string;
  todayRoutine: {
    dayType: DayType;
    exercises: any[];
    label: any;
  };
  weeklyStats: {
    sessionsCount: number;
    streak: number;
    trainedDays: number[]; // 0-6
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomeClient({ profile, greeting, todayRoutine, weeklyStats }: HomeClientProps) {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const today = new Date().getDay();

  const handleStartWorkout = () => {
    // Map routine exercises to FullWorkout format
    const workoutData = {
      id: `routine-${todayRoutine.dayType}-${profile.level}`,
      user_id: null,
      name: todayRoutine.label.title,
      description: todayRoutine.label.description,
      estimated_duration_min: 45,
      is_ai_generated: false,
      created_at: new Date().toISOString(),
      workout_exercises: todayRoutine.exercises.map((ex, i) => ({
        id: `re-${i}`,
        workout_id: `routine-${todayRoutine.dayType}-${profile.level}`,
        exercise_id: 'calisthenics-exercise-id', // We should ideally fetch real IDs
        position: i,
        sets: ex.sets,
        reps: typeof ex.reps === 'number' ? ex.reps : 10,
        rest_seconds: 60,
        weight_suggestion_kg: 0,
        exercises: {
          id: 'calisthenics-exercise-id',
          name: ex.nameEn,
          muscle_group: 'chest',
          equipment: 'bodyweight',
          difficulty: ex.difficulty,
        }
      }))
    };

    sessionStorage.setItem('quick_workout', JSON.stringify(workoutData));
    window.location.href = '/workout/quick';
  };

  return (
    <motion.div 
      className="p-5 flex flex-col gap-8 pt-8 pb-32"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {greeting}, <span className="text-[#22c55e]">{profile.name}</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Level {profile.level} • {profile.goal || 'Shape'}</p>
        </div>
        <button className="p-3 bg-zinc-900 rounded-2xl border border-white/5 text-zinc-400 hover:text-white transition-colors">
          <Bell size={20} />
        </button>
      </motion.header>

      {/* Today's Workout Card */}
      <motion.section variants={itemVariants}>
        <div className="bg-zinc-900 rounded-[32px] p-6 border border-white/5 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#22c55e]/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.2em]">
                {todayRoutine.label.title} {todayRoutine.label.emoji}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{todayRoutine.label.description}</h3>
            
            <div className="space-y-3 mb-8">
              {todayRoutine.exercises.slice(0, 3).map((ex, i) => (
                <div key={i} className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{ex.name}</span>
                    <span className="text-[10px] text-zinc-500 font-medium">{ex.sets}x{ex.reps}</span>
                  </div>
                  <DifficultyBadge difficulty={ex.difficulty} className="scale-75 origin-right" />
                </div>
              ))}
            </div>

            {todayRoutine.dayType !== 'rest' ? (
              <button 
                onClick={handleStartWorkout}
                className="w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-black py-4 rounded-2xl flex items-center justify-center transition-all shadow-[0_10px_30px_rgba(34,197,94,0.2)] active:scale-95"
              >
                Iniciar Treino
              </button>
            ) : (
              <Link href="/coach" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-black py-4 rounded-2xl flex items-center justify-center transition-all">
                <Sparkles size={18} className="mr-2 text-[#22c55e]" />
                Gerar com IA Coach
              </Link>
            )}
          </div>
        </div>
      </motion.section>

      {/* Stats Row */}
      <motion.section variants={itemVariants} className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-900 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
          <Flame size={20} className="text-orange-500 mb-2" />
          <span className="text-xl font-black text-white">{weeklyStats.streak}</span>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Streak</span>
        </div>
        <div className="bg-zinc-900 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
          <Trophy size={20} className="text-[#22c55e] mb-2" />
          <span className="text-xl font-black text-white">{weeklyStats.sessionsCount}</span>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Semana</span>
        </div>
        <div className="bg-zinc-900 p-4 rounded-3xl border border-white/5 flex flex-col items-center">
          <TrendingUp size={20} className="text-blue-500 mb-2" />
          <span className="text-xl font-black text-white">Lvl {profile.level}</span>
          <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${(profile.level / 5) * 100}%` }} />
          </div>
        </div>
      </motion.section>

      {/* Weekly Tracker */}
      <motion.section variants={itemVariants} className="bg-zinc-900 p-6 rounded-[32px] border border-white/5">
        <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Sua Semana</h4>
        <div className="flex justify-between items-center">
          {weekDays.map((day, i) => {
            const isTrained = weeklyStats.trainedDays.includes(i);
            const isToday = i === today;
            
            return (
              <div key={i} className="flex flex-col items-center gap-3">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-tighter",
                  isToday ? "text-[#22c55e]" : "text-zinc-500"
                )}>
                  {day}
                </span>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all border-2",
                  isTrained 
                    ? "bg-[#22c55e] border-[#22c55e] text-black" 
                    : isToday 
                      ? "bg-transparent border-[#22c55e] text-[#22c55e]" 
                      : "bg-transparent border-zinc-800 text-zinc-800"
                )}>
                  {isTrained ? <CheckCircle2 size={18} /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Recommended Progressions */}
      <motion.section variants={itemVariants}>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Recomendados Lvl {profile.level}</h4>
          <Link href="/explore" className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">Ver Todos</Link>
        </div>
        <div className="flex flex-col gap-3">
          {todayRoutine.exercises.map((ex, i) => (
            <Link href="/explore" key={i}>
              <div className="bg-zinc-900 p-4 rounded-3xl border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black/40 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-[#22c55e] transition-colors">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#22c55e] transition-colors">{ex.name}</p>
                    <DifficultyBadge difficulty={ex.difficulty} className="scale-75 origin-left -ml-1 mt-0.5" />
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
