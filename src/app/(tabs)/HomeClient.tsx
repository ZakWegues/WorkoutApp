'use client';

import { motion, Variants } from 'framer-motion';
import { Bell, ChevronRight, CheckCircle2, Sparkles, TrendingUp, Trophy, Flame, Dumbbell } from 'lucide-react';
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
    exercises: RoutineExercise[];
    label: typeof dayTypeLabels[DayType];
  };
  weeklyStats: {
    sessionsCount: number;
    streak: number;
    trainedDays: number[]; // 0-6
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};


export default function HomeClient({ profile, greeting, todayRoutine, weeklyStats }: HomeClientProps) {
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const today = new Date().getDay();

  const handleStartWorkout = () => {
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
        exercise_id: `ex-${ex.nameEn.toLowerCase().replace(/\s+/g, '-')}`,
        position: i,
        sets: ex.sets,
        reps: typeof ex.reps === 'number' ? ex.reps : 10,
        rest_seconds: 60,
        weight_suggestion_kg: 0,
        exercises: {
          id: `ex-${ex.nameEn.toLowerCase().replace(/\s+/g, '-')}`,
          name: ex.name,
          muscle_group: todayRoutine.dayType.includes('push') ? 'chest' : todayRoutine.dayType.includes('pull') ? 'back' : 'legs',
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
      className="p-5 flex flex-col gap-10 pt-8 pb-32 max-w-md mx-auto"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.header 
        variants={itemVariants} 
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {greeting}, <span className="text-[#22c55e]">{profile.name}</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">Nível {profile.level} • {profile.goal || 'Calistenia'}</p>
        </div>
        <button className="p-3 bg-zinc-900 rounded-2xl border border-white/5 text-zinc-400 hover:text-white transition-all active:scale-90">
          <Bell size={20} />
        </button>
      </motion.header>

      {/* Today's Workout Card */}
      <motion.section 
        variants={itemVariants}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="bg-zinc-900 rounded-[32px] p-6 border border-zinc-800 relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#22c55e]/5 rounded-full blur-3xl transition-all group-hover:bg-[#22c55e]/10" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.2em]">
                {todayRoutine.label.title} {todayRoutine.label.emoji}
              </span>
            </div>
            <h3 className="text-2xl font-black text-white mb-6">{todayRoutine.label.description}</h3>
            
            <div className="space-y-3 mb-8">
              {todayRoutine.exercises.slice(0, 3).map((ex, i) => (
                <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 group/ex hover:border-white/20 transition-all">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover/ex:text-[#22c55e] transition-colors">{ex.name}</span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{ex.sets} séries • {ex.reps}</span>
                  </div>
                  <DifficultyBadge difficulty={ex.difficulty} className="scale-90 origin-right" />
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
              <Link href="/coach" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-black py-4 rounded-2xl flex items-center justify-center transition-all active:scale-95">
                <Sparkles size={18} className="mr-2 text-[#22c55e]" />
                Gerar com IA Coach
              </Link>
            )}
          </div>
        </div>
      </motion.section>

      {/* Stats Row */}
      <motion.section 
        variants={itemVariants} 
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="grid grid-cols-3 gap-3"
      >
        <div className="bg-zinc-900 p-5 rounded-[32px] border border-zinc-800 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center mb-3">
            <Flame size={20} className="text-orange-500" />
          </div>
          <span className="text-xl font-black text-white">{weeklyStats.streak}</span>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter mt-1">Streak</span>
        </div>
        <div className="bg-zinc-900 p-5 rounded-[32px] border border-zinc-800 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center mb-3">
            <Trophy size={20} className="text-[#22c55e]" />
          </div>
          <span className="text-xl font-black text-white">{weeklyStats.sessionsCount}</span>
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter mt-1">Semana</span>
        </div>
        <div className="bg-zinc-900 p-5 rounded-[32px] border border-zinc-800 flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <span className="text-xl font-black text-white">Lvl {profile.level}</span>
          <div className="w-full h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500" 
              initial={{ width: 0 }}
              animate={{ width: `${(profile.level / 5) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.section>

      {/* Weekly Tracker */}
      <motion.section 
        variants={itemVariants} 
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-zinc-900 p-7 rounded-[32px] border border-zinc-800"
      >
        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-8">Sua Semana</h4>
        <div className="flex justify-between items-center">
          {weekDays.map((day, i) => {
            const isTrained = weeklyStats.trainedDays.includes(i);
            const isToday = i === today;
            
            return (
              <div key={i} className="flex flex-col items-center gap-4">
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-tighter",
                  isToday ? "text-[#22c55e]" : "text-zinc-500"
                )}>
                  {day}
                </span>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all border-2",
                  isTrained 
                    ? "bg-[#22c55e] border-[#22c55e] text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                    : isToday 
                      ? "bg-transparent border-[#22c55e] text-[#22c55e]" 
                      : "bg-transparent border-zinc-800 text-zinc-800"
                )}>
                  {isTrained ? <CheckCircle2 size={18} /> : <span className="text-xs font-black">{i + 1}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Recommended Progressions */}
      <motion.section 
        variants={itemVariants}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="flex justify-between items-center mb-6 px-1">
          <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Progressões Recomendadas</h4>
          <Link href="/explore" className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest hover:underline transition-all">Ver Tudo</Link>
        </div>
        <div className="flex flex-col gap-4">
          {todayRoutine.exercises.slice(0, 3).map((ex, i) => (
            <Link href="/explore" key={i}>
              <div className="bg-zinc-900 p-5 rounded-[28px] border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all flex items-center justify-between group active:scale-[0.98]">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-black/40 rounded-2xl flex items-center justify-center text-zinc-600 group-hover:text-[#22c55e] group-hover:bg-[#22c55e]/5 transition-all">
                    <Dumbbell size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#22c55e] transition-colors">{ex.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <DifficultyBadge difficulty={ex.difficulty} className="scale-75 origin-left" />
                      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">• Calistenia</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-zinc-800 group-hover:text-white transition-all transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

