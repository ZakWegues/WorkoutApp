'use client';

import { useEffect, useState } from 'react';
import { useRestTimer } from '@/hooks/useRestTimer';
import { FastForward, Plus } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';

interface RestViewProps {
  durationSeconds: number;
  nextExerciseName: string;
  nextSetNum: number;
  onSkip: () => void;
}

export function RestView({ durationSeconds, nextExerciseName, nextSetNum, onSkip }: RestViewProps) {
  const { triggerShort } = useHaptic();
  const { secondsLeft, progress, start, setSecondsLeft } = useRestTimer(durationSeconds, () => {
    onSkip(); // Auto skip when timer reaches 0
  });

  useEffect(() => {
    start();
  }, [start]);

  const handleAddTime = () => {
    triggerShort();
    setSecondsLeft(prev => prev + 30);
  };

  const handleSkip = () => {
    triggerShort();
    onSkip();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] p-5 items-center justify-center">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-white mb-2">Descanso</h2>
        <p className="text-neutral-400">Recupere o fôlego</p>
      </div>

      <div className="relative flex items-center justify-center mb-12">
        <svg className="transform -rotate-90 w-72 h-72">
          {/* Background circle */}
          <circle
            cx="144"
            cy="144"
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="144"
            cy="144"
            r={radius}
            stroke="#22c55e"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-6xl font-bold text-white tabular-nums tracking-tighter">
            {formatTime(secondsLeft)}
          </span>
        </div>
      </div>

      <div className="bg-[#141414] rounded-2xl p-4 w-full border border-white/5 text-center mb-8">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1 block">A Seguir</span>
        <h3 className="font-bold text-white">{nextExerciseName}</h3>
        <p className="text-sm text-neutral-400 mt-1">Série {nextSetNum}</p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button 
          onClick={handleAddTime}
          className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3.5 px-4 rounded-xl flex items-center justify-center transition-colors"
        >
          <Plus size={18} className="mr-2" />
          +30 segundos
        </button>
        <button 
          onClick={handleSkip}
          className="w-full bg-[#141414] hover:bg-white/5 border border-white/10 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center transition-colors"
        >
          <FastForward size={20} className="mr-2" />
          Pular Descanso
        </button>
      </div>
    </div>
  );
}
