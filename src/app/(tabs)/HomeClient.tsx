'use client'

import { motion } from 'framer-motion'
import { Bell, Flame, Dumbbell, ChevronRight, Play, Bot } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Level } from '@/lib/routines'
import { getTodayRoutine, dayTypeLabels } from '@/lib/routines'

interface HomeClientProps {
  userName: string
  userLevel: Level
  streak: number
  weeklyWorkouts: number
  trainedDays: number[]
}

const LevelBadge = ({ level }: { level: number }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-[#22c55e]/20 blur-xl rounded-full" />
    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex flex-col items-center justify-center shadow-2xl">
      <span className="text-[10px] font-black uppercase text-[#22c55e] tracking-widest leading-none mb-1">Nível</span>
      <span className="text-2xl font-black text-white leading-none">{level}</span>
    </div>
  </div>
)

const XPBar = ({ xp, nextLevelXp }: { xp: number, nextLevelXp: number }) => {
  const progress = (xp / nextLevelXp) * 100
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">XP Progress</span>
        <span className="text-[10px] font-black text-white bg-white/5 px-2 py-0.5 rounded-full">{xp} / {nextLevelXp} XP</span>
      </div>
      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-[#22c55e] to-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
        />
      </div>
    </div>
  )
}

const FireStreak = ({ streak }: { streak: number }) => (
  <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-2xl">
    <div className="relative">
      <Flame size={20} className="text-orange-500 fill-orange-500 animate-pulse" />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 bg-orange-500 blur-lg rounded-full"
      />
    </div>
    <div>
      <p className="text-xs font-black text-white leading-none">{streak} DIAS</p>
      <p className="text-[9px] font-bold text-orange-500/70 uppercase tracking-widest mt-0.5">Ofensiva Ativa</p>
    </div>
  </div>
)

export default function HomeClient({ userName, userLevel, streak, weeklyWorkouts, trainedDays }: HomeClientProps) {
  const router = useRouter()
  const { dayType, exercises, label } = getTodayRoutine(userLevel)
  const isRestDay = dayType === 'rest'
  
  // Calculate fake XP for UI demo
  const currentXp = (weeklyWorkouts * 125) % 500
  const nextLevelXp = 500

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Bom dia'
    if (h < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const today = new Date().getDay()

  return (
    <div className="min-h-screen bg-[#050505] pb-32 text-white">
      <div className="max-w-lg mx-auto px-6 pt-12 space-y-10">

        {/* Header with Level and XP */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <LevelBadge level={userLevel} />
              <div>
                <p className="text-zinc-500 text-sm font-medium tracking-wide">{greeting()}</p>
                <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic uppercase">
                  {userName}
                </h1>
              </div>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center hover:bg-zinc-800/50 transition-colors relative group">
              <Bell size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#22c55e] rounded-full ring-4 ring-[#050505] animate-pulse" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/30 border border-white/5 rounded-[32px] p-6 backdrop-blur-md space-y-6"
          >
            <div className="flex justify-between items-center">
              <XPBar xp={currentXp} nextLevelXp={nextLevelXp} />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/5">
              <FireStreak streak={streak} />
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-[#22c55e] text-black flex items-center justify-center text-[10px] font-black">
                  +12
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Treino do dia Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="flex justify-between items-center mb-5 px-1">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Próximo Desafio</h3>
            <span className="text-[10px] font-black text-[#22c55e] animate-pulse">● AO VIVO</span>
          </div>

          {isRestDay ? (
            <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-[40px] p-10 text-center backdrop-blur-md">
              <div className="text-6xl mb-6">🧘</div>
              <h2 className="text-white font-black text-3xl mb-3 italic uppercase tracking-tighter">Descanso Ativo</h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px] mx-auto">
                A recuperação é parte do treino. Foco na mobilidade.
              </p>
            </div>
          ) : (
            <div className="bg-zinc-900/40 border border-white/10 rounded-[44px] overflow-hidden backdrop-blur-xl relative shadow-2xl group hover:border-[#22c55e]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <span className="text-[120px] leading-none">{label.emoji}</span>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/20 flex items-center justify-center text-2xl shadow-inner">
                    {label.emoji}
                  </div>
                  <div>
                    <h2 className="text-white font-black text-2xl tracking-tighter italic uppercase leading-none mb-1">{label.title}</h2>
                    <p className="text-[10px] font-black text-[#22c55e] uppercase tracking-[0.2em]">{exercises.length} Exercícios · 45 min</p>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  {exercises.slice(0, 3).map((ex, i) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                      <div className="w-1 h-8 rounded-full bg-zinc-800 group-hover/item:bg-[#22c55e] transition-all" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-black italic uppercase tracking-tight">{ex.name}</p>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{ex.sets} séries · {ex.reps} reps</p>
                      </div>
                      <ChevronRight size={14} className="text-zinc-800 group-hover/item:text-[#22c55e] transition-colors" />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => router.push('/coach')}
                  className="w-full bg-[#22c55e] hover:bg-[#1eb054] text-black font-black py-5 rounded-[24px] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-[#22c55e]/20 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Play size={20} fill="black" className="relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10 uppercase tracking-[0.2em] text-sm">Esmagar Treino</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Dicas da IA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/20 border border-white/5 rounded-[32px] p-6 border-l-4 border-l-[#22c55e]"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center">
              <Bot size={16} className="text-[#22c55e]" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Dica do Coach IA</h3>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed italic">
            "Para maximizar a hipertrofia no {exercises[0]?.name}, foque na fase excêntrica do movimento. Controle a descida por 3 segundos."
          </p>
        </motion.div>

        {/* Semana Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-zinc-900/30 border border-white/5 rounded-[32px] p-8 backdrop-blur-md shadow-inner"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 italic">Sessões Semanais</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">{weeklyWorkouts} Concluídas</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end h-20">
            {weekDays.map((day, i) => {
              const isToday = i === today;
              const hasTrained = trainedDays.includes(i);
              
              return (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    {isToday && (
                      <motion.div 
                        layoutId="today-glow-main"
                        className="absolute inset-0 bg-[#22c55e] blur-xl opacity-20 scale-150"
                      />
                    )}
                    <motion.div 
                      whileHover={{ y: -2 }}
                      className={`w-12 h-12 rounded-[18px] flex items-center justify-center transition-all duration-500 cursor-pointer ${
                        hasTrained 
                          ? 'bg-[#22c55e] text-black shadow-[0_0_25px_rgba(34,197,94,0.4)]' 
                          : isToday
                          ? 'bg-zinc-800 text-white border-2 border-[#22c55e]/50'
                          : 'bg-zinc-900/50 text-zinc-700 border border-white/5 hover:border-white/10'
                      }`}
                    >
                      {hasTrained ? (
                        <Dumbbell size={18} strokeWidth={3} />
                      ) : (
                        <span className="text-[10px] font-black uppercase tracking-tighter">{day}</span>
                      )}
                    </motion.div>
                  </div>
                  {isToday && <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e]" />}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Favoritos Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pb-12"
        >
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 italic">Meus Favoritos</h3>
            <button className="text-zinc-600 hover:text-[#22c55e] transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex overflow-x-auto no-scrollbar gap-4 -mx-6 px-6">
            {exercises.slice(0, 4).map((ex, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -4 }}
                className="flex-shrink-0 w-44 bg-zinc-900/30 border border-white/5 rounded-[32px] p-5 space-y-4 hover:bg-zinc-900/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:border-[#22c55e]/30 transition-colors">
                  <Flame size={20} className="text-zinc-600 group-hover:text-orange-500 transition-colors" />
                </div>
                <div>
                  <p className="text-white text-xs font-black italic uppercase tracking-tight line-clamp-1">{ex.name}</p>
                  <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mt-1">Nível {ex.difficulty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
