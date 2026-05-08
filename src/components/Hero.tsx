import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-40 overflow-hidden bg-[#050505]">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-10%] top-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute right-[-5%] bottom-[-5%] w-[40%] h-[40%] bg-zinc-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Vertical Rail Text (Recipe 11) */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-12 z-10">
        <div className="w-[1px] h-24 bg-zinc-800" />
        <span className="writing-vertical-rl text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-mono rotate-180">
          EST. 2024 / AUTHENTICITY FIRST
        </span>
        <div className="w-[1px] h-24 bg-zinc-800" />
      </div>

      <div className="container relative z-20 mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-[1px] bg-amber-500" />
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] font-mono">
                Flagship Indonesia
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-bold leading-[0.9] tracking-tighter mb-10 text-white text-balance uppercase">
              KOLEKSI <br/> TERBAIK <br/>
              <span className="font-serif italic text-amber-500 font-light lowercase">selamanya.</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-12 font-light max-w-lg leading-relaxed">
              Kurasi kartu perdagangan paling langka di dunia. Mulai dari 
              <span className="text-white font-medium"> Mosaic Hobby</span> hingga 
              <span className="text-white font-medium"> Edisi Terbatas.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} 
                className="group relative h-16 px-10 bg-white text-black font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Jelajahi Vault</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => document.getElementById('promo')?.scrollIntoView({ behavior: 'smooth' })} 
                className="h-16 px-10 bg-transparent text-white font-bold uppercase tracking-widest text-[11px] border border-zinc-800 flex items-center justify-center hover:bg-zinc-900 transition-all active:scale-95"
              >
                Penawaran Resmi
              </button>
            </div>
          </motion.div>

          {/* Luxury Bento Grid / Interactive Visuals */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Main Feature Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 5 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-10 right-0 w-[420px] aspect-[4/5] glass rounded-2xl overflow-hidden shadow-2xl z-20 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Product feature"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-amber-500 font-mono text-[10px] uppercase tracking-widest mb-2">Featured Asset</p>
                <h3 className="text-3xl font-bold text-white mb-4">Select Soccer 23/24</h3>
                <div className="flex gap-2">
                   <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-[9px] font-bold text-white uppercase tracking-wider border border-white/10">Hobby Box</div>
                   <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded text-[9px] font-bold text-white uppercase tracking-wider border border-white/10">Authentic</div>
                </div>
              </div>
            </motion.div>

            {/* Float Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-10 top-40 w-56 p-6 glass rounded-xl z-30 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                  <span className="text-amber-500 text-sm">⚡</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Fast Break</p>
                  <p className="text-sm font-bold text-white">New Arrivals</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-amber-500" />
                </div>
                <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest">
                  <span className="text-zinc-600">Stock Level</span>
                  <span className="text-amber-500">72%</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-4 w-48 p-5 glass rounded-xl z-10"
            >
               <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Live Auction</p>
               <h4 className="text-xl font-bold text-white mb-4">Panini Prizm</h4>
               <p className="text-2xl font-mono font-bold text-amber-500">Rp 12.5M</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
