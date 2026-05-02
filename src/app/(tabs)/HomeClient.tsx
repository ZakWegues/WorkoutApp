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
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      <div className="max-w-lg mx-auto px-4 pt-12 space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start"
        >
          <div>
            <p className="text-zinc-500 text-sm">{greeting()},</p>
            <h1 className="text-2xl font-bold text-white">{userName}</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Bell size={18} className="text-zinc-400" />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame size={14} className="text-orange-400" />
              <span className="text-xl font-bold text-white">{streak}</span>
            </div>
            <p className="text-zinc-500 text-xs">dias seguidos</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
            <div className="text-xl font-bold text-white mb-1">{weeklyWorkouts}</div>
            <p className="text-zinc-500 text-xs">essa semana</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
            <div className="text-xl font-bold text-[#22c55e] mb-1">N{userLevel}</div>
            <p className="text-zinc-500 text-xs">seu nível</p>
          </div>
        </motion.div>

        {/* Semana */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
        >
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Esta semana</p>
          <div className="flex justify-between">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-xs text-zinc-600">{day}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  i === today
                    ? 'bg-[#22c55e] text-black'
                    : trainedDays.includes(i)
                    ? 'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30'
                    : 'bg-zinc-800 text-zinc-600'
                }`}>
                  {trainedDays.includes(i) && i !== today ? '✓' : i === today ? 'hj' : ''}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Treino do dia */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Treino de hoje</p>

          {isRestDay ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🧘</div>
              <h2 className="text-white font-bold text-lg mb-1">Descanso Ativo</h2>
              <p className="text-zinc-500 text-sm">Alongamento e mobilidade. Seu corpo agradece.</p>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{label.emoji}</span>
                  <h2 className="text-white font-bold text-xl">{label.title}</h2>
                </div>
                <p className="text-zinc-500 text-sm">{label.description}</p>
              </div>

              <div className="divide-y divide-zinc-800">
                {exercises.map((ex, i) => {
                  const diff = difficultyConfig[ex.difficulty]
                  return (
                    <div key={i} className="flex items-center justify-between px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 font-medium">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{ex.name}</p>
                          <p className="text-zinc-500 text-xs">{ex.sets}x{ex.reps}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${diff.bg} ${diff.color}`}>
                        {diff.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div className="p-4">
                <button
                  onClick={() => router.push('/coach')}
                  className="w-full bg-[#22c55e] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Play size={18} fill="black" />
                  Iniciar Treino
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Progressões recomendadas */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex justify-between items-center mb-3">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Próximas progressões</p>
            <button onClick={() => router.push('/explore')} className="text-[#22c55e] text-xs flex items-center gap-1">
              Ver tudo <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {exercises.slice(0, 3).map((ex, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Dumbbell size={14} className="text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{ex.name}</p>
                    <p className="text-zinc-600 text-xs">{ex.sets} séries · {ex.reps} reps</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-zinc-700" />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
