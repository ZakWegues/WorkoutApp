'use client';

interface ExitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ExitConfirmModal({ isOpen, onClose, onConfirm }: ExitConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#141414] rounded-2xl p-6 w-full max-w-[340px] border border-white/10 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-2">Sair do treino?</h3>
        <p className="text-neutral-400 text-sm mb-6">
          O seu progresso atual será perdido se você não concluir a sessão.
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors"
          >
            Continuar treinando
          </button>
          <button
            onClick={onConfirm}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold py-3.5 px-4 rounded-xl transition-colors"
          >
            Sair mesmo assim
          </button>
        </div>
      </div>
    </div>
  );
}
