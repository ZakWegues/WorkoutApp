'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.refresh()
    setTimeout(() => router.push('/'), 100)
  }

  async function handleSignUp(e?: React.FormEvent) {
    if (e) e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.refresh()
    setTimeout(() => router.push('/'), 100)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-[340px] bg-[#141414] p-6 rounded-3xl border border-white/5">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#22c55e] text-black font-bold text-3xl rounded-2xl mx-auto flex items-center justify-center mb-4">
            W
          </div>
          <h1 className="text-2xl font-bold text-white">WorkoutApp</h1>
          <p className="text-neutral-500 mt-1">Seu parceiro de treinos</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? 'Aguarde...' : 'Entrar'}
            </button>
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-50"
            >
              Criar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
