import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatRupiah } from '../data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductClick: (category: string) => void;
}

export function SearchOverlay({ isOpen, onClose, products, onProductClick }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredProducts = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
      <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl flex flex-col"
        >
          {/* Header */}
          <div className="border-b border-zinc-800 bg-[#0A0A0B]/50 p-6">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <Search className="w-6 h-6 text-zinc-500" />
              <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari kotak, paket, atau set (contoh: Panini Mosaic)..." 
                className="flex-1 bg-transparent border-none outline-none text-2xl text-white font-light placeholder:text-zinc-600 focus:ring-0"
              />
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              {query.trim() !== '' && filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-zinc-500 text-lg">Tidak menemukan hasil untuk "{query}"</p>
                </div>
              )}
              
              {filteredProducts.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 font-bold">Hasil Pencarian ({filteredProducts.length})</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map(product => (
                      <div 
                        key={product.id}
                        onClick={() => {
                          onProductClick(product.category);
                          onClose();
                        }}
                        className="flex items-center gap-4 p-3 bg-[#111112] border border-zinc-800 rounded-xl hover:border-amber-500/50 cursor-pointer group transition-colors"
                      >
                        <div className="w-16 h-16 bg-[#18181B] rounded-lg overflow-hidden border border-zinc-800 shrink-0">
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-amber-500 font-bold mb-1">{product.category}</p>
                          <h4 className="text-sm font-medium text-white truncate group-hover:text-amber-400 transition-colors">{product.name}</h4>
                          <p className="text-xs text-zinc-500 font-mono mt-1">Mulai dari {formatRupiah(product.variants[product.variants.length - 1]?.price || 0)}</p>
                        </div>
                        <div className="pr-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                          <ArrowRight className="w-4 h-4 text-amber-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() === '' && (
                <div className="py-10">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-6 font-bold">Pencarian Populer</p>
                  <div className="flex flex-wrap gap-3">
                    {['2025 Panini Select', 'Pokemon TCG', 'Topps UCL', 'NFL Mosaic'].map(term => (
                      <button 
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-[#111112] border border-zinc-800 text-sm text-zinc-300 uppercase tracking-widest font-medium text-[10px] rounded hover:border-zinc-600 hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
