import { createClient } from '@/lib/supabase-server';
import { getTodayRoutine } from '@/lib/routines';
import HomeClient from './HomeClient';
import { startOfWeek, endOfWeek } from 'date-fns';
import type { ProfileRow } from '@/types/database';

export default async function HomePage() {
  const supabase = await createClient();
  
  // 1. Fetch User Profile
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const profile = rawProfile as unknown as ProfileRow | null;

  const userLevel = ((profile?.level as number) || 1) as 1 | 2 | 3 | 4 | 5;
  const userName = profile?.name || user.email?.split('@')[0] || 'Atleta';
  const userGoal = profile?.goal || 'Força';


  // 2. Fetch Weekly Stats
  const now = new Date();
  const start = startOfWeek(now);
  const end = endOfWeek(now);

  const { data: sessions } = await supabase
    .from('workout_sessions')
    .select('started_at')
    .eq('user_id', user.id)
    .gte('started_at', start.toISOString())
    .lte('started_at', end.toISOString());

  const trainedDays = Array.from(new Set((sessions || []).map(s => new Date(s.started_at).getDay())));
  const sessionsCount = trainedDays.length;

  // 3. Calculate Streak (simple version for server component)
  // We'll fetch the last 30 sessions to calculate streak
  const { data: lastSessions } = await supabase
    .from('workout_sessions')
    .select('started_at')
    .eq('user_id', user.id)
    .order('started_at', { ascending: false })
    .limit(30);

  const uniqueDates = Array.from(new Set((lastSessions || []).map(s => {
    const d = new Date(s.started_at);
    d.setHours(0,0,0,0);
    return d.getTime();
  })));

  let streak = 0;
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

  // 4. Get Today's Routine
  const todayRoutine = getTodayRoutine(userLevel);

  // 5. Determine Greeting
  const hour = new Date().getHours();
  let greeting = 'Boa noite';
  if (hour >= 5 && hour < 12) greeting = 'Bom dia';
  else if (hour >= 12 && hour < 18) greeting = 'Boa tarde';

  return (
    <HomeClient 
      profile={{
        name: userName,
        level: userLevel,
        goal: userGoal,
      }}
      greeting={greeting}
      todayRoutine={todayRoutine}
      weeklyStats={{
        sessionsCount,
        streak,
        trainedDays,
      }}
    />
  );
}
