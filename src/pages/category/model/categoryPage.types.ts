import type { ProductListItem, ProductListPage } from '@/entities/product';
import type { CategoryGetPayload, ParameterGetPayload } from '@/shared/lib/db';

import type { categoryPageCategorySelect, categoryPageParameterSelect } from './categoryPage.select';

export type CategoryPageCategory = CategoryGetPayload<{ select: typeof categoryPageCategorySelect }>;

export type CategorySubcategory = CategoryPageCategory['children'][number];

export type CategorySummary = Pick<CategoryPageCategory, 'id' | 'name' | 'slug' | 'parentId'>;

export type CategoryProduct = ProductListItem;

export type CategoryParameter = ParameterGetPayload<{ select: typeof categoryPageParameterSelect }>;

export type CategoryProductsPage = ProductListPage;

export interface CategoryPageData {
    category: CategoryPageCategory | null;
    products: CategoryProductsPage;
    parameters: CategoryParameter[];
}
