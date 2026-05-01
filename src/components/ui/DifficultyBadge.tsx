import { cn } from '@/lib/utils';

interface DifficultyBadgeProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  className?: string;
}

const colors = {
  beginner: 'bg-green-500/20 text-green-400 border border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

const labels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  return (
    <span className={cn(
      "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md",
      colors[difficulty],
      className
    )}>
      {labels[difficulty]}
    </span>
  );
}
