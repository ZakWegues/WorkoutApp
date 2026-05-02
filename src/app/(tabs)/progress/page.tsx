'use client';

import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format } from 'date-fns';
import { TrendingUp, History, Trophy, Calendar, Clock, Flame, Dumbbell } from 'lucide-react';

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'records'>('overview');
  const { queryWeeklyVolume, queryMonthlyStats, queryHistory, queryRecords } = useProgress();

  const statsCards = [
    { label: 'Treinos', value: queryMonthlyStats.data?.workouts || 0, icon: Dumbbell, color: 'text-[#22c55e]' },
    { label: 'Volume', value: `${Math.round((queryMonthlyStats.data?.volume || 0) / 1000)}k`, icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Streak', value: queryMonthlyStats.data?.streak || 0, icon: Flame, color: 'text-orange-500' },
    { label: 'Horas', value: queryMonthlyStats.data?.hours || 0, icon: Clock, color: 'text-purple-500' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] pb-24 text-white">
      <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-2xl px-6 pt-12 pb-6 space-y-6 border-b border-white/[0.05]">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Progresso</h1>
        
        <div className="flex bg-zinc-900/50 rounded-2xl p-1.5 gap-1.5 border border-white/5">
          {[
            { id: 'overview', label: 'Dashboard', icon: TrendingUp },
            { id: 'history', label: 'Histórico', icon: History },
            { id: 'records', label: 'Recordes', icon: Trophy },
          ].map((tab) => (
            <button 
              key={tab.id}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/20' 
                  : 'text-zinc-500 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-10">
        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {statsCards.map((stat, i) => (
                <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-6 backdrop-blur-md">
                  <div className={`w-10 h-10 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 mb-4 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-2xl font-black italic uppercase tracking-tighter mb-1">{stat.value}</p>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Volume Chart */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-[40px] p-8 backdrop-blur-md">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 italic">Volume Semanal</h3>
                <TrendingUp size={16} className="text-[#22c55e]" />
              </div>
              
              <div className="h-[240px] w-full">
                {queryWeeklyVolume.data && queryWeeklyVolume.data.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={queryWeeklyVolume.data}>
                      <XAxis 
                        dataKey="week" 
                        stroke="#262626" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        tick={{ fill: '#525252', fontWeight: 900 }}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                        contentStyle={{ 
                          backgroundColor: '#0a0a0a', 
                          borderColor: 'rgba(255,255,255,0.1)', 
                          borderRadius: '16px',
                          fontSize: '10px',
                          fontWeight: 900,
                          textTransform: 'uppercase'
                        }} 
                      />
                      <Bar dataKey="volume" radius={[6, 6, 0, 0]}>
                        {queryWeeklyVolume.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === queryWeeklyVolume.data!.length - 1 ? '#22c55e' : '#262626'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-zinc-700 font-black uppercase text-[10px] tracking-widest">
                    Aguardando dados...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {!queryHistory.data || queryHistory.data.length === 0 ? (
              <div className="text-center py-20 text-zinc-700 font-black uppercase text-[10px] tracking-widest">
                Nenhum treino registrado ainda
              </div>
            ) : (
              queryHistory.data.map((session: any) => (
                <div key={session.id} className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-6 hover:bg-zinc-900/60 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black italic uppercase tracking-tight text-white group-hover:text-[#22c55e] transition-colors">
                        {session.workouts?.name || 'Sessão Rápida'}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar size={12} className="text-zinc-600" />
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                          {format(new Date(session.started_at), 'dd MMM, HH:mm')}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#22c55e]/10 px-3 py-1.5 rounded-xl border border-[#22c55e]/20">
                       <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">
                        {session.session_sets?.length || 0} Sets
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {session.session_sets?.slice(0, 3).map((set: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-zinc-500">{set.exercises?.name}</span>
                        <span className="text-white">{set.weight_kg}kg × {set.reps_completed}</span>
                      </div>
                    ))}
                    {session.session_sets?.length > 3 && (
                      <p className="text-[9px] text-zinc-700 font-black uppercase tracking-widest pt-2">
                        + {session.session_sets.length - 3} exercícios
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'records' && (
          <div className="space-y-4">
            {!queryRecords.data || queryRecords.data.length === 0 ? (
              <div className="text-center py-20 text-zinc-700 font-black uppercase text-[10px] tracking-widest">
                Complete treinos para ver seus recordes
              </div>
            ) : (
              queryRecords.data.map((record: any, index: number) => (
                <div key={index} className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-6 flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 text-orange-500 shadow-inner">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <h4 className="font-black italic uppercase tracking-tight text-white">{record.exercise.name}</h4>
                      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">
                        {format(new Date(record.date), 'dd/MM/yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black italic text-[#22c55e]">{record.weightKg}</span>
                    <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest ml-1">kg</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
