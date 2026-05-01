'use client';

import { useState, useEffect } from 'react';
import { TodayWorkoutCard } from '@/components/home/TodayWorkoutCard';
import { StreakStats } from '@/components/home/StreakStats';
import { WeekCalendar } from '@/components/home/WeekCalendar';
import { createClient } from '@/lib/supabase-browser';
import { useProgress } from '@/hooks/useProgress';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [greeting, setGreeting] = useState('Olá');
  const [userName, setUserName] = useState('Atleta');
  const supabase = createClient();
  const { queryMonthlyStats } = useProgress();
  const stats = queryMonthlyStats.data || { workouts: 0, volume: 0, streak: 0, hours: 0 };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserName(user.email.split('@')[0]);
      }
    };
    fetchUser();

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Bom dia');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, [supabase]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-5 flex flex-col gap-6 pt-8 pb-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header variants={itemVariants}>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {greeting}, <span className="text-[#22c55e]">{userName}</span>
        </h1>
        <p className="text-neutral-400 mt-1">Pronto para superar seus limites hoje?</p>
      </motion.header>

      <motion.section variants={itemVariants}>
        <TodayWorkoutCard />
      </motion.section>

      <motion.section variants={itemVariants} className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-lg font-bold text-white">Seu Progresso</h2>
          <Link href="/progress" className="text-[#22c55e] text-sm font-medium flex items-center">
            Ver detalhes <ArrowUpRight size={14} className="ml-0.5" />
          </Link>
        </div>
        <StreakStats stats={stats} />
        <WeekCalendar />
      </motion.section>

      <motion.section variants={itemVariants} className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white px-1">Progressões Recomendadas</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/explore" className="bg-[#141414] p-4 rounded-2xl border border-white/5 hover:border-[#22c55e]/30 transition-all">
            <p className="text-[#22c55e] text-xs font-bold uppercase mb-1">Peito</p>
            <p className="text-white font-semibold">Flexão (Push-up)</p>
          </Link>
          <Link href="/explore" className="bg-[#141414] p-4 rounded-2xl border border-white/5 hover:border-[#22c55e]/30 transition-all">
            <p className="text-[#22c55e] text-xs font-bold uppercase mb-1">Costas</p>
            <p className="text-white font-semibold">Remada Australiana</p>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
