import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category } from '../types';
import { cn } from '../lib/utils';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  userEmail: string | null;
  categories: Category[];
  activeCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
}

export function Navbar({ cartCount, onOpenCart, onOpenSearch, onOpenAuth, userEmail, categories, activeCategory, onSelectCategory }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-700",
      scrolled 
        ? "bg-[#050505]/90 backdrop-blur-xl border-b border-zinc-900 py-4" 
        : "bg-transparent py-8"
    )}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center font-bold text-black text-xs rotate-45 group-hover:rotate-180 transition-transform duration-500">
               L
            </div>
            <h1 className="text-xl font-bold tracking-[0.2em] text-white flex items-center">
              LOGOMAN
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full ml-1" />
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-full px-2 py-1 backdrop-blur-md">
            <NavButton 
              active={activeCategory === 'All'} 
              onClick={() => { onSelectCategory('All'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Semua Aset
            </NavButton>
            {categories.map((cat) => (
              <NavButton 
                key={cat} 
                active={activeCategory === cat} 
                onClick={() => { onSelectCategory(cat); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                {cat}
              </NavButton>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <NavAction onClick={onOpenSearch} title="Cari">
              <Search className="w-4 h-4" />
            </NavAction>
            
            <NavAction 
              onClick={userEmail ? undefined : onOpenAuth}
              title={userEmail || "Identitas"}
              className="hidden sm:flex"
            >
              <User className={cn("w-4 h-4", userEmail ? "text-amber-500" : "text-zinc-400")} />
              {userEmail && <span className="ml-2 text-[10px] uppercase tracking-widest text-zinc-400 font-mono">{userEmail.split('@')[0]}</span>}
            </NavAction>
            
            <NavAction onClick={onOpenCart} title="Inventori" className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-black rounded-full text-[9px] font-black flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </NavAction>

            <NavAction 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </NavAction>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#050505] lg:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-amber-500 rounded-sm" />
                 <span className="text-white font-bold tracking-widest text-sm lowercase">logoman.</span>
               </div>
               <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-white"
               >
                  <X className="w-5 h-5" />
               </button>
            </div>

            <div className="flex flex-col gap-6">
              <button 
                onClick={() => { onSelectCategory('All'); setIsMobileMenuOpen(false); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={cn(
                  "text-4xl font-bold tracking-tighter text-left transition-colors",
                  activeCategory === 'All' ? 'text-amber-500' : 'text-zinc-800 hover:text-zinc-600'
                )}
              >
                Akses Semua
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => { onSelectCategory(cat); setIsMobileMenuOpen(false); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className={cn(
                    "text-4xl font-bold tracking-tighter text-left transition-colors",
                    activeCategory === cat ? 'text-amber-500' : 'text-zinc-800 hover:text-zinc-600'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-zinc-900 flex justify-between items-center">
               <div className="space-y-1">
                 <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Identitas</p>
                 <p className="text-white font-mono text-sm">{userEmail || 'Akun Tamu'}</p>
               </div>
               <button 
                 onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}
                 className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded text-xs text-white font-bold uppercase tracking-widest"
               >
                 {userEmail ? 'Dashboard' : 'Masuk'}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const NavButton: React.FC<{ children: React.ReactNode, active: boolean, onClick: () => void }> = ({ children, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
        active 
          ? "bg-white text-black shadow-xl shadow-white/5" 
          : "text-zinc-500 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

function NavAction({ children, onClick, title, className }: { children: React.ReactNode, onClick?: () => void, title?: string, className?: string }) {
  return (
    <button 
      onClick={onClick}
      title={title}
      className={cn(
        "h-10 px-4 rounded-full border border-zinc-900 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 transition-all flex items-center justify-center text-zinc-400 hover:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
