'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, Bot, TrendingUp, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explorar', href: '/explore', icon: Compass },
  { name: 'IA Coach', href: '/coach', icon: Bot },
  { name: 'Progresso', href: '/progress', icon: TrendingUp },
  { name: 'Perfil', href: '/profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe">
      <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-2xl border-t border-white/[0.05]" />
      
      <nav className="flex w-full max-w-[430px] justify-around items-center h-20 px-6 relative z-10">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' 
            ? pathname === '/' 
            : pathname.startsWith(tab.href);
          
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-col items-center justify-center w-full h-full group"
            >
              <div className="relative flex items-center justify-center mb-1.5">
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-glow"
                    className="absolute inset-0 bg-[#22c55e]/20 blur-xl rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                <div className={cn(
                  "relative z-10 transition-all duration-500 flex items-center justify-center",
                  isActive ? "text-[#22c55e] scale-110" : "text-zinc-500 group-hover:text-zinc-300"
                )}>
                  <Icon
                    size={isActive ? 22 : 20}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="active-dot"
                      className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#22c55e] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                    />
                  )}
                </div>
              </div>
              
              <span
                className={cn(
                  "text-[10px] font-black transition-all duration-300 uppercase tracking-[0.1em]",
                  isActive ? "text-[#22c55e]" : "text-zinc-600"
                )}
              >
                {tab.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="indicator"
                  className="absolute bottom-2 w-1 h-1 rounded-full bg-[#22c55e]"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

