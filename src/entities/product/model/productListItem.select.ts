import type { ProductSelect } from '@/shared/lib/db';

export const productListItemSelect = {
    id: true,
    name: true,
    slug: true,
    price: true,
    image: true,
    currency: true,
} as const satisfies ProductSelect;
