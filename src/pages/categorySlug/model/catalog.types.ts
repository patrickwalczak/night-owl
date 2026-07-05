import type { ProductListItem, ProductListPage } from '@/entities/product';
import type { CategoryGetPayload, ParameterGetPayload } from '@/shared/lib/db';

import type { catalogCategorySelect, catalogParameterSelect } from './catalog.select';

export type CatalogCategory = CategoryGetPayload<{ select: typeof catalogCategorySelect }>;

export type CatalogSubcategory = CatalogCategory['children'][number];

export type CatalogCategorySummary = Pick<CatalogCategory, 'id' | 'name' | 'slug' | 'parentId'>;

export type CatalogProduct = ProductListItem;

export type CatalogParameter = ParameterGetPayload<{ select: typeof catalogParameterSelect }>;

export type CatalogProductsPage = ProductListPage;

export interface CatalogPageData {
    category: CatalogCategory | null;
    products: CatalogProductsPage;
    parameters: CatalogParameter[];
}
