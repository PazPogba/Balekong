import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product, VariantType } from '../types';
import { formatRupiah } from '../data/products';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variantType: VariantType, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState<VariantType>(
    product.variants[0]?.type || 'Box'
  );

  const activeVariantInfo = product.variants.find(v => v.type === selectedVariant);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-[#080809] border border-zinc-900 transition-all duration-500 hover:border-zinc-700 hover:bg-[#0C0C0D]"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-900 border-dashed">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
          ID: {product.id.split('-').pop()}
        </span>
        {product.badge && (
          <span className="text-[9px] font-bold tracking-widest text-amber-500 px-2 py-0.5 border border-amber-500/30 rounded uppercase bg-amber-500/5">
            {product.badge}
          </span>
        )}
      </div>

      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden p-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10 pointer-events-none" />
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop';
          }}
          referrerPolicy="no-referrer"
        />
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <button 
            disabled={!activeVariantInfo?.available}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, selectedVariant, 1);
            }}
            className="w-full bg-white text-black py-4 font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Simpan ke Vault
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-6 pt-0">
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500 font-mono mb-2">{product.category}</p>
          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-amber-500 transition-colors line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
        </div>

        <div className="mt-auto space-y-6">
          {/* Variant Switcher */}
          <div className="flex p-1 bg-black/40 border border-zinc-900 rounded">
            {product.variants.map((v) => (
              <button
                key={v.type}
                onClick={(e) => { e.stopPropagation(); setSelectedVariant(v.type); }}
                className={cn(
                  "flex-1 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all",
                  selectedVariant === v.type 
                    ? "bg-zinc-800 text-white shadow-xl" 
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {v.type === 'Box' ? 'Kotak' : 'Paket'}
              </button>
            ))}
          </div>

          {/* Pricing Info */}
          <div className="flex justify-between items-end border-t border-zinc-900 pt-5">
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Estimasi Harga</p>
              <p className="text-xl font-mono font-bold text-white tracking-tighter">
                {formatRupiah(activeVariantInfo?.price || 0)}
              </p>
            </div>
            
            <div className={cn(
              "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider",
              activeVariantInfo?.available 
                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                : "bg-red-500/10 text-red-500 border border-red-500/20"
            )}>
              {activeVariantInfo?.available ? 'Tersedia' : 'Habis'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
