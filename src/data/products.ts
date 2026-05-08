import { Product, Category } from '../types';

const categories: Category[] = [
  'Sepak Bola', 
  'American Football', 
  'Anime & TCG'
];

export const products: Product[] = [
  // SOCCER
  {
    id: 'soc-1',
    name: '2025-2026 Panini Select Soccer La Liga International Hobby Box',
    category: 'Sepak Bola',
    variants: [
      { type: 'Box', price: 4000000, available: true },
      { type: 'Pack', price: 333000, available: true }
    ],
    badge: 'Eksklusif Hobby',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'soc-2',
    name: 'Daka Top Audience Barcelona 2024-2025',
    category: 'Sepak Bola',
    variants: [
      { type: 'Box', price: 260000, available: true },
      { type: 'Pack', price: 45000, available: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1553775282-20af80779df7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'soc-3',
    name: 'Daka Top Audience Real Madrid 2024-2025',
    category: 'Sepak Bola',
    variants: [
      { type: 'Box', price: 260000, available: true },
      { type: 'Pack', price: 45000, available: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'soc-4',
    name: '2024-2025 Topps UEFA UCL Women',
    category: 'Sepak Bola',
    variants: [
      { type: 'Box', price: 442000, available: true },
      { type: 'Pack', price: 75000, available: true }
    ],
    badge: 'Rilis Terbaru',
    imageUrl: 'https://images.unsplash.com/photo-1518605368461-1eb2023cd5c7?q=80&w=800&auto=format&fit=crop'
  },
  // FOOTBALL
  {
    id: 'fb-1',
    name: '2025 Panini Mosaic Football Mega Box',
    category: 'American Football',
    variants: [
      { type: 'Box', price: 950000, available: true },
      { type: 'Pack', price: 160000, available: true }
    ],
    badge: 'Sedang Tren',
    imageUrl: 'https://images.unsplash.com/photo-1628120610931-e40da1158fcd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'fb-2',
    name: '2025 Donruss Football Mega Box',
    category: 'American Football',
    variants: [
      { type: 'Box', price: 900000, available: true },
      { type: 'Pack', price: 150000, available: true }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4cb9310?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'fb-3',
    name: '2025 Panini Select Soccer Box',
    category: 'American Football',
    variants: [
      { type: 'Box', price: 600000, available: true },
      { type: 'Pack', price: 100000, available: true }
    ],
    badge: 'Nilai Terbaik',
    imageUrl: 'https://www.blowoutcards.com/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/f/i/final_23_ssoc_hobby_box_shadow.jpg'
  },
  // TCG
  {
    id: 'tcg-1',
    name: 'One Piece TCG: OP-10 Royal Blood',
    category: 'Anime & TCG',
    variants: [
      { type: 'Box', price: 2000000, available: true },
      { type: 'Pack', price: 120000, available: true }
    ],
    badge: 'Terbatas',
    imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'tcg-2',
    name: 'Pokemon TCG: M2 Inferno X Japanese Version (Loose Pack)',
    category: 'Anime & TCG',
    variants: [
      { type: 'Pack', price: 120000, available: true }
    ],
    badge: 'Langka',
    imageUrl: 'https://images.unsplash.com/photo-1622839956426-ed22e4d0c9f1?q=80&w=800&auto=format&fit=crop'
  }
];

export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};
