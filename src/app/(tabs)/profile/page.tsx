'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LogOut, Download, ChevronRight, User } from 'lucide-react';
import { cn, getLevelColor } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
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
        
        if (profile) {
          setProfile(profile);
          const color = getLevelColor(profile.level);
          document.documentElement.style.setProperty('--primary-color', color);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const updateLevel = async (level: number) => {
    if (!user) return;
    
    // Optimistic update
    setProfile(prev => ({
      id: user.id,
      name: prev?.name || user.email?.split('@')[0] || 'Atleta',
      level: level as 1 | 2 | 3 | 4 | 5,
      goal: prev?.goal || 'strength',
      avatar_url: prev?.avatar_url || null,
      created_at: prev?.created_at || new Date().toISOString()
    }));

    const color = getLevelColor(level);
    document.documentElement.style.setProperty('--primary-color', color);

    const { error } = await (supabase as any)
      .from('profiles')
      .upsert({ 
        id: user.id, 
        level: level,
        name: profile?.name || user.email?.split('@')[0] || 'Atleta'
      });

    if (error) {
      console.error('Update Level Error:', error);
      toast.error('Erro ao salvar nível no banco');
    } else {
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
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] p-5 pt-8 pb-32 max-w-md mx-auto">
      <h1 className="text-3xl font-black text-white mb-8 tracking-tight italic uppercase">Perfil</h1>

      {/* User Info */}
      <div className="bg-zinc-900/50 p-6 rounded-[32px] border border-white/5 flex items-center mb-10 shadow-xl shadow-black/20 backdrop-blur-xl">
        <div className="w-16 h-16 bg-[var(--primary-color)] text-black font-black text-2xl rounded-2xl flex items-center justify-center mr-5 shadow-lg shadow-[var(--primary-color)]/20">
          {initials}
        </div>
        <div>
          <h2 className="font-black text-white text-lg uppercase italic tracking-tighter">{profile?.name || user.email?.split('@')[0]}</h2>
          <div className="flex items-center gap-2 mt-1">
             <div className="w-2 h-2 rounded-full bg-[var(--primary-color)] animate-pulse" />
             <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Nível {profile?.level || 1} • {profile?.goal || 'Calistenia'}</p>
          </div>
        </div>
      </div>

      {/* Level Selector */}
      <div className="mb-10">
        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-6 ml-1 italic">Progresso de Nível</h3>
        <div className="grid grid-cols-1 gap-3">
          {levels.map((lvl) => {
            const isActive = (profile?.level || 1) === lvl.value;
            const levelColor = getLevelColor(lvl.value);
            
            return (
              <button
                key={lvl.value}
                onClick={() => updateLevel(lvl.value)}
                className={cn(
                  "flex items-center justify-between p-5 rounded-[28px] border transition-all duration-500 text-left active:scale-[0.98] relative overflow-hidden group",
                  isActive 
                    ? "bg-zinc-900 border-white/10 shadow-2xl" 
                    : "bg-zinc-900/30 border-white/[0.03] hover:border-white/10"
                )}
              >
                {isActive && (
                   <motion.div 
                    layoutId="active-level-bg"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/5 to-transparent pointer-events-none" 
                   />
                )}
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500",
                    isActive 
                      ? "bg-[var(--primary-color)] text-black scale-110 shadow-lg" 
                      : "bg-zinc-800 text-zinc-500 group-hover:text-zinc-300"
                  )}
                  style={{ backgroundColor: isActive ? undefined : `${levelColor}10`, color: isActive ? undefined : levelColor }}
                  >
                    {lvl.value}
                  </div>
                  <div>
                    <p className={cn("font-black italic uppercase tracking-tight text-sm transition-colors", isActive ? "text-white" : "text-zinc-500")}>
                      {lvl.label}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">{lvl.desc}</p>
                  </div>
                </div>
                
                {isActive && (
                  <div className="w-6 h-6 rounded-full bg-[var(--primary-color)]/20 flex items-center justify-center relative z-10">
                    <div className="w-2 h-2 rounded-full bg-[var(--primary-color)] shadow-[0_0_10px_var(--primary-color)]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-6 ml-1 italic">Configurações</h3>
        
        <button
          onClick={exportData}
          className="w-full bg-zinc-900/40 p-5 rounded-[28px] border border-white/5 flex justify-between items-center group hover:bg-zinc-800/60 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-[var(--primary-color)] border border-white/5 shadow-inner">
              <Download size={20} />
            </div>
            <span className="text-white font-black italic uppercase tracking-tight text-sm">Exportar Dados</span>
          </div>
          <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-zinc-900/40 p-5 rounded-[28px] border border-white/5 flex justify-between items-center group hover:border-red-500/20 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-red-500 border border-white/5 shadow-inner">
              <LogOut size={20} />
            </div>
            <span className="text-white font-black italic uppercase tracking-tight text-sm">Sair da Conta</span>
          </div>
          <ChevronRight size={18} className="text-zinc-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
