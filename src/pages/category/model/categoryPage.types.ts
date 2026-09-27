import type { ProductListItem, ProductListPage } from '@/entities/product';
import type { CategoryGetPayload, ParameterGetPayload } from '@/shared/lib/db';

import type { categoryPageCategorySelect, categoryPageParameterSelect } from './categoryPage.select';

export type CategoryPageCategory = CategoryGetPayload<{ select: typeof categoryPageCategorySelect }>;

export type CategorySubcategory = CategoryPageCategory['children'][number];

export type CategorySummary = Pick<CategoryPageCategory, 'id' | 'name' | 'slug' | 'parentId'>;

export type CategoryProduct = ProductListItem;

type RawCategoryParameter = ParameterGetPayload<{
    select: ReturnType<typeof categoryPageParameterSelect>;
}>;

export type CategoryParameterValue = Omit<RawCategoryParameter['values'][number], '_count'> & {
    count: number;
};

export type CategoryParameter = Omit<RawCategoryParameter, 'values'> & {
    values: CategoryParameterValue[];
};

export type CategoryProductsPage = ProductListPage;

export interface CategoryPageData {
    category: CategoryPageCategory | null;
    products: CategoryProductsPage;
    parameters: CategoryParameter[];
}

export interface SelectedFilter {
    parameterSlug: string;
    parameterValueSlug: string;
    checked: boolean;
}
