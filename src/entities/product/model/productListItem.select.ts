import type { ProductSelect } from '@/shared/lib/db';

export const productListItemSelect = {
    id: true,
    name: true,
    slug: true,
    image: true,
} as const satisfies ProductSelect;
