'use client';

import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { formatDuration } from '@/lib/utils';
import { format } from 'date-fns';

export default function ProgressPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'records'>('overview');
  const { queryWeeklyVolume, queryMonthlyStats, queryHistory, queryRecords } = useProgress();

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md px-5 pt-8 pb-4 space-y-4 border-b border-white/5">
        <h1 className="text-2xl font-bold text-white">Progresso</h1>
        
        <div className="flex bg-[#141414] rounded-xl p-1 gap-1">
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'}`}
            onClick={() => setActiveTab('overview')}
          >
            Visão Geral
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'history' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'}`}
            onClick={() => setActiveTab('history')}
          >
            Histórico
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'records' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'}`}
            onClick={() => setActiveTab('records')}
          >
            Records
          </button>
        </div>
      </div>

      <div className="p-5 pb-safe">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col justify-center text-center">
                <span className="text-2xl font-bold text-white">{queryMonthlyStats.data?.workouts || 0}</span>
                <span className="text-[10px] text-neutral-500 uppercase mt-1">Treinos / mês</span>
              </div>
              <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col justify-center text-center">
                <span className="text-2xl font-bold text-white">{Math.round((queryMonthlyStats.data?.volume || 0) / 1000)}k</span>
                <span className="text-[10px] text-neutral-500 uppercase mt-1">Volume (kg)</span>
              </div>
              <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col justify-center text-center">
                <span className="text-2xl font-bold text-white">{queryMonthlyStats.data?.streak || 0}</span>
                <span className="text-[10px] text-neutral-500 uppercase mt-1">Dias Seguidos</span>
              </div>
              <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col justify-center text-center">
                <span className="text-2xl font-bold text-white">{queryMonthlyStats.data?.hours || 0}</span>
                <span className="text-[10px] text-neutral-500 uppercase mt-1">Tempo (h)</span>
              </div>
            </div>

            <div className="bg-[#141414] p-5 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-white mb-4">Volume Semanal</h3>
              {queryWeeklyVolume.data && queryWeeklyVolume.data.length > 0 ? (
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={queryWeeklyVolume.data}>
                      <XAxis dataKey="week" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#141414', borderColor: '#262626', borderRadius: '8px' }} 
                        itemStyle={{ color: '#22c55e' }}
                      />
                      <Bar dataKey="volume" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-neutral-500">Sem dados</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            {!queryHistory.data || queryHistory.data.length === 0 ? (
              <div className="text-center py-20 text-neutral-500">
                <p>Nenhum treino registrado ainda</p>
              </div>
            ) : (
              queryHistory.data.map((session: any) => (
                <details key={session.id} className="bg-[#141414] p-4 rounded-2xl border border-white/5 group">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <div>
                      <h4 className="font-bold text-white">{session.workouts?.name || 'Treino'}</h4>
                      <p className="text-xs text-neutral-500 mt-1">{format(new Date(session.started_at), 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#22c55e]">{session.session_sets?.length || 0} séries</p>
                      <p className="text-xs text-neutral-500 mt-1">Ver mais</p>
                    </div>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    {session.session_sets?.map((set: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-neutral-400">{set.exercises?.name} (Série {set.set_number})</span>
                        <span className="text-white font-medium">{set.weight_kg}kg × {set.reps_completed}</span>
                      </div>
                    ))}
                  </div>
                </details>
              ))
            )}
          </div>
        )}

        {activeTab === 'records' && (
          <div className="space-y-3">
            {!queryRecords.data || queryRecords.data.length === 0 ? (
              <div className="text-center py-20 text-neutral-500">
                <p>Complete treinos para ver seus records</p>
              </div>
            ) : (
              queryRecords.data.map((record: any, index: number) => (
                <div key={index} className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white">{record.exercise.name}</h4>
                    <p className="text-xs text-neutral-500 mt-1">{format(new Date(record.date), 'dd/MM/yyyy')}</p>
                  </div>
                  <div className="bg-[#22c55e]/10 px-3 py-1.5 rounded-lg border border-[#22c55e]/20 text-right">
                    <span className="text-lg font-bold text-[#22c55e]">{record.weightKg}</span>
                    <span className="text-xs font-semibold text-[#22c55e] ml-1">kg</span>
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
