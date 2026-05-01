'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LogOut, Download, ChevronRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';
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
    const { error } = await supabase
      .from('profiles')
      .update({ level: level as any })
      .eq('id', user.id);

    if (error) {
      toast.error('Erro ao atualizar nível');
    } else {
      setProfile(prev => prev ? { ...prev, level: level as any } : null);
      toast.success(`Nível ${level} selecionado!`);
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
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] p-5 pt-8 pb-32">
      <h1 className="text-3xl font-black text-white mb-8 tracking-tight">Perfil</h1>

      {/* User Info */}
      <div className="bg-[#141414] p-6 rounded-[32px] border border-white/5 flex items-center mb-8">
        <div className="w-16 h-16 bg-[#22c55e] text-black font-black text-2xl rounded-2xl flex items-center justify-center mr-5 shadow-lg shadow-[#22c55e]/20">
          {initials}
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">{profile?.name || user.email}</h2>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mt-0.5">Nível {profile?.level || 1} • {profile?.goal || 'Calistenia'}</p>
        </div>
      </div>

      {/* Level Selector */}
      <div className="mb-8">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Selecione seu Nível</h3>
        <div className="grid grid-cols-1 gap-2">
          {levels.map((lvl) => {
            const isActive = (profile?.level || 1) === lvl.value;
            return (
              <button
                key={lvl.value}
                onClick={() => updateLevel(lvl.value)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left",
                  isActive 
                    ? "bg-[#22c55e]/10 border-[#22c55e]/40 shadow-[0_0_15px_rgba(34,197,94,0.1)]" 
                    : "bg-[#141414] border-white/5 hover:border-white/10"
                )}
              >
                <div>
                  <p className={cn("font-bold text-sm", isActive ? "text-[#22c55e]" : "text-white")}>{lvl.label}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{lvl.desc}</p>
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Conta & Dados</h3>
        
        <button
          onClick={exportData}
          className="w-full bg-[#141414] p-5 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-white/10 transition-all"
        >
          <div className="flex items-center gap-3">
            <Download size={20} className="text-[#22c55e]" />
            <span className="text-white font-bold text-sm">Exportar Histórico</span>
          </div>
          <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-[#141414] p-5 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-red-500/20 transition-all"
        >
          <div className="flex items-center gap-3">
            <LogOut size={20} className="text-red-500" />
            <span className="text-white font-bold text-sm">Sair da Conta</span>
          </div>
          <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
}
