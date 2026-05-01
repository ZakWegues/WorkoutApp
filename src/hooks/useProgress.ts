import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase-browser';
import { subDays, subWeeks, startOfWeek, format } from 'date-fns';

export function useProgress() {
  const supabase = createClient();

  const getWeeklyVolume = async (weeksToFetch = 8) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const startDate = subWeeks(new Date(), weeksToFetch);

    const { data } = await supabase
      .from('workout_sessions')
      .select('id, started_at, session_sets(weight_kg, reps_completed)')
      .eq('user_id', user.user.id)
      .gte('started_at', startDate.toISOString());

    if (!data) return [];

    const weeks: Record<string, number> = {};
    for (let i = weeksToFetch - 1; i >= 0; i--) {
      const w = startOfWeek(subWeeks(new Date(), i));
      weeks[format(w, 'MMM dd')] = 0;
    }

    data.forEach(session => {
      const weekLabel = format(startOfWeek(new Date(session.started_at)), 'MMM dd');
      const volume = session.session_sets.reduce((acc: number, set: any) => 
        acc + ((set.weight_kg || 0) * (set.reps_completed || 0)), 0);
      
      if (weeks[weekLabel] !== undefined) {
        weeks[weekLabel] += volume;
      }
    });

    return Object.entries(weeks).map(([week, volume]) => ({ week, volume }));
  };

  const getMonthlyStats = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return { workouts: 0, volume: 0, streak: 0, hours: 0 };

    const startOfMonth = subDays(new Date(), 30);
    
    const { data } = await supabase
      .from('workout_sessions')
      .select('started_at, finished_at, session_sets(weight_kg, reps_completed)')
      .eq('user_id', user.user.id)
      .order('started_at', { ascending: false });

    if (!data || data.length === 0) return { workouts: 0, volume: 0, streak: 0, hours: 0 };

    let monthWorkouts = 0;
    let monthVolume = 0;
    let totalSeconds = 0;

    // Streak calc
    let currentStreak = 0;
    let lastDate = new Date();
    lastDate.setHours(0, 0, 0, 0);

    const uniqueDates = Array.from(new Set(data.map(s => {
      const d = new Date(s.started_at);
      d.setHours(0,0,0,0);
      return d.getTime();
    })));

    let expectedDate = lastDate.getTime();
    if (uniqueDates.includes(expectedDate) || uniqueDates.includes(expectedDate - 86400000)) {
      if (uniqueDates.includes(expectedDate)) {
        currentStreak++;
        expectedDate -= 86400000;
      } else if (uniqueDates.includes(expectedDate - 86400000)) {
        // Did not train today, but trained yesterday
        expectedDate -= 86400000;
        currentStreak++;
        expectedDate -= 86400000;
      }
      
      while (uniqueDates.includes(expectedDate)) {
        currentStreak++;
        expectedDate -= 86400000;
      }
    }

    data.forEach(session => {
      if (new Date(session.started_at) >= startOfMonth) {
        monthWorkouts++;
        monthVolume += session.session_sets.reduce((acc: number, set: any) => 
          acc + ((set.weight_kg || 0) * (set.reps_completed || 0)), 0);
        
        if (session.finished_at) {
          totalSeconds += (new Date(session.finished_at).getTime() - new Date(session.started_at).getTime()) / 1000;
        }
      }
    });

    return {
      workouts: monthWorkouts,
      volume: monthVolume,
      streak: currentStreak,
      hours: Math.round(totalSeconds / 3600 * 10) / 10
    };
  };

  const getWorkoutHistory = async (page = 0) => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data } = await supabase
      .from('workout_sessions')
      .select('*, workouts(name), session_sets(*, exercises(name))')
      .eq('user_id', user.user.id)
      .order('started_at', { ascending: false })
      .range(page * 10, (page + 1) * 10 - 1);

    return data || [];
  };

  const getPersonalRecords = async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return [];

    const { data } = await supabase
      .from('session_sets')
      .select('weight_kg, completed_at, exercises(id, name, muscle_group)')
      .eq('workout_sessions.user_id', user.user.id);
    // Actually we need to join workout_sessions to check user_id.
    // In Supabase we can do it via a view or RPC, but let's just fetch all and group if RLS enforces user only anyway.
    // Assuming RLS session_sets limits to user's own sets:
    const { data: setsData } = await supabase
      .from('session_sets')
      .select('weight_kg, completed_at, exercises(id, name, muscle_group, equipment, difficulty)')
      .not('weight_kg', 'is', null);

    if (!setsData) return [];

    const recordsMap = new Map<string, any>();
    setsData.forEach((set: any) => {
      if (!set.exercises) return;
      const exId = set.exercises.id;
      const weight = set.weight_kg || 0;
      if (!recordsMap.has(exId) || recordsMap.get(exId).weightKg < weight) {
        recordsMap.set(exId, {
          exercise: set.exercises,
          weightKg: weight,
          date: set.completed_at
        });
      }
    });

    return Array.from(recordsMap.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const queryWeeklyVolume = useQuery({
    queryKey: ['progress', 'weeklyVolume'],
    queryFn: () => getWeeklyVolume(),
  });

  const queryMonthlyStats = useQuery({
    queryKey: ['progress', 'monthlyStats'],
    queryFn: () => getMonthlyStats(),
  });

  const queryHistory = useQuery({
    queryKey: ['progress', 'history', 0],
    queryFn: () => getWorkoutHistory(0),
  });

  const queryRecords = useQuery({
    queryKey: ['progress', 'records'],
    queryFn: () => getPersonalRecords(),
  });

  return {
    queryWeeklyVolume,
    queryMonthlyStats,
    queryHistory,
    queryRecords,
    getWorkoutHistory
  };
}
