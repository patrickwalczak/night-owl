import type { CategoryGetPayload } from '@/shared/lib/db';

import { type categoryWithChildrenSelect } from './select';

export type CategoryWithChildren = CategoryGetPayload<{
    select: typeof categoryWithChildrenSelect;
}>;

export type RootCategoriesWithChildren = CategoryWithChildren[];

export type RawCategoryWithProductCount = CategoryWithChildren['children'][number];

export type CategoryWithProductCount = Omit<RawCategoryWithProductCount, '_count'> & {
    count: number;
};

export type CategoryWithChildrenAndProductCounts = Omit<CategoryWithChildren, 'children'> & {
    children: CategoryWithProductCount[];
};
