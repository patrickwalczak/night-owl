import { type Product } from '@/entities/product';

export type ListingProductType = Pick<Product, 'id' | 'name' | 'slug' | 'image' | 'price' | 'status' | 'currency'>;
