import type { CategoryGetPayload, ParameterGetPayload, ProductGetPayload } from '@/shared/lib/db';

import type { catalogCategorySelect, catalogParameterSelect, catalogProductSelect } from './catalog.select';

export type CatalogCategory = CategoryGetPayload<{ select: typeof catalogCategorySelect }>;

export type CatalogSubcategory = CatalogCategory['children'][number];

export type CatalogCategorySummary = Pick<CatalogCategory, 'id' | 'name' | 'slug' | 'parentId'>;

export type CatalogProduct = ProductGetPayload<{ select: typeof catalogProductSelect }>;

export type CatalogParameter = ParameterGetPayload<{ select: typeof catalogParameterSelect }>;

export interface CatalogProductsPage {
    items: CatalogProduct[];
    total: number;
    pageSize: number;
    page: number;
}

export interface CatalogPageData {
    category: CatalogCategory | null;
    products: CatalogProductsPage;
    parameters: CatalogParameter[];
}
