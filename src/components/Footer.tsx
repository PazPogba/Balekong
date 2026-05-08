import React from 'react';
import { MapPin, MessageCircle, Star } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0B] border-t border-zinc-800 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <h1 className="text-2xl font-bold tracking-tighter text-white mb-6">LOGOMAN<span className="text-zinc-600 font-light">FLAGSHIP</span></h1>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-sm">
              Logoman Flagship Store Indonesia. Destinasi premium untuk kolektor Sports Card dan TCG di seluruh Indonesia.
            </p>
            <div className="flex items-center gap-2 text-yellow-600 text-sm font-medium">
              <Star className="w-4 h-4 fill-yellow-600 stroke-yellow-600" />
              Rating 5.0 di Google Maps
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-zinc-500 mb-6">Lokasi Galeri</h4>
            <div className="flex items-start gap-3 text-white text-sm leading-relaxed font-medium">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-zinc-500" />
              <p>
                Mall Taman Anggrek Level 3<br />
                Jakarta Barat, Indonesia
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-zinc-500 mb-6">Hubungi Kami</h4>
            <div className="flex flex-col gap-4">
              <a 
                href="https://wa.me/6285117696886" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-white transition-colors text-sm font-medium hover:text-amber-500"
              >
                <MessageCircle className="w-4 h-4 shrink-0 text-zinc-500" />
                WhatsApp: +62 851-1769-6886
              </a>
              <a 
                href="https://www.tiktok.com/@logoman.sportscards.id" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 text-white transition-colors text-sm font-medium hover:text-amber-500"
              >
                <div className="w-4 h-4 shrink-0 flex items-center justify-center border border-zinc-500 rounded text-zinc-500">
                  <span className="text-[9px] font-bold">d</span>
                </div>
                @logoman.sportscards.id
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Logoman Flagship Store. Verified Trading Card Hub.</p>
        </div>
      </div>
    </footer>
  );
}
