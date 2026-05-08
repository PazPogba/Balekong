export type Category = 'Sepak Bola' | 'American Football' | 'Anime & TCG';
export type VariantType = 'Box' | 'Pack';

export interface ProductVariant {
  type: VariantType;
  price: number;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  variants: ProductVariant[];
  imageUrl?: string;
  badge?: string;
  tags?: string[];
  description?: string;
}
