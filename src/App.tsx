import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SupportWidget } from './components/SupportWidget';
import { SearchOverlay } from './components/SearchOverlay';
import { AuthModal } from './components/AuthModal';
import { products } from './data/products';
import { Category, Product, VariantType } from './types';
import { cn } from './lib/utils';

// Extract unique categories
const categories: Category[] = Array.from(new Set(products.map(p => p.category)));

interface CartItem {
  product: Product;
  variantType: VariantType;
  quantity: number;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: Product, variantType: VariantType, quantity: number) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.variantType === variantType);
      if (existingIdx >= 0) {
        const newItems = [...prev];
        newItems[existingIdx].quantity += quantity;
        return newItems;
      }
      return [...prev, { product, variantType, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (indexToRemove: number) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };
  
  const handleProductSearchClick = (category: string) => {
    setActiveCategory(category as Category);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] selection:bg-amber-500 selection:text-black">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        userEmail={userEmail}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <main className="flex-1">
        <Hero />
        
        {/* Marquee Section - High Contrast Industrial (Recipe 5/11) */}
        <div className="bg-amber-500 py-4 overflow-hidden border-y border-black/10 relative text-black z-30">
          <div className="flex whitespace-nowrap animate-marquee w-fit font-mono">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center px-6 font-black uppercase tracking-[0.4em] text-[10px]">
                <span className="flex items-center gap-2">HANYA ASET AUTENTIK <div className="w-2 h-2 bg-black rounded-full" /></span>
                <span className="flex items-center gap-2">FLAGSHIP LOGOMAN GLOBAL <div className="w-2 h-2 bg-black rounded-full" /></span>
                <span className="flex items-center gap-2">EDISI TERBATAS LANGKA <div className="w-2 h-2 bg-black rounded-full" /></span>
                <span className="flex items-center gap-2">PENGIRIMAN GLOBAL TERASURANSI <div className="w-2 h-2 bg-black rounded-full" /></span>
              </div>
            ))}
          </div>
        </div>
        
        <section id="products" className="py-32 md:py-48 relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col mb-24 gap-12 text-center items-center">
              <div className="w-px h-24 bg-gradient-to-b from-transparent to-amber-500 mb-8" />
              
              <div className="space-y-4">
                <span className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.5em] font-bold">Vault Terkurasi</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.8]">
                  Inventori <br className="md:hidden" /> Tersedia
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                 <button 
                  onClick={() => setActiveCategory('All')}
                  className={cn(
                    "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all",
                    activeCategory === 'All' ? "bg-white text-black border-white" : "border-zinc-900 text-zinc-500 hover:border-zinc-700"
                  )}
                >
                  Semua Item
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all",
                      activeCategory === cat ? "bg-white text-black border-white" : "border-zinc-900 text-zinc-500 hover:border-zinc-700"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="py-32 text-center border border-dashed border-zinc-900 bg-white/5 rounded-3xl">
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Tidak ada aset ditemukan di sektor ini.</p>
              </div>
            )}
          </div>
        </section>

        {/* Brand Promise / Grid Section */}
        <section className="py-32 border-t border-zinc-900 bg-[#080809]">
           <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden rounded-2xl">
                 <div className="bg-[#050505] p-12 space-y-4">
                    <div className="text-amber-500 font-serif italic text-2xl">01</div>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Keaslian Mint</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">Setiap kartu diperiksa oleh ahli kami dan dijamin 100% autentik sebelum terdaftar.</p>
                 </div>
                 <div className="bg-[#050505] p-12 space-y-4">
                    <div className="text-amber-500 font-serif italic text-2xl">02</div>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Logistik Global</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">Pengiriman aman dengan asuransi penuh dan pelacakan untuk semua aset bernilai tinggi secara global.</p>
                 </div>
                 <div className="bg-[#050505] p-12 space-y-4">
                    <div className="text-amber-500 font-serif italic text-2xl">03</div>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Layanan VIP</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">Dukungan khusus untuk pembangunan portofolio kelas atas dan akses lelang eksklusif.</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
      />

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onProductClick={handleProductSearchClick}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(email) => setUserEmail(email)}
      />
      
      <SupportWidget />
    </div>
  );
}
