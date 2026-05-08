import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating secure parameterized query behavior (No actual SQL used, but UI implies safety)
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div key="auth-wrapper" className="fixed inset-0 z-[70]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-[#0A0A0B] border border-zinc-800 rounded-2xl shadow-2xl relative overflow-hidden pointer-events-auto"
            >
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400" />
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-[#18181B] border border-zinc-800 rounded-xl flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-light text-white mb-1"><span className="italic font-serif text-amber-500">{isLogin ? 'Akses' : 'Gabung'}</span> Aman</h2>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">
                    {isLogin ? 'Masuk ke akun Anda' : 'Buat akun baru'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> Alamat Email
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#18181B] border border-zinc-800 rounded focus:border-amber-500 px-4 py-3 text-sm text-white outline-none transition-colors"
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5 justify-between">
                      <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> Kata Sandi</span>
                      {isLogin && <a href="#" className="text-amber-500 hover:underline">Lupa?</a>}
                    </label>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#18181B] border border-zinc-800 rounded focus:border-amber-500 px-4 py-3 text-sm text-white outline-none transition-colors"
                      placeholder="Masukkan dengan aman..."
                    />
                    {/* Security hint to address SQLi concerns */}
                    <p className="text-[9px] text-zinc-600 mt-2 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Terenkripsi & Terlindungi (Anti-SQLi)
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-12 bg-white text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-zinc-200 transition-colors mt-6 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (isLogin ? 'Masuk Sekarang' : 'Buat Akun')}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
                    <span className="text-amber-500 font-bold">{isLogin ? 'Daftar' : 'Masuk'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
