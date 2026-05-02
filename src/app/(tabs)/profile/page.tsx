'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LogOut, Download, ChevronRight, User } from 'lucide-react';
import { cn, getLevelColor } from '@/lib/utils';
import type { WorkoutSessionRow, SessionSetRow, ProfileRow } from '@/types/database';

const levels = [
  { value: 1, label: 'Nível 1', desc: 'Absoluto iniciante' },
  { value: 2, label: 'Nível 2', desc: 'Iniciante' },
  { value: 3, label: 'Nível 3', desc: 'Intermediário' },
  { value: 4, label: 'Nível 4', desc: 'Avançado' },
  { value: 5, label: 'Nível 5', desc: 'Elite' },
];

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profile);
      }
      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const updateLevel = async (level: number) => {
    if (!user) return;
    const { error } = await (supabase as any)
      .from('profiles')
      .update({ level: level })
      .eq('id', user.id);


    if (error) {
      toast.error('Erro ao atualizar nível');
    } else {
      setProfile(prev => prev ? { ...prev, level: level as 1 | 2 | 3 | 4 | 5 } : null);
      toast.success(`Nível ${level} selecionado!`);
      
      // Update theme color immediately
      const color = getLevelColor(level);
      document.documentElement.style.setProperty('--primary-color', color);
      
      router.refresh();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    queryClient.clear();
    localStorage.clear();
    sessionStorage.clear();
    router.push('/login');
  };

  const exportData = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('workout_sessions')
      .select('*, session_sets(*)')
      .eq('user_id', user.id);

    const sessions = (data ?? []) as (WorkoutSessionRow & { session_sets: SessionSetRow[] })[];
    if (!sessions || sessions.length === 0) return;

    const csvContent = "data:text/csv;charset=utf-8,"
      + "id,started_at,finished_at\n"
      + sessions.map(row => `${row.id},${row.started_at},${row.finished_at}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historico_treinos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Dados exportados com sucesso!');
  };

  if (loading) return <div className="p-5 text-zinc-500 font-bold">Carregando...</div>;
  if (!user) return null;

  const initials = profile?.name 
    ? profile.name.substring(0, 2).toUpperCase() 
    : user.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] p-5 pt-8 pb-32 max-w-md mx-auto">
      <h1 className="text-3xl font-black text-white mb-8 tracking-tight">Perfil</h1>

      {/* User Info */}
      <div className="bg-zinc-900 p-6 rounded-[32px] border border-zinc-800 flex items-center mb-10 shadow-xl shadow-black/20">
        <div className="w-16 h-16 bg-[var(--primary-color)] text-black font-black text-2xl rounded-2xl flex items-center justify-center mr-5 shadow-lg shadow-[var(--primary-color)]/20">
          {initials}
        </div>
        <div>
          <h2 className="font-black text-white text-lg">{profile?.name || user.email?.split('@')[0]}</h2>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-0.5">Nível {profile?.level || 1} • {profile?.goal || 'Calistenia'}</p>
        </div>
      </div>

      {/* Level Selector */}
      <div className="mb-10">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6 ml-1">Progresso de Nível</h3>
        <div className="grid grid-cols-1 gap-3">
          {levels.map((lvl) => {
            const isActive = (profile?.level || 1) === lvl.value;
            return (
              <button
                key={lvl.value}
                onClick={() => updateLevel(lvl.value)}
                className={cn(
                  "flex items-center justify-between p-5 rounded-[28px] border transition-all duration-300 text-left active:scale-[0.98]",
                  isActive 
                    ? "bg-[var(--primary-color)]/5 border-[var(--primary-color)]/30 shadow-[0_0_20px_rgba(34,197,94,0.05)]" 
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all",
                    isActive ? "bg-[var(--primary-color)] text-black" : "bg-black/40 text-zinc-500"
                  )}>
                    {lvl.value}
                  </div>
                  <div>
                    <p className={cn("font-bold text-sm", isActive ? "text-[var(--primary-color)]" : "text-white")}>{lvl.label}</p>
                    <p className="text-[10px] text-zinc-500 font-medium mt-0.5">{lvl.desc}</p>
                  </div>
                </div>
                {isActive && (
                  <div className="w-5 h-5 rounded-full bg-[var(--primary-color)]/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6 ml-1">Configurações</h3>
        
        <button
          onClick={exportData}
          className="w-full bg-zinc-900 p-5 rounded-[28px] border border-zinc-800 flex justify-between items-center group hover:border-zinc-700 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center text-[var(--primary-color)]">
              <Download size={20} />
            </div>
            <span className="text-white font-bold text-sm">Exportar Dados</span>
          </div>
          <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-zinc-900 p-5 rounded-[28px] border border-zinc-800 flex justify-between items-center group hover:border-red-500/20 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center text-red-500">
              <LogOut size={20} />
            </div>
            <span className="text-white font-bold text-sm">Sair</span>
          </div>
          <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
