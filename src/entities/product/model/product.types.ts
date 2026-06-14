import { type Product } from '@/shared/lib/db/generated/client';

export type ProductStatus = 'NEW' | 'SALE' | 'PROMOTION' | 'DEFAULT';

export type ListingProductType = Pick<Product, 'id' | 'name' | 'slug' | 'image' | 'price' | 'status' | 'currency'>;
