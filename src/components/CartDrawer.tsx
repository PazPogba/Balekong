import React from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, VariantType } from '../types';
import { formatRupiah } from '../data/products';

interface CartItem {
  product: Product;
  variantType: VariantType;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (index: number) => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => {
    const v = item.product.variants.find(v => v.type === item.variantType);
    return sum + ((v?.price || 0) * item.quantity);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-sm sm:max-w-md bg-[#050505] border-l border-zinc-900 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="px-8 py-10 border-b border-zinc-900 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold uppercase tracking-[0.3em] text-xs mb-1">Vault Aset</h2>
                <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">{items.length} Unit Terjamin</p>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-700 italic font-serif text-center">
                  <ShoppingBag className="w-16 h-16 mb-6 opacity-5 flex items-center" />
                  <p className="tracking-widest uppercase text-[10px]">Vault Kosong</p>
                </div>
              ) : (
                items.map((item, idx) => {
                  const v = item.product.variants.find(v => v.type === item.variantType);
                  return (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={`${item.product.id}-${item.variantType}`} 
                      className="flex gap-6 group relative"
                    >
                      <div className="w-24 h-24 bg-zinc-900/50 p-2 rounded overflow-hidden shrink-0 border border-zinc-900 group-hover:border-zinc-700 transition-colors">
                        <img src={item.product.imageUrl} className="w-full h-full object-contain" alt="" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-[9px] uppercase tracking-widest text-amber-500 font-mono mb-1">{item.variantType === 'Box' ? 'Kotak' : 'Paket'}</p>
                        <h4 className="text-sm font-bold text-white line-clamp-1 leading-tight mb-3">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">Jml</span>
                              <span className="text-xs text-white font-mono">{item.quantity}</span>
                           </div>
                           <span className="text-sm font-bold text-white font-mono">
                              {formatRupiah(v?.price || 0)}
                           </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => onRemove(idx)}
                        className="p-2 text-zinc-700 hover:text-white transition-all self-start mt-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-10 border-t border-zinc-900 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.3em]">Total Nilai</span>
                    <p className="text-[10px] text-zinc-500 font-mono mt-1 italic">Ekskl. Pengiriman</p>
                  </div>
                  <span className="text-3xl font-bold text-white font-mono tracking-tighter">{formatRupiah(total)}</span>
                </div>
                
                <button className="group relative w-full h-20 bg-white text-black font-black uppercase tracking-[0.5em] text-[10px] flex items-center justify-center gap-4 transition-all hover:bg-amber-500 hover:text-black">
                  <span>Otorisasi Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  
                  {/* Progress Line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-black/10 w-full overflow-hidden">
                     <motion.div 
                        animate={{ x: ['100%', '-100%'] }} 
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="h-full w-1/3 bg-black/20" 
                      />
                  </div>
                </button>
                
                <div className="mt-8 flex items-center gap-2 justify-center text-[9px] uppercase tracking-[0.2em] font-bold text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Neural Secure Link Aktif
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
