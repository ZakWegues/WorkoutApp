'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on mobile
    if (window.innerWidth >= 768) return;

    const dismissed = localStorage.getItem('pwa_banner_dismissed');
    if (dismissed) return;

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa_banner_dismissed', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-[#22c55e] text-black px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex-1 pr-4">
        <p className="font-semibold text-sm">Instale o app para usar offline</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleInstall}
          className="bg-black/10 hover:bg-black/20 text-black font-bold py-1.5 px-3 rounded-lg text-sm transition-colors"
        >
          Instalar
        </button>
        <button onClick={handleDismiss} className="p-1">
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
