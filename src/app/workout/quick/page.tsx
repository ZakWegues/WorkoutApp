'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WorkoutPlayer } from '@/components/workout/WorkoutPlayer';
import { FullWorkout } from '@/hooks/useWorkoutSession';

export default function QuickWorkoutPage() {
  const router = useRouter();
  const [workout, setWorkout] = useState<FullWorkout | null>(null);

  useEffect(() => {
    try {
      const data = sessionStorage.getItem('quick_workout');
      if (!data) {
        router.push('/explore');
        return;
      }
      setWorkout(JSON.parse(data));
    } catch (e) {
      router.push('/explore');
    }
  }, [router]);

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-neutral-500 font-medium">Carregando treino...</p>
      </div>
    );
  }

  return <WorkoutPlayer workout={workout} />;
}
