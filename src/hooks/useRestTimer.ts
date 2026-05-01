import { useState, useRef, useCallback, useEffect } from 'react';
import { useHaptic } from './useHaptic';

export function useRestTimer(durationSeconds: number, onComplete?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const { triggerSuccess } = useHaptic();
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playBeep = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // Audio fallback silent
    }
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = useCallback(() => {
    if (!isRunning && secondsLeft > 0) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            setIsRunning(false);
            triggerSuccess();
            playBeep();
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isRunning, secondsLeft, onComplete, triggerSuccess, playBeep]);

  const pause = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, []);

  const reset = useCallback((newDuration?: number) => {
    clearTimer();
    setIsRunning(false);
    setSecondsLeft(newDuration ?? durationSeconds);
  }, [durationSeconds]);

  // Cleanup
  useEffect(() => {
    return () => clearTimer();
  }, []);

  const progress = durationSeconds > 0 ? 1 - secondsLeft / durationSeconds : 0;

  return {
    secondsLeft,
    progress,
    isRunning,
    start,
    pause,
    reset,
    setSecondsLeft,
  };
}
