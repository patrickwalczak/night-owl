import type { CategoryWithChildrenAndProductCounts } from '@/entities/category';
import type { ProductListItem, ProductListPage } from '@/entities/product';
import type { ParameterGetPayload } from '@/shared/lib/db';

import type { categoryPageParameterSelect } from './categoryPage.select';

export type CategoryPageCategory = CategoryWithChildrenAndProductCounts;

export type CategorySubcategory = CategoryPageCategory['children'][number];

export type CategorySummary = Pick<CategoryPageCategory, 'id' | 'name' | 'slug' | 'parentId'>;

export type CategoryProduct = ProductListItem;

export type RawCategoryParameter = ParameterGetPayload<{
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
}

export interface SelectedFilter {
    parameterSlug: string;
    parameterValueSlug: string;
    checked: boolean;
}
