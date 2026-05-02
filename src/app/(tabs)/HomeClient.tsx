'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Flame, Dumbbell, ChevronRight, Play, Bot, Info, CheckCircle2, Clock } from 'lucide-react'
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
    <div className="absolute inset-0 bg-[var(--primary-color)]/20 blur-xl rounded-full" />
    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex flex-col items-center justify-center shadow-2xl">
      <span className="text-[10px] font-black uppercase text-[var(--primary-color)] tracking-widest leading-none mb-1">Nível</span>
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
          className="h-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)] shadow-[0_0_10px_rgba(var(--primary-color-rgb),0.3)]"
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

import { getLevelColor } from '@/lib/utils'

export default function HomeClient({ userName, userLevel, streak, weeklyWorkouts, trainedDays }: HomeClientProps) {
  const router = useRouter()
  
  useEffect(() => {
    const color = getLevelColor(userLevel);
    document.documentElement.style.setProperty('--primary-color', color);
    // Rough RGB extraction for shadow effects
    if (color === '#22c55e') document.documentElement.style.setProperty('--primary-color-rgb', '34, 197, 94');
    else if (color === '#84cc16') document.documentElement.style.setProperty('--primary-color-rgb', '132, 204, 22');
    else if (color === '#eab308') document.documentElement.style.setProperty('--primary-color-rgb', '234, 179, 8');
    else if (color === '#f97316') document.documentElement.style.setProperty('--primary-color-rgb', '249, 115, 22');
    else if (color === '#ef4444') document.documentElement.style.setProperty('--primary-color-rgb', '239, 68, 68');
  }, [userLevel]);

  const [showNotifications, setShowNotifications] = useState(false)
  const [showLevelInfo, setShowLevelInfo] = useState(false)
  const [showWorkoutPreview, setShowWorkoutPreview] = useState(false)

  const { dayType, exercises, label } = getTodayRoutine(userLevel)
  const isRestDay = dayType === 'rest'
  
  // Calculate fake XP for UI demo
  const currentXp = (weeklyWorkouts * 125) % 500
  const nextLevelXp = 500

  const handleStartWorkout = () => {
    const dailyWorkout = {
      id: `daily-${Date.now()}`,
      user_id: null,
      name: label.title,
      description: label.description,
      estimated_duration_min: 45,
      is_ai_generated: false,
      created_at: new Date().toISOString(),
      workout_exercises: exercises.map((ex, i) => ({
        id: `we-${i}`,
        workout_id: `daily-${Date.now()}`,
        exercise_id: `ex-${i}`,
        position: i,
        sets: ex.sets,
        reps: typeof ex.reps === 'number' ? ex.reps : 10,
        rest_seconds: 60,
        weight_suggestion_kg: 0,
        exercises: {
          id: `ex-${i}`,
          name: ex.nameEn,
          muscle_group: 'core',
          equipment: 'bodyweight',
          difficulty: ex.difficulty,
          instructions: '',
          gif_url: null,
          created_at: new Date().toISOString()
        }
      }))
    };
    
    sessionStorage.setItem('quick_workout', JSON.stringify(dailyWorkout));
    router.push('/workout/quick');
  };

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
              <button onClick={() => setShowLevelInfo(true)} className="active:scale-95 transition-transform">
                <LevelBadge level={userLevel} />
              </button>
              <div>
                <p className="text-zinc-500 text-sm font-medium tracking-wide">{greeting()}</p>
                <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent italic uppercase">
                  {userName}
                </h1>
              </div>
            </div>
            <button 
              onClick={() => setShowNotifications(true)}
              className="w-12 h-12 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center hover:bg-zinc-800/50 transition-colors relative group active:scale-95"
            >
              <Bell size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[var(--primary-color)] rounded-full ring-4 ring-[#050505] animate-pulse" />
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
                <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-[var(--primary-color)] text-black flex items-center justify-center text-[10px] font-black">
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
            <span className="text-[10px] font-black text-[var(--primary-color)] animate-pulse">● AO VIVO</span>
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
            <div className="bg-zinc-900/40 border border-white/10 rounded-[44px] overflow-hidden backdrop-blur-xl relative shadow-2xl group hover:border-[var(--primary-color)]/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <span className="text-[120px] leading-none">{label.emoji}</span>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--primary-color)]/20 flex items-center justify-center text-2xl shadow-inner">
                    {label.emoji}
                  </div>
                  <div>
                    <h2 className="text-white font-black text-2xl tracking-tighter italic uppercase leading-none mb-1">{label.title}</h2>
                    <p className="text-[10px] font-black text-[var(--primary-color)] uppercase tracking-[0.2em]">{exercises.length} Exercícios · 45 min</p>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  {exercises.slice(0, 3).map((ex, i) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                      <div className="w-1 h-8 rounded-full bg-zinc-800 group-hover/item:bg-[var(--primary-color)] transition-all" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-black italic uppercase tracking-tight">{ex.name}</p>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{ex.sets} séries · {ex.reps} reps</p>
                      </div>
                      <ChevronRight size={14} className="text-zinc-800 group-hover/item:text-[var(--primary-color)] transition-colors" />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowWorkoutPreview(true)}
                  className="w-full bg-[var(--primary-color)] hover:bg-[#1eb054] text-black font-black py-5 rounded-[24px] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-[#22c55e]/20 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Play size={20} fill="black" className="relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10 uppercase tracking-[0.2em] text-sm">Esmagar Treino</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Modals */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowNotifications(false)} />
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[40px] p-8 overflow-hidden"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black italic uppercase tracking-tight">Notificações</h2>
                  <button onClick={() => setShowNotifications(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                    <ChevronRight className="rotate-90" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Treino Concluído!", time: "2h atrás", desc: "Você completou o Dia de Pull com perfeição." },
                    { title: "Nova Progressão", time: "1d atrás", desc: "Coach IA sugeriu Archer Pull-ups para você." },
                    { title: "Streak de 7 Dias!", time: "2d atrás", desc: "Continue assim para ganhar o badge de fogo." }
                  ].map((n, i) => (
                    <div key={i} className="p-5 rounded-[24px] bg-white/5 border border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-black text-[var(--primary-color)] uppercase tracking-wide">{n.title}</h3>
                        <span className="text-[10px] text-zinc-600 font-bold">{n.time}</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {showLevelInfo && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowLevelInfo(false)} />
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[40px] p-10 text-center"
              >
                <div className="w-24 h-24 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                  <span className="text-5xl font-black text-[var(--primary-color)]">L{userLevel}</span>
                </div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4 text-white">Seu Caminho para a Maestria</h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  Você está no nível **{userLevel}**. Complete mais 4 treinos nesta semana para atingir o Nível **{userLevel + 1}** e desbloquear novas progressões avançadas.
                </p>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-[9px] font-black text-[var(--primary-color)] uppercase tracking-[0.2em] mb-1">XP Atual</p>
                    <p className="text-lg font-black">{currentXp} XP</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Próximo Nível</p>
                    <p className="text-lg font-black">{nextLevelXp} XP</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showWorkoutPreview && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-end justify-center"
            >
              <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowWorkoutPreview(false)} />
              <motion.div 
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-lg bg-zinc-950 border-t border-white/10 rounded-t-[48px] p-8 pb-12 max-h-[90vh] overflow-y-auto no-scrollbar"
              >
                <div className="w-16 h-1.5 bg-zinc-800 rounded-full mx-auto mb-10" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--primary-color)]/20 flex items-center justify-center text-3xl">
                    {label.emoji}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-2">{label.title}</h2>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-zinc-500">
                        <Clock size={12} />
                        <span className="text-[10px] font-black uppercase">45 Minutos</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-zinc-800" />
                      <div className="flex items-center gap-1 text-[var(--primary-color)]">
                        <CheckCircle2 size={12} />
                        <span className="text-[10px] font-black uppercase">Foco Hipertrofia</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-10">
                  <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4">Ordem dos Exercícios</h3>
                  {exercises.map((ex, i) => (
                    <div key={i} className="flex items-center gap-5 p-5 rounded-[28px] bg-white/5 border border-white/5 group">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-xs font-black text-[var(--primary-color)] group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-black italic uppercase tracking-tight">{ex.name}</p>
                        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">{ex.sets} Séries · {ex.reps} Reps</p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                        <Info size={12} className="text-zinc-600" />
                        <span className="text-[9px] font-black text-zinc-400 uppercase">Rest: 60s</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowWorkoutPreview(false)}
                    className="flex-1 bg-zinc-900 text-zinc-400 font-black py-5 rounded-[24px] uppercase tracking-widest text-xs border border-white/5"
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={handleStartWorkout}
                    className="flex-[2] bg-[var(--primary-color)] text-black font-black py-5 rounded-[24px] uppercase tracking-widest text-xs shadow-xl shadow-[#22c55e]/20 active:scale-95 transition-transform"
                  >
                    Começar Treino
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dicas da IA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/20 border border-white/5 rounded-[32px] p-6 border-l-4 border-l-[#22c55e]"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center">
              <Bot size={16} className="text-[var(--primary-color)]" />
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
              <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]" />
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
                        className="absolute inset-0 bg-[var(--primary-color)] blur-xl opacity-20 scale-150"
                      />
                    )}
                    <motion.div 
                      whileHover={{ y: -2 }}
                      className={`w-12 h-12 rounded-[18px] flex items-center justify-center transition-all duration-500 cursor-pointer ${
                        hasTrained 
                          ? 'bg-[var(--primary-color)] text-black shadow-[0_0_25px_rgba(34,197,94,0.4)]' 
                          : isToday
                          ? 'bg-zinc-800 text-white border-2 border-[var(--primary-color)]/50'
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
                  {isToday && <div className="w-2 h-2 rounded-full bg-[var(--primary-color)] shadow-[0_0_10px_#22c55e]" />}
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
            <button className="text-zinc-600 hover:text-[var(--primary-color)] transition-colors">
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
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:border-[var(--primary-color)]/30 transition-colors">
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
