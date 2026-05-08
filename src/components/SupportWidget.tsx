import React, { useState } from 'react';
import { MessageSquare, X, ChevronDown, Send, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQs = [
  {
    q: 'Apakah semua produk original / authentic?',
    a: 'Ya, semua box dan pack yang kami jual 100% original dan factory sealed.'
  },
  {
    q: 'Berapa lama proses pengiriman?',
    a: 'Pesanan sebelum jam 15.00 akan dikirim di hari yang sama. Kami menggunakan layanan next-day untuk kota besar.'
  },
  {
    q: 'Apakah bisa pre-order box yang belum rilis?',
    a: 'Tentu, silakan hubungi kami via WhatsApp untuk detail Pre-Order set terbaru.'
  }
];

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-amber-500 hover:bg-amber-400 text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all z-40 hover:scale-110"
      >
        <Headset className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="support-widget"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[340px] sm:w-[380px] bg-[#111112] border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-800 bg-[#18181B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-inner">
                  <Headset className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm tracking-wide">Layanan Bantuan</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Kami balas secepatnya</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-800 bg-[#0A0A0B]">
              <button 
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'faq' ? 'text-amber-500 border-b-2 border-amber-500 bg-[#18181B]' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Pertanyaan
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'contact' ? 'text-amber-500 border-b-2 border-amber-500 bg-[#18181B]' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Kontak
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 hide-scrollbar bg-[#0A0A0B] min-h-[300px]">
              {activeTab === 'faq' ? (
                <div className="space-y-3">
                  {FAQs.map((faq, idx) => (
                    <div key={idx} className="border border-zinc-900 rounded-lg overflow-hidden bg-[#0a0a0a]">
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full p-4 flex items-center justify-between hover:bg-zinc-800/20 transition-colors group"
                      >
                        <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white text-left pr-4 leading-tight">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-amber-500 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaq === idx && (
                          <motion.div 
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-xs text-zinc-500 leading-relaxed border-t border-zinc-900/50 mt-2">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  <div className="mt-5 pt-5 border-t border-zinc-800/50 text-center">
                     <p className="text-[11px] text-zinc-500 mb-2 uppercase tracking-wider">Tidak menemukan jawaban?</p>
                     <button onClick={() => setActiveTab('contact')} className="text-[11px] font-bold text-amber-500 uppercase tracking-widest hover:text-amber-400 transition-colors">
                       Hubungi Kami &rarr;
                     </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-medium uppercase tracking-widest mb-1.5">Nama Lengkap</label>
                    <input type="text" className="w-full bg-[#18181B] border border-zinc-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600" placeholder="Masukkan nama..." />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-medium uppercase tracking-widest mb-1.5">Email / WhatsApp</label>
                    <input type="text" className="w-full bg-[#18181B] border border-zinc-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600" placeholder="Kontak yang bisa dihubungi..." />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-medium uppercase tracking-widest mb-1.5">Pesan Anda</label>
                    <textarea rows={4} className="w-full bg-[#18181B] border border-zinc-800 rounded-lg px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600 resize-none" placeholder="Jelaskan pertanyaan atau kendala Anda..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest text-[11px] py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    Kirim Pesan <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
