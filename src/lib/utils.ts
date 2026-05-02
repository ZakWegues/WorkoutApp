import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) {
    return `${h}h ${m}m`;
  }
  return `${m} min`;
}

export const LEVEL_COLORS = {
  1: '#22c55e', // Verde
  2: '#84cc16', // Lima
  3: '#eab308', // Amarelo
  4: '#f97316', // Laranja
  5: '#ef4444', // Vermelho
} as const;

export function getLevelColor(level: number): string {
  return LEVEL_COLORS[level as keyof typeof LEVEL_COLORS] || LEVEL_COLORS[1];
}
