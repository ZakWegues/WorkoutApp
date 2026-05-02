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
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-white/5 pb-safe">
      <nav className="flex w-full max-w-[430px] justify-around items-center h-16 px-4 relative">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' 
            ? pathname === '/' 
            : pathname.startsWith(tab.href);
          
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              <div className="relative flex items-center justify-center mb-1">
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#22c55e] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={20}
                  className={cn(
                    "relative z-10 transition-all duration-300",
                    isActive ? "text-[#22c55e] scale-110" : "text-zinc-500 hover:text-zinc-300"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[9px] font-black transition-all duration-300 uppercase tracking-widest",
                  isActive ? "text-[#22c55e]" : "text-zinc-500"
                )}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

