import type { ProductGetPayload } from '@/shared/lib/db';

import { type productListItemSelect } from './productListItem.select';

export type ProductListItem = ProductGetPayload<{
    select: typeof productListItemSelect;
}>;

export interface ProductListPage {
    items: ProductListItem[];
    total: number;
    pageSize: number;
    page: number;
    totalPages: number;
    nextPage: number | null;
}
