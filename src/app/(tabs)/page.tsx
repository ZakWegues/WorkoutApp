import { createClient } from '@/lib/supabase-server';
import HomeClient from './HomeClient';
import { startOfWeek, endOfWeek } from 'date-fns';
import type { ProfileRow, WorkoutSessionRow } from '@/types/database';

export default async function HomePage() {
  const supabase = await createClient();
  
  let userName = 'Atleta';
  let userLevel: 1 | 2 | 3 | 4 | 5 = 1;
  let streak = 0;
  let weeklyWorkouts = 0;
  let trainedDays: number[] = [];

  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // 1. Fetch User Profile
      const { data: rawProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const profile = rawProfile as unknown as ProfileRow | null;
      if (profile) {
        userName = profile.name || user.email?.split('@')[0] || 'Atleta';
        userLevel = (profile.level || 1) as 1 | 2 | 3 | 4 | 5;
      }

      // 2. Fetch Weekly Stats
      const now = new Date();
      const start = startOfWeek(now);
      const end = endOfWeek(now);

      const { data: rawSessions } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('user_id', user.id)
        .gte('started_at', start.toISOString())
        .lte('started_at', end.toISOString());

      const sessions = (rawSessions ?? []) as unknown as WorkoutSessionRow[];
      trainedDays = Array.from(new Set(sessions.map(s => new Date(s.started_at).getDay())));
      weeklyWorkouts = trainedDays.length;

      // 3. Calculate Streak
      const { data: rawLastSessions } = await supabase
        .from('workout_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })
        .limit(30);

      const lastSessions = (rawLastSessions ?? []) as unknown as WorkoutSessionRow[];
      const uniqueDates = Array.from(new Set(lastSessions.map(s => {
        const d = new Date(s.started_at);
        d.setHours(0,0,0,0);
        return d.getTime();
      })));

      let checkDate = new Date();
      checkDate.setHours(0,0,0,0);
      
      // If didn't train today, check if trained yesterday
      if (!uniqueDates.includes(checkDate.getTime())) {
        checkDate.setDate(checkDate.getDate() - 1);
      }

      while (uniqueDates.includes(checkDate.getTime())) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }
  } catch (error) {
    console.error('Error fetching home data:', error);
    // Continue with default values
  }

  return (
    <HomeClient 
      userName={userName}
      userLevel={userLevel}
      streak={streak}
      weeklyWorkouts={weeklyWorkouts}
      trainedDays={trainedDays}
    />
  );
}
