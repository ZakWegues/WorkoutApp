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
            const isActive = pathname === tab.href;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex flex-col items-center justify-center w-full h-full space-y-1"
              >
                <div className="relative flex items-center justify-center p-1">
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-active"
                      className="absolute inset-0 bg-[#22c55e]/10 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={24}
                    className={cn(
                      "relative z-10 transition-colors duration-200",
                      isActive ? "text-[#22c55e]" : "text-neutral-500 hover:text-neutral-300"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors duration-200",
                    isActive ? "text-[#22c55e]" : "text-neutral-500"
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
