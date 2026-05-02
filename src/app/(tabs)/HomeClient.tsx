'use client'

import { motion } from 'framer-motion'
import { Bell, Flame, Dumbbell, ChevronRight, Play } from 'lucide-react'
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

export default function HomeClient({ userName, userLevel, streak, weeklyWorkouts, trainedDays }: HomeClientProps) {
  const router = useRouter()
  const { dayType, exercises, label } = getTodayRoutine(userLevel)
  const isRestDay = dayType === 'rest'

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Bom dia'
    if (h < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const today = new Date().getDay()

  const difficultyConfig = {
    beginner: { label: 'Iniciante', color: 'text-green-400', bg: 'bg-green-400/10' },
    intermediate: { label: 'Intermediário', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    advanced: { label: 'Avançado', color: 'text-red-400', bg: 'bg-red-400/10' },
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-24 text-white">
      <div className="max-w-lg mx-auto px-6 pt-12 space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <p className="text-zinc-500 text-sm font-medium tracking-wide">{greeting()}</p>
            <h1 className="text-3xl font-black tracking-tight mt-1 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {userName}
            </h1>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center hover:bg-zinc-800/50 transition-colors relative">
            <Bell size={20} className="text-zinc-400" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-[#22c55e] rounded-full ring-4 ring-[#050505]" />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', damping: 20 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-gradient-to-b from-zinc-900/50 to-transparent border border-white/5 rounded-3xl p-5 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Flame size={16} className="text-orange-500" />
              <span className="text-2xl font-black tracking-tighter text-white">{streak}</span>
            </div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Streak</p>
          </div>
          
          <div className="bg-gradient-to-b from-zinc-900/50 to-transparent border border-white/5 rounded-3xl p-5 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1.5 mb-2 text-2xl font-black tracking-tighter text-white">
              {weeklyWorkouts}
            </div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Semana</p>
          </div>

          <div className="bg-gradient-to-b from-[#22c55e]/10 to-transparent border border-[#22c55e]/10 rounded-3xl p-5 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1.5 mb-2 text-2xl font-black tracking-tighter text-[#22c55e]">
              L{userLevel}
            </div>
            <p className="text-[#22c55e]/50 text-[10px] font-bold uppercase tracking-widest">Nível</p>
          </div>
        </motion.div>

        {/* Semana Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-zinc-900/30 border border-white/5 rounded-[32px] p-6 backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Progresso Semanal</h3>
            <span className="text-[10px] font-bold text-zinc-600 bg-white/5 px-2 py-1 rounded-full">{weeklyWorkouts}/7 treinos</span>
          </div>
          
          <div className="flex justify-between items-end h-16">
            {weekDays.map((day, i) => {
              const isToday = i === today;
              const hasTrained = trainedDays.includes(i);
              
              return (
                <div key={i} className="flex flex-col items-center gap-3 group">
                  <div className="relative">
                    {isToday && (
                      <motion.div 
                        layoutId="today-glow"
                        className="absolute inset-0 bg-[#22c55e] blur-lg opacity-20"
                      />
                    )}
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      hasTrained 
                        ? 'bg-[#22c55e] text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                        : isToday
                        ? 'bg-zinc-800 text-white border border-[#22c55e]/30'
                        : 'bg-zinc-900/50 text-zinc-600 border border-white/5'
                    }`}>
                      {hasTrained ? (
                        <Dumbbell size={16} strokeWidth={3} />
                      ) : (
                        <span className="text-[10px] font-black uppercase">{day}</span>
                      )}
                    </div>
                  </div>
                  {isToday && <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Treino do dia Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Próximo Desafio</h3>
          </div>

          {isRestDay ? (
            <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-[32px] p-8 text-center backdrop-blur-md">
              <div className="text-5xl mb-4 animate-bounce">🧘</div>
              <h2 className="text-white font-black text-2xl mb-2 italic">Descanso Ativo</h2>
              <p className="text-zinc-400 text-sm leading-relaxed px-4">
                Hoje é dia de focar na mobilidade e recuperação. Alongue-se e hidrate seu corpo.
              </p>
            </div>
          ) : (
            <div className="bg-zinc-900/40 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-xl relative shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="text-8xl">{label.emoji}</span>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 flex items-center justify-center text-xl">
                    {label.emoji}
                  </div>
                  <h2 className="text-white font-black text-2xl tracking-tighter italic uppercase">{label.title}</h2>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-[80%]">
                  {label.description}
                </p>

                <div className="space-y-4 mb-8">
                  {exercises.slice(0, 3).map((ex, i) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                      <div className="w-1 h-8 rounded-full bg-white/10 group-hover/item:bg-[#22c55e] transition-colors" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-bold">{ex.name}</p>
                        <p className="text-zinc-500 text-xs tracking-wide">{ex.sets} séries · {ex.reps} reps</p>
                      </div>
                    </div>
                  ))}
                  {exercises.length > 3 && (
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest ml-5">
                      + {exercises.length - 3} exercícios no plano
                    </p>
                  )}
                </div>

                <button
                  onClick={() => router.push('/coach')}
                  className="w-full bg-[#22c55e] hover:bg-[#1eb054] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-[#22c55e]/20 group/btn"
                >
                  <Play size={20} fill="black" className="group-hover/btn:scale-110 transition-transform" />
                  <span className="uppercase tracking-widest text-sm">Iniciar Sessão</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Progressões Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="pb-8"
        >
          <div className="flex justify-between items-center mb-5 px-1">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Progressões Recomendadas</h3>
            <button 
              onClick={() => router.push('/explore')} 
              className="text-[#22c55e] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
            >
              Explorar <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="space-y-3">
            {exercises.slice(0, 2).map((ex, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 4 }}
                className="bg-zinc-900/30 border border-white/5 rounded-3xl p-5 flex items-center justify-between group cursor-pointer hover:bg-zinc-900/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:border-[#22c55e]/30 transition-colors">
                    <Dumbbell size={20} className="text-zinc-600 group-hover:text-[#22c55e] transition-colors" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-black italic uppercase tracking-tight">{ex.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Calistenia</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-800" />
                      <span className="text-[#22c55e]/70 text-[10px] font-black uppercase tracking-widest">Nível {ex.difficulty}</span>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#22c55e]/50 transition-colors">
                  <ChevronRight size={18} className="text-zinc-700 group-hover:text-[#22c55e]" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
