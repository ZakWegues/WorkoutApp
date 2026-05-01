'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { WorkoutSessionRow, SessionSetRow } from '@/types/database';

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase]);

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

  if (!user) return <div className="p-5">Carregando...</div>;

  const initials = user.email ? user.email.substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] p-5 pt-8 pb-safe">
      <h1 className="text-2xl font-bold text-white mb-6">Perfil</h1>

      <div className="bg-[#141414] p-5 rounded-3xl border border-white/5 flex items-center mb-8">
        <div className="w-16 h-16 bg-[#22c55e] text-black font-bold text-2xl rounded-full flex items-center justify-center mr-4">
          {initials}
        </div>
        <div>
          <h2 className="font-bold text-white text-lg">{user.email}</h2>
          <p className="text-neutral-500 text-sm">Conta ativa</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Metas & Preferências</h3>

        <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex justify-between items-center">
          <span className="text-white font-medium">Exportar Dados</span>
          <button
            onClick={exportData}
            className="text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-white transition-colors"
          >
            Baixar CSV
          </button>
        </div>

        {/* Placeholder for settings */}
        <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex justify-between items-center opacity-50">
          <span className="text-white font-medium">Lembretes de treino</span>
          <span className="text-xs text-neutral-500">Em breve</span>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold py-4 rounded-xl transition-colors border border-red-500/20"
        >
          Sair da Conta
        </button>
      </div>
    </div>
  );
}
