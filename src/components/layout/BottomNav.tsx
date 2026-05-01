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
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/5 pb-safe">
      <nav className="flex w-full max-w-[430px] justify-around items-center h-16 px-2 relative">
        <AnimatePresence>
          {tabs.map((tab) => {
            // Detect '/' as exactly home, other paths must start with href
            const isActive = tab.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(tab.href);
            
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex flex-col items-center justify-center w-full h-full pt-1"
              >
                <div className="relative flex items-center justify-center p-1.5 transition-all">
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-active"
                      className="absolute inset-0 bg-[#22c55e]/10 rounded-2xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-line"
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#22c55e] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={22}
                    className={cn(
                      "relative z-10 transition-all duration-300",
                      isActive ? "text-[#22c55e] scale-110" : "text-neutral-500 hover:text-neutral-300"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-bold mt-1 transition-all duration-300 uppercase tracking-tighter",
                    isActive ? "text-[#22c55e] opacity-100" : "text-neutral-500 opacity-60"
                  )}
                >
                  {tab.name}
                </span>
              </Link>
            );
          })}
        </AnimatePresence>
      </nav>
    </div>
  );
}
