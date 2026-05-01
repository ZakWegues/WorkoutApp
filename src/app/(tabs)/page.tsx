'use client';

import { useState, useEffect } from 'react';
import { TodayWorkoutCard } from '@/components/home/TodayWorkoutCard';
import { StreakStats } from '@/components/home/StreakStats';
import { WeekCalendar } from '@/components/home/WeekCalendar';
import { useWorkoutStore } from '@/hooks/useWorkoutStore';

export default function HomePage() {
  const [greeting, setGreeting] = useState('Olá');
  const user = useWorkoutStore((state) => state.user);
  const userName = user?.name || 'Atleta';

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Bom dia');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  return (
    <div className="p-5 flex flex-col gap-6 pt-8">
      <header>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {greeting}, <span className="text-[#22c55e]">{userName}</span>
        </h1>
        <p className="text-neutral-400 mt-1">Pronto para superar seus limites hoje?</p>
      </header>

      <section>
        <TodayWorkoutCard />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-white px-1">Seu Progresso</h2>
        <StreakStats />
        <WeekCalendar />
      </section>
    </div>
  );
}
